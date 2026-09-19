import { useState } from 'react';
import { Button, Chips, Copy, Field, Notice, Screen } from '@/design/ui';

export default function Support() {
  const [category, setCategory] = useState('Booking');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  return <Screen back="/settings" title="Help & support" subtitle="What can we help with?">
    <Chips values={['Booking', 'Payment', 'Account', 'Safety', 'Other']} selected={category} onChange={setCategory} />
    <Field label="Your message" placeholder="Tell us what happened…" value={message} onChangeText={setMessage} multiline style={{ minHeight: 130 }} />
    {sent ? <Notice>Demo request recorded on this screen. No support team was contacted.</Notice> : <Button label="Preview support request" disabled={!message.trim()} onPress={() => setSent(true)} />}
    <Copy variant="caption" muted>Demo only. This is not a monitored support channel.</Copy>
  </Screen>;
}
