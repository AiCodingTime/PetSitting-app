import { useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReducedMotion } from 'react-native-reanimated';
import { Copy, Field, Icon, TextLink, styles } from '@/design/ui';
import { palette } from '@/design/tokens';
import { DEMO_DAY, dateLabel, timeLabel } from '@/demo/model';

export function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value.slice(0, 7));
  const reduced = useReducedMotion();
  const [year, monthNumber] = month.split('-').map(Number);
  const first = new Date(year, monthNumber - 1, 1);
  const count = new Date(year, monthNumber, 0).getDate();
  const days = [...Array.from({ length: first.getDay() }, () => ''), ...Array.from({ length: count }, (_, i) => month + '-' + String(i + 1).padStart(2, '0'))];
  function move(offset: number) {
    const next = new Date(year, monthNumber - 1 + offset, 1);
    setMonth(next.getFullYear() + '-' + String(next.getMonth() + 1).padStart(2, '0'));
  }
  return <>
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => { setMonth(value.slice(0, 7)); setOpen(true); }} style={styles.rowLink}>
      <Icon name="calendar" /><View style={styles.flex}><Copy variant="caption" muted>{label}</Copy><Copy variant="label">{dateLabel(value)}, {value.slice(0, 4)}</Copy></View><Icon name="arrow" size={18} />
    </Pressable>
    <Modal visible={open} transparent animationType={reduced ? 'none' : 'slide'} onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, backgroundColor: '#17252E88', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pressable style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} accessibilityRole="button" accessibilityLabel="Dismiss date picker" onPress={() => setOpen(false)} />
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: palette.surface, padding: 20, width: '100%', maxWidth: 560, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <View style={styles.spread}><Copy variant="heading">Choose a date</Copy><TextLink label="Done" onPress={() => setOpen(false)} /></View>
          <View style={styles.spread}>
            <Pressable accessibilityRole="button" accessibilityLabel="Previous month" style={styles.back} onPress={() => move(-1)}><Icon name="back" /></Pressable>
            <Copy variant="label">{first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Copy>
            <Pressable accessibilityRole="button" accessibilityLabel="Next month" style={styles.back} onPress={() => move(1)}><Icon name="arrow" /></Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <Copy key={i} variant="caption" muted style={{ width: '14.2857%', textAlign: 'center', paddingVertical: 10 }}>{day}</Copy>)}</View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {days.map((day, i) => <View key={day || i} style={{ width: '14.2857%', padding: 2 }}>
              {day ? <Pressable accessibilityRole="button" accessibilityLabel={dateLabel(day)} accessibilityState={{ selected: day === value, disabled: day < DEMO_DAY }}
                disabled={day < DEMO_DAY} onPress={() => { onChange(day); setOpen(false); }}
                style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: day === value ? palette.ink : 'transparent', opacity: day < DEMO_DAY ? 0.3 : 1 }}>
                <Copy variant="label" style={{ color: day === value ? palette.white : palette.ink }}>{Number(day.slice(-2))}</Copy>
              </Pressable> : null}
            </View>)}
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  </>;
}

export function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const choices = Array.from({ length: 48 }, (_, i) => String((Math.floor(i / 2) + 6) % 24).padStart(2, '0') + ':' + (i % 2 ? '30' : '00'));
  return <>
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => setOpen(true)} style={[styles.input, { gap: 4 }]}>
      <Copy variant="caption" muted>{label}</Copy><Copy variant="label">{/^\d{2}:\d{2}$/.test(value) ? timeLabel(value) : value || 'Choose time'}</Copy>
    </Pressable>
    <Modal visible={open} transparent animationType={reduced ? 'none' : 'slide'} onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, backgroundColor: '#17252E88', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pressable style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} accessibilityRole="button" accessibilityLabel="Dismiss time picker" onPress={() => setOpen(false)} />
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: palette.surface, padding: 20, width: '100%', maxWidth: 560, maxHeight: '85%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <View style={styles.spread}><Copy variant="heading">{label}</Copy><TextLink label="Done" onPress={() => setOpen(false)} /></View>
          <Field label="Custom time" hint="24-hour · HH:MM" value={value} onChangeText={onChange} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}>
            <View style={styles.wrap}>{choices.map(time => <Pressable key={time} accessibilityRole="button" accessibilityLabel={timeLabel(time)}
              accessibilityState={{ selected: value === time }} onPress={() => { onChange(time); setOpen(false); }}
              style={[styles.chip, value === time && styles.chipSelected]}>
              <Copy variant="label" style={{ color: value === time ? palette.white : palette.ink }}>{timeLabel(time)}</Copy>
            </Pressable>)}</View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  </>;
}
