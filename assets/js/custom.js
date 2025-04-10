// Custom JavaScript for Rayen's Portfolio

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize dark mode
  initDarkMode();
});

// Function to initialize scrolling animations
function initAnimations() {
  // Add animation classes to elements as they scroll into view
  const animatedElements = document.querySelectorAll('.animated');
  
  // Initial check for elements in view on page load
  checkAnimations(animatedElements);
  
  // Check for elements in view on scroll
  window.addEventListener('scroll', function() {
    checkAnimations(animatedElements);
  });
}

// Function to check if elements are in viewport and animate them
function checkAnimations(elements) {
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('fade-in');
    }
  });
}

// Function to initialize dark mode functionality
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  
  // Set initial state
  if (isDarkMode) {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
  
  // Toggle dark mode when the button is clicked
  darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode class
    body.classList.toggle('dark-mode');
    
    // Check current state
    const isDark = body.classList.contains('dark-mode');
    
    // Update icon
    updateDarkModeIcon(isDark);
    
    // Save preference
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}

// Function to update the dark mode toggle icon
function updateDarkModeIcon(isDark) {
  const icon = document.querySelector('#darkModeToggle i');
  
  if (isDark) {
    icon.classList.remove('fa-moon-o');
    icon.classList.add('fa-sun-o');
  } else {
    icon.classList.remove('fa-sun-o');
    icon.classList.add('fa-moon-o');
  }
}

// Add a small typing effect to the intro section
document.addEventListener('DOMContentLoaded', function() {
  const introHeading = document.querySelector('#intro h2');
  
  if (introHeading) {
    const text = introHeading.textContent;
    introHeading.textContent = '';
    
    let i = 0;
    const typeEffect = setInterval(() => {
      if (i < text.length) {
        introHeading.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeEffect);
      }
    }, 100);
  }
});
