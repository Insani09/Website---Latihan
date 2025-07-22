/*====== SIDE BAR =====*/




/*====== SKILLS TAB =====*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]');

// Hide all tab content when page loads
window.addEventListener('DOMContentLoaded', () => {
    tabContent.forEach(content => {
        content.classList.remove('skills__active');
    });
    
    // Make the first tab active by default (if there is one)
    if (tabs.length > 0 && tabContent.length > 0) {
        tabs[0].classList.add('skills__active');
        const firstTarget = document.querySelector(tabs[0].dataset.target);
        if (firstTarget) {
            firstTarget.classList.add('skills__active');
        }
    }
});

// Add event listener for each tab
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        // Hide all tab content
        tabContent.forEach(content => {
            content.classList.remove('skills__active');
        });

        // Show selected tab content
        if (target) {
            target.classList.add('skills__active');
        }

        // Remove active class from all tabs
        tabs.forEach(t => {
            t.classList.remove('skills__active');
        });

        // Add active class to clicked tab
        tab.classList.add('skills__active');
    });
});

