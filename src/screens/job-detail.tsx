import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Badge, Button, Card, Copy, EmptyState, Notice, Photo, Screen, Section, TextLink, styles } from '@/design/ui';
import { jobs } from '@/demo/data';
import { useDemo } from '@/demo/store';
import { money, quote, validateVisits, visitLabel } from '@/demo/model';

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);
  const demo = useDemo();
  const [error, setError] = useState('');
  if (!job) return <Screen back="/sitter/discover" title="Request not found"><EmptyState icon="search" title="This request is unavailable" /></Screen>;
  const cost = quote(job.animals.length, job.visits);
  const sent = demo.offers.includes(id);
  const existing = demo.bookings.find(b => b.id === 'job-' + id);
  const blocked = [...demo.blocks, ...demo.bookings.filter(b => b.role === 'sitter' && ['Upcoming', 'Active'].includes(b.status)).flatMap(b => b.visits)];
  function send() {
    const issue = validateVisits(job!.visits, blocked);
    if (issue) { setError(issue); return; }
    setError('');
    demo.setOffers(values => values.includes(id) ? values : [...values, id]);
  }
  function accept() {
    const issue = validateVisits(job!.visits, blocked);
    if (issue) { setError(issue); return; }
    const bookingId = demo.acceptJob(id);
    router.replace({ pathname: '/booking/[id]', params: { id: bookingId, confirmed: '1' } });
  }
  return (
    <Screen back="/sitter/discover" title={job.title}>
      <View style={styles.row}><Photo uri={job.photo} label={job.owner} size={64} /><View style={styles.flex}><Copy variant="heading">{job.owner}</Copy><Copy muted>~{job.distance} miles away</Copy></View></View>
      <View style={styles.wrap}>{job.types.map(type => <Badge key={type}>{type}</Badge>)}<Badge>{job.animals.length} animal{job.animals.length > 1 ? 's' : ''}</Badge></View>
      <Section title="Visit schedule">{job.visits.map((visit, i) => <Copy key={i}>{visitLabel(visit)}</Copy>)}</Section>
      <Section title="Care notes"><Copy>{job.notes}</Copy></Section>
      <Card>
        <View style={styles.spread}><Copy>{cost.hours} hrs × {money(cost.rate)}</Copy><Copy>{money(cost.gross)}</Copy></View>
        <View style={styles.spread}><Copy muted>Platform fee · 25%</Copy><Copy muted>−{money(cost.fee)}</Copy></View>
        <View style={styles.spread}><Copy variant="heading">Estimated payout</Copy><Copy variant="heading">{money(cost.payout)}</Copy></View>
      </Card>
      {error ? <Notice>{error}</Notice> : null}
      {existing ? <Button label="View booking" onPress={() => router.push({ pathname: '/booking/[id]', params: { id: existing.id } })} /> : sent ? <>
        <Notice>Demo offer sent. No customer has been contacted.</Notice>
        <Button label="Simulate owner acceptance" onPress={accept} />
        <TextLink label="Withdraw offer" onPress={() => demo.setOffers(values => values.filter(v => v !== id))} />
      </> : <>
        <Button label="Send demo offer" onPress={send} />
        <TextLink label="Skip this request" onPress={() => { demo.setSkipped(values => [...values, id]); router.back(); }} />
      </>}
      <Copy variant="caption" muted>Home addresses stay private. Chat opens after acceptance.</Copy>
    </Screen>
  );
}
