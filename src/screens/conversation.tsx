import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button, Copy, EmptyState, Field, Notice, Screen, TextLink, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { palette } from '@/design/tokens';

export default function Conversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const demo = useDemo();
  const [text, setText] = useState('');
  const booking = demo.bookings.find(b => b.id === id);
  if (!booking || booking.status === 'Cancelled') return <Screen back="/owner/messages" title="Conversation unavailable"><EmptyState icon="message" title="A match is required" /></Screen>;
  return (
    <Screen autoScroll back={booking.role === 'owner' ? '/owner/messages' : '/sitter/messages'} title={booking.person}
      footer={<View style={{ gap: 8 }}>
        <Field label="Message" placeholder="Write a message…" value={text} onChangeText={setText} multiline maxLength={2000} />
        <Button label="Send message" disabled={!text.trim()} onPress={() => { demo.sendMessage(id, text); setText(''); }} />
      </View>}>
      <View style={styles.spread}><Copy variant="caption" muted>{booking.title}</Copy><TextLink label="View booking" onPress={() => router.push({ pathname: '/booking/[id]', params: { id } })} /></View>
      <Notice>Demo conversation · Messages stay on this device until reset.</Notice>
      {(demo.messages[id] ?? []).map(message => (
        <View key={message.id} style={{ alignSelf: message.mine ? 'flex-end' : 'flex-start', maxWidth: '90%', gap: 5 }}>
          <View style={{ padding: 16, borderRadius: 18, backgroundColor: message.mine ? palette.ink : palette.surface }}>
            <Copy style={{ color: message.mine ? palette.white : palette.ink }}>{message.text}</Copy>
          </View>
          <Copy variant="caption" muted style={{ textAlign: message.mine ? 'right' : 'left' }}>{message.time}{message.mine ? ' · Local only' : ''}</Copy>
        </View>
      ))}
    </Screen>
  );
}
