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

**Plus Jakarta Sans** is the chosen typeface for its modern, rounded geometric forms that mirror the "friendly but professional" brand personality. It offers excellent legibility for Indian regional scripts due to its open counters and balanced x-height.

- **Headlines:** Set with tight letter-spacing and bold weights to provide a confident, premium editorial feel.
- **Body:** Uses generous line heights (1.5x) to ensure readability for users who may be viewing the device in bright outdoor farming conditions.
- **Data Labels:** Small, semi-bold labels are used for technical farming metrics (soil moisture, XP, etc.) to maintain a organized, high-info density without clutter.

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

## Components

### Buttons
- **Primary:** High-contrast Primary Green (#4CAF50) with white text. Slightly "squishy" feel with a 2px bottom border of Dark Green to give a Duolingo-style tactile press.
- **Secondary:** White background with a Leaf Green outline and text.
- **Reward:** Warm Yellow (#FFD54F) with Dark Green text, reserved for "Claim Reward" or "Level Up" actions.

### Cards
- **Learning Cards:** Feature a small "Tara" avatar in the top corner for guided lessons. Use a white background with a subtle green-tinted border.
- **Data Cards:** Use simple typography and Leaf Green progress bars for farming metrics.

### Input Fields
- Softly rounded (12px) with a subtle #F7FAF5 fill. On focus, the border transitions to Primary Green with a light green glow.

### Progress Bars
- Thick, 12px height with fully rounded ends. The "track" is a light off-white, and the "fill" is a vibrant Primary Green. For streaks, the fill switches to Warm Yellow.

### Chips & Tags
- Used for categories like "Soil Health" or "Pest Control." These use low-saturation versions of the brand colors to avoid competing with primary buttons.

### Character Integration
- **The "Tara" Mentor:** Tara should be positioned partially overlapping cards or appearing from the bottom of the screen during feedback cycles (Success/Error states).