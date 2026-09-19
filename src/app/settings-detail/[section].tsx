import { useLocalSearchParams } from 'expo-router';
import { Switch, View } from 'react-native';
import { Card, Copy, Notice, Screen, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { palette } from '@/design/tokens';

export default function SettingsDetail() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const demo = useDemo();
  const title = ({ notifications: 'Notifications', payments: 'Payment methods', privacy: 'Privacy & security', terms: 'Terms & policies' } as Record<string, string>)[section] ?? 'Settings';
  return <Screen back="/settings" title={title}>
    {section === 'notifications' ? <>
      <Notice>Local preferences only. No notifications are sent.</Notice>
      {['New messages', 'New matches', 'Upcoming bookings', 'Active-visit photo reminders', 'Payments', 'Reviews', 'Appeal updates'].map(label => <View key={label} style={styles.rowLink}>
        <Copy style={{ flex: 1 }}>{label}</Copy>
        <Switch accessibilityLabel={label} value={demo.preferences[label] ?? false} trackColor={{ true: palette.accent }}
          onValueChange={value => demo.setPreferences(p => ({ ...p, [label]: value }))} />
      </View>)}
    </> : section === 'payments' ? <>
      <Card><Copy variant="heading">No payment method connected</Copy><Copy muted>Reservations use a demo checkout. No card details are collected.</Copy></Card>
      <Copy muted>Stripe payment methods and sitter payouts will be connected in a later stage.</Copy>
    </> : section === 'privacy' ? <>
      <Card><Copy variant="heading">Your location stays private</Copy><Copy>Discovery shows approximate distances, never residential pins or addresses.</Copy></Card>
      <Card><Copy variant="heading">This demo stays local</Copy><Copy>Forms and messages are held in memory. Reload or reset to clear them.</Copy></Card>
      <Copy variant="caption" muted>Account deletion, identity verification, and production security controls are not connected.</Copy>
    </> : <><Notice>Policy preview · No binding agreement</Notice><Copy>Production terms, privacy notices, and cancellation policies will be provided before launch.</Copy><Copy muted>This demo does not take payments, issue refunds, or create real bookings.</Copy></>}
  </Screen>;
}
