# Transport Cost Research (December 2024)

## Hokkaido (Niseko/Rusutsu)

### From Sapporo New Chitose Airport (CTS)
- **Bus (Most Common)**: ¥5,000 one-way / ¥10,000 return ($33/$66 USD)
  - Hokkaido Chuo Bus, Niseko Direct Shuttle
  - Journey time: ~2 hours
  - Must book in advance, especially peak season
  
- **Shared Taxi/Shuttle**: ¥14,800+ per person ($99+ USD)
  - NearMe service available
  - Door-to-door service
  
- **Private Taxi**: ¥36,800-40,000 total ($245-267 USD)
  - Split between group if traveling together

### International Flight Patterns
- **Direct to Sapporo**: Hong Kong, Singapore, Kuala Lumpur, Shanghai
- **Via Tokyo**: London (add ~$300 for domestic connection)
- **Low-cost Tokyo-Sapporo**: From ¥5,000 ($33) with Peach, Jetstar

## Nagano (Hakuba Valley)

### From Tokyo (Narita/Haneda)
- **Shinkansen + Bus (Fastest)**: ¥11,500 one-way / ¥23,000 return ($77/$153 USD)
  - Tokyo to Nagano: ¥7,940 (90 mins)
  - Nagano to Hakuba: ¥3,500 (60 mins)
  - Total journey: ~2.5-3 hours
  
- **Direct Bus (Budget)**: ¥8,000-9,000 one-way ($53-60 USD)
  - Jamjam Liner from airports
  - Journey time: ~5 hours
  
- **Premium Bus**: ¥11,250-14,900 ($75-99 USD)
  - Nagano Snow Shuttle
  - More comfortable seats

### Getting from Airports to Tokyo Station
- **From Narita**: 
  - Narita Express: ¥5,000 ($33)
  - Skyliner: ¥2,500 ($17)
  
- **From Haneda**: 
  - Monorail: ¥500-800 ($3-5)
  - Much closer to city center

## Key Insights

1. **Hokkaido transport is actually cheaper** once at Sapporo airport (¥10,000 vs ¥23,000)

2. **Direct flights advantage**: Hong Kong, Singapore, KL have direct flights to both Tokyo AND Sapporo

3. **London travelers**: Better off going to Nagano due to connection hassle for Hokkaido

4. **Time vs Money**: 
   - Hokkaido: Longer overall journey but simpler (flight + bus)
   - Nagano: Faster from Tokyo but multiple transfers

5. **Group travel**: Private taxis become cost-effective with 4+ people

## Implementation in Calculator

Used standard options:
- Hokkaido: Bus transfers (¥10,000 return = $66)
- Nagano: Shinkansen + bus (¥23,000 return = $153)

Could add "transport class" selector later for:
- Budget (bus only)
- Standard (current)
- Premium (private taxi)