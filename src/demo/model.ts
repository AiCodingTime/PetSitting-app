export type Role = 'owner' | 'sitter';
export type AnimalType = 'Dog' | 'Cat' | 'Other';
export type Visit = { date: string; start: string; end: string };
export type Animal = { id: string; name: string; type: AnimalType; age: string; notes: string; photo: string };
export type Sitter = {
  id: string; name: string; photo: string; headline: string; bio: string;
  types: AnimalType[]; distance: number; rating: number; reviews: number; completed: number;
  experience: string; blocked: Visit[];
};
export type Booking = {
  id: string; role: Role; person: string; photo: string; sitterId?: string;
  animals: string[]; visits: Visit[]; notes: string; total: number;
  status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled'; title: string;
};
export type Message = { id: string; text: string; mine: boolean; time: string };
export type Job = {
  id: string; owner: string; photo: string; title: string; types: AnimalType[];
  animals: string[]; distance: number; visits: Visit[]; notes: string;
};
export const pricing = { tiers: [[2, 15], [4, 20], [6, 25], [8, 35], [10, 50]], platformFee: 0.25 } as const;
export const DEMO_DAY = '2026-10-12';
export function hourlyRate(count: number) {
  return pricing.tiers.find(([limit]) => count > 0 && count <= limit)?.[1] ?? 0;
}
export function minutes(value: string) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return NaN;
  const [hours, mins] = value.split(':').map(Number);
  return hours * 60 + mins;
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T12:00:00Z');
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function overlaps(a: Visit, b: Visit) {
  return a.date === b.date && minutes(a.start) < minutes(b.end) && minutes(b.start) < minutes(a.end);
}
export function validateVisits(visits: Visit[], blocked: Visit[] = [], earliest = DEMO_DAY): string | null {
  if (!visits.length) return 'Add at least one visit.';
  for (let i = 0; i < visits.length; i++) {
    const visit = visits[i];
    if (!validDate(visit.date) || visit.date < earliest) return 'Choose a valid date on or after October 12, 2026.';
    if (!Number.isFinite(minutes(visit.start)) || !Number.isFinite(minutes(visit.end)) || minutes(visit.end) <= minutes(visit.start)) return 'Use 24-hour times with an end time after the start.';
    if (visits.slice(0, i).some(other => overlaps(visit, other))) return 'Your visits overlap. Choose separate time blocks.';
    if (blocked.some(other => overlaps(visit, other))) return 'That time overlaps a booking or unavailable block.';
  }
  return null;
}
export function totalHours(visits: Visit[]) {
  return visits.reduce((sum, visit) => sum + (minutes(visit.end) - minutes(visit.start)) / 60, 0);
}
export function quote(count: number, visits: Visit[]) {
  const rate = hourlyRate(count);
  const gross = Math.round(rate * totalHours(visits) * 100) / 100;
  const fee = Math.round(gross * pricing.platformFee * 100) / 100;
  return { rate, hours: totalHours(visits), gross, fee, payout: Math.round((gross - fee) * 100) / 100 };
}
export const money = (amount: number) => '$' + amount.toFixed(2);
export function dateLabel(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
export function timeLabel(time: string) {
  const [hours, mins] = time.split(':').map(Number);
  return (hours % 12 || 12) + (mins ? ':' + String(mins).padStart(2, '0') : '') + (hours >= 12 ? ' PM' : ' AM');
}
export const visitLabel = (visit: Visit) => dateLabel(visit.date) + ' · ' + timeLabel(visit.start) + '–' + timeLabel(visit.end);
