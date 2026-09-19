import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Keyboard, Pressable, View } from 'react-native';
import { Button, Copy, Field, Icon, Notice, Photo, Screen, TextLink, styles } from '@/design/ui';
import { photos } from '@/demo/data';
import { useDemo } from '@/demo/store';
import { validDate } from '@/demo/model';
import { palette } from '@/design/tokens';

function continueDemo() {
  Keyboard.dismiss();
  if (router.canDismiss()) router.dismissAll();
  router.replace('/choose-role');
}
export function Welcome() {
  return (
    <Screen entry>
      <Photo uri={photos.dog} label="Golden retriever outdoors" wide size={300} />
      <View style={{ gap: 12 }}>
        <Copy variant="caption" muted>LOCAL CARE. FAMILIAR FACES.</Copy>
        <Copy variant="hero" accessibilityRole="header">Care that feels close.</Copy>
        <Copy muted>Find a sitter. Or be someone’s go-to.</Copy>
      </View>
      <View style={{ gap: 12, marginTop: 'auto' }}>
        <Button label="Log In" href="/login" />
        <Button label="Create Account" secondary href="/signup" />
        <Copy variant="caption" muted style={styles.center}>Interactive demo · No real accounts or payments</Copy>
      </View>
    </Screen>
  );
}
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  return (
    <Screen entry back="/" title="Welcome back" subtitle="Use sample details to explore.">
      <Field label="Email" placeholder="alex@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Field label="Password" placeholder="Sample password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
      <TextLink label="Forgot password?" href="/forgot-password" />
      {error ? <Notice>{error}</Notice> : null}
      <Button label="Log In" onPress={() => { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) setError('Enter a sample email and a password of at least 6 characters.'); else continueDemo(); }} />
      <TextLink label="Try the demo account" onPress={continueDemo} />
      <TextLink label="New here? Sign Up" onPress={() => router.replace('/signup')} />
    </Screen>
  );
}
export function Signup() {
  const demo = useDemo();
  const [fields, setFields] = useState({ first: '', last: '', email: '', phone: '', password: '', dob: '' });
  const [error, setError] = useState('');
  const change = (key: keyof typeof fields, value: string) => setFields(previous => ({ ...previous, [key]: value }));
  function submit() {
    if (Object.values(fields).some(value => !value.trim())) { setError('Complete each field with sample details.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) { setError('Enter a valid sample email.'); return; }
    if (fields.password.length < 6 || fields.phone.replace(/\D/g, '').length < 7) { setError('Use at least 6 password characters and a complete phone number.'); return; }
    if (!validDate(fields.dob)) { setError('Use YYYY-MM-DD for date of birth.'); return; }
    const now = new Date();
    const cutoff = new Date(now.getFullYear() - 15, now.getMonth(), now.getDate());
    if (new Date(fields.dob + 'T00:00:00') > cutoff) { setError('You must be at least 15.'); return; }
    demo.setProfile(p => ({ ...p, name: fields.first.trim() + ' ' + fields.last.trim() }));
    continueDemo();
  }
  return (
    <Screen entry back="/" title="Create your account" subtitle="Demo only · Use fictional details">
      <Field label="First name" value={fields.first} onChangeText={v => change('first', v)} autoCapitalize="words" />
      <Field label="Last name" value={fields.last} onChangeText={v => change('last', v)} autoCapitalize="words" />
      <Field label="Email" value={fields.email} onChangeText={v => change('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone" value={fields.phone} onChangeText={v => change('phone', v)} keyboardType="phone-pad" />
      <Field label="Password" value={fields.password} onChangeText={v => change('password', v)} secureTextEntry autoCapitalize="none" />
      <Field label="Date of birth" placeholder="YYYY-MM-DD" hint="Age 15 or older" value={fields.dob} onChangeText={v => change('dob', v)} />
      {error ? <Notice>{error}</Notice> : null}
      <Button label="Create Account" onPress={submit} />
      <TextLink label="Use sample details" onPress={() => { setError(''); setFields({ first: 'Alex', last: 'Morgan', email: 'alex@example.com', phone: '5550101234', password: 'demo-only', dob: '2000-01-15' }); }} />
      <TextLink label="Already registered? Log In" onPress={() => router.replace('/login')} />
    </Screen>
  );
}
export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return <Screen entry back="/login" title="Reset password" subtitle="A fresh start.">
    <Field label="Email" placeholder="alex@example.com" keyboardType="email-address" autoCapitalize="none" />
    {sent ? <Notice>Reset preview complete. No email was sent.</Notice> : <Copy muted>This preview does not contact an email service.</Copy>}
    <Button label={sent ? 'Back to Log In' : 'Preview reset'} onPress={() => sent ? router.replace('/login') : setSent(true)} />
  </Screen>;
}
export function ChooseRole() {
  const { from } = useLocalSearchParams<{ from?: string }>();
  function choose(role: 'owner' | 'sitter') {
    if (router.canDismiss()) router.dismissAll();
    router.replace(role === 'owner' ? '/owner' : '/sitter');
  }
  return (
    <Screen entry back={from === 'owner' ? '/owner/profile' : from === 'sitter' ? '/sitter/profile' : undefined} title="What are you here to do?" subtitle="One account. Either side of care.">
      {([{ role: 'owner', title: 'I need animal care', detail: 'Find your sitter', icon: 'home' }, { role: 'sitter', title: 'I want to provide animal care', detail: 'Explore local jobs', icon: 'calendar' }] as const).map(choice => (
        <Pressable key={choice.role} accessibilityRole="button" accessibilityLabel={choice.title} onPress={() => choose(choice.role)}
          style={({ pressed }) => [styles.card, { padding: 24, minHeight: 174, gap: 20 }, pressed && styles.pressed]}>
          <View style={styles.spread}><Icon name={choice.icon} color={palette.accent} size={30} /><Icon name="arrow" size={22} /></View>
          <View style={{ gap: 6 }}><Copy variant="heading">{choice.title}</Copy><Copy muted>{choice.detail}</Copy></View>
        </Pressable>
      ))}
      <Copy variant="caption" muted>You can switch in Profile at any time.</Copy>
    </Screen>
  );
}
