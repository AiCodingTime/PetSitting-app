import { useState } from 'react';
import { View } from 'react-native';
import { Chips, Copy, EmptyState, Field, Role, Screen, TextLink, styles } from '@/design/ui';
import { jobs, sitters } from '@/demo/data';
import { useDemo } from '@/demo/store';
import { overlaps } from '@/demo/model';
import { JobCard, SitterCard } from '@/components/marketplace';

export default function Discover({ role }: { role: Role }) {
  const demo = useDemo();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [range, setRange] = useState('Any distance');
  const [sort, setSort] = useState('Nearest');
  const [savedOnly, setSavedOnly] = useState(false);
  const [filters, setFilters] = useState(false);
  const owner = role === 'owner';
  const blocked = [...demo.blocks, ...demo.bookings.filter(b => b.role === 'sitter' && ['Upcoming', 'Active'].includes(b.status)).flatMap(b => b.visits)];
  const matchingSitters = sitters.filter(s => (type === 'All' || s.types.some(t => t === type))
    && (range !== 'Within 3 miles' || s.distance <= 3) && (!savedOnly || demo.saved.includes(s.id))
    && (s.name + ' ' + s.headline).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === 'Top rated' ? b.rating - a.rating : a.distance - b.distance);
  const matchingJobs = jobs.filter(j => !demo.skipped.includes(j.id) && !demo.bookings.some(b => b.id === 'job-' + j.id)
    && !j.visits.some(v => blocked.some(b => overlaps(v, b))) && (type === 'All' || j.types.some(t => t === type))
    && (range !== 'Within 3 miles' || j.distance <= 3) && (j.title + j.owner).toLowerCase().includes(query.toLowerCase()));
  return (
    <Screen role={role} title={owner ? 'Find a sitter' : 'Find customers'} subtitle="Denver area · Approximate distances">
      <Field label={owner ? 'Search sitters' : 'Search jobs'} placeholder={owner ? 'Name or care style' : 'Animal care or customer'} value={query} onChangeText={setQuery} />
      <View style={styles.spread}>
        <Copy variant="label">{owner ? matchingSitters.length : matchingJobs.length} {owner ? matchingSitters.length === 1 ? 'sitter' : 'sitters' : matchingJobs.length === 1 ? 'opportunity' : 'opportunities'}</Copy>
        <TextLink label={filters ? 'Hide filters' : 'Filters'} onPress={() => setFilters(!filters)} />
      </View>
      <Chips values={['All', 'Dog', 'Cat', 'Other']} selected={type} onChange={setType} />
      {filters && <View style={{ gap: 16 }}>
        <Chips values={['Any distance', 'Within 3 miles']} selected={range} onChange={setRange} />
        {owner && <><Chips values={['Nearest', 'Top rated']} selected={sort} onChange={setSort} /><TextLink label={savedOnly ? 'Show all sitters' : 'Saved sitters only'} onPress={() => setSavedOnly(!savedOnly)} /></>}
        <TextLink label="Reset filters" onPress={() => { setType('All'); setRange('Any distance'); setSavedOnly(false); setQuery(''); setSort('Nearest'); }} />
      </View>}
      {owner ? matchingSitters.map(sitter => <SitterCard key={sitter.id} sitter={sitter} />) : matchingJobs.map(job => <JobCard key={job.id} job={job} />)}
      {(owner ? matchingSitters.length : matchingJobs.length) === 0 && <EmptyState icon="search" title="No results" detail="Try another animal type or a wider area." />}
      {!owner && demo.skipped.length > 0 && <TextLink label="Restore skipped jobs" onPress={() => demo.setSkipped([])} />}
      <Copy variant="caption" muted>Fictional listings · {owner ? 'Availability checked when reserving.' : 'Fits your demo schedule.'}</Copy>
    </Screen>
  );
}
