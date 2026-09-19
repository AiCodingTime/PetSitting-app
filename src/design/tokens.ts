import { TextStyle } from 'react-native';

export const appName = 'Animal care';
export const palette = {
  canvas: '#F5F2ED', surface: '#FFFEFC', ink: '#263640', muted: '#647078',
  accent: '#375F7C', tint: '#E8EEF1', border: '#E6E2DC', neutral: '#EBE7E0',
  white: '#FFFFFF', warm: '#C1A282', success: '#46644B', danger: '#98453C',
} as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 12, md: 18, lg: 26, pill: 999 } as const;
export const type = {
  hero: { fontSize: 30, lineHeight: 37, fontWeight: '600', letterSpacing: -0.8 },
  title: { fontSize: 26, lineHeight: 33, fontWeight: '600', letterSpacing: -0.6 },
  heading: { fontSize: 19, lineHeight: 26, fontWeight: '600', letterSpacing: -0.3 },
  body: { fontSize: 16, lineHeight: 24 },
  label: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 20, fontWeight: '500' },
} satisfies Record<string, TextStyle>;
