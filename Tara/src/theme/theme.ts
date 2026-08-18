/**
 * TARA Design System & Theme
 * Based on Google Material 3 with Soft-Tactile refinements for agricultural companionship.
 */

export const colors = {
  // Brand & Accent Greens
  primary: "#006e1c",
  primaryContainer: "#4caf50",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#003c0b",
  primaryFixed: "#94f990",
  primaryFixedDim: "#78dc77",
  onPrimaryFixed: "#002204",
  onPrimaryFixedVariant: "#005313",
  inversePrimary: "#78dc77",

  // Secondary Greens & Accents
  secondary: "#1b6d24",
  secondaryContainer: "#a0f399",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#217128",
  secondaryFixed: "#a3f69c",
  secondaryFixedDim: "#88d982",
  onSecondaryFixed: "#002204",
  onSecondaryFixedVariant: "#005312",

  // Warm Yellow / Delight / Reward
  tertiary: "#735c00",
  tertiaryContainer: "#cda721",
  onTertiary: "#ffffff",
  onTertiaryContainer: "#4e3d00",
  tertiaryFixed: "#ffe087",
  tertiaryFixedDim: "#ebc23e",
  onTertiaryFixed: "#241a00",
  onTertiaryFixedVariant: "#574500",

  // Surfaces & Backgrounds
  background: "#f7faf5",
  onBackground: "#181c1a",
  surface: "#f7faf5",
  surfaceDim: "#d8dbd6",
  surfaceBright: "#f7faf5",
  surfaceVariant: "#e0e3df",
  onSurface: "#181c1a",
  onSurfaceVariant: "#3f4a3c",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f1f4ef",
  surfaceContainer: "#ecefea",
  surfaceContainerHigh: "#e6e9e4",
  surfaceContainerHighest: "#e0e3df",
  inverseSurface: "#2d312e",
  inverseOnSurface: "#eff2ed",

  // Outlines & Borders
  outline: "#6f7a6b",
  outlineVariant: "#becab9",
  surfaceTint: "#006e1c",

  // Error States
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",

  // Extra helper tokens
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

/**
 * Semantic component colors — single source of truth for recurring surface
 * treatments (cards, circular icon buttons, pill chips). Components must use
 * these tokens instead of hard-coded hex values.
 */
export const componentColors = {
  // Cards — Soft 3D Edge (1.5px outline + darker bottom edge)
  cardBackground: "#ffffff",
  cardBorder: "#becab9",
  cardEdge: "#c7cfc6",

  // Circular icon buttons — notification-bell treatment (uniform border)
  iconButtonBackground: "#ffffff",
  iconButtonBorder: "#becab9",
  iconButtonIcon: "#3f4a3c",

  // Pill chips — positive (green) & neutral
  chipPositiveBackground: "#e8f5e9",
  chipPositiveBorder: "rgba(27, 94, 32, 0.22)",
  chipPositiveEdge: "rgba(27, 94, 32, 0.38)",
  chipPositiveText: "#1b5e20",
  chipNeutralBackground: "#f1f4ef",
  chipNeutralBorder: "#dde3dc",
  chipNeutralEdge: "#c7cfc6",
  chipNeutralText: "#3f4a3c",

  // Section headings & card titles (muted gray-green)
  sectionTitle: "#3f4a3c",
} as const;

export const spacing = {
  unit: 4,
  xs: 4,
  stackSm: 8,
  sm: 8,
  gutter: 16,
  stackMd: 16,
  md: 16,
  marginMobile: 20,
  stackLg: 24,
  lg: 24,
  sectionPadding: 32,
  xl: 40,
  xxl: 48,
} as const;

export const rounded = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

export const typography = {
  fontFamily: {
    regular: "PlusJakartaSans-Regular",
    medium: "PlusJakartaSans-Medium",
    semiBold: "PlusJakartaSans-SemiBold",
    bold: "PlusJakartaSans-Bold",
    extraBold: "PlusJakartaSans-ExtraBold",
  },
  headlineLg: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
    fontWeight: "700" as const,
    lineHeight: 38,
    letterSpacing: -0.6,
  },
  headlineLgMobile: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  headlineMd: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 18,
    fontWeight: "400" as const,
    lineHeight: 26,
  },
  bodyMd: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  labelLg: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
    letterSpacing: 0.14,
  },
  labelSm: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 12,
    fontWeight: "500" as const,
    lineHeight: 16,
  },
} as const;

export const shadows = {
  tactilePrimary: {
    shadowColor: "#006e1c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  tactilePressed: {
    shadowColor: "#006e1c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  avatarGlow: {
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

/**
 * Micro-Interaction & Button Tokens
 */
export const buttonStyles = {
  primary: {
    default: {
      backgroundColor: colors.primaryContainer,
      textColor: colors.onPrimary,
      borderBottomWidth: 3,
      borderBottomColor: colors.onPrimaryFixedVariant,
      shadow: shadows.tactilePrimary,
      transformY: 0,
    },
    pressed: {
      backgroundColor: "#43a047",
      textColor: colors.onPrimary,
      borderBottomWidth: 0,
      borderBottomColor: "transparent",
      shadow: shadows.tactilePressed,
      transformY: 3,
      scale: 0.98,
    },
  },
  secondary: {
    default: {
      backgroundColor: colors.surfaceContainerLowest,
      textColor: colors.primary,
      borderWidth: 1.5,
      borderColor: colors.outlineVariant,
      borderBottomWidth: 2,
      borderBottomColor: colors.outlineVariant,
      transformY: 0,
    },
    pressed: {
      backgroundColor: colors.surfaceContainerLow,
      textColor: colors.primary,
      borderWidth: 1.5,
      borderColor: colors.outline,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      transformY: 1,
      scale: 0.98,
    },
  },
  reward: {
    default: {
      backgroundColor: colors.tertiaryContainer,
      textColor: colors.onTertiary,
      borderBottomWidth: 3,
      borderBottomColor: colors.onTertiaryFixedVariant,
      shadow: shadows.tactilePrimary,
      transformY: 0,
    },
    pressed: {
      backgroundColor: "#b8941c",
      textColor: colors.onTertiary,
      borderBottomWidth: 0,
      borderBottomColor: "transparent",
      shadow: shadows.tactilePressed,
      transformY: 3,
      scale: 0.98,
    },
  },
  ghost: {
    default: {
      backgroundColor: "transparent",
      textColor: colors.onSurfaceVariant,
      opacity: 1,
    },
    pressed: {
      backgroundColor: colors.surfaceContainerLow,
      textColor: colors.primary,
      opacity: 0.8,
    },
  },
} as const;

export const theme = {
  colors,
  componentColors,
  spacing,
  rounded,
  typography,
  shadows,
  buttonStyles,
};

export default theme;
