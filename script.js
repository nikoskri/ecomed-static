// ========================================
// ECOMED - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  
  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileNav.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  
  // Close mobile menu when clicking a link
  const mobileNavLinks = mobileNav.querySelectorAll('.nav-link-mobile');
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // ========================================
  // Hero Carousel
  // ========================================
  const slides = [
    // {
    //   type: 'pattern',
    //   tagline: '',
    //   title: 'Beyond Consultancy: <br>Designing a Future Where Nature, Culture & Innovation Coexist',
    //   subtitle: ''
    // },
    // {
    //   type: 'pattern',
    //   tagline: '',
    //   title: 'Beyond Consultancy: <br>Designing a Future Where Nature, Culture & Innovation Coexist',
    //   subtitle: ''
    // },
    // {
    //   type: 'image',
    //   tagline: '',
    //   title: 'Beyond Consultancy: <br>Designing a Future Where Nature, Culture & Innovation Coexist',
    //   subtitle: ''
    // },
    {
      type: 'image',
      tagline: '',
      title: 'Beyond Consultancy: <br>Designing a Future Where Nature, Culture & Innovation Coexist',
      subtitle: ''
    }
  ];
  
  // let currentSlide = 0;
  // const heroBg0 = document.getElementById('heroBg0');
  // const heroBg1 = document.getElementById('heroBg1');
  // const heroBg2 = document.getElementById('heroBg2');
  // const heroBg3 = document.getElementById('heroBg3');
  // const heroOverlay = document.getElementById('heroOverlay');
  // const heroTagline = document.getElementById('heroTagline');
  // const heroTitle = document.getElementById('heroTitle');
  // const heroSubtitle = document.getElementById('heroSubtitle');
  // const heroBtnPrimary = document.getElementById('heroBtnPrimary');
  // const heroBtnOutline = document.getElementById('heroBtnOutline');
  // const heroScrollLink = document.getElementById('heroScrollLink');
  // const indicators = document.querySelectorAll('.indicator');
  
  // function updateSlide(index) {
  //   currentSlide = index;
  //   const slide = slides[index];
  //   const isPattern = slide.type === 'pattern';
    
  //   // Update backgrounds
  //   [heroBg0, heroBg1, heroBg2, heroBg3].forEach(function(bg) {
  //     bg && bg.classList.remove('active');
  //   });
  //   if (index === 0) {
  //     heroBg0.classList.add('active');
  //   } else if (index === 1) {
  //     heroBg1.classList.add('active');
  //   } else if (index === 2) {
  //     heroBg2.classList.add('active');
  //   } else {
  //     heroBg3.classList.add('active');
  //   }
    
  //   // Update overlay
  //   if (isPattern) {
  //     heroOverlay.classList.remove('active');
  //   } else {
  //     heroOverlay.classList.add('active');
  //   }
    
  //   // Update content
  //   heroTagline.textContent = slide.tagline;
  //   heroTitle.innerHTML = slide.title;
  //   heroSubtitle.textContent = slide.subtitle;
    
  //   // Update colors based on slide type
  //   if (isPattern) {
  //     heroTagline.classList.remove('inverted');
  //     heroTitle.classList.remove('inverted');
  //     heroSubtitle.classList.remove('inverted');
  //     heroBtnPrimary.classList.remove('inverted');
  //     heroBtnOutline.classList.remove('inverted');
  //     heroScrollLink.classList.remove('inverted');
  //   } else {
  //     heroTagline.classList.add('inverted');
  //     heroTitle.classList.add('inverted');
  //     heroSubtitle.classList.add('inverted');
  //     heroBtnPrimary.classList.add('inverted');
  //     heroBtnOutline.classList.add('inverted');
  //     heroScrollLink.classList.add('inverted');
  //   }
    
  //   // Update indicators
  //   indicators.forEach(function(indicator, i) {
  //     if (i === index) {
  //       indicator.classList.add('active');
  //     } else {
  //       indicator.classList.remove('active');
  //     }
      
  //     if (isPattern) {
  //       indicator.classList.remove('inverted');
  //     } else {
  //       indicator.classList.add('inverted');
  //     }
  //   });
  // }
  
  // Indicator click handlers
  indicators.forEach(function(indicator) {
    indicator.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      updateSlide(slideIndex);
    });
  });
  
  // // Auto-rotate slides
  // setInterval(function() {
  //   const nextSlide = (currentSlide + 1) % slides.length;
  //   updateSlide(nextSlide);
  // }, 6000);
  
  // ========================================
  // Contact Form
  // ========================================
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just log it and show an alert
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
  
  // ========================================
  // Footer Year
  // ========================================
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
});
