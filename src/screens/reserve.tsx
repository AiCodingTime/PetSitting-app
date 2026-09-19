import { useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Button, Card, Copy, Field, Notice, Photo, Screen, TextLink, styles } from '@/design/ui';
import { sitters } from '@/demo/data';
import { useDemo } from '@/demo/store';
import { Visit, money, quote, validateVisits, visitLabel } from '@/demo/model';
import { palette } from '@/design/tokens';
import { DateField, TimeField } from '@/components/pickers';

export default function Reserve() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sitter = sitters.find(s => s.id === id);
  const demo = useDemo();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([{ date: '2026-10-14', start: '09:00', end: '10:00' }]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const submitted = useRef(false);
  const animals = demo.animals.filter(a => selected.includes(a.id));
  const cost = quote(animals.length, visits);
  if (!sitter) return <Screen title="Sitter unavailable" back="/owner/discover" />;
  const blocked = [...sitter.blocked, ...demo.bookings.filter(b => b.sitterId === id && ['Upcoming', 'Active'].includes(b.status)).flatMap(b => b.visits)];
  function validate() {
    if (!animals.length) return 'Choose at least one animal.';
    if (!cost.rate) return 'This demo supports reservations for 1–10 animals.';
    if (animals.some(a => !sitter!.types.includes(a.type))) return 'This sitter does not accept one of these animal types.';
    return validateVisits(visits, blocked);
  }
  function advance() {
    const issue = step === 0 ? (!animals.length ? 'Choose at least one animal.' : !cost.rate ? 'Choose up to 10 animals for this demo.' : '') : validate();
    if (issue) { setError(issue); return; }
    setError(''); setStep(step + 1);
  }
  function confirm() {
    const issue = validate();
    if (issue) { setError(issue); return; }
    if (submitted.current) return;
    submitted.current = true;
    const bookingId = demo.addBooking({
      role: 'owner', person: sitter!.name, photo: sitter!.photo, sitterId: id,
      animals: animals.map(a => a.name), visits, notes: notes || 'Follow the saved animal routines.',
      total: cost.gross, status: 'Upcoming', title: 'Care for ' + animals.map(a => a.name).join(' & '),
    });
    router.replace({ pathname: '/booking/[id]', params: { id: bookingId, confirmed: '1' } });
  }
  function updateVisit(index: number, key: keyof Visit, value: string) {
    setVisits(values => values.map((v, i) => i === index ? { ...v, [key]: value } : v));
  }
  const steps = ['Animals', 'Visits', 'Care details', 'Review'];
  return (
    <Screen scrollKey={step} back={{ pathname: '/caregiver/[id]', params: { id } }} title="Reserve care" subtitle={sitter.name}
      footer={<View style={{ gap: 12 }}>
        {step > 0 && <View style={styles.spread}><TextLink label="Previous step" onPress={() => { setStep(step - 1); setError(''); }} /><Copy variant="label">{money(Number.isFinite(cost.gross) ? cost.gross : 0)} total</Copy></View>}
        <Button label={step === 3 ? 'Confirm demo reservation' : 'Continue'} onPress={step === 3 ? confirm : advance} />
      </View>}>
      <View style={styles.row}>{steps.map((label, i) => <View key={label} style={{ flex: 1, gap: 8 }}><View style={{ height: 3, backgroundColor: i <= step ? palette.accent : palette.border }} /><Copy variant="caption" muted>{i + 1}. {label}</Copy></View>)}</View>
      {error ? <Notice>{error}</Notice> : null}
      <Copy variant="heading">{['Who needs care?', 'Plan each visit', 'The little details', 'Review your reservation'][step]}</Copy>
      {step === 0 && demo.animals.map(animal => (
        <Pressable key={animal.id} accessibilityRole="checkbox" accessibilityLabel={animal.name}
          accessibilityState={{ checked: selected.includes(animal.id), disabled: !sitter.types.includes(animal.type) }}
          disabled={!sitter.types.includes(animal.type)}
          onPress={() => setSelected(values => values.includes(animal.id) ? values.filter(v => v !== animal.id) : [...values, animal.id])}>
          <Card style={{ borderColor: selected.includes(animal.id) ? palette.accent : palette.border, opacity: sitter.types.includes(animal.type) ? 1 : 0.45 }}>
            <View style={styles.row}><Photo uri={animal.photo} label={animal.name} size={56} /><View style={styles.flex}><Copy variant="heading">{animal.name}</Copy><Copy muted>{animal.type} · {animal.age}</Copy></View><Copy>{selected.includes(animal.id) ? '✓' : '+'}</Copy></View>
          </Card>
        </Pressable>
      ))}
      {step === 1 && <>
        {visits.map((visit, index) => <Card key={index}>
          <View style={styles.spread}><Copy variant="heading">Visit {index + 1}</Copy>{visits.length > 1 && <TextLink label={'Remove visit ' + (index + 1)} onPress={() => setVisits(values => values.filter((_, i) => i !== index))} />}</View>
          <DateField label={'Date for visit ' + (index + 1)} value={visit.date} onChange={v => updateVisit(index, 'date', v)} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}><TimeField label={'Start ' + (index + 1)} value={visit.start} onChange={v => updateVisit(index, 'start', v)} /></View>
            <View style={{ flex: 1 }}><TimeField label={'End ' + (index + 1)} value={visit.end} onChange={v => updateVisit(index, 'end', v)} /></View>
          </View>
        </Card>)}
        <Button label="Add visit" secondary onPress={() => setVisits(values => [...values, { date: values[values.length - 1].date, start: '17:00', end: '18:00' }])} />
        <Copy variant="caption" muted>Separate visits, on the same day or across different days.</Copy>
      </>}
      {step === 2 && <>
        <Field label="Care instructions" placeholder="Feeding, walks, medication, and routines…" multiline numberOfLines={5} style={{ minHeight: 140, textAlignVertical: 'top' }} value={notes} onChangeText={setNotes} />
        {animals.map(a => <Card key={a.id}><Copy variant="label">{a.name} · Saved routine</Copy><Copy muted>{a.notes}</Copy></Card>)}
      </>}
      {step === 3 && <>
        <Card><Copy variant="heading">{sitter.name}</Copy><Copy>{animals.map(a => a.name).join(' & ')}</Copy>{visits.map((v, i) => <Copy key={i}>{visitLabel(v)}</Copy>)}</Card>
        <Card><View style={styles.spread}><Copy>{cost.hours} hours × {money(cost.rate)}</Copy><Copy>{money(cost.gross)}</Copy></View><View style={styles.spread}><Copy variant="heading">Total</Copy><Copy variant="heading">{money(cost.gross)}</Copy></View><Copy variant="caption" muted>No added platform fee for the owner.</Copy></Card>
        {notes ? <Copy muted>{notes}</Copy> : null}
        <Notice>This demo simulates sitter acceptance and confirmation. No payment is collected.</Notice>
      </>}
    </Screen>
  );
}
