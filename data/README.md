# Data Folder Structure - JaPOW 2026

## Current Files and Their Purpose

### Core Research Files (Used in Calculator)
- **`PRICING_SUMMARY.md`** - Complete cost breakdowns for different budget levels
- **`ski_pass_research.md`** - Ski pass pricing with Niseko spring discount details
- **`transport_research.md`** - Airport transfer costs and options
- **`rental_equipment_research.md`** - Equipment rental pricing (2025-26 season)
- **`lesson_prices_research.md`** - Group lesson pricing by resort

### Flight Data (Reference)
- **`flight_data/london_flights.json`** - London to Japan flight options
- **`flight_data/hongkong_flights.json`** - Hong Kong to Japan flight options
- **`flight_data/flight_template.json`** - Template for adding more cities

### Trip Options (Templates)
- **`trip_options/hokkaido_template.json`** - Hokkaido resort information template
- **`trip_options/nagano_template.json`** - Nagano resort information template

## How Data Maps to Site

### JavaScript Constants (js/main.js)
The actual pricing used in the calculator is hardcoded in `js/main.js`:

```javascript
const COSTS = {
    hokkaido: {
        flights: { london: 1400, hongkong: 850, ... },
        accommodation: { budget: 643, mid: 950, premium: 1248 },
        skiPass: { 4: 189, 5: 236, 6: 282, 7: 329 },
        rental: { standard: 20, premium: 47 },
        lessons: 100
    },
    nagano: { ... }
}
```

### Data Sources
- **Flights**: Based on December 2024 search for March 2026 travel
- **Accommodation**: Tim's actual research (Airbnb, Hotel Aya, chalets)
- **Ski Passes**: Official resort websites with spring discount
- **Rentals**: 2025-26 season prices from major rental shops
- **Lessons**: Current season prices from ski schools

## Updating Prices

1. **Research new prices** in December/January
2. **Update markdown files** in this folder for reference
3. **Update COSTS object** in `js/main.js` with new values
4. **Test calculator** to ensure all calculations work

## Exchange Rate
Current: 150 JPY = 1 USD (as of January 2025)

## Last Full Update
January 16, 2025 - All prices updated with 2025-26 season research