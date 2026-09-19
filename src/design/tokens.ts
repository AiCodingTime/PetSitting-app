import { TextStyle } from 'react-native';

export const appName = 'Animal Care';

export const palette = {
  // Main backgrounds
  canvas: '#F3F0E9',
  surface: '#FCFAF6',
  elevated: '#FFFFFF',

  // Main brand colors
  forest: '#102A24',
  forestDeep: '#091B17',
  accent: '#173D32',

  // Secondary accent
  clay: '#B76F4F',
  claySoft: '#E8D2C5',

  // Supporting greens
  sage: '#A8B6A6',
  sageSoft: '#E3E9E1',

  // Text
  ink: '#14211C',
  muted: '#6D766F',
  subtle: '#929991',

  // UI
  tint: '#E7ECE7',
  border: '#DDDAD2',
  neutral: '#EAE6DE',

  // Utility
  white: '#FFFFFF',
  success: '#3F7255',
  danger: '#A04F45',
  warning: '#A9783F',

  // Legacy alias used by existing components
  warm: '#B76F4F',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 26,
  pill: 999,
} as const;

export const type = {
  hero: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
    letterSpacing: -0.7,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.45,
  },

  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  body: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400',
  },

  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },

  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
} satisfies Record<string, TextStyle>;