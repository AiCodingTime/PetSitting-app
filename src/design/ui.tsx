import {
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Image } from 'expo-image';
import { Href, router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import Animated, {
  FadeIn,
  ReduceMotion,
} from 'react-native-reanimated';

import {
  ColorValue,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  appName,
  palette,
  radius,
  space,
  type,
} from './tokens';

export type Role = 'owner' | 'sitter';

const icons = {
  home: {
    ios: 'house.fill',
    android: 'home',
    web: 'home',
  },

  search: {
    ios: 'magnifyingglass',
    android: 'search',
    web: 'search',
  },

  calendar: {
    ios: 'calendar',
    android: 'calendar_month',
    web: 'calendar_month',
  },

  message: {
    ios: 'bubble.left.and.bubble.right.fill',
    android: 'chat_bubble',
    web: 'chat_bubble',
  },

  person: {
    ios: 'person.crop.circle.fill',
    android: 'account_circle',
    web: 'account_circle',
  },

  paw: {
    ios: 'pawprint.fill',
    android: 'pets',
    web: 'pets',
  },

  arrow: {
    ios: 'arrow.right',
    android: 'arrow_forward',
    web: 'arrow_forward',
  },

  back: {
    ios: 'chevron.left',
    android: 'arrow_back',
    web: 'arrow_back',
  },

  settings: {
    ios: 'gearshape.fill',
    android: 'settings',
    web: 'settings',
  },

  shield: {
    ios: 'checkmark.shield.fill',
    android: 'shield',
    web: 'shield',
  },

  star: {
    ios: 'star.fill',
    android: 'star',
    web: 'star',
  },

  check: {
    ios: 'checkmark',
    android: 'check',
    web: 'check',
  },

  plus: {
    ios: 'plus',
    android: 'add',
    web: 'add',
  },

  close: {
    ios: 'xmark',
    android: 'close',
    web: 'close',
  },

  clock: {
    ios: 'clock.fill',
    android: 'schedule',
    web: 'schedule',
  },

  wallet: {
    ios: 'creditcard.fill',
    android: 'credit_card',
    web: 'credit_card',
  },

  filter: {
    ios: 'slider.horizontal.3',
    android: 'tune',
    web: 'tune',
  },

  heart: {
    ios: 'heart.fill',
    android: 'favorite',
    web: 'favorite',
  },
} satisfies Record<
  string,
  ComponentProps<typeof SymbolView>['name']
>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  color = palette.ink,
  size = 24,
}: {
  name: IconName;
  color?: ColorValue;
  size?: number;
}) {
  return (
    <View accessible={false} aria-hidden>
      <SymbolView
        name={icons[name]}
        tintColor={color}
        size={size}
      />
    </View>
  );
}

export function Copy({
  variant = 'body',
  muted,
  style,
  ...props
}: TextProps & {
  variant?: keyof typeof type;
  muted?: boolean;
}) {
  return (
    <Text
      {...props}
      style={[
        {
          color: muted
            ? palette.muted
            : palette.ink,
        },
        type[variant],
        style,
      ]}
    />
  );
}

export function Card({
  style,
  ...props
}: ViewProps) {
  return (
    <View
      {...props}
      style={[
        styles.card,
        style,
      ]}
    />
  );
}

export function Badge({
  children,
}: PropsWithChildren) {
  return (
    <View style={styles.badge}>
      <Copy
        variant="caption"
        style={styles.badgeText}
      >
        {children}
      </Copy>
    </View>
  );
}

type Action =
  | {
      href: Href;
      onPress?: never;
    }
  | {
      href?: never;
      onPress: () => void;
    };

export function Button({
  label,
  href,
  onPress,
  secondary = false,
  disabled = false,
}: Action & {
  label: string;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      accessibilityState={{
        disabled,
      }}
      onPress={
        href
          ? () => router.push(href)
          : onPress
      }
      style={({ pressed }) => [
        styles.button,
        secondary &&
          styles.secondaryButton,
        disabled && styles.disabled,
        pressed &&
          styles.buttonPressed,
      ]}
    >
      <Copy
        variant="label"
        style={{
          color: secondary
            ? palette.forest
            : palette.white,
        }}
      >
        {label}
      </Copy>
    </Pressable>
  );
}

export function TextLink({
  label,
  href,
  onPress,
}: Action & {
  label: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={
        href
          ? () => router.push(href)
          : onPress
      }
      style={({ pressed }) => [
        styles.textLink,
        pressed &&
          styles.pressed,
      ]}
    >
      <Copy
        variant="label"
        style={{
          color: palette.accent,
        }}
      >
        {label}
      </Copy>
    </Pressable>
  );
}

export function RowLink({
  title,
  detail,
  icon,
  href,
  onPress,
}: Action & {
  title: string;
  detail?: string;
  icon: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={
        href
          ? () => router.push(href)
          : onPress
      }
      style={({ pressed }) => [
        styles.rowLink,
        pressed &&
          styles.pressed,
      ]}
    >
      <View style={styles.rowIcon}>
        <Icon
          name={icon}
          size={20}
          color={palette.forest}
        />
      </View>

      <View style={styles.flex}>
        <Copy variant="label">
          {title}
        </Copy>

        {detail ? (
          <Copy
            variant="caption"
            muted
          >
            {detail}
          </Copy>
        ) : null}
      </View>

      <Icon
        name="arrow"
        size={18}
        color={palette.subtle}
      />
    </Pressable>
  );
}

export function QuickLink({
  title,
  icon,
  href,
}: {
  title: string;
  icon: IconName;
  href: Href;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={() =>
        router.push(href)
      }
      style={({ pressed }) => [
        styles.quickLink,
        pressed &&
          styles.pressed,
      ]}
    >
      <View style={styles.iconTile}>
        <Icon
          name={icon}
          color={palette.forest}
          size={22}
        />
      </View>

      <Copy
        variant="caption"
        style={styles.center}
      >
        {title}
      </Copy>
    </Pressable>
  );
}

export function Section({
  title,
  children,
  action,
}: PropsWithChildren<{
  title: string;
  action?: ReactNode;
}>) {
  return (
    <View style={styles.section}>
      <View style={styles.spread}>
        <Copy
          variant="heading"
          accessibilityRole="header"
        >
          {title}
        </Copy>

        {action}
      </View>

      {children}
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  detail,
}: {
  icon: IconName;
  title: string;
  detail?: string;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon
          name={icon}
          size={30}
          color={palette.forest}
        />
      </View>

      <Copy
        variant="heading"
        style={styles.center}
      >
        {title}
      </Copy>

      {detail ? (
        <Copy
          muted
          style={styles.center}
        >
          {detail}
        </Copy>
      ) : null}
    </View>
  );
}

export function Field({
  label,
  hint,
  ...props
}: TextInputProps & {
  label: string;
  hint?: string;
}) {
  const [focused, setFocused] =
    useState(false);

  return (
    <View
      style={{
        gap: space.sm,
      }}
    >
      <Copy
        variant="label"
        style={{
          color: palette.forest,
        }}
      >
        {label}
      </Copy>

      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={
          palette.subtle
        }
        autoCorrect={false}
        autoComplete="off"
        {...props}
        onFocus={event => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={event => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        style={[
          styles.input,
          focused &&
            styles.inputFocused,
          props.style,
        ]}
      />

      {hint ? (
        <Copy
          variant="caption"
          muted
        >
          {hint}
        </Copy>
      ) : null}
    </View>
  );
}

export function Screen({
  role,
  title,
  subtitle,
  children,
  back,
  entry = false,
  footer,
  scrollKey,
  autoScroll = false,
}: PropsWithChildren<{
  role?: Role;
  title?: string;
  subtitle?: string;
  back?: Href;
  entry?: boolean;
  footer?: ReactNode;
  scrollKey?: number;
  autoScroll?: boolean;
}>) {
  const insets =
    useSafeAreaInsets();

  const scrollRef =
    useRef<ScrollView>(null);

  useEffect(() => {
    if (
      scrollKey !== undefined
    ) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }
  }, [scrollKey]);

  return (
    <SafeAreaView
      edges={[
        'top',
        'left',
        'right',
      ]}
      style={[
        styles.screen,
        entry &&
          styles.entryScreen,
      ]}
    >
      <View
        accessible={false}
        aria-hidden
        style={[
          StyleSheet.absoluteFill,
          {
            pointerEvents: 'none',
          },
        ]}
      >
        <View
          style={
            entry
              ? styles.entryTopBand
              : styles.backgroundTopBand
          }
        />

        <View
          style={
            entry
              ? styles.entryBottomPanel
              : styles.backgroundBottomPanel
          }
        />

        <View
          style={
            entry
              ? styles.entryAccentLine
              : styles.backgroundAccentLine
          }
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === 'web'
              ? 'none'
              : 'on-drag'
          }
          showsVerticalScrollIndicator={
            false
          }
          onContentSizeChange={
            autoScroll
              ? () =>
                  scrollRef.current?.scrollToEnd(
                    {
                      animated: false,
                    },
                  )
              : undefined
          }
          contentContainerStyle={[
            styles.content,
            {
              paddingBottom:
                space.xl +
                (!role || back
                  ? insets.bottom
                  : 0),
            },
          ]}
        >
          <View style={styles.topline}>
            {back ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={({ pressed }) => [
                  styles.back,
                  pressed &&
                    styles.pressed,
                ]}
                onPress={() =>
                  router.canGoBack()
                    ? router.back()
                    : router.replace(
                        back,
                      )
                }
              >
                <Icon
                  name="back"
                  color={
                    palette.forest
                  }
                  size={22}
                />
              </Pressable>
            ) : (
              <View
                style={
                  styles.wordmark
                }
              >
                <View
                  style={
                    styles.brandMark
                  }
                >
                  <View
                    style={
                      styles.brandInner
                    }
                  />
                </View>

                <Copy
                  variant="label"
                  style={{
                    color:
                      palette.forest,
                  }}
                >
                  {entry
                    ? appName
                    : role ===
                        'sitter'
                      ? 'Sitter'
                      : role ===
                          'owner'
                        ? 'Owner'
                        : appName}
                </Copy>
              </View>
            )}

            {!entry ? (
              <View
                style={
                  styles.statusMark
                }
              />
            ) : null}
          </View>

          {(title ||
            subtitle) && (
            <View
              style={
                styles.titleBlock
              }
            >
              {title ? (
                <Copy
                  variant="title"
                  accessibilityRole="header"
                  style={{
                    color:
                      palette.forestDeep,
                  }}
                >
                  {title}
                </Copy>
              ) : null}

              {subtitle ? (
                <Copy
                  muted
                  style={{
                    maxWidth: 420,
                  }}
                >
                  {subtitle}
                </Copy>
              ) : null}
            </View>
          )}

          <Animated.View
            entering={FadeIn.duration(
              220,
            ).reduceMotion(
              ReduceMotion.System,
            )}
            style={{
              gap: space.xl,
              flexGrow: 1,
            }}
          >
            {children}
          </Animated.View>
        </ScrollView>

        {footer ? (
          <View
            style={[
              styles.footer,
              {
                paddingBottom:
                  Math.max(
                    insets.bottom,
                    space.lg,
                  ),
              },
            ]}
          >
            {footer}
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Photo({
  uri,
  label,
  size = 64,
  wide = false,
}: {
  uri: string;
  label: string;
  size?: number;
  wide?: boolean;
}) {
  const [failed, setFailed] =
    useState(false);

  const initials = label
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View
      style={[
        styles.photoFrame,
        {
          width: wide
            ? '100%'
            : size,

          height: size,

          borderRadius: wide
            ? radius.lg
            : radius.md,
        },
      ]}
    >
      <View
        style={
          styles.photoFallback
        }
      >
        <Copy
          variant={
            wide
              ? 'heading'
              : 'label'
          }
          style={{
            color:
              palette.white,
          }}
        >
          {initials || '•'}
        </Copy>
      </View>

      {!failed && !!uri ? (
        <Image
          source={{ uri }}
          accessibilityLabel={
            label
          }
          style={{
            width: '100%',
            height: '100%',
          }}
          contentFit="cover"
          transition={150}
          onError={() =>
            setFailed(true)
          }
        />
      ) : null}
    </View>
  );
}

export function Chips<
  T extends string,
>({
  values,
  selected,
  onChange,
}: {
  values: readonly T[];
  selected: T;
  onChange: (
    value: T,
  ) => void;
}) {
  return (
    <View style={styles.wrap}>
      {values.map(value => {
        const active =
          value === selected;

        return (
          <Pressable
            key={value}
            accessibilityRole="button"
            accessibilityLabel={
              value
            }
            accessibilityState={{
              selected: active,
            }}
            onPress={() =>
              onChange(value)
            }
            style={({ pressed }) => [
              styles.chip,
              active &&
                styles.chipSelected,
              pressed &&
                styles.pressed,
            ]}
          >
            <Copy
              variant="caption"
              style={{
                color: active
                  ? palette.white
                  : palette.ink,
              }}
            >
              {value}
            </Copy>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Notice({
  children,
}: PropsWithChildren) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={styles.notice}
    >
      <View
        style={
          styles.noticeMark
        }
      />

      <View style={styles.flex}>
        <Copy variant="caption">
          {children}
        </Copy>
      </View>
    </View>
  );
}

export function Divider() {
  return (
    <View
      style={styles.divider}
    />
  );
}

export const styles =
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor:
        palette.canvas,
      overflow: 'hidden',
    },

    entryScreen: {
      backgroundColor:
        palette.canvas,
    },

    content: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 560,
      alignSelf: 'center',
      paddingHorizontal:
        space.xl,
      paddingTop: space.lg,
      gap: space.xl,
    },

    topline: {
      minHeight: 48,
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      gap: space.md,
    },

    wordmark: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
    },

    brandMark: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor:
        palette.forest,
      alignItems: 'center',
      justifyContent:
        'center',

      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 2,
    },

    brandInner: {
      width: 10,
      height: 10,
      borderRadius: 3,
      backgroundColor:
        palette.clay,
    },

    statusMark: {
      width: 9,
      height: 9,
      borderRadius: 999,
      backgroundColor:
        palette.sage,
    },

    titleBlock: {
      gap: space.sm,
      paddingTop: space.sm,
    },

    section: {
      gap: space.lg,
    },

    card: {
      padding: space.lg,
      borderRadius:
        radius.md,
      backgroundColor:
        palette.surface,
      gap: space.md,

      borderWidth: 1,
      borderColor:
        palette.border,

      shadowColor: '#0B1C16',
      shadowOpacity:
        Platform.OS === 'ios'
          ? 0.045
          : 0,

      shadowRadius: 14,

      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 1,
    },

    badge: {
      backgroundColor:
        palette.sageSoft,

      borderRadius:
        radius.pill,

      paddingHorizontal:
        space.md,

      paddingVertical:
        6,

      alignSelf:
        'flex-start',
    },

    badgeText: {
      color:
        palette.forest,
    },

    button: {
      minHeight: 56,

      paddingHorizontal:
        space.xl,

      paddingVertical:
        space.lg,

      borderRadius:
        radius.sm,

      alignItems: 'center',
      justifyContent:
        'center',

      backgroundColor:
        palette.forest,

      shadowColor:
        palette.forestDeep,

      shadowOpacity:
        Platform.OS === 'ios'
          ? 0.14
          : 0,

      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 2,
    },

    secondaryButton: {
      backgroundColor:
        palette.sageSoft,

      borderWidth: 1,
      borderColor:
        palette.sage,
    },

    buttonPressed: {
      transform: [
        {
          scale: 0.985,
        },
      ],
      opacity: 0.9,
    },

    disabled: {
      opacity: 0.42,
    },

    pressed: {
      opacity: 0.68,
    },

    textLink: {
      minHeight: 44,
      justifyContent:
        'center',
      alignItems: 'center',
      paddingVertical:
        space.sm,
    },

    rowLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.md,

      minHeight: 68,

      paddingVertical:
        space.md,
      paddingHorizontal:
        space.sm,

      borderBottomWidth: 1,
      borderColor:
        palette.border,
    },

    rowIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        palette.sageSoft,

      alignItems: 'center',
      justifyContent:
        'center',
    },

    quickLink: {
      flex: 1,
      minHeight: 92,

      alignItems: 'center',
      justifyContent:
        'center',

      gap: space.sm,

      padding: space.md,

      borderRadius:
        radius.md,

      backgroundColor:
        palette.surface,

      borderWidth: 1,
      borderColor:
        palette.border,
    },

    iconTile: {
      width: 44,
      height: 44,

      alignItems: 'center',
      justifyContent:
        'center',

      borderRadius: 15,

      backgroundColor:
        palette.sageSoft,
    },

    flex: {
      flex: 1,
      gap: space.xs,
    },

    spread: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent:
        'space-between',
      gap: space.sm,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.md,
    },

    wrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: space.sm,
    },

    center: {
      textAlign: 'center',
    },

    back: {
      width: 44,
      height: 44,

      borderRadius: 14,

      alignItems: 'center',
      justifyContent:
        'center',

      backgroundColor:
        palette.surface,

      borderWidth: 1,
      borderColor:
        palette.border,
    },

    input: {
      minHeight: 56,

      paddingHorizontal:
        space.lg,

      paddingVertical:
        14,

      borderRadius:
        radius.sm,

      borderWidth: 1,
      borderColor:
        palette.border,

      backgroundColor:
        palette.elevated,

      fontSize: 16,
      lineHeight: 22,

      color:
        palette.ink,
    },

    inputFocused: {
      borderColor:
        palette.forest,

      borderWidth: 1.5,

      backgroundColor:
        palette.white,
    },

    empty: {
      alignItems: 'center',

      paddingHorizontal:
        space.xl,

      paddingVertical:
        space.xxxl,

      gap: space.md,
    },

    emptyIcon: {
      width: 64,
      height: 64,

      alignItems: 'center',
      justifyContent:
        'center',

      borderRadius: 18,

      backgroundColor:
        palette.sageSoft,
    },

    footer: {
      paddingHorizontal:
        space.lg,

      paddingTop:
        space.md,

      gap: space.md,

      backgroundColor:
        palette.surface,

      borderTopWidth: 1,
      borderColor:
        palette.border,

      shadowColor: '#000',
      shadowOpacity:
        Platform.OS === 'ios'
          ? 0.04
          : 0,

      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: -3,
      },
    },

    chip: {
      minHeight: 42,

      paddingHorizontal:
        space.lg,

      paddingVertical:
        space.sm,

      borderRadius:
        radius.pill,

      justifyContent:
        'center',

      backgroundColor:
        palette.surface,

      borderWidth: 1,
      borderColor:
        palette.border,
    },

    chipSelected: {
      backgroundColor:
        palette.forest,

      borderColor:
        palette.forest,
    },

    notice: {
      flexDirection: 'row',
      alignItems:
        'flex-start',

      gap: space.md,

      padding: space.lg,

      borderRadius:
        radius.sm,

      backgroundColor:
        palette.sageSoft,

      borderWidth: 1,
      borderColor:
        palette.sage,
    },

    noticeMark: {
      width: 7,
      height: 7,

      marginTop: 6,

      borderRadius: 2,

      backgroundColor:
        palette.clay,
    },

    divider: {
      height: 1,
      backgroundColor:
        palette.border,
    },

    photoFrame: {
      overflow: 'hidden',

      backgroundColor:
        palette.forestDeep,

      borderWidth: 1,
      borderColor:
        palette.border,

      alignItems: 'center',
      justifyContent:
        'center',
    },

    photoFallback: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,

      backgroundColor:
        palette.forestDeep,

      alignItems: 'center',
      justifyContent:
        'center',
    },

    entryTopBand: {
      position: 'absolute',

      top: 0,
      left: 0,
      right: 0,

      height: 208,

      backgroundColor:
        palette.sageSoft,

      borderBottomLeftRadius: 34,
      borderBottomRightRadius: 34,

      opacity: 0.76,
    },

    entryBottomPanel: {
      position: 'absolute',

      left: 18,
      right: 18,
      bottom: -30,

      height: 132,

      backgroundColor:
        palette.neutral,

      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,

      opacity: 0.9,
    },

    entryAccentLine: {
      position: 'absolute',

      top: 204,
      left: 30,

      width: 72,
      height: 3,

      borderRadius: 2,

      backgroundColor:
        palette.clay,

      opacity: 0.75,
    },

    backgroundTopBand: {
      position: 'absolute',

      top: 0,
      left: 0,
      right: 0,

      height: 132,

      backgroundColor:
        palette.sageSoft,

      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,

      opacity: 0.42,
    },

    backgroundBottomPanel: {
      position: 'absolute',

      left: 18,
      right: 18,
      bottom: -34,

      height: 104,

      backgroundColor:
        palette.neutral,

      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,

      opacity: 0.74,
    },

    backgroundAccentLine: {
      position: 'absolute',

      top: 128,
      right: 28,

      width: 44,
      height: 3,

      borderRadius: 2,

      backgroundColor:
        palette.clay,

      opacity: 0.55,
    },
  });