---
name: Tara Design System
colors:
  surface: '#f7faf5'
  surface-dim: '#d8dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4ef'
  surface-container: '#ecefea'
  surface-container-high: '#e6e9e4'
  surface-container-highest: '#e0e3df'
  on-surface: '#181c1a'
  on-surface-variant: '#3f4a3c'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eff2ed'
  outline: '#6f7a6b'
  outline-variant: '#becab9'
  surface-tint: '#006e1c'
  primary: '#006e1c'
  on-primary: '#ffffff'
  primary-container: '#4caf50'
  on-primary-container: '#003c0b'
  inverse-primary: '#78dc77'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cda721'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#94f990'
  primary-fixed-dim: '#78dc77'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005313'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffe087'
  tertiary-fixed-dim: '#ebc23e'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f7faf5'
  on-background: '#181c1a'
  surface-variant: '#e0e3df'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  margin-mobile: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  section-padding: 32px
---

## Brand & Style

This design system is built to evoke a sense of **optimistic companionship, environmental stewardship, and premium simplicity**. It is designed for farmers and agricultural enthusiasts, prioritizing trust and clarity through a "high-end accessible" aesthetic.

The style is **Premium Minimalist with Soft-Tactile influences**. It draws inspiration from the friendly, gamified world of Duolingo but elevates it with the refined data visualization and high-performance feel of Strava.

- **Human-Centric:** The character "Tara" serves as the interface's soul. Her presence is integrated not just as illustrations, but as a guiding mentor in the UI flow.
- **Organic Professionalism:** While the vibe is friendly, the layout remains structured and disciplined to ensure it feels like a serious tool for a farmer's livelihood.
- **Regional Accessibility:** The design ensures that modern Indian scripts are treated with the same typographic hierarchy and elegance as Latin characters.

## Colors

The palette is rooted in the natural lifecycle of a healthy farm. 

- **Primary Green (#4CAF50):** Used for primary actions and growth indicators. It matches the vibrant life of young crops.
- **Dark Green (#2E7D32):** Used for deep emphasis, headers, and professional data points. It provides the "trust" anchor.
- **Leaf Green (#8BC34A):** A secondary accent used for progress bars, secondary buttons, and success states.
- **Warm Yellow (#FFD54F):** Inspired by Tara’s dupatta and the sun. Reserved strictly for rewards, streaks, and "delight" moments.
- **White & Off-White (#FFFFFF, #F7FAF5):** The foundation of the "white-first" interface. White is used for cards and primary backgrounds, while the soft off-white creates subtle depth between containers.

## Typography

**Plus Jakarta Sans** is the primary typeface for TARA. Located in `assets/Jakarta_Sans_font/`, it delivers the ideal balance between friendly approachable character-driven guidance and serious, trustworthy agricultural precision.

### Recommended Typography Table

| Use                   | Font                  | Weight  | Font Variant / Token |
| --------------------- | --------------------- | ------- | --------------------- |
| **Main UI / body**    | Plus Jakarta Sans     | 400–500 | Regular / Medium (`body-md`, `body-lg`) |
| **Headings**          | Plus Jakarta Sans     | 600–700 | SemiBold / Bold (`headline-md`, `headline-lg`) |
| **Buttons**           | Plus Jakarta Sans     | 600     | SemiBold (`label-lg`) |
| **Numbers / XP / Scores** | Plus Jakarta Sans | 600–700 | SemiBold / Bold (`headline-md`, `label-sm`) |
| **TARA Dialogue**     | Plus Jakarta Sans     | 500–600 | Medium / SemiBold (`body-md`, `body-lg`) |
| **Small Labels & Chips** | Plus Jakarta Sans  | 500     | Medium (`label-sm`) |

### Why It Fits TARA

- **Friendly:** Pairs naturally with Tara’s guiding character mentor and voice dialogue.
- **Modern:** Delivers a clean, polished, state-of-the-art mobile product feel.
- **Professional & Trustworthy:** Appropriate for serious agricultural advisory, government platforms, and farmers' livelihoods.
- **High Outdoor Readability:** Open counters, tall x-height, and generous line spacing ensure legibility under bright sunlight in field conditions.
- **Rounded without being Childish:** Avoids overly playful fonts like Poppins that feel like generic kids/casual gaming apps.
- **Clear Information Hierarchy:** Scales cleanly from micro crop labels (12px) to hero display banners (56px) and XP numbers.

### Multilingual Strategy & Font Stack

For Pan-Indian regional languages (Malayalam, Telugu, Tamil, Hindi, Kannada):

```css
font-family:
  "Plus Jakarta Sans",
  "Noto Sans",
  sans-serif;
```

`Plus Jakarta Sans` provides the primary brand identity, while `Noto Sans` acts as the reliable fallback across Indian regional scripts.

### Typography Hierarchy

```text
Plus Jakarta Sans
│
├── Display / Hero     700 (Bold / ExtraBold)
├── Heading            700 (Bold)
├── Subheading         600 (SemiBold)
├── Body               400–500 (Regular / Medium)
├── Button             600 (SemiBold)
├── Caption / Tag      500 (Medium)
└── Numbers / XP       700 (Bold)
```

**Onboarding & Dialogue Principle:**
- **Onboarding Headings & Main Questions:** Set in **Plus Jakarta Sans 700 (Bold)**.
- **TARA Spoken Dialogue & Guidance:** Set in **Plus Jakarta Sans 600 (SemiBold)**.
- **Body Explanations:** Set in **Plus Jakarta Sans 400–500 (Regular/Medium)** with generous 1.5x line heights.


## Layout & Spacing

The design system utilizes a **Dynamic Padding Model** rather than a strict 12-column grid, optimized for mobile-first interactions. 

- **Breathing Room:** We utilize a 20px outer margin on mobile to ensure content doesn't feel cramped. 
- **Content Hierarchy:** Information is grouped in vertical stacks using a 4px base unit. 
- **Visual Rhythm:** Sections are separated by 32px of white space to maintain the "calm" brand promise.
- **Card-Based Architecture:** Most content lives inside cards with consistent internal padding (16px or 24px) to separate different types of farming data or learning modules.

## Elevation & Depth

To maintain a premium feel, the design system avoids heavy shadows in favor of **Tonal Layering and Soft Outlines**.

- **Subtle Containers:** Depth is primarily created by placing white (#FFFFFF) cards on a soft-off-white (#F7FAF5) background. 
- **Low-Contrast Outlines:** Instead of shadows, use 1px borders in a very light grey-green (#E8F0E5) to define card boundaries.
- **State Elevation:** Only primary action buttons and "Reward" cards use a very soft, diffused ambient shadow (8% opacity, Dark Green tint) to signify they are interactable or special.
- **Glassmorphism:** Use subtle backdrop blurs (20px) on fixed bottom navigation bars to keep the UI feeling light and airy.

## Shapes

The shape language is **Organic and Friendly**. 

- **Primary Radius:** A default of 16px (rounded-lg) is used for cards and large containers to evoke a sense of softness and safety.
- **Interactive Elements:** Buttons use a highly rounded (24px+) or fully pill-shaped profile to encourage tapping.
- **Iconography:** Icons must follow a "soft-corner" rule—avoiding sharp 90-degree angles in favor of 2px corner smoothing on all vector paths.

## Components & Interaction States

### Buttons

Buttons in TARA feature a playful, satisfying **tactile "squishy" press** inspired by Duolingo, providing clear physical feedback to users.

#### 1. Primary Action Button
- **Default State:**
  - Background: Primary Container (`#4CAF50`)
  - Text & Icon: On-Primary (`#FFFFFF`), `font-weight: 600` (Plus Jakarta Sans)
  - Bottom Border: `3px solid` On-Primary-Fixed-Variant (`#005313`)
  - Border Radius: `12px` (or full pill `9999px`)
  - Elevation / Shadow: `0 4px 12px rgba(0, 110, 28, 0.15)`
  - Transform: `translateY(0px)`
- **Hover State (Web):**
  - Brightness: `105%`
  - Subtle overlay: White with `10% opacity`
- **Active / Pressed State:**
  - Background: Slightly darkened green (`#43A047`)
  - Bottom Border: `0px` (or `1px` border offset)
  - Transform: `translateY(3px)` and `scale(0.98)`
  - Elevation / Shadow: `none` or minimal (`0 1px 2px rgba(0, 110, 28, 0.05)`)
  - Transition: `all 0.1s cubic-bezier(0.16, 1, 0.3, 1)`
- **Disabled State:**
  - Background: Surface Dim (`#D8DBD6`)
  - Text: On-Surface-Variant (`#3F4A3C` at 40% opacity)
  - Bottom Border: `0px`
  - Cursor: `not-allowed`

#### 2. Secondary Button
- **Default State:**
  - Background: Surface Container Lowest (`#FFFFFF`)
  - Text: Primary Green (`#006E1C`)
  - Border: `1.5px solid` Outline Variant (`#BECAB9`)
  - Bottom Border: `2px solid` Outline Variant (`#BECAB9`)
  - Transform: `translateY(0px)`
- **Pressed State:**
  - Background: Surface Container Low (`#F1F4EF`)
  - Border: `1.5px solid` Outline (`#6F7A6B`)
  - Bottom Border: `1px solid` Outline (`#6F7A6B`)
  - Transform: `translateY(1px)` and `scale(0.98)`

#### 3. Reward / Delight Button
- **Default State:**
  - Background: Tertiary Container (`#CDA721`) or Warm Yellow (`#FFD54F`)
  - Text: On-Primary-Fixed (`#002204`) / On-Tertiary (`#FFFFFF`)
  - Bottom Border: `3px solid` On-Tertiary-Fixed-Variant (`#574500`)
  - Elevation / Shadow: `0 4px 12px rgba(115, 92, 0, 0.20)`
- **Pressed State:**
  - Background: Darkened gold (`#B8941C`)
  - Bottom Border: `0px`
  - Transform: `translateY(3px)` and `scale(0.98)`
  - Shadow: `none`

#### 4. Ghost / Text Button (Skip, Back)
- **Default State:**
  - Background: Transparent
  - Text: On-Surface-Variant (`#3F4A3C`) or Primary (`#006E1C`)
  - Border: None
- **Pressed State:**
  - Background: Surface Container High (`#E6E9E4`) (rounded)
  - Text: Primary (`#006E1C`)
  - Opacity: `0.75`

### Cards
- **Selection Card:**
  - **Unselected:** Background `#FFFFFF`, Border `1px solid #BECAB9`, Scale `1.0`.
  - **Selected:** Background `#F1F4EF`, Border `2px solid #4CAF50`, Light Green Tint glow `rgba(76, 175, 80, 0.12)`, Scale `1.02`.
- **Learning Cards:** Feature a small "Tara" avatar in the top corner for guided lessons. Use a white background with a subtle green-tinted border (`#E8F0E5`).
- **Data Cards:** Use simple typography and Leaf Green progress bars for farming metrics.

### Input Fields
- Softly rounded (`12px`) with a subtle `#F7FAF5` fill and `1px solid #BECAB9` outline.
- **On Focus:** Border transitions to Primary Green (`#006E1C`) with a `2px` focus ring glow (`rgba(76, 175, 80, 0.25)`).

### Progress Bars & Indicators
- **Dots Progress Indicator:**
  - Inactive dot: `8px x 8px` circle, Surface Variant (`#E0E3DF`).
  - Active step dot: `32px x 8px` pill, Primary Green (`#4CAF50`) with smooth spring animation width expansion.
- **Continuous Progress Bar:**
  - Thick, `12px` height with fully rounded ends (`9999px`).
  - Track: Light off-white (`#ECEFEA` or Surface Container).
  - Fill: Vibrant Primary Green (`#4CAF50`).
  - Streak / Reward fill: Warm Yellow / Tertiary Container (`#CDA721`).

### Chips & Tags
- Used for categories like "Soil Health", "Pest Control", or farm attributes.
- Low-saturation versions of the brand colors (`#E8F5E9` background, `#1B5E20` text) to avoid competing with primary call-to-actions.

### Character Integration
- **The "Tara" Mentor:** Tara is positioned in hero sections, partially overlapping cards, or appearing from the bottom of the screen during feedback cycles (Success/Error states).
- **Audio Pulse Ring:** When Tara is speaking, a soft radiant ring (`#4CAF50` with opacity fading 0.45 → 0) pulses gently at 1200ms loops around her avatar.