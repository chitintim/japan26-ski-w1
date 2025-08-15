// Currency configuration
const EXCHANGE_RATES = {
    USD: 1,           // Base currency
    GBP: 0.79,        // £1 = $1.27
    HKD: 7.80,        // HK$1 = $0.13
    SGD: 1.35,        // S$1 = $0.74
    MYR: 4.47,        // RM1 = $0.22
    CNY: 7.24,        // ¥1 = $0.14
    JPY: 149.50       // ¥1 = $0.0067
};

const CURRENCY_SYMBOLS = {
    USD: '$',
    GBP: '£',
    HKD: 'HK$',
    SGD: 'S$',
    MYR: 'RM',
    CNY: '¥',
    JPY: '¥'
};

// Detect user location and set currency
async function detectUserCurrency() {
    try {
        // Try timezone-based detection first
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        if (timezone.includes('London') || timezone.includes('Europe/London')) {
            return 'GBP';
        } else if (timezone.includes('Hong_Kong')) {
            return 'HKD';
        } else if (timezone.includes('Singapore')) {
            return 'SGD';
        } else if (timezone.includes('Kuala_Lumpur')) {
            return 'MYR';
        } else if (timezone.includes('Shanghai') || timezone.includes('Beijing')) {
            return 'CNY';
        } else if (timezone.includes('Tokyo')) {
            return 'JPY';
        }
        
        // Fallback to GBP as default
        return 'GBP';
    } catch (error) {
        console.log('Could not detect location, defaulting to GBP');
        return 'GBP';
    }
}

// Format currency based on selection
function formatCurrency(amount, currency) {
    const symbol = CURRENCY_SYMBOLS[currency];
    const converted = amount * EXCHANGE_RATES[currency];
    
    // Special formatting for JPY and CNY (no decimals)
    if (currency === 'JPY' || currency === 'CNY') {
        return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    
    // Format with appropriate decimals
    return `${symbol}${converted.toLocaleString('en', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
    })}`;
}

// Update all prices on the page
function updatePrices(currency) {
    const priceElements = document.querySelectorAll('.price-display');
    
    priceElements.forEach(element => {
        const min = parseFloat(element.dataset.min);
        const max = parseFloat(element.dataset.max);
        
        if (min && max) {
            const minFormatted = formatCurrency(min, currency);
            const maxFormatted = formatCurrency(max, currency);
            element.textContent = `${minFormatted} - ${maxFormatted}`;
        }
    });
    
    // Store preference
    localStorage.setItem('preferredCurrency', currency);
}

// Countdown timer to trip date
function updateCountdown() {
    const tripDate = new Date('2026-03-22T00:00:00');
    const now = new Date();
    const diff = tripDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = `
                <div class="countdown-title">⏰ Departure in:</div>
                <div class="countdown-numbers">
                    <span class="countdown-block">
                        <strong>${days}</strong>
                        <small>days</small>
                    </span>
                    <span class="countdown-block">
                        <strong>${hours}</strong>
                        <small>hours</small>
                    </span>
                    <span class="countdown-block">
                        <strong>${minutes}</strong>
                        <small>mins</small>
                    </span>
                    <span class="countdown-block">
                        <strong>${seconds}</strong>
                        <small>secs</small>
                    </span>
                </div>
            `;
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
        // Move the mountain down as user scrolls down
        const translateY = scrollPercentage * 2; // Mountain goes down with scroll
        indicator.style.transform = `translateY(${translateY}px) scale(${1 + scrollPercentage / 300})`;
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
document.addEventListener('DOMContentLoaded', async function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second
    
    // Initialize scroll progress
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    
    // Start skier animations
    startSkierAnimation();
    
    // Load trip data
    loadTripData();
    
    // Initialize currency selector
    const currencySelector = document.getElementById('currencySelector');
    if (currencySelector) {
        // Check for saved preference first
        let preferredCurrency = localStorage.getItem('preferredCurrency');
        
        // If no saved preference, detect based on location
        if (!preferredCurrency) {
            preferredCurrency = await detectUserCurrency();
        }
        
        // Set the selector to the preferred currency
        currencySelector.value = preferredCurrency;
        
        // Update prices to match
        updatePrices(preferredCurrency);
        
        // Listen for currency changes
        currencySelector.addEventListener('change', (e) => {
            updatePrices(e.target.value);
        });
    }
    
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