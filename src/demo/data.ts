import { Animal, Booking, Job, Message, Sitter } from './model';

// Illustrative stock imagery; all names, reviews, activity, and verification are fictional.
const photo = (id: string, width = 700) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';
export const photos = {
  dog: photo('photo-1552053831-71594a27632d'),
  cat: photo('photo-1573865526739-10659fec78a5'),
  rabbit: photo('photo-1585110396000-c9ffd4e4b308'),
  jamie: photo('photo-1580489944761-15a19d654956'),
  maya: photo('photo-1494790108377-be9c29b29330'),
  leo: photo('photo-1500648767791-00dcc994a43e'),
  alex: photo('photo-1472099645785-5658abf4ff4e'),
};
export const sitters: Sitter[] = [
  { id: 'jamie', name: 'Jamie Lee', photo: photos.jamie, headline: 'Calm care. Familiar routines.', bio: 'A patient, detail-minded sitter with six years of experience. I enjoy long walks, shy cats, and keeping each animal’s routine just as you like it.', types: ['Dog', 'Cat', 'Other'], distance: 1.2, rating: 4.98, reviews: 64, completed: 112, experience: '6 years', blocked: [{ date: '2026-10-14', start: '12:00', end: '15:00' }] },
  { id: 'maya', name: 'Maya Patel', photo: photos.maya, headline: 'An extra friend for your best friend.', bio: 'Weekend walks and thoughtful drop-ins are my specialty. I am comfortable with energetic dogs and medication routines discussed before a visit.', types: ['Dog', 'Cat'], distance: 2.4, rating: 4.95, reviews: 38, completed: 76, experience: '4 years', blocked: [{ date: '2026-10-13', start: '09:00', end: '12:00' }] },
  { id: 'leo', name: 'Leo Bennett', photo: photos.leo, headline: 'Good company for little companions.', bio: 'Experienced with cats, rabbits, and small animals. I take time to let animals settle in and send thoughtful updates after every visit.', types: ['Cat', 'Other'], distance: 3.8, rating: 4.97, reviews: 29, completed: 51, experience: '5 years', blocked: [] },
];
export const initialAnimals: Animal[] = [
  { id: 'maple', name: 'Maple', type: 'Dog', age: '4 years', notes: 'Gentle golden retriever. Use the blue lead for walks.', photo: photos.dog },
  { id: 'olive', name: 'Olive', type: 'Cat', age: '2 years', notes: 'Shy at first. Dinner is one scoop of dry food.', photo: photos.cat },
  { id: 'clover', name: 'Clover', type: 'Other', age: '3 years', notes: 'Rabbit. Fresh hay and water with every visit.', photo: photos.rabbit },
];
export const initialBookings: Booking[] = [
  { id: 'owner-active', role: 'owner', person: 'Leo Bennett', photo: photos.leo, sitterId: 'leo', animals: ['Clover'], visits: [{ date: '2026-10-12', start: '11:00', end: '12:00' }], notes: 'Fresh hay, water, and supervised time in the living room.', total: 15, status: 'Active', title: 'A visit with Clover' },
  { id: 'owner-upcoming', role: 'owner', person: 'Jamie Lee', photo: photos.jamie, sitterId: 'jamie', animals: ['Maple', 'Olive'], visits: [{ date: '2026-10-13', start: '09:00', end: '10:00' }, { date: '2026-10-13', start: '17:00', end: '18:00' }], notes: 'Maple enjoys a slow walk. Olive’s food is in the kitchen.', total: 30, status: 'Upcoming', title: 'Care for Maple & Olive' },
  { id: 'owner-completed', role: 'owner', person: 'Maya Patel', photo: photos.maya, sitterId: 'maya', animals: ['Maple'], visits: [{ date: '2026-10-09', start: '10:00', end: '12:00' }], notes: 'A walk and fresh water.', total: 30, status: 'Completed', title: 'A morning with Maple' },
  { id: 'sitter-upcoming', role: 'sitter', person: 'Nora Williams', photo: photos.maya, animals: ['Luna', 'Milo'], visits: [{ date: '2026-10-12', start: '09:00', end: '10:00' }, { date: '2026-10-12', start: '16:00', end: '17:00' }], notes: 'Two indoor cats. Fresh water, dinner, and a little playtime.', total: 30, status: 'Upcoming', title: 'Luna & Milo' },
  { id: 'sitter-completed', role: 'sitter', person: 'Sam Rivera', photo: photos.leo, animals: ['Finn'], visits: [{ date: '2026-10-11', start: '10:00', end: '13:00' }], notes: 'Finn loves his riverside walk.', total: 45, status: 'Completed', title: 'An afternoon with Finn' },
];
export const jobs: Job[] = [
  { id: 'j1', owner: 'Ella Brooks', photo: photos.maya, title: 'A walk with Archie', types: ['Dog'], animals: ['Archie'], distance: 1.6, visits: [{ date: '2026-10-13', start: '11:00', end: '12:00' }, { date: '2026-10-13', start: '17:00', end: '18:00' }], notes: 'Archie is a friendly spaniel. A walk, fresh water, and company while I am at work.' },
  { id: 'j2', owner: 'Daniel Park', photo: photos.leo, title: 'Two quiet cat visits', types: ['Cat'], animals: ['Cleo', 'Pepper'], distance: 2.8, visits: [{ date: '2026-10-14', start: '08:00', end: '09:00' }, { date: '2026-10-14', start: '18:00', end: '19:00' }], notes: 'Cleo and Pepper are indoor cats. Dinner, litter refresh, and playtime.' },
  { id: 'j3', owner: 'Nora Williams', photo: photos.jamie, title: 'An afternoon with Pip', types: ['Other'], animals: ['Pip'], distance: 4.1, visits: [{ date: '2026-10-15', start: '13:00', end: '15:00' }], notes: 'Pip is a house rabbit. Fresh hay and supervised time in the living room.' },
];
export const reviews = [
  { name: 'Nora W.', date: 'September 2026', stars: 5, text: 'Thoughtful updates and a very happy cat. Everything was exactly as we discussed.' },
  { name: 'Sam R.', date: 'August 2026', stars: 5, text: 'On time, easy to communicate with, and wonderfully patient with Finn.' },
];
export const initialMessages: Record<string, Message[]> = {
  'owner-upcoming': [
    { id: 'm1', mine: false, text: 'Hi Alex! Looking forward to seeing Maple and Olive tomorrow.', time: '10:24 AM' },
    { id: 'm2', mine: true, text: 'Thank you! I’ve added their routines to the booking.', time: '10:26 AM' },
    { id: 'm3', mine: false, text: 'Perfect. I’ll follow those and send an update after each visit.', time: '10:28 AM' },
  ],
  'sitter-upcoming': [{ id: 'm4', mine: false, text: 'Thanks for looking after Luna and Milo. Their food is ready in the kitchen.', time: '8:15 AM' }],
};
