import { ComponentProps, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import Animated, { FadeIn, ReduceMotion } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Href, router } from 'expo-router';
import {
  ColorValue, KeyboardAvoidingView, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, TextInputProps, TextProps, View, ViewProps,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { appName, palette, radius, space, type } from './tokens';

export type Role = 'owner' | 'sitter';
const icons = {
  home: { ios: 'house', android: 'home', web: 'home' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  message: { ios: 'bubble.left.and.bubble.right', android: 'chat_bubble', web: 'chat_bubble' },
  person: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  paw: { ios: 'pawprint.fill', android: 'pets', web: 'pets' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  shield: { ios: 'lock.shield', android: 'shield', web: 'shield' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  plus: { ios: 'plus', android: 'add', web: 'add' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  wallet: { ios: 'creditcard', android: 'credit_card', web: 'credit_card' },
  filter: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
} satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;
export type IconName = keyof typeof icons;

export function Icon({ name, color = palette.ink, size = 24 }: {
  name: IconName; color?: ColorValue; size?: number;
}) {
  return (
    <View accessible={false} aria-hidden>
      <SymbolView name={icons[name]} tintColor={color} size={size} />
    </View>
  );
}

export function Copy({ variant = 'body', muted, style, ...props }: TextProps & {
  variant?: keyof typeof type; muted?: boolean;
}) {
  return <Text {...props} style={[{ color: muted ? palette.muted : palette.ink }, type[variant], style]} />;
}

export function Card({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.card, style]} />;
}

export function Badge({ children }: PropsWithChildren) {
  return <View style={styles.badge}><Copy variant="caption" muted>{children}</Copy></View>;
}

type Action = { href: Href; onPress?: never } | { href?: never; onPress: () => void };
export function Button({ label, href, onPress, secondary = false, disabled = false }: Action & {
  label: string; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label}
      disabled={disabled} accessibilityState={{ disabled }}
      onPress={href ? () => router.push(href) : onPress}
      style={({ pressed }) => [disabled && { opacity: 0.4 }, styles.button, secondary && styles.secondary, pressed && styles.pressed]}>
      <Copy variant="label" style={{ color: secondary ? palette.ink : palette.white }}>{label}</Copy>
    </Pressable>
  );
}

export function TextLink({ label, href, onPress }: Action & { label: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label}
      onPress={href ? () => router.push(href) : onPress}
      style={({ pressed }) => [styles.textLink, pressed && styles.pressed]}>
      <Copy variant="label" style={{ color: palette.accent }}>{label}</Copy>
    </Pressable>
  );
}

export function RowLink({ title, detail, icon, href, onPress }: Action & {
  title: string; detail?: string; icon: IconName;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title}
      onPress={href ? () => router.push(href) : onPress}
      style={({ pressed }) => [styles.rowLink, pressed && styles.pressed]}>
      <Icon name={icon} />
      <View style={styles.flex}>
        <Copy variant="label">{title}</Copy>
        {detail && <Copy variant="caption" muted>{detail}</Copy>}
      </View>
      <Icon name="arrow" size={19} color={palette.muted} />
    </Pressable>
  );
}

export function QuickLink({ title, icon, href }: { title: string; icon: IconName; href: Href }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title}
      onPress={() => router.push(href)}
      style={({ pressed }) => [styles.quickLink, pressed && styles.pressed]}>
      <View style={styles.iconTile}><Icon name={icon} /></View>
      <Copy variant="caption" style={styles.center}>{title}</Copy>
    </Pressable>
  );
}

export function Section({ title, children, action }: PropsWithChildren<{ title: string; action?: ReactNode }>) {
  return (
    <View style={styles.section}>
      <View style={styles.spread}><Copy variant="heading" accessibilityRole="header">{title}</Copy>{action}</View>
      {children}
    </View>
  );
}

export function EmptyState({ icon, title, detail }: { icon: IconName; title: string; detail?: string }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}><Icon name={icon} size={34} color={palette.muted} /></View>
      <Copy variant="heading" style={styles.center}>{title}</Copy>
      {detail && <Copy muted style={styles.center}>{detail}</Copy>}
    </View>
  );
}

export function Field({ label, hint, ...props }: TextInputProps & { label: string; hint?: string }) {
  return (
    <View style={{ gap: space.sm }}>
      <Copy variant="label">{label}</Copy>
      <TextInput accessibilityLabel={label} placeholderTextColor={palette.muted}
        autoCorrect={false} autoComplete="off" {...props}
        style={[styles.input, props.style]} />
      {hint && <Copy variant="caption" muted>{hint}</Copy>}
    </View>
  );
}

export function Screen({ role, title, subtitle, children, back, entry = false, footer, scrollKey, autoScroll = false }: PropsWithChildren<{
  role?: Role; title?: string; subtitle?: string; back?: Href; entry?: boolean; footer?: ReactNode; scrollKey?: number; autoScroll?: boolean;
}>) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => { if (scrollKey !== undefined) scrollRef.current?.scrollTo({ y: 0, animated: false }); }, [scrollKey]);
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {entry && (
        <View accessible={false} aria-hidden style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
          <View style={styles.softShape} />
          <View style={styles.softCurve} />
        </View>
      )}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" keyboardDismissMode={Platform.OS === 'web' ? 'none' : 'on-drag'}
          onContentSizeChange={autoScroll ? () => scrollRef.current?.scrollToEnd({ animated: false }) : undefined}
          contentContainerStyle={[styles.content, { paddingBottom: space.xl + ((!role || back) ? insets.bottom : 0) }]}>
          <View style={styles.topline}>
            {back ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Go back" style={styles.back}
                onPress={() => router.canGoBack() ? router.back() : router.replace(back)}>
                <Icon name="back" />
              </Pressable>
            ) : (
              <View style={styles.wordmark}>
                <View style={styles.brandMark}><Copy variant="label" style={{ color: palette.white }}>a.</Copy></View>
                <Copy variant="label">{entry ? appName : role === 'sitter' ? 'Sitter' : role === 'owner' ? 'Owner' : appName}</Copy>
              </View>
            )}
            <Badge>Demo · Oct 12</Badge>
          </View>
          {(title || subtitle) && (
            <View style={styles.section}>
              {title && <Copy variant="title" accessibilityRole="header">{title}</Copy>}
              {subtitle && <Copy muted>{subtitle}</Copy>}
            </View>
          )}
          <Animated.View entering={FadeIn.duration(220).reduceMotion(ReduceMotion.System)} style={{ gap: space.xl, flexGrow: 1 }}>
            {children}
          </Animated.View>
        </ScrollView>
        {footer && <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, space.lg) }]}>{footer}</View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Photo({ uri, label, size = 64, wide = false }: { uri: string; label: string; size?: number; wide?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <View style={{ width: wide ? '100%' : size, height: size, borderRadius: wide ? radius.md : radius.sm, backgroundColor: palette.neutral, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
      <Copy variant="heading" style={{ position: 'absolute' }}>{label.split(' ').map(word => word[0]).slice(0, 2).join('')}</Copy>
      {!failed && !!uri && <Image source={{ uri }} accessibilityLabel={label} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={150} onError={() => setFailed(true)} />}
    </View>
  );
}
export function Chips<T extends string>({ values, selected, onChange }: { values: readonly T[]; selected: T; onChange: (value: T) => void }) {
  return <View style={styles.wrap}>{values.map(value => (
    <Pressable key={value} accessibilityRole="button" accessibilityLabel={value} accessibilityState={{ selected: value === selected }}
      onPress={() => onChange(value)} style={({ pressed }) => [styles.chip, value === selected && styles.chipSelected, pressed && styles.pressed]}>
      <Copy variant="caption" style={{ color: value === selected ? palette.white : palette.ink }}>{value}</Copy>
    </Pressable>
  ))}</View>;
}
export function Notice({ children }: PropsWithChildren) {
  return <View accessibilityLiveRegion="polite" style={styles.notice}><Copy variant="caption">{children}</Copy></View>;
}
export function Divider() { return <View style={{ height: 1, backgroundColor: palette.border }} />; }

export const styles = StyleSheet.create({
  spread: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  brandMark: { backgroundColor: palette.ink, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  footer: { padding: space.lg, gap: space.md, backgroundColor: palette.surface, borderTopWidth: 1, borderColor: palette.border },
  chip: { paddingHorizontal: space.lg, paddingVertical: space.md, minHeight: 44, borderRadius: radius.pill, backgroundColor: palette.neutral, justifyContent: 'center' },
  chipSelected: { backgroundColor: palette.ink },
  notice: { padding: space.lg, borderRadius: radius.sm, backgroundColor: palette.tint },

  screen: { flex: 1, backgroundColor: palette.canvas, overflow: 'hidden' },
  content: { flexGrow: 1, padding: space.xl, gap: space.xl, width: '100%', maxWidth: 560, alignSelf: 'center' },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 44 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  badge: { backgroundColor: palette.neutral, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.xs, alignSelf: 'flex-start' },
  card: { padding: space.lg, borderRadius: radius.md, backgroundColor: palette.surface, gap: space.md, borderWidth: 1, borderColor: palette.border },
  button: { backgroundColor: palette.accent, borderRadius: radius.sm, padding: space.lg, minHeight: 56, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: palette.neutral },
  pressed: { opacity: 0.65 },
  section: { gap: space.lg },
  rowLink: { flexDirection: 'row', alignItems: 'center', gap: space.lg, paddingVertical: space.lg, minHeight: 64, borderBottomWidth: 1, borderColor: palette.border },
  iconTile: { backgroundColor: palette.neutral, borderRadius: radius.md, padding: space.lg },
  quickLink: { flex: 1, alignItems: 'center', gap: space.md, minHeight: 80 },
  flex: { flex: 1, gap: space.xs },
  empty: { alignItems: 'center', paddingVertical: space.xxxl, gap: space.md },
  emptyIcon: { backgroundColor: palette.neutral, padding: space.xl, borderRadius: radius.pill, marginBottom: space.sm },
  center: { textAlign: 'center' },
  back: { minWidth: 44, minHeight: 44, justifyContent: 'center' },
  textLink: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingVertical: space.sm },
  input: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: radius.sm, padding: space.lg, minHeight: 56, fontSize: 17, color: palette.ink },
  softShape: { position: 'absolute', right: -130, top: -130, width: 340, height: 440, borderRadius: 180, backgroundColor: '#EFEEE9', transform: [{ rotate: '30deg' }] },
  softCurve: { position: 'absolute', left: -180, bottom: 40, width: 300, height: 380, borderRadius: 170, borderWidth: 1, borderColor: '#E7E3DC', transform: [{ rotate: '-25deg' }] },
});
