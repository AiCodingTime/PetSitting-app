import { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';
import { initialAnimals, initialBookings, initialMessages, jobs } from './data';
import { Animal, Booking, Message, Visit, quote } from './model';

function useDemoState() {
  const sequence = useRef(0);
  const nextId = () => 'demo-' + Date.now() + '-' + ++sequence.current;
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [saved, setSaved] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<Visit[]>([{ date: '2026-10-12', start: '12:00', end: '14:00' }]);
  const [profile, setProfile] = useState({ name: 'Alex Morgan', bio: 'Long walks, quiet mornings, and good company.' });
  const [preferences, setPreferences] = useState<Record<string, boolean>>({ 'New messages': true, 'New matches': true, 'Upcoming bookings': true });
  const [reviewed, setReviewed] = useState<Record<string, { stars: number; text: string }>>({});
  const toggleSaved = (id: string) => setSaved(values => values.includes(id) ? values.filter(value => value !== id) : [...values, id]);
  function addBooking(input: Omit<Booking, 'id'>) {
    const id = nextId();
    setBookings(values => [{ ...input, id }, ...values]);
    setMessages(values => ({ ...values, [id]: [{ id: nextId(), mine: false, time: 'Now', text: 'Demo match confirmed. Let’s go over the care details.' }] }));
    return id;
  }
  function acceptJob(jobId: string) {
    const job = jobs.find(item => item.id === jobId);
    if (!job) return '';
    const existing = bookings.find(item => item.id === 'job-' + job.id);
    if (existing) return existing.id;
    const id = 'job-' + job.id;
    const booking: Booking = { id, role: 'sitter', person: job.owner, photo: job.photo, animals: job.animals, visits: job.visits, notes: job.notes, total: quote(job.animals.length, job.visits).gross, status: 'Upcoming', title: job.title };
    setBookings(values => values.some(value => value.id === id) ? values : [booking, ...values]);
    setMessages(values => values[id] ? values : ({ ...values, [id]: [{ id: nextId(), mine: false, time: 'Now', text: 'Your demo offer is accepted. Thank you for helping out!' }] }));
    return id;
  }
  function sendMessage(id: string, text: string) {
    if (!text.trim() || !bookings.some(booking => booking.id === id && booking.status !== 'Cancelled')) return;
    setMessages(values => ({ ...values, [id]: [...(values[id] ?? []), { id: nextId(), text: text.trim(), mine: true, time: 'Now' }] }));
  }
  function reset() {
    setBookings(initialBookings); setAnimals(initialAnimals); setMessages(initialMessages);
    setSaved([]); setOffers([]); setSkipped([]); setReviewed({});
    setBlocks([{ date: '2026-10-12', start: '12:00', end: '14:00' }]);
    setProfile({ name: 'Alex Morgan', bio: 'Long walks, quiet mornings, and good company.' });
    setPreferences({ 'New messages': true, 'New matches': true, 'Upcoming bookings': true });
  }
  return { bookings, animals, messages, saved, offers, skipped, blocks, profile, preferences, reviewed,
    setAnimals, setOffers, setSkipped, setBlocks, setProfile, setPreferences, setReviewed, toggleSaved, addBooking, acceptJob, sendMessage, reset,
    cancelBooking: (id: string) => setBookings(values => values.map(value => value.id === id ? { ...value, status: 'Cancelled' } : value)),
  };
}
type DemoStore = ReturnType<typeof useDemoState>;
const DemoContext = createContext<DemoStore | null>(null);
export function DemoProvider({ children }: PropsWithChildren) {
  const value = useDemoState();
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('DemoProvider is missing');
  return value;
}
