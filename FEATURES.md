# JaPOW 2026 - Features & Functionality

## Core Features

### 1. Dynamic Cost Calculator
- **Multi-city support**: Flights from London, Hong Kong, Singapore, KL, Shanghai
- **Accommodation tiers**: Budget (shared Airbnb), Mid-range, Premium (Hotel Aya)
- **Flexible ski passes**: 4-7 day options with Niseko spring discount applied
- **Transport options**: Public vs car rental with accurate costs
- **Component descriptions**: Live updates showing what each selection includes

### 2. Currency Conversion
- **Auto-detection**: Uses timezone to detect user's location
- **7 currencies**: GBP, USD, HKD, SGD, MYR, CNY, JPY
- **Persistent selection**: Saves preference in localStorage
- **Smart formatting**: No decimals for JPY/CNY

### 3. Resort Comparison
- **Hokkaido vs Nagano**: Side-by-side comparison
- **Late March focus**: Specific advice for March 22-29 conditions
- **Real data**: Based on actual 2024/2025 pricing research
- **Tim's personality**: British tone throughout

### 4. Visual Elements
- **Skier animations**: Random skiers sliding across screen
- **Scroll indicator**: Mountain emoji tracking scroll progress
- **Countdown timer**: Live countdown to March 22, 2026
- **Mobile-first design**: Bootstrap 5 responsive layout

## Technical Implementation

### Data Structure
```javascript
const COSTS = {
  hokkaido: {
    flights: { london: 1400, hongkong: 850, ... },
    accommodation: { budget: 643, mid: 950, premium: 1248 },
    skiPass: { 4: 189, 5: 236, 6: 282, 7: 329 }, // Spring discount
    transport: { public: 66, rental: 145 }
  },
  nagano: { ... }
}
```

### Key Discoveries in Pricing
1. **Niseko 30% spring discount** (March 23-April 5) - Perfect timing!
2. **Shared Airbnb**: £508/person for 7 nights (Tim's actual find)
3. **Hotel Aya**: ¥187,200/person with private onsen
4. **Car rental enables chalets**: Nagano chalets need transport but good value

### User Requirements Met
✅ Max 2 per room, max 3 per bathroom
✅ Walking distance to lifts (or ski-in/out)
✅ Mobile-friendly for easy sharing
✅ Real pricing from Tim's research
✅ British English tone
✅ Comparison focused on late March conditions

## Files Structure
```
/
├── index.html           # Main site with cost calculator
├── js/main.js          # All functionality and pricing data
├── css/styles.css      # Custom styles and animations
├── data/
│   ├── transport_research.md    # Transport cost research
│   ├── ski_pass_research.md     # Ski pass pricing
│   └── PRICING_SUMMARY.md       # Complete cost breakdowns
├── CLAUDE.md           # AI context (gitignored)
└── .gitignore          # Excludes AI context files
```

## Next Steps (Optional)
- Add sharing functionality for cost breakdowns
- Resort photos in images folder
- Weather/snow report integration
- Voting system for group decision
- Actual booking links when ready

## Live Site
Available at: https://[username].github.io/japan26-ski-w1/