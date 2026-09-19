import { useState } from 'react';
import { Chips, EmptyState, Role, Screen } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { BookingCard } from '@/components/marketplace';

export default function Bookings({ role }: { role: Role }) {
  const [category, setCategory] = useState('Upcoming');
  const { bookings } = useDemo();
  const visible = bookings.filter(b => b.role === role && b.status === category);
  return (
    <Screen role={role} title="Bookings" back={role === 'sitter' ? '/sitter/profile' : undefined}>
      <Chips values={['Upcoming', 'Active', 'Completed', 'Cancelled']} selected={category} onChange={setCategory} />
      {visible.map(booking => <BookingCard key={booking.id} booking={booking} />)}
      {!visible.length && <EmptyState icon="calendar" title={'No ' + category.toLowerCase() + ' bookings'} detail="Your visits will appear here." />}
    </Screen>
  );
}
