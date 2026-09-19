import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Button, Copy, Photo, QuickLink, Role, Screen, Section, TextLink, styles } from '@/design/ui';
import { BookingCard, SitterCard, JobCard } from '@/components/marketplace';
import { useDemo } from '@/demo/store';
import { jobs, sitters } from '@/demo/data';
import { DEMO_DAY, money, overlaps, pricing, timeLabel } from '@/demo/model';
import { palette } from '@/design/tokens';

export default function Home({ role }: { role: Role }) {
  const demo = useDemo();
  const owner = role === 'owner';
  const upcoming = demo.bookings.filter(b => b.role === role && b.status === 'Upcoming').sort((a, b) => (a.visits[0].date + a.visits[0].start).localeCompare(b.visits[0].date + b.visits[0].start));
  const visits = upcoming.flatMap(b => b.visits.filter(v => v.date === DEMO_DAY).map(v => ({ ...v, title: b.title, id: b.id }))).sort((a, b) => a.start.localeCompare(b.start));
  const earnings = demo.bookings.filter(b => b.role === 'sitter' && b.status === 'Completed').reduce((sum, b) => sum + b.total * (1 - pricing.platformFee), 0);
  const occupied = [...demo.blocks, ...demo.bookings.filter(b => b.role === 'sitter' && ['Upcoming', 'Active'].includes(b.status)).flatMap(b => b.visits)];
  const job = jobs.find(j => !demo.skipped.includes(j.id) && !demo.bookings.some(b => b.id === 'job-' + j.id) && !j.visits.some(v => occupied.some(b => overlaps(v, b))));
  return (
    <Screen role={role} title={'Good morning, ' + demo.profile.name.split(' ')[0]} subtitle={owner ? 'Denver area' : 'Monday, October 12 · Demo day'}>
      <View style={{ padding: 20, borderRadius: 20, backgroundColor: palette.ink, gap: 16 }}>
        <Copy variant="heading" style={{ color: palette.white }}>{owner ? 'Find their next sitter' : 'Find your next visit'}</Copy>
        <Button label={owner ? 'Find a Sitter' : 'Find Customers'} href={owner ? '/owner/discover' : '/sitter/discover'} />
      </View>
      <View style={styles.row}>
        <QuickLink title={owner ? 'Bookings' : 'Schedule'} icon="calendar" href={owner ? '/owner/bookings' : '/sitter/schedule'} />
        <QuickLink title="Messages" icon="message" href={owner ? '/owner/messages' : '/sitter/messages'} />
        <QuickLink title={owner ? 'Animals' : 'Profile'} icon={owner ? 'paw' : 'person'} href={owner ? '/owner/animals' : '/sitter/profile'} />
      </View>
      {upcoming[0] && <Section title="Up next" action={<TextLink label="View all" href={owner ? '/owner/bookings' : '/sitter/bookings'} />}><BookingCard booking={upcoming[0]} /></Section>}
      {owner ? <>
        <Section title="Your animals" action={<TextLink label="Manage" href="/owner/animals" />}>
          <View style={styles.wrap}>{demo.animals.map(animal => <Pressable key={animal.id} accessibilityRole="button" accessibilityLabel={'Edit ' + animal.name}
            onPress={() => router.push({ pathname: '/animal/[id]', params: { id: animal.id } })} style={{ gap: 8, alignItems: 'center', marginRight: 8 }}>
            <Photo uri={animal.photo} label={animal.name} size={76} /><Copy variant="label">{animal.name}</Copy>
          </Pressable>)}</View>
        </Section>
        <Section title="Around your neighborhood"><SitterCard sitter={sitters[0]} /></Section>
      </> : <>
        <Section title="Today">
          {visits.length ? visits.map((visit, i) => <Pressable key={i} accessibilityRole="button" accessibilityLabel={'Visit ' + visit.title}
            onPress={() => router.push({ pathname: '/booking/[id]', params: { id: visit.id } })} style={styles.rowLink}>
            <Copy variant="label" style={{ width: 76 }}>{timeLabel(visit.start)}</Copy><Copy style={{ flex: 1 }}>{visit.title}</Copy>
          </Pressable>) : <Copy muted>No visits today.</Copy>}
        </Section>
        <View style={[styles.spread, { paddingVertical: 18, borderTopWidth: 1, borderColor: palette.border }]}>
          <View><Copy variant="label">Demo earnings</Copy><Copy variant="caption" muted>Completed care · After 25% fee</Copy></View>
          <Copy variant="title">{money(earnings)}</Copy>
        </View>
        {job && <Section title="A good fit nearby"><JobCard job={job} /></Section>}
      </>}
    </Screen>
  );
}
