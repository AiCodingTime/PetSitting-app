import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Button,
  Copy,
  Field,
  Icon,
  Notice,
  Screen,
  TextLink,
  styles,
} from '@/design/ui';

import { validDate } from '@/demo/model';
import { useDemo } from '@/demo/store';
import { palette } from '@/design/tokens';

function continueDemo() {
  Keyboard.dismiss();

  if (router.canDismiss()) {
    router.dismissAll();
  }

  router.replace('/choose-role');
}

export function Welcome() {
  return (
    <SafeAreaView style={welcomeStyles.screen}>
      <StatusBar style="light" />

      <View
        pointerEvents="none"
        style={welcomeStyles.background}
      >
        <View style={welcomeStyles.lineOne} />
        <View style={welcomeStyles.lineTwo} />
        <View style={welcomeStyles.lineThree} />
        <View style={welcomeStyles.sidePanel} />
      </View>

      <View style={welcomeStyles.content}>
        <View style={welcomeStyles.brandRow}>
          <View style={welcomeStyles.brandMark}>
            <View style={welcomeStyles.brandMarkInner} />
          </View>

          <Copy
            variant="caption"
            style={welcomeStyles.brandText}
          >
            ANIMAL CARE
          </Copy>
        </View>

        <View style={welcomeStyles.hero}>
          <Copy
            variant="hero"
            accessibilityRole="header"
            style={welcomeStyles.headline}
          >
            Care you can count on.
          </Copy>

          <Copy style={welcomeStyles.subheadline}>
            Find trusted care for your animals,
            or earn by caring for someone else&apos;s.
          </Copy>
        </View>

        <View style={welcomeStyles.bottom}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Create Account"
            onPress={() => router.push('/signup')}
            style={({ pressed }) => [
              welcomeStyles.primaryButton,
              pressed && welcomeStyles.buttonPressed,
            ]}
          >
            <Copy
              variant="label"
              style={welcomeStyles.primaryButtonText}
            >
              Create Account
            </Copy>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log In"
            onPress={() => router.push('/login')}
            style={({ pressed }) => [
              welcomeStyles.secondaryButton,
              pressed && welcomeStyles.buttonPressed,
            ]}
          >
            <Copy
              variant="label"
              style={welcomeStyles.secondaryButtonText}
            >
              Log In
            </Copy>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Screen
      entry
      back="/"
      title="Welcome back"
      subtitle="Use sample details to explore."
    >
      <Field
        label="Email"
        placeholder="alex@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Field
        label="Password"
        placeholder="Sample password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TextLink
        label="Forgot password?"
        href="/forgot-password"
      />

      {error ? (
        <Notice>{error}</Notice>
      ) : null}

      <Button
        label="Log In"
        onPress={() => {
          if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            password.length < 6
          ) {
            setError(
              'Enter a sample email and a password of at least 6 characters.',
            );
          } else {
            continueDemo();
          }
        }}
      />

      <TextLink
        label="Try the demo account"
        onPress={continueDemo}
      />

      <TextLink
        label="New here? Sign Up"
        onPress={() => router.replace('/signup')}
      />
    </Screen>
  );
}

export function Signup() {
  const demo = useDemo();

  const [fields, setFields] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
  });

  const [error, setError] = useState('');

  const change = (
    key: keyof typeof fields,
    value: string,
  ) => {
    setFields(previous => ({
      ...previous,
      [key]: value,
    }));
  };

  function submit() {
    if (
      Object.values(fields).some(
        value => !value.trim(),
      )
    ) {
      setError(
        'Complete each field with sample details.',
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        fields.email,
      )
    ) {
      setError(
        'Enter a valid sample email.',
      );
      return;
    }

    if (
      fields.password.length < 6 ||
      fields.phone.replace(/\D/g, '').length < 7
    ) {
      setError(
        'Use at least 6 password characters and a complete phone number.',
      );
      return;
    }

    if (!validDate(fields.dob)) {
      setError(
        'Use YYYY-MM-DD for date of birth.',
      );
      return;
    }

    const now = new Date();

    const cutoff = new Date(
      now.getFullYear() - 15,
      now.getMonth(),
      now.getDate(),
    );

    if (
      new Date(
        fields.dob + 'T00:00:00',
      ) > cutoff
    ) {
      setError(
        'You must be at least 15.',
      );
      return;
    }

    demo.setProfile(profile => ({
      ...profile,
      name:
        fields.first.trim() +
        ' ' +
        fields.last.trim(),
    }));

    continueDemo();
  }

  return (
    <Screen
      entry
      back="/"
      title="Create your account"
      subtitle="Demo only · Use fictional details"
    >
      <Field
        label="First name"
        value={fields.first}
        onChangeText={value =>
          change('first', value)
        }
        autoCapitalize="words"
      />

      <Field
        label="Last name"
        value={fields.last}
        onChangeText={value =>
          change('last', value)
        }
        autoCapitalize="words"
      />

      <Field
        label="Email"
        value={fields.email}
        onChangeText={value =>
          change('email', value)
        }
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Field
        label="Phone"
        value={fields.phone}
        onChangeText={value =>
          change('phone', value)
        }
        keyboardType="phone-pad"
      />

      <Field
        label="Password"
        value={fields.password}
        onChangeText={value =>
          change('password', value)
        }
        secureTextEntry
        autoCapitalize="none"
      />

      <Field
        label="Date of birth"
        placeholder="YYYY-MM-DD"
        hint="Age 15 or older"
        value={fields.dob}
        onChangeText={value =>
          change('dob', value)
        }
      />

      {error ? (
        <Notice>{error}</Notice>
      ) : null}

      <Button
        label="Create Account"
        onPress={submit}
      />

      <TextLink
        label="Use sample details"
        onPress={() => {
          setError('');

          setFields({
            first: 'Alex',
            last: 'Morgan',
            email: 'alex@example.com',
            phone: '5550101234',
            password: 'demo-only',
            dob: '2000-01-15',
          });
        }}
      />

      <TextLink
        label="Already registered? Log In"
        onPress={() =>
          router.replace('/login')
        }
      />
    </Screen>
  );
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <Screen
      entry
      back="/login"
      title="Reset password"
      subtitle="A fresh start."
    >
      <Field
        label="Email"
        placeholder="alex@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {sent ? (
        <Notice>
          Reset preview complete. No email was sent.
        </Notice>
      ) : (
        <Copy muted>
          This preview does not contact an email service.
        </Copy>
      )}

      <Button
        label={
          sent
            ? 'Back to Log In'
            : 'Preview reset'
        }
        onPress={() =>
          sent
            ? router.replace('/login')
            : setSent(true)
        }
      />
    </Screen>
  );
}

export function ChooseRole() {
  const { from } =
    useLocalSearchParams<{
      from?: string;
    }>();

  function choose(
    role: 'owner' | 'sitter',
  ) {
    if (router.canDismiss()) {
      router.dismissAll();
    }

    router.replace(
      role === 'owner'
        ? '/owner'
        : '/sitter',
    );
  }

  return (
    <Screen
      entry
      back={
        from === 'owner'
          ? '/owner/profile'
          : from === 'sitter'
            ? '/sitter/profile'
            : undefined
      }
      title="What are you here to do?"
      subtitle="One account. Either side of care."
    >
      {(
        [
          {
            role: 'owner',
            title: 'I need animal care',
            detail: 'Find your sitter',
            icon: 'home',
          },
          {
            role: 'sitter',
            title:
              'I want to provide animal care',
            detail: 'Explore local jobs',
            icon: 'calendar',
          },
        ] as const
      ).map(choice => (
        <Pressable
          key={choice.role}
          accessibilityRole="button"
          accessibilityLabel={
            choice.title
          }
          onPress={() =>
            choose(choice.role)
          }
          style={({ pressed }) => [
            styles.card,
            {
              padding: 24,
              minHeight: 174,
              gap: 20,
            },
            pressed &&
              styles.pressed,
          ]}
        >
          <View style={styles.spread}>
            <Icon
              name={choice.icon}
              color={palette.accent}
              size={30}
            />

            <Icon
              name="arrow"
              size={22}
            />
          </View>

          <View
            style={{
              gap: 6,
            }}
          >
            <Copy variant="heading">
              {choice.title}
            </Copy>

            <Copy muted>
              {choice.detail}
            </Copy>
          </View>
        </Pressable>
      ))}

      <Copy
        variant="caption"
        muted
      >
        You can switch in Profile at any time.
      </Copy>
    </Screen>
  );
}

const welcomeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:
      palette.forestDeep,
  },

  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },

  sidePanel: {
    position: 'absolute',

    top: 0,
    right: 0,
    bottom: 0,

    width: 86,

    backgroundColor:
      palette.forest,

    opacity: 0.38,
  },

  lineOne: {
    position: 'absolute',

    top: 160,
    right: 38,

    width: 1,
    height: 250,

    backgroundColor:
      palette.white,

    opacity: 0.08,
  },

  lineTwo: {
    position: 'absolute',

    top: 250,
    right: 60,

    width: 1,
    height: 330,

    backgroundColor:
      palette.white,

    opacity: 0.055,
  },

  lineThree: {
    position: 'absolute',

    top: 340,
    right: 18,

    width: 1,
    height: 190,

    backgroundColor:
      palette.white,

    opacity: 0.05,
  },

  content: {
    flex: 1,

    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 26,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  brandMark: {
    width: 30,
    height: 30,

    borderRadius: 9,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.38)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  brandMarkInner: {
    width: 9,
    height: 9,

    borderRadius: 2,

    backgroundColor:
      palette.white,
  },

  brandText: {
    color:
      'rgba(255,255,255,0.72)',

    letterSpacing: 1.8,
    fontWeight: '600',
  },

  hero: {
    marginTop: 'auto',
    marginBottom: 56,

    maxWidth: 320,
    gap: 14,
  },

  headline: {
    color:
      palette.white,

    fontSize: 36,
    lineHeight: 41,

    fontWeight: '600',

    letterSpacing: -1.15,
  },

  subheadline: {
    color:
      'rgba(255,255,255,0.72)',

    fontSize: 16,
    lineHeight: 23,

    maxWidth: 300,
  },

  bottom: {
    gap: 12,
  },

  primaryButton: {
    minHeight: 58,

    borderRadius: 14,

    backgroundColor:
      '#F7F5EF',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  primaryButtonText: {
    color:
      palette.forestDeep,

    fontWeight: '700',
  },

  secondaryButton: {
    minHeight: 58,

    borderRadius: 14,

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.42)',

    backgroundColor:
      'rgba(255,255,255,0.035)',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  secondaryButtonText: {
    color:
      palette.white,

    fontWeight: '600',
  },

  buttonPressed: {
    opacity: 0.8,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },
});