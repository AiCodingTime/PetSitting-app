import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Copy, EmptyState, Photo, Role, Screen, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';

export default function Messages({ role }: { role: Role }) {
  const { bookings, messages } = useDemo();
  const conversations = bookings.filter(b => b.role === role && b.status !== 'Cancelled');
  return (
    <Screen role={role} title="Messages">
      {conversations.map(booking => {
        const conversation = messages[booking.id] ?? [];
        const last = conversation[conversation.length - 1];
        return <Pressable key={booking.id} accessibilityRole="button" accessibilityLabel={'Chat with ' + booking.person}
          onPress={() => router.push({ pathname: '/conversation/[id]', params: { id: booking.id } })} style={styles.rowLink}>
          <Photo uri={booking.photo} label={booking.person} size={56} />
          <View style={styles.flex}><View style={styles.spread}><Copy variant="label">{booking.person}</Copy><Copy variant="caption" muted>{last?.time ?? 'Matched'}</Copy></View><Copy muted numberOfLines={2}>{last?.text ?? 'You’re matched. Say hello.'}</Copy></View>
        </Pressable>;
      })}
      {!conversations.length && <EmptyState icon="message" title="No conversations yet" detail="Conversations open after a match." />}
    </Screen>
  );
}
