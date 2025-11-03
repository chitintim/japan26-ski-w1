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
    const tripDate = new Date('2026-03-28T00:00:00');
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

    // Update resort name (always Hokkaido/Niseko now)
    resortName.textContent = 'Niseko Hirafu';

    // Update transport info
    transportInfo.innerHTML = `
        • Return bus from Sapporo CTS airport<br>
        • Direct flights from HK/SG/KL/Shanghai<br>
        • London requires connection via Tokyo
    `;

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
            // Via Seoul with Korean Air - actual March 2025 price
            london: 988,    // £788 = $988 (via ICN)
            hongkong: 561,   // £444 = $561 (Direct CX/JAL)
            singapore: 492,  // £389 = $492 (via HKG)  
            kl: 506,         // £400 = $506 (Direct AirAsia X!)
            shanghai: 457    // ¥3,307 = $457 (via Tokyo)
        },
        accommodation: {
            // FIXED: 16px Chalet - 8BR/8bath, £653.63 per person
            fixed: 827       // £653.63 / 0.79 = $827.37 USD (7 nights)
        },
        // Niseko United Spring Rates (30% off) - March 23-April 5
        skiPass: {
            4: 189,   // ¥28,350 / 150 = $189
            5: 236,   // ¥35,350 / 150 = $236
            6: 282,   // ¥42,350 / 150 = $282
            7: 329    // ¥49,350 / 150 = $329
        },
        rental: {
            standard: 20, // per day - ¥3,000/day budget rentals
            premium: 47  // per day - ¥7,000/day premium models
        },
        food: {
            budget: 40,  // per day
            mid: 70,     // per day
            premium: 120 // per day
        },
        lessons: 100, // per day - Niseko group lessons ¥15,000
        transport: {
            public: 66,   // Bus from Sapporo CTS to Niseko (¥10000 return)
            rental: 145   // £110/person car rental + fuel (¥3520) = $139 + $6 fuel
        }
    }
};

// Update component descriptions
function updateComponentDescriptions() {
    const resort = COSTS.hokkaido; // Fixed to Hokkaido only
    
    // Update flight details with actual airline and duration info
    const flightFrom = document.getElementById('flightFrom').value;
    const flightDetails = document.getElementById('flightDetails');
    const flightCost = resort.flights[flightFrom];
    
    const flightInfo = {
        london: `<strong>Korean Air + Virgin/JAL</strong> via Seoul (ICN)<br>
                 ⏱️ Outbound: 32hr 55min (17hr 50min layover)<br>
                 ⏱️ Return: 35hr 15min (17hr 50min layover)<br>
                 💡 Long layover but saves £500+ vs direct options`,
        hongkong: `<strong>Cathay Pacific/JAL</strong> - DIRECT!<br>
                  ⏱️ Outbound: 4hr 40min<br>
                  ⏱️ Return: 5hr 20min<br>
                  ✅ Best convenience, no connections needed`,
        singapore: `<strong>Cathay Pacific</strong> via Hong Kong<br>
                   ⏱️ Outbound: 12hr 25min (4hr layover)<br>
                   ⏱️ Return: 13hr 50min (4hr 45min layover)<br>
                   💰 Great value with reasonable connection`,
        kl: `<strong>AirAsia X</strong> - DIRECT budget carrier!<br>
            ⏱️ Outbound: 7hr 35min<br>
            ⏱️ Return: 8hr 50min<br>
            🏆 Budget champion - no frills but unbeatable price`,
        shanghai: `<strong>ANA (All Nippon)</strong> via Tokyo Haneda<br>
                  ⏱️ Outbound: 6hr (1hr 50min connection)<br>
                  ⏱️ Return: 15hr 15min (10hr 30min layover KIX)<br>
                  💰 Cheapest overall despite return layover`
    };
    
    if (flightDetails) {
        const currency = document.getElementById('currencySelector').value;

        // Add actual searched prices for reference
        const actualPrices = {
            london: '£788',
            hongkong: '£444',
            singapore: '£389',
            kl: '£400',
            shanghai: '¥3,307'
        };

        flightDetails.innerHTML = `${flightInfo[flightFrom]}<br>
                                   <strong>${formatCurrency(flightCost, currency)}</strong> return
                                   <small>(actual: ${actualPrices[flightFrom]})</small>`;
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
    
    // Update transport details
    const transportType = document.querySelector('input[name="transportType"]:checked')?.value || 'public';
    const transportDetails = document.getElementById('transportDetails');
    if (transportDetails) {
        if (transportType === 'rental') {
            transportDetails.innerHTML = `7-seater rental (£110pp) + fuel • <strong>Freedom to explore!</strong>`;
        } else {
            transportDetails.innerHTML = `Return bus from Sapporo airport • Most economical`;
        }
    }
    
    // Update ski pass details
    const skiDays = parseInt(document.getElementById('skiDays')?.value || 6);
    const skiPassDetails = document.getElementById('skiPassDetails');
    if (skiPassDetails && resort.skiPass[skiDays]) {
        const passPrice = resort.skiPass[skiDays];
        const currency = document.getElementById('currencySelector').value;
        const perDay = Math.round(passPrice / skiDays);

        skiPassDetails.innerHTML = `Niseko United (4 mountains) • <strong>30% spring discount!</strong><br>
                                    ${formatCurrency(passPrice, currency)} total • ${formatCurrency(perDay, currency)}/day`;
    }
    
    // Update lesson details
    const needLessons = document.getElementById('needLessons')?.checked;
    const lessonDays = parseInt(document.getElementById('lessonDays')?.value || 2);
    const lessonDetails = document.getElementById('lessonDetails');
    if (lessonDetails && needLessons) {
        const currency = document.getElementById('currencySelector').value;
        const dailyRate = resort.lessons;
        const totalLessonCost = dailyRate * lessonDays;

        lessonDetails.innerHTML = `Group lessons (2.5hrs morning) • ¥15,000/day<br>
                                   ${formatCurrency(dailyRate, currency)}/day • ${formatCurrency(totalLessonCost, currency)} total`;
    }
    
    // Update rental details
    const needRental = document.getElementById('needRental')?.checked;
    const rentalType = document.querySelector('input[name="rental"]:checked')?.value || 'standard';
    const rentalDetails = document.getElementById('rentalDetails');
    if (rentalDetails && needRental) {
        const currency = document.getElementById('currencySelector').value;
        const skiDays = parseInt(document.getElementById('skiDays')?.value || 6);
        const dailyRate = resort.rental[rentalType];
        const totalRentalCost = dailyRate * skiDays;

        if (rentalType === 'standard') {
            rentalDetails.innerHTML = `Budget gear (¥3,000/day) • Good for beginners/intermediate<br>
                                      ${formatCurrency(dailyRate, currency)}/day • ${formatCurrency(totalRentalCost, currency)} total<br>
                                      <small>6th day often free!</small>`;
        } else {
            rentalDetails.innerHTML = `Premium models (¥7,000/day) • Latest gear, powder skis<br>
                                      ${formatCurrency(dailyRate, currency)}/day • ${formatCurrency(totalRentalCost, currency)} total<br>
                                      <small>Free swaps, waxing, storage included</small>`;
        }
    }
}

// Calculate and update costs
function calculateCosts() {
    const resort = COSTS.hokkaido; // Fixed to Hokkaido only

    // Get selections
    const flightFrom = document.getElementById('flightFrom').value;
    const skiDays = parseInt(document.getElementById('skiDays').value);
    const needRental = document.getElementById('needRental').checked;
    const rentalType = document.querySelector('input[name="rental"]:checked').value;
    const foodLevel = document.querySelector('input[name="food"]:checked').value;
    const needLessons = document.getElementById('needLessons').checked;
    const lessonDays = parseInt(document.getElementById('lessonDays').value);
    const transportType = document.querySelector('input[name="transportType"]:checked')?.value || 'public';

    // Update component descriptions
    updateComponentDescriptions();

    // Calculate individual costs
    const flightCost = resort.flights[flightFrom];
    const accoCost = resort.accommodation.fixed; // Fixed accommodation cost
    const passCost = resort.skiPass[skiDays] || resort.skiPass[6]; // Use 6-day as fallback
    const equipmentCost = needRental ? resort.rental[rentalType] * skiDays : 0;
    const foodCost = resort.food[foodLevel] * 7; // 7 days
    const lessonCost = needLessons ? resort.lessons * lessonDays : 0;
    const transportCost = resort.transport[transportType] || resort.transport.public;

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

// Load accommodation photos
function loadAccommodationPhotos() {
    const gallery = document.getElementById('photoGallery');
    if (!gallery) return;
    
    // Actual photo filenames from images/accommodation/
    const photos = [
        { file: '414716637.jpg', caption: 'Example accommodation' },
        { file: '414716640.jpg', caption: 'Standard we\'re looking for' },
        { file: '425406191.jpg', caption: 'Typical chalet/hotel option' },
        { file: '558064440.jpg', caption: 'Accommodation example' },
        { file: 'a6a8847a-71fb-41ab-a8ab-67f14493d66f.jpeg', caption: 'Another option' },
        { file: 'e069a6c8-79e8-4c8a-ae1d-f4224f2105f6.jpeg', caption: 'Potential accommodation' },
        { file: '756d09af-d9e4-4dc0-9173-70d92ee54c04.jpeg.avif', caption: 'Example standard' }
    ];
    
    // Check if images folder exists and has photos
    const photoHTML = photos.map(photo => `
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="photo-card">
                <img src="images/accommodation/${photo.file}" 
                     alt="Accommodation example" 
                     class="img-fluid rounded shadow-sm"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="photo-placeholder rounded" style="display:none;">
                    <div class="text-center p-4">
                        <small class="text-muted">📷 ${photo.file}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    gallery.innerHTML = photoHTML || `
        <div class="col-12 text-center">
            <div class="alert alert-info">
                <p class="mb-0">📁 Add photos to <code>images/accommodation/</code> folder</p>
                <small>Suggested: chalet-exterior.jpg, chalet-living.jpg, hotel-aya.jpg, bedroom-twin.jpg</small>
            </div>
        </div>
    `;
}

// Calculate price ranges for resort options
function calculatePriceRanges() {
    // Budget scenario: cheapest flight, fixed accommodation, 6 days skiing, budget food/rental
    // Premium scenario: expensive flight, fixed accommodation, 7 days, premium everything

    const hokkaidoBudget =
        Math.min(...Object.values(COSTS.hokkaido.flights)) + // cheapest flight
        COSTS.hokkaido.accommodation.fixed + // fixed accommodation
        COSTS.hokkaido.skiPass[6] +
        COSTS.hokkaido.transport.public +
        (COSTS.hokkaido.food.budget * 7) +
        (COSTS.hokkaido.rental.standard * 6);

    const hokkaidoPremium =
        Math.max(...Object.values(COSTS.hokkaido.flights)) + // most expensive flight
        COSTS.hokkaido.accommodation.fixed + // fixed accommodation
        COSTS.hokkaido.skiPass[7] +
        COSTS.hokkaido.transport.rental +
        (COSTS.hokkaido.food.premium * 7) +
        (COSTS.hokkaido.rental.premium * 7);

    // Update the data attributes - find price display within resort card
    const hokkaidoCard = document.querySelector('.resort-card');
    const hokkaidoDisplay = hokkaidoCard?.querySelector('.price-display');

    if (hokkaidoDisplay) {
        hokkaidoDisplay.dataset.min = Math.round(hokkaidoBudget / 50) * 50; // Round to nearest 50
        hokkaidoDisplay.dataset.max = Math.round(hokkaidoPremium / 50) * 50;
    }
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
    
    // Load accommodation photos
    loadAccommodationPhotos();
    
    // Calculate and set price ranges
    calculatePriceRanges();
    
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
        radio.addEventListener('change', () => {
            updateComponentDescriptions();
            calculateCosts();
        });
    });
    
    // Ski days slider
    const skiDaysSlider = document.getElementById('skiDays');
    if (skiDaysSlider) {
        skiDaysSlider.addEventListener('input', (e) => {
            document.getElementById('skiDaysValue').textContent = e.target.value;
            updateComponentDescriptions();
            calculateCosts();
        });
    }
    
    // Lesson days slider
    const lessonDaysSlider = document.getElementById('lessonDays');
    if (lessonDaysSlider) {
        lessonDaysSlider.addEventListener('input', (e) => {
            document.getElementById('lessonDaysValue').textContent = e.target.value;
            updateComponentDescriptions();
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
            updateComponentDescriptions();
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