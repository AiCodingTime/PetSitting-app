import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Badge, Button, Card, Chips, Copy, EmptyState, Field, Notice, Photo, Screen, Section, TextLink, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { money, pricing, visitLabel } from '@/demo/model';

export default function BookingDetail() {
  const { id, confirmed } = useLocalSearchParams<{ id: string; confirmed?: string }>();
  const demo = useDemo();
  const booking = demo.bookings.find(b => b.id === id);
  const [cancel, setCancel] = useState(false);
  const [stars, setStars] = useState('5');
  const [review, setReview] = useState('');
  if (!booking) return <Screen back="/owner/bookings" title="Booking not found"><EmptyState icon="calendar" title="This demo booking is unavailable" /></Screen>;
  const owner = booking.role === 'owner';
  return (
    <Screen back={owner ? '/owner/bookings' : '/sitter/bookings'} title={confirmed && booking.status === 'Upcoming' ? 'You’re all set' : 'Booking details'}>
      {confirmed && booking.status === 'Upcoming' && <Notice>Demo reservation confirmed. No payment was taken.</Notice>}
      <View style={styles.spread}><Badge>{booking.status}</Badge><Copy variant="caption" muted>Demo reservation</Copy></View>
      <View style={styles.row}><Photo uri={booking.photo} label={booking.person} size={68} /><View style={styles.flex}><Copy variant="heading">{booking.person}</Copy><Copy muted>{owner ? 'Your sitter' : 'Animal owner'}</Copy></View></View>
      <Copy variant="heading">{booking.title}</Copy>
      <Section title="Visits">{booking.visits.map((v, i) => <View key={i} style={styles.rowLink}><Copy variant="label" style={{ width: 24 }}>{i + 1}</Copy><Copy style={{ flex: 1 }}>{visitLabel(v)}</Copy></View>)}</Section>
      <Section title="Care details"><Copy>{booking.animals.join(' · ')}</Copy><Copy muted>{booking.notes}</Copy></Section>
      <Card>
        <View style={styles.spread}><Copy>Booking total</Copy><Copy variant="heading">{money(booking.total)}</Copy></View>
        {!owner && <><View style={styles.spread}><Copy muted>Platform fee · 25%</Copy><Copy muted>−{money(booking.total * pricing.platformFee)}</Copy></View><View style={styles.spread}><Copy variant="label">Estimated payout</Copy><Copy variant="label">{money(booking.total * (1 - pricing.platformFee))}</Copy></View></>}
        <Copy variant="caption" muted>Demo only · No charge or payout</Copy>
      </Card>
      {booking.status !== 'Cancelled' && <Button label={'Message ' + booking.person.split(' ')[0]} onPress={() => router.push({ pathname: '/conversation/[id]', params: { id } })} />}
      {booking.status === 'Completed' && owner && <Section title="Your review">
        {demo.reviewed[id] ? <Notice>Saved in this demo · {demo.reviewed[id].stars} stars</Notice> : <>
          <Copy variant="label">Rating out of 5</Copy>
          <Chips values={['1', '2', '3', '4', '5']} selected={stars} onChange={setStars} />
          <Field label="Review" value={review} onChangeText={setReview} placeholder="How was the care?" multiline />
          <Button label="Save demo review" secondary onPress={() => demo.setReviewed(values => ({ ...values, [id]: { stars: Number(stars), text: review } }))} />
        </>}
      </Section>}
      {booking.status === 'Upcoming' && (cancel ? <Card>
        <Copy variant="heading">Cancel this demo booking?</Copy>
        <Copy muted>No refund will be issued because no payment was taken.</Copy>
        <Button label="Confirm cancellation" onPress={() => { demo.cancelBooking(id); setCancel(false); }} />
        <TextLink label="Keep booking" onPress={() => setCancel(false)} />
      </Card> : <TextLink label="Cancel booking" onPress={() => setCancel(true)} />)}
      <TextLink label="Help with this booking" href="/support" />
      <Button label="Back to bookings" secondary onPress={() => router.dismissTo(owner ? '/owner/bookings' : '/sitter/bookings')} />
    </Screen>
  );
}
