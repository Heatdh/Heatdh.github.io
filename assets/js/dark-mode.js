// Dark mode functionality
function initDarkMode() {
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on saved preference or system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateDarkModeToggle(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateDarkModeToggle(false);
  }
  
  // Make toggle visible after determining initial state
  const toggle = document.querySelector('.dark-mode-toggle');
  if (toggle) {
    toggle.style.visibility = 'visible';
  }
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Set the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle icon
  updateDarkModeToggle(newTheme === 'dark');
}

function updateDarkModeToggle(isDark) {
  const toggle = document.querySelector('.dark-mode-toggle i');
  if (toggle) {
    if (isDark) {
      toggle.classList.remove('fa-moon');
      toggle.classList.add('fa-sun');
    } else {
      toggle.classList.remove('fa-sun');
      toggle.classList.add('fa-moon');
    }
  }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initDarkMode);
