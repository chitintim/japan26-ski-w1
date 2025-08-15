// Countdown timer to trip date
function updateCountdown() {
    const tripDate = new Date('2026-03-22T00:00:00');
    const now = new Date();
    const diff = tripDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = `<strong>${days}</strong> days and <strong>${hours}</strong> hours until departure!`;
        }
    }
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    
    const indicator = document.querySelector('.mountain-indicator');
    if (indicator) {
        // Move the mountain up as user scrolls down
        const translateY = -scrollPercentage * 3; // Multiply for more movement
        indicator.style.transform = `translateY(${translateY}px) scale(${1 + scrollPercentage / 200})`;
    }
}

// Create animated skiers
function createSkier() {
    const container = document.getElementById('skiersContainer');
    if (!container) return;
    
    const skier = document.createElement('div');
    skier.className = 'skier';
    skier.textContent = '⛷️';
    
    // Random starting height (top 70% of screen)
    const startHeight = Math.random() * 70;
    skier.style.top = `${startHeight}%`;
    
    // Random animation duration for variety
    const duration = 6 + Math.random() * 4; // 6-10 seconds
    skier.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 5;
    skier.style.animationDelay = `${delay}s`;
    
    container.appendChild(skier);
    
    // Remove skier after animation completes
    setTimeout(() => {
        skier.remove();
    }, (duration + delay) * 1000);
}

// Generate skiers periodically
function startSkierAnimation() {
    // Create initial skiers
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createSkier(), i * 2000);
    }
    
    // Continue creating skiers periodically
    setInterval(createSkier, 4000 + Math.random() * 3000);
}

// Load and display trip data
async function loadTripData() {
    try {
        // This will load JSON data when you populate it
        console.log('Ready to load trip data when JSON files are populated');
    } catch (error) {
        console.error('Error loading trip data:', error);
    }
}

// Calculate total costs based on options
function calculateTotalCost(accommodation, foodLevel, includeRental) {
    // Placeholder for cost calculator
    return 0;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    
    // Initialize scroll progress
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    
    // Start skier animations
    startSkierAnimation();
    
    // Load trip data
    loadTripData();
    
    // Add smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});