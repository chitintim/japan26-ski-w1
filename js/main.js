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
    const scrollPercentage = Math.min((scrollPosition / scrollHeight) * 100, 100);
    
    const indicator = document.querySelector('.mountain-indicator');
    if (indicator) {
        // Get container height to calculate max travel distance
        const containerHeight = window.innerHeight - 100; // Leave some margin
        const maxTravel = containerHeight - 50; // Account for indicator size
        
        // Move the mountain down as user scrolls down
        const translateY = (scrollPercentage / 100) * maxTravel;
        indicator.style.transform = `translateY(${translateY}px) scale(${1 + scrollPercentage / 400})`;
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

// Resort selection and scrolling
function selectResort(resort) {
    const budgetSection = document.getElementById('budget');
    const resortName = document.getElementById('selectedResortName');
    const transportInfo = document.getElementById('transportInfo');
    const accoDescription = document.getElementById('accoDescription');
    
    // Update resort name
    resortName.textContent = resort === 'hokkaido' ? 'Hokkaido' : 'Nagano';
    
    // Update transport info
    if (resort === 'hokkaido') {
        transportInfo.innerHTML = `
            • Return bus from Sapporo CTS airport<br>
            • Direct flights from HK/SG/KL/Shanghai<br>
            • London requires connection via Tokyo
        `;
        accoDescription.innerHTML = `
            <strong>Tim's Requirements:</strong> Max 2 per room, walking distance/ski-in/out<br>
            <strong>Budget:</strong> Shared Airbnb (4BR/8ppl) - £508/person<br>
            <strong>Mid:</strong> Standard ski-in/out condos<br>
            <strong>Premium:</strong> Hotel Aya w/ private onsen - ¥187k/person
        `;
    } else {
        transportInfo.innerHTML = `
            • Shinkansen from Tokyo to Nagano<br>
            • Bus from Nagano to Hakuba<br>
            • All cities fly to Tokyo (Narita/Haneda)
        `;
        accoDescription.innerHTML = `
            <strong>Tim's Requirements:</strong> Max 2 per room, walking distance/ski-in/out<br>
            <strong>Budget:</strong> 7-person chalet (£3,670 total) - needs car to gondola<br>
            <strong>Mid:</strong> 8-person chalet, 4BR/4bath (£4,621 total)<br>
            <strong>Premium:</strong> Luxury ski-in/out hotels<br>
            <em>Note: Car rental could reduce transport costs & provide flexibility</em>
        `;
    }
    
    // Show the budget section
    budgetSection.style.display = 'block';
    
    // Smooth scroll to budget section
    setTimeout(() => {
        budgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Calculate initial costs
    calculateCosts();
}

// Updated costs based on 2024 research (in USD)
// Exchange rates: 150 JPY = 1 USD, 0.79 GBP = 1 USD
const COSTS = {
    hokkaido: {
        flights: {
            // Includes connection via Tokyo if no direct flight + domestic flight to Sapporo
            london: 1400,    // Via Tokyo + domestic to Sapporo
            hongkong: 850,   // Direct to Sapporo available
            singapore: 950,  // Direct to Sapporo available  
            kl: 1000,        // Direct to Sapporo available
            shanghai: 750    // Direct to Sapporo available
        },
        accommodation: {
            // Tim's requirements: max 2 per room, walking distance to lifts, prefer ski-in/out
            budget: 643,     // £508.50 - Airbnb shared (4BR/8ppl), 7 nights
            mid: 950,        // Standard hotels/condos, ski-in/out or very close
            premium: 1248    // ¥187,200 - Hotel Aya w/ private onsen & sauna, ski-in/out
        },
        skiPass: 110, // per day
        rental: {
            standard: 42, // per day
            premium: 67  // per day
        },
        food: {
            budget: 40,  // per day
            mid: 70,     // per day
            premium: 120 // per day
        },
        lessons: 150, // per day
        transport: 66  // Bus from Sapporo CTS to Niseko (¥5000 each way = ¥10000 return)
    },
    nagano: {
        flights: {
            // All fly to Tokyo (Narita/Haneda)
            london: 1100,
            hongkong: 700,
            singapore: 800,
            kl: 850,
            shanghai: 650
        },
        accommodation: {
            // Chalets require driving to gondolas - car rental could reduce transport costs
            budget: 662,     // £3,670 chalet ÷ 7 people = £524/person
            mid: 731,        // £4,621 chalet ÷ 8 people = £578/person (4BR/4bath)
            premium: 1200    // Luxury ski-in/out hotels
        },
        skiPass: 92, // per day
        rental: {
            standard: 37, // per day
            premium: 58  // per day
        },
        food: {
            budget: 35,  // per day
            mid: 60,     // per day
            premium: 100 // per day
        },
        lessons: 120, // per day
        transport: 153  // Shinkansen + bus from Tokyo (¥11500 each way = ¥23000 return)
    }
};

// Update component descriptions
function updateComponentDescriptions() {
    const resortName = document.getElementById('selectedResortName').textContent.toLowerCase();
    const resort = COSTS[resortName] || COSTS.hokkaido;
    
    // Update flight details
    const flightFrom = document.getElementById('flightFrom').value;
    const flightDetails = document.getElementById('flightDetails');
    const flightCost = resort.flights[flightFrom];
    const flightInfo = {
        london: resortName === 'hokkaido' ? 'Via Tokyo + domestic to Sapporo' : 'Direct to Tokyo (Narita/Haneda)',
        hongkong: resortName === 'hokkaido' ? 'Direct flight to Sapporo available' : 'Direct to Tokyo',
        singapore: resortName === 'hokkaido' ? 'Direct flight to Sapporo available' : 'Direct to Tokyo',
        kl: resortName === 'hokkaido' ? 'Direct flight to Sapporo available' : 'Direct to Tokyo',
        shanghai: resortName === 'hokkaido' ? 'Direct flight to Sapporo available' : 'Direct to Tokyo'
    };
    if (flightDetails) {
        const currency = document.getElementById('currencySelector').value;
        flightDetails.innerHTML = `${flightInfo[flightFrom]} • <strong>${formatCurrency(flightCost, currency)}</strong> return`;
    }
    
    // Update food details
    const foodLevel = document.querySelector('input[name="food"]:checked').value;
    const foodDetails = document.getElementById('foodDetails');
    const foodDescriptions = {
        budget: 'Convenience stores, ramen shops, casual dining • $35-40/day',
        mid: 'Mix of local restaurants and nice dinners • $60-70/day',
        premium: 'Fine dining, high-end restaurants • $100-120/day'
    };
    if (foodDetails) {
        foodDetails.textContent = foodDescriptions[foodLevel];
    }
}

// Calculate and update costs
function calculateCosts() {
    const resortName = document.getElementById('selectedResortName').textContent.toLowerCase();
    const resort = COSTS[resortName] || COSTS.hokkaido;
    
    // Get selections
    const flightFrom = document.getElementById('flightFrom').value;
    const accommodation = document.querySelector('input[name="accommodation"]:checked').value;
    const skiDays = parseInt(document.getElementById('skiDays').value);
    const needRental = document.getElementById('needRental').checked;
    const rentalType = document.querySelector('input[name="rental"]:checked').value;
    const foodLevel = document.querySelector('input[name="food"]:checked').value;
    const needLessons = document.getElementById('needLessons').checked;
    const lessonDays = parseInt(document.getElementById('lessonDays').value);
    
    // Update component descriptions
    updateComponentDescriptions();
    
    // Calculate individual costs
    const flightCost = resort.flights[flightFrom];
    const accoCost = resort.accommodation[accommodation];
    const passCost = resort.skiPass * skiDays;
    const equipmentCost = needRental ? resort.rental[rentalType] * skiDays : 0;
    const foodCost = resort.food[foodLevel] * 7; // 7 days
    const lessonCost = needLessons ? resort.lessons * lessonDays : 0;
    const transportCost = resort.transport;
    
    const totalCost = flightCost + accoCost + passCost + equipmentCost + foodCost + lessonCost + transportCost;
    
    // Update display with current currency
    const currency = document.getElementById('currencySelector').value;
    
    document.getElementById('flightCost').textContent = formatCurrency(flightCost, currency);
    document.getElementById('accoCost').textContent = formatCurrency(accoCost, currency);
    document.getElementById('passCost').textContent = formatCurrency(passCost, currency);
    document.getElementById('equipmentCost').textContent = formatCurrency(equipmentCost, currency);
    document.getElementById('foodCost').textContent = formatCurrency(foodCost, currency);
    document.getElementById('lessonCost').textContent = formatCurrency(lessonCost, currency);
    document.getElementById('transportCost').textContent = formatCurrency(transportCost, currency);
    document.getElementById('totalCost').textContent = formatCurrency(totalCost, currency);
}

// Share costs function
function shareCosts() {
    // TODO: Implement sharing functionality
    alert('Sharing functionality coming soon! For now, take a screenshot 📸');
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
    
    // Add event listeners for cost calculator
    const costInputs = [
        'flightFrom',
        'skiDays',
        'needRental',
        'needLessons',
        'lessonDays'
    ];
    
    costInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', calculateCosts);
        }
    });
    
    // Radio button listeners
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', calculateCosts);
    });
    
    // Ski days slider
    const skiDaysSlider = document.getElementById('skiDays');
    if (skiDaysSlider) {
        skiDaysSlider.addEventListener('input', (e) => {
            document.getElementById('skiDaysValue').textContent = e.target.value;
            calculateCosts();
        });
    }
    
    // Lesson days slider
    const lessonDaysSlider = document.getElementById('lessonDays');
    if (lessonDaysSlider) {
        lessonDaysSlider.addEventListener('input', (e) => {
            document.getElementById('lessonDaysValue').textContent = e.target.value;
            calculateCosts();
        });
    }
    
    // Toggle rental options
    const needRental = document.getElementById('needRental');
    if (needRental) {
        needRental.addEventListener('change', (e) => {
            document.getElementById('rentalOptions').style.display = e.target.checked ? 'block' : 'none';
            calculateCosts();
        });
    }
    
    // Toggle lesson options
    const needLessons = document.getElementById('needLessons');
    if (needLessons) {
        needLessons.addEventListener('change', (e) => {
            document.getElementById('lessonOptions').style.display = e.target.checked ? 'block' : 'none';
            calculateCosts();
        });
    }
    
    // Currency selector for cost builder
    if (currencySelector) {
        currencySelector.addEventListener('change', () => {
            // Recalculate costs if budget section is visible
            const budgetSection = document.getElementById('budget');
            if (budgetSection && budgetSection.style.display !== 'none') {
                calculateCosts();
            }
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