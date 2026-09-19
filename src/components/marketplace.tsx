import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Badge, Card, Copy, Icon, Photo, styles } from '@/design/ui';
import { Booking, Job, Sitter, dateLabel, money, quote, visitLabel } from '@/demo/model';
import { useDemo } from '@/demo/store';
import { palette } from '@/design/tokens';

export function SitterCard({ sitter }: { sitter: Sitter }) {
  const { saved, toggleSaved } = useDemo();
  return (
    <Card>
      <View style={styles.row}>
        <Pressable accessibilityRole="button" accessibilityLabel={'View ' + sitter.name}
          style={[styles.row, { flex: 1 }]} onPress={() => router.push({ pathname: '/caregiver/[id]', params: { id: sitter.id } })}>
          <Photo uri={sitter.photo} label={sitter.name} size={78} />
          <View style={styles.flex}>
            <Copy variant="heading">{sitter.name}</Copy>
            <Copy variant="caption" muted>★ {sitter.rating} ({sitter.reviews}) · ~{sitter.distance} mi</Copy>
            <Copy variant="caption" muted>{sitter.experience} experience</Copy>
          </View>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={(saved.includes(sitter.id) ? 'Unsave ' : 'Save ') + sitter.name}
          accessibilityState={{ selected: saved.includes(sitter.id) }} onPress={() => toggleSaved(sitter.id)} style={styles.back}>
          <Icon name="heart" color={saved.includes(sitter.id) ? palette.accent : palette.muted} />
        </Pressable>
      </View>
      <Copy>{sitter.headline}</Copy>
      <View style={styles.spread}>
        <Copy variant="caption" muted>{sitter.types.join(' · ')}</Copy>
        <Copy variant="label">From $15 / hr</Copy>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={'Meet ' + sitter.name}
        onPress={() => router.push({ pathname: '/caregiver/[id]', params: { id: sitter.id } })} style={[styles.rowLink, { borderBottomWidth: 0, minHeight: 44, paddingVertical: 4 }]}>
        <Icon name="shield" size={18} color={palette.accent} />
        <Copy variant="caption" style={{ flex: 1 }}>Verified · Demo profile</Copy>
        <Icon name="arrow" size={20} />
      </Pressable>
    </Card>
  );
}
export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={'Open ' + booking.title}
      onPress={() => router.push({ pathname: '/booking/[id]', params: { id: booking.id } })}>
      <Card>
        <View style={styles.spread}><Badge>{booking.status}</Badge><Copy variant="caption" muted>{dateLabel(booking.visits[0].date)}</Copy></View>
        <View style={styles.row}>
          <Photo uri={booking.photo} label={booking.person} size={54} />
          <View style={styles.flex}><Copy variant="heading">{booking.title}</Copy><Copy muted>{booking.person}</Copy></View>
          <Icon name="arrow" size={20} />
        </View>
        <Copy variant="caption" muted>{booking.visits.length} visit{booking.visits.length > 1 ? 's' : ''} · {visitLabel(booking.visits[0])}</Copy>
      </Card>
    </Pressable>
  );
}
export function JobCard({ job }: { job: Job }) {
  const { offers } = useDemo();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={'View ' + job.title}
      onPress={() => router.push({ pathname: '/job/[id]', params: { id: job.id } })}>
      <Card>
        <View style={styles.spread}><Badge>{offers.includes(job.id) ? 'Offer sent' : job.types.join(' · ')}</Badge><Copy variant="caption" muted>~{job.distance} mi</Copy></View>
        <Copy variant="heading">{job.title}</Copy>
        <Copy muted>{dateLabel(job.visits[0].date)} · {job.visits.length} visit{job.visits.length > 1 ? 's' : ''} · {job.animals.length} animal{job.animals.length > 1 ? 's' : ''}</Copy>
        <View style={styles.spread}>
          <View style={styles.row}><Photo uri={job.photo} label={job.owner} size={36} /><Copy variant="caption">{job.owner}</Copy></View>
          <Copy variant="label">{money(quote(job.animals.length, job.visits).payout)} est. net</Copy>
        </View>
      </Card>
    </Pressable>
  );
}
