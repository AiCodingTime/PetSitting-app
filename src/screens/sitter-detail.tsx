import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Badge, Button, Card, Copy, Divider, EmptyState, Photo, Screen, Section, TextLink, styles } from '@/design/ui';
import { reviews, sitters } from '@/demo/data';
import { useDemo } from '@/demo/store';

export default function SitterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sitter = sitters.find(s => s.id === id);
  const demo = useDemo();
  const localReviews = demo.bookings.filter(b => b.sitterId === id && demo.reviewed[b.id]).map(b => demo.reviewed[b.id]);
  if (!sitter) return <Screen back="/owner/discover" title="Sitter unavailable"><EmptyState icon="person" title="Profile not found" /></Screen>;
  return (
    <Screen back="/owner/discover" title={sitter.name} footer={<View style={styles.spread}>
      <View><Copy variant="heading">From $15 / hour</Copy><Copy variant="caption" muted>1–2 animals</Copy></View>
      <Button label="Reserve care" onPress={() => router.push({ pathname: '/reserve/[id]', params: { id } })} />
    </View>}>
      <Photo uri={sitter.photo} label={sitter.name} size={260} wide />
      <View style={styles.spread}><Badge>Verified sitter · Demo</Badge><TextLink label={demo.saved.includes(id) ? 'Saved' : 'Save sitter'} onPress={() => demo.toggleSaved(id)} /></View>
      <Copy variant="heading">{sitter.headline}</Copy>
      <View style={styles.spread}>
        <View><Copy variant="heading">★ {sitter.rating}</Copy><Copy variant="caption" muted>{sitter.reviews} reviews</Copy></View>
        <View><Copy variant="heading">{sitter.completed}</Copy><Copy variant="caption" muted>Houses completed</Copy></View>
        <View><Copy variant="heading">{sitter.experience}</Copy><Copy variant="caption" muted>Experience</Copy></View>
      </View>
      <Divider />
      <Section title="About" action={<Copy variant="caption" muted>~{sitter.distance} miles away</Copy>}><Copy>{sitter.bio}</Copy></Section>
      <Section title="Care preferences"><View style={styles.wrap}>{sitter.types.map(t => <Badge key={t}>{t}</Badge>)}</View></Section>
      <Section title="Rates">
        <Copy>1–2 animals · $15/hr</Copy><Copy>3–4 · $20/hr   /   5–6 · $25/hr</Copy><Copy>7–8 · $35/hr   /   9–10 · $50/hr</Copy>
        <Copy variant="caption" muted>Day visits in this demo. Overnight care is agreed separately.</Copy>
      </Section>
      <Section title="Recent reviews">
        {localReviews.map((review, index) => <Card key={'local-' + index}><Copy variant="label">{demo.profile.name} · {review.stars}/5</Copy><Copy>{review.text || 'A rating from your demo booking.'}</Copy><Copy variant="caption" muted>Your demo review</Copy></Card>)}
        {reviews.map(review => <Card key={review.name}><View style={styles.spread}><Copy variant="label">{review.name}</Copy><Copy>★★★★★</Copy></View><Copy>{review.text}</Copy><Copy variant="caption" muted>{review.date} · Sample review</Copy></Card>)}
      </Section>
      <Copy variant="caption" muted>Verification, reviews, and activity are fictional. Stock portrait is illustrative.</Copy>
    </Screen>
  );
}
