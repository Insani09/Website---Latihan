/*====== DARK/LIGHT MODE TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check untuk saved preference atau system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        updateThemeIcon(false);
    }
}

// Update icon sesuai dengan theme
function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('.theme__icon');
    if (isDark) {
        icon.classList.remove('uil-sun');
        icon.classList.add('uil-moon');
    } else {
        icon.classList.remove('uil-moon');
        icon.classList.add('uil-sun');
    }
}

// Toggle theme saat button diklik
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
    }
});

// Initialize theme saat page load
window.addEventListener('DOMContentLoaded', initTheme);

/*====== WORK FILTER =====*/
const workFilters = document.querySelectorAll('.work__item');
const workCards = document.querySelectorAll('.work__card');

workFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        // Remove active class dari semua filter
        workFilters.forEach(f => f.classList.remove('active-work'));
        
        // Add active class ke filter yang diklik
        this.classList.add('active-work');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter cards based on category
        workCards.forEach(card => {
            if (filterValue === '*') {
                // Show all cards
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                // Check if card has the filter class
                if (card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Add smooth transition to work cards
const style = document.createElement('style');
style.textContent = `
    .work__card {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

/*====== WORK CARDS INTERACTIVITY =====*/
const workButtons = document.querySelectorAll('.work__button');

workCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class dari semua cards
        workCards.forEach(c => c.classList.remove('active'));
        
        // Tambahkan active class ke card yang diklik
        this.classList.add('active');
    });
});

// Close details ketika klik di luar card
document.addEventListener('click', function(event) {
    if (!event.target.closest('.work__card')) {
        workCards.forEach(card => card.classList.remove('active'));
    }
});

/*====== SERVICES/STATUS MODAL =====*/
const servicesButtons = document.querySelectorAll('.services__button');
const servicesModals = document.querySelectorAll('.services__modal');
const servicesModalCloses = document.querySelectorAll('.services__modal-close');

servicesButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        servicesModals[index].classList.add('active-modal');
    });
});

servicesModalCloses.forEach((closeBtn, index) => {
    closeBtn.addEventListener('click', () => {
        servicesModals[index].classList.remove('active-modal');
    });
});

// Close modal ketika klik di background
servicesModals.forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.remove('active-modal');
        }
    });
});

/*====== CONTACT BUTTONS =====*/
const contactButtons = document.querySelectorAll('.contact__button');

contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Add animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

/*====== SHARE BUTTON =====*/
const shareButton = document.querySelector('.btn__control-item');
if (shareButton && shareButton.innerHTML.includes('share')) {
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Insani Aura Ramadhani - Portfolio',
                text: 'Check out my portfolio!',
                url: window.location.href
            }).catch(err => console.log('Share failed:', err));
        } else {
            alert('Share not supported on this device');
        }
    });
}






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

