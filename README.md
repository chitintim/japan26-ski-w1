# Japan Ski Trip 2026 - Planning Site

## Overview
Planning site for group ski trip to Japan (March 22-29, 2026)
- Comparing Hokkaido vs Nagano options
- Tracking costs from multiple departure cities
- Mobile-friendly for easy sharing

## Site Structure

```
/
├── index.html          # Main landing page
├── css/styles.css      # Core styles
├── js/main.js          # Countdown & data loading
├── data/
│   ├── trip_options/   # Resort details & costs
│   │   ├── hokkaido_template.json
│   │   └── nagano_template.json
│   └── flight_data/    # Flight costs by city
│       └── flight_template.json
└── images/             # Photos of resorts
```

## Data Management

### To Update Resort Information
Edit the JSON files in `data/trip_options/` with:
- Accommodation prices (budget/mid/premium)
- Ski pass costs
- Food estimates
- Local transport

### To Add Flight Data
Copy `flight_template.json` for each departure city:
- London → `from_london.json`
- Hong Kong → `from_hongkong.json`
- Singapore → `from_singapore.json`
- Kuala Lumpur → `from_kl.json`
- Shanghai → `from_shanghai.json`

## AI Context Files (Not in Git)
Store research and notes in:
- `CLAUDE.md` - Main context file for Claude Code
- `research/` - Detailed research notes
- `notes/` - Personal planning notes

## Quick Start

1. **Update data files** with your research
2. **Add images** to showcase resorts
3. **Test locally**: Open index.html in browser
4. **Deploy**: Push to GitHub, site auto-publishes

## GitHub Pages URL
Once pushed: https://chitintim.github.io/japan26-ski-w1/

## Key Features to Implement
- [ ] Load JSON data dynamically
- [ ] Cost calculator by departure city
- [ ] Photo galleries for each resort
- [ ] Responsive comparison tables
- [ ] Voting/feedback system