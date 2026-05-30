document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navActions.classList.remove('active');
    });
  });

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });

  // Tab System for Product Collection
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Testimonial Marquee Randomizer
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
    const totalImages = 46; // Total feedback images available
    const imagesToShow = 20; // How many to show in the loop
    
    // Generate array of all image paths
    let allImages = [];
    for (let i = 1; i <= totalImages; i++) {
      let numStr = i < 10 ? '0' + i : i;
      allImages.push(`images/testimonials/feedback_${numStr}.jpg`);
    }
    
    // Shuffle array using Fisher-Yates
    for (let i = allImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }
    
    // Pick the required amount of images
    const selectedImages = allImages.slice(0, imagesToShow);
    
    // Create HTML string
    let imgHtml = '';
    selectedImages.forEach((src, idx) => {
      imgHtml += `<img src="${src}" alt="Review ${idx+1}" class="review-img">`;
    });
    
    // Duplicate the block to create a seamless infinite loop
    marqueeContent.innerHTML = imgHtml + imgHtml;
  }
});
