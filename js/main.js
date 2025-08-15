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

// Load and display trip data
async function loadTripData() {
    try {
        // This will load JSON data when you populate it
        // For now, it's a placeholder structure
        console.log('Ready to load trip data when JSON files are populated');
    } catch (error) {
        console.error('Error loading trip data:', error);
    }
}

// Calculate total costs based on options
function calculateTotalCost(accommodation, foodLevel, includeRental) {
    // Placeholder for cost calculator
    // Will be implemented when you have final data
    return 0;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    loadTripData();
});