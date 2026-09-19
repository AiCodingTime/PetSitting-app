import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Card, Copy, EmptyState, Field, Notice, Screen, TextLink, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { DEMO_DAY, dateLabel, timeLabel, validateVisits } from '@/demo/model';
import { palette } from '@/design/tokens';

export default function Schedule() {
  const demo = useDemo();
  const [date, setDate] = useState(DEMO_DAY);
  const [week, setWeek] = useState(0);
  const [editing, setEditing] = useState(false);
  const [start, setStart] = useState('12:00');
  const [end, setEnd] = useState('14:00');
  const [error, setError] = useState('');
  function changeWeek(value: number) {
    const next = Math.max(0, value);
    const first = new Date(DEMO_DAY + 'T12:00:00Z');
    first.setUTCDate(first.getUTCDate() + next * 7);
    setWeek(next); setDate(first.toISOString().slice(0, 10)); setError('');
  }
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(DEMO_DAY + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + week * 7 + i);
    return d.toISOString().slice(0, 10);
  });
  const booked = demo.bookings.filter(b => b.role === 'sitter' && ['Upcoming', 'Active'].includes(b.status));
  const events = booked.flatMap(b => b.visits.filter(v => v.date === date).map(v => ({ ...v, title: b.title, id: b.id }))).sort((a, b) => a.start.localeCompare(b.start));
  const unavailable = demo.blocks.filter(b => b.date === date);
  function block() {
    const value = { date, start, end };
    const issue = validateVisits([value], [...demo.blocks, ...booked.flatMap(b => b.visits)]);
    if (issue) { setError(issue); return; }
    demo.setBlocks(values => [...values, value]); setEditing(false); setError('');
  }
  return (
    <Screen role="sitter" title="Schedule" subtitle={new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + ' · Demo calendar'}>
      <View style={styles.spread}><TextLink label="Previous week" onPress={() => changeWeek(week - 1)} /><TextLink label="Next week" onPress={() => changeWeek(week + 1)} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {days.map(day => <Pressable key={day} accessibilityRole="button" accessibilityLabel={dateLabel(day)} accessibilityState={{ selected: date === day }} onPress={() => { setDate(day); setError(''); }}
          style={{ width: 54, paddingVertical: 14, alignItems: 'center', gap: 6, borderRadius: 16, backgroundColor: date === day ? palette.ink : palette.surface }}>
          <Copy variant="caption" style={{ color: date === day ? palette.white : palette.muted }}>{new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}</Copy>
          <Copy variant="heading" style={{ color: date === day ? palette.white : palette.ink }}>{Number(day.slice(-2))}</Copy>
        </Pressable>)}
      </ScrollView>
      <View style={styles.spread}><Copy variant="heading">{dateLabel(date)}</Copy><TextLink label={editing ? 'Close editor' : 'Block time'} onPress={() => setEditing(!editing)} /></View>
      {events.map((event, i) => <Pressable key={i} accessibilityRole="button" accessibilityLabel={'Open ' + event.title} onPress={() => router.push({ pathname: '/booking/[id]', params: { id: event.id } })}>
        <Card style={{ borderLeftWidth: 3, borderLeftColor: palette.accent }}><Copy variant="caption" muted>{timeLabel(event.start)}–{timeLabel(event.end)} · Booked</Copy><Copy variant="heading">{event.title}</Copy></Card>
      </Pressable>)}
      {unavailable.map((block, i) => <Card key={i} style={{ backgroundColor: palette.neutral }}>
        <Copy variant="label">{timeLabel(block.start)}–{timeLabel(block.end)} · Unavailable</Copy>
        <TextLink label={'Remove block ' + block.start} onPress={() => demo.setBlocks(values => values.filter(v => v !== block))} />
      </Card>)}
      {!events.length && !unavailable.length && <EmptyState icon="calendar" title="Your day is open" detail="No demo visits or blocked times." />}
      {editing && <Card>
        <Copy variant="heading">Unavailable on {dateLabel(date)}</Copy>
        <Field label="Block start" value={start} onChangeText={setStart} hint="24-hour · HH:MM" />
        <Field label="Block end" value={end} onChangeText={setEnd} hint="24-hour · HH:MM" />
        {error ? <Notice>{error}</Notice> : null}
        <Button label="Save blocked time" onPress={block} />
      </Card>}
      <Copy variant="caption" muted>Open time is available in this demo. Changes also update job filtering.</Copy>
    </Screen>
  );
}
