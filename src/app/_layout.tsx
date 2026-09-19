import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { palette } from '@/design/tokens';
import { DemoProvider } from '@/demo/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.accent,
    background: palette.canvas,
    card: palette.surface,
    text: palette.ink,
    border: palette.border,
  },
};

export default function RootLayout() {
  return (
    <DemoProvider><ThemeProvider value={theme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.canvas } }} />
    </ThemeProvider></DemoProvider>
  );
}
