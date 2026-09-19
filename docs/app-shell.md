# Interactive mobile marketplace demo

## Scope

This is a React Native / Expo SDK 57 / TypeScript / Expo Router front end. It has no production authentication, network API, database, Stripe integration, payment collection, payouts, notification delivery, or production chat. The demo clock is October 12, 2026 so examples remain reproducible.

The same fictional account, Alex Morgan, can switch between owner and sitter modes. All activity is held in memory and resets on reload, logout, or Settings → Reset demo data. Login/signup fields are not transmitted; signup retains only the display name in the demo profile. This is not an authentication boundary and direct routes remain accessible for testing.

## Preserved and replaced

Preserved the Expo project, TypeScript configuration, role route groups, five-tab architecture, and safe-area/form layout patterns. Rebuilt screen content and the visual tokens. Removed unused Expo starter components, theme/hooks, animated Expo artwork, and the old static visit-preview component. No packages were added.

The new system uses warm neutral surfaces, slate blue accents, modest typography, stock photography with initials fallbacks, compact listing cards, segmented filters, native modal date/time sheets, fixed reservation actions, and accessible controls. Screen fades and sheet transitions respect reduced-motion settings.

## Connected journeys

- Welcome → Login or Signup → role selection. Login accepts sample credentials or the demo-account shortcut. Signup checks required fields, email/phone/password shape, valid date, and age 15+. It does not create an account.
- Owner Home shows upcoming care, animals, quick links, and a nearby sitter.
- Find a Sitter supports text search, animal filters, distance filters, rating sort, saved sitters, and empty states.
- Sitter details include an illustrative portrait, experience, approximate distance, animal preferences, rate tiers, fictional verification/history, and sample reviews.
- Reserve care supports multiple animals and separate visit blocks across dates. Calendar/time sheets select visits; custom minute-level times remain available. Care instructions, review, and explicit demo confirmation create an owner booking and matched conversation.
- Bookings has Upcoming, Active, Completed, and Cancelled views. Details show visits, animals, care notes, price, chat, a local cancellation confirmation, and reviews for completed owner bookings.
- Sitter Home shows visits, jobs, and completed-care earnings after the platform fee.
- Find Customers has search/type/distance filters, offer state, skip/restore, and schedule compatibility. Sending an offer never contacts a customer. A separate Simulate owner acceptance action creates a sitter booking and conversation.
- Schedule offers week/day navigation, individual booked visits, manual unavailable blocks, overlap validation, block removal, and job-filter updates.
- Messages are tied to existing matched demo bookings. Sending appends locally without delivery or invented automated replies. Cancelled conversations cannot accept messages.
- Profile edits, animal add/edit/remove, saved sitters, local notification preferences, review drafts, support previews, and demo reset/logout are navigable. Payment/security/policy pages clearly identify unconnected production functionality.

Owner tabs: Home, Search, Bookings, Messages, Profile.
Sitter tabs: Home, Jobs, Schedule, Messages, Profile.
Sitter Bookings is accessible through Profile and Home's View all.

## Data and pricing

- `src/demo/model.ts`: types, pricing, date/time validation, overlap checks, and formatting.
- `src/demo/data.ts`: fictional users, animals, listings, jobs, bookings, messages, and reviews.
- `src/demo/store.tsx`: shared in-memory state and local actions.
- `src/components/marketplace.tsx`: shared sitter, job, and booking cards.
- `src/components/pickers.tsx`: calendar and time-selection sheets.
- `src/screens`: feature views; `src/app` contains thin routes and shared settings pages.

Rates follow PRODUCT_SPEC.md: 1–2 animals $15/hour, 3–4 $20, 5–6 $25, 7–8 $35, 9–10 $50. Visit durations are summed. The 25% platform fee is deducted from gross sitter earnings, never added to the owner's total. Reservations above ten animals and overnight care are not supported by this demo; overnight terms need a separate agreed flow.

Availability checks use every visit, sitter sample blocks, confirmed demo bookings, and manually blocked sitter time. Adjacent visits are allowed; overlapping or invalid visits are rejected. Cancelled bookings release their time blocks.

No residential address, exact map pin, private contact information, or real card data is shown. Stock images load from images.unsplash.com and require connectivity; initials remain if loading fails. All portraits, reviews, verification, ratings, and earnings are illustrative, not representations of real users.

## Verification

Commands:

- `npm run typecheck`
- `npm run test:demo` — nine focused tests for all pricing tiers, fractional-hour totals, fee rounding, date validity, multi-day overlaps, adjacent blocks, empty/reversed times, and immutable validation.
- `npx expo export --platform ios --platform android --platform web`

Browser walkthroughs at 390×844 and 320×740 covered entry/signup validation, role switching, listing filters, profile details, multi-animal/multi-visit reservation, overlap rejection, calendar/time selection, fractional pricing, confirmation, local messages, cancellation, booking categories, reviews, offer acceptance, schedule conflict rejection, compatible job filtering, profile/animal editing, preferences, and reset. Calendar sheets and reservation footers were visually inspected. No production APIs were invoked.

Physical iPhone / Expo Go verification is still required for native keyboard behavior, safe areas, VoiceOver, large accessibility text, reduced motion, and back gestures. Expo exports verify bundling; they are not signed device builds.

## Production work deliberately deferred

Secure authentication and age verification, persisted profiles and animals, backend authorization/RLS, actual availability/matching, real offer acceptance, booking lifecycle and required check-in/out photos, production chat/photo storage, notification delivery, Stripe checkout/payouts/refunds, cancellation policy enforcement, verification/reviews moderation, support/report handling, account deletion, and operator controls.
