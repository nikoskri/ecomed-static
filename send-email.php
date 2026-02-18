<?php
// Restrict CORS to your domain only
$allowed_origin = 'https://' . $_SERVER['HTTP_HOST'];
header('Access-Control-Allow-Origin: ' . $allowed_origin);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate limiting (optional but recommended)
$client_ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/contact_form_' . md5($client_ip) . '.txt';
if (file_exists($rate_limit_file)) {
    $last_submission = (int)file_get_contents($rate_limit_file);
    if (time() - $last_submission < 60) { // 1 submission per minute per IP
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Please wait before submitting again']);
        exit;
    }
}
file_put_contents($rate_limit_file, time());

// Get JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit;
    }
}

// Length validation to prevent spam
if (strlen($data['name']) > 100 || strlen($data['subject']) > 200 || strlen($data['message']) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Input exceeds maximum length']);
    exit;
}

// Sanitize input
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Prevent header injection - remove any newlines or carriage returns
$email = str_replace(["\n", "\r", "\t"], '', $email);
$subject = str_replace(["\n", "\r"], '', $subject);
$name = str_replace(["\n", "\r"], '', $name);

// Set recipient email address (CHANGE THIS TO YOUR EMAIL)
$recipient = 'info@ecomedconsulting.com'; // Update with your actual email

// Validate recipient email
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error']);
    exit;
}

// Prepare email headers with additional security
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Prepare email body with proper escaping
$email_body = "<html><body style='font-family: Arial, sans-serif;'>";
$email_body .= "<h2>New Contact Form Submission</h2>";
$email_body .= "<table style='border-collapse: collapse; width: 100%;'>";
$email_body .= "<tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Name:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>" . $name . "</td></tr>";
$email_body .= "<tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Email:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>" . $email . "</td></tr>";
$email_body .= "<tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Subject:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>" . $subject . "</td></tr>";
$email_body .= "<tr><td style='padding: 8px; border: 1px solid #ddd; vertical-align: top;'><strong>Message:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>" . nl2br($message) . "</td></tr>";
$email_body .= "</table>";
$email_body .= "<p style='font-size: 12px; color: #666; margin-top: 20px;'>Submitted from: " . htmlspecialchars($_SERVER['HTTP_HOST'], ENT_QUOTES, 'UTF-8') . " | IP: " . htmlspecialchars($client_ip, ENT_QUOTES, 'UTF-8') . "</p>";
$email_body .= "</body></html>";

// Send email
$mail_sent = mail($recipient, $subject, $email_body, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later']);
}
?>
