# Animal Sitting Marketplace — Product Specification

## 1. Product Vision

This application is a two-sided mobile marketplace connecting animal owners with people who provide sitting and care services.

The public brand name is temporary and will be changed later.

The app should feel similar to an on-demand marketplace such as Uber or DoorDash:

- Owners find compatible sitters.
- Sitters find compatible jobs.
- Both sides choose who they want to work with.
- The platform handles matching, scheduling, communication, payment, safety, records, and support.

The normal user experience should remain simple:

Find → Match → Chat → Book → Work → Check In → Check Out → Pay → Review

The complicated systems should happen behind the scenes.

---

## 2. Platforms

Initial priority:

- iPhone / mobile

Technology:

- React Native
- Expo SDK 57
- TypeScript
- Expo Router
- Supabase
- Stripe Connect

Desktop/web can be considered later.

---

## 3. User Accounts

Users must create an account.

Account creation should include:

- First name
- Last name
- Email
- Phone number
- Password
- Date of birth

Current age requirement:

- Users must be at least 15 years old.

After signup/login, users choose:

- I need animal care
- I want to provide animal care

A single account can use both roles.

Users must be able to switch between owner mode and sitter mode later without creating another account.

Role switching must be easy to discover.

---

## 4. Owner Profile

Owner profile can include publicly:

- Profile picture
- First name
- Last name
- Short bio

Do not publicly display:

- Phone number
- Email
- Exact address

Location may be used privately by the system for matching.

Exact residential location must remain private until the appropriate confirmed booking stage.

---

## 5. Animal Profiles

Animals are permanently saved to the owner's account.

Owners should not have to repeatedly enter basic animal information for each booking.

Each profile includes:

- Animal name
- Animal type
- Age
- Photo
- Care details

Owners can:

- Add animals
- Edit animals
- Remove animals

Initial animal choices:

- Dog
- Cat
- Other

If Other is selected:

- Allow searching/selecting additional animal types.

The system should support all reasonable animal types rather than being limited to dogs and cats.

Owners may select multiple saved animals for one booking.

---

## 6. Sitter Profile

Public sitter profile includes:

- Profile picture
- First name
- Last name
- Short bio
- Animal types they accept
- Houses/bookings completed
- Average rating
- Reviews
- Rate information
- Verification status

Houses Completed:

- Starts at 0.
- Automatically increases after completed bookings.
- Cannot be manually edited by the sitter.

Do not display photos of animals from previous private bookings on the sitter's public profile.

---

## 7. Base Sitter Pricing

Current pricing rules:

- 1–2 animals: $15/hour
- 3–4 animals: $20/hour
- 5–6 animals: $25/hour
- 7–8 animals: $35/hour
- 9–10 animals: $50/hour

Overnight pricing may be agreed upon between the owner and sitter.

Pricing architecture should be configurable later rather than hard-coded permanently.

---

## 8. Booking Care Instructions

Owners enter booking-specific instructions.

Possible fields:

- Feeding instructions
- Medication instructions
- Care instructions
- House rules
- Animal routine
- Emergency instructions
- Additional information

Saved animal information and booking-specific instructions are separate concepts.

---

## 9. Booking Schedule

Bookings must support flexible schedules.

Do not restrict bookings to one continuous time range.

A booking can contain multiple individual visit blocks.

Example:

June 1
- 9:00 AM–11:00 AM
- 4:00 PM–6:00 PM

June 2
- 10:00 AM–11:30 AM
- 5:00 PM–7:00 PM

The booking builder needs:

+ Add Visit

Owners can create:

- One visit
- Multiple visits in one day
- Multiple days
- Different times on different days

The system calculates total hours across all visit blocks.

Sitter availability must be checked against every individual visit block.

---

## 10. Owner Marketplace — Find a Sitter

Owners have:

Find a Sitter

This is a marketplace/feed of compatible sitters.

Do not send a booking request to every sitter.

Matching can consider:

- Approximate location
- Distance
- Availability
- Required dates
- Required visit times
- Number of animals
- Animal types
- Rates
- Ratings
- Other compatibility factors

Owners can:

- View sitter cards
- Open profiles
- Compare compatible sitters
- Choose who they want to match with

---

## 11. Sitter Marketplace — Find Customers

Sitters have:

Find Customers

This is a marketplace/feed of compatible owner requests.

Example opportunity card:

- Animal count/types
- Dates
- Multiple visit indication
- Approximate distance
- Estimated earnings

Actions:

- View Request
- Send Offer
- Skip

Sitters choose which opportunities they want.

Do not blast every opportunity to every sitter.

---

## 12. Location Privacy

Before a confirmed match/booking:

Show only approximate distance.

Example:

~3 miles away

Never publicly show:

- Exact house
- Exact address
- Exact location pin

At the appropriate confirmed booking stage, the sitter may receive the exact address necessary to complete the service.

---

## 13. Sitter Availability

Sitters need a calendar/availability system.

Availability operates at the specific time-block level.

Statuses:

- Available
- Booked — platform booking
- Unavailable — manually blocked

Sitters can block time for:

- Vacation
- School
- Family
- Personal time
- Other commitments

Accepted bookings automatically update availability.

Example:

If a sitter is booked from 9 AM–11 AM, they may still be available at 2 PM.

The system should prevent incompatible opportunities from being shown as valid matches.

---

## 14. Matching

Matching should consider:

- Owner location
- Sitter location
- Approximate distance
- Animal types
- Number of animals
- Required dates
- Individual visit blocks
- Sitter availability
- Rates
- Ratings
- Compatibility

Prioritize users who actually satisfy the booking requirements.

---

## 15. Matching and Chat

There is no private messaging before matching.

Once an owner and sitter match:

- Create a private conversation automatically.

Chat supports:

- Text
- Photos
- Booking information
- New-message notifications

The conversation remains connected to the booking.

---

## 16. Booking Management

Both sides have booking sections:

- Upcoming
- Active
- Completed
- Cancelled

Opening a booking shows:

- Visit schedule
- Animals
- Care details
- Payment information
- Booking status
- Chat

Each side sees only information they are authorized to access.

---

## 17. Sitter Verification

Before accepting bookings, sitters must complete required verification.

Initial requirements:

- Email verification
- Phone verification

Verified sitters receive:

Verified Sitter

The verification architecture should allow stronger identity/background verification to be added later.

---

## 18. Check In / Check Out

During an active booking, the sitter must:

Check In

Then provide:

- Required house/location photo
- Required animal photo

When finished:

Check Out

These records help verify that the sitter attended the booking and cared for the correct animals.

The exact privacy and retention rules for verification photos should be handled securely.

---

## 19. Safety Tools

Users need access to:

- Emergency / Help
- Report
- Block

Safety options should be accessible during active bookings.

---

## 20. Notifications

Notification categories include:

- New message
- New match
- Upcoming booking
- Required active-booking photo reminder
- Payment
- Review
- Appeal update

Users can control notification categories individually.

Do not create a vague generic "booking update" notification category when a more specific notification exists.

Photo reminders should only occur while the sitter is actively working the booking.

---

## 21. Payments

The platform processes payments electronically.

Supported owner payment methods may eventually include:

- Card
- Apple Pay
- Venmo where supported
- Saved payment method

Do not support cash payments through the platform.

Use Stripe Connect for marketplace payments.

The platform should not manually transfer sitter money.

---

## 22. Platform Fee

Current business rule:

The platform receives 25% of sitter gross earnings.

Example:

Gross sitter earnings: $20
Platform fee: $5
Sitter payout: $15

The owner should not automatically receive an additional 25% fee on top of the displayed sitter price.

Stripe should remain the financial source of truth.

---

## 23. Payouts

Stripe/payment infrastructure should handle:

- Owner payment
- Platform fee
- Sitter payout
- Payment records
- Refund processing

Payout timing and payout holds should be controlled through the payment infrastructure.

---

## 24. Sitter Cancellation

If a sitter cancels at the last minute:

- Owner receives a full refund when applicable.
- Owner receives priority replacement matching.
- Original schedule is preserved for replacement searching.
- Support can assist.

Repeated unreasonable cancellations may negatively affect sitter account standing.

Legitimate emergencies should be reviewable separately.

---

## 25. Sitter No-Show

If a sitter does not show:

- Sitter earns $0.
- Owner receives a full refund when applicable.
- Owner receives priority replacement matching.
- No-show is recorded.
- Owner can contact support.

Repeated no-shows may result in:

- Warning
- Restrictions
- Temporary ban
- Permanent ban

---

## 26. Owner Cancellation

Owner cancellations should be processed automatically according to the platform's cancellation policy.

Refund percentages/timing should eventually be configurable in the backend.

---

## 27. Refunds

Support path:

Help & Support
→ Payment & Refunds
→ Request a Refund

Possible reasons:

- Sitter cancelled
- Sitter did not show
- Booking issue
- Other

Sitter cancellation/no-show refunds should be automated as much as reasonably possible.

---

## 28. Replacement Matching

If a sitter cancels or no-shows:

1. Flag the booking.
2. Process applicable refund.
3. Give owner priority matching.
4. Search compatible sitters.
5. Preserve the original visit schedule.
6. Show replacement options.
7. Allow support assistance.

The original sitter does not receive payment for work not completed.

---

## 29. Reviews

After completion, the owner receives:

How was your experience with [Sitter]?

The owner may submit:

- Star rating
- Optional written review

Reviews appear on the sitter profile.

---

## 30. Review Appeals

Sitters may appeal a review.

Appeal includes:

- Explanation
- Why they believe it is inaccurate/unfair
- Relevant evidence/details

The platform/operator reviews appeals.

Reviews violating platform rules may be removed or adjusted.

Legitimate negative reviews remain.

---

## 31. Support

In-app support categories include:

- Emergency / Safety
- Payment problem
- Booking problem
- Sitter no-show/cancellation
- Account problem
- Review/appeal
- Contact Support

Support systems should eventually allow issues to be handled without requiring the platform owner to personally manage every transaction.

---

## 32. Reporting and Blocking

Users can report other users.

Possible reasons:

- Safety issue
- No-show
- Fraud/scam
- Harassment
- Inappropriate behavior
- Booking problem
- Other

Users can block another user.

Reports enter the support/review system.

---

## 33. Account Enforcement

Possible account actions:

1. Warning
2. Temporary restriction
3. Temporary ban
4. Permanent ban

Repeated problems can automatically flag accounts.

Users should have an appeal process.

The platform operator may manually review and override decisions when appropriate.

---

## 34. Operator Account

Do not create a separate admin application.

The platform owner/operator uses the same app.

Operator account has normal app capabilities plus elevated permissions.

Possible elevated controls:

- Review accounts
- Restrict users
- Ban users
- Review reports
- Review disputes
- Review refunds
- Review payment problems
- Review appeals
- Handle support cases
- View platform analytics
- Override certain automated decisions

Sensitive operator actions must eventually be audit logged.

---

## 35. Platform Analytics

Operator analytics should eventually include:

Revenue:
- Total platform revenue
- Weekly revenue
- Monthly revenue
- Yearly revenue
- Average weekly revenue
- Average booking value

Users:
- Total users
- Active sitters
- Active owners
- New users

Marketplace:
- Total matches
- Total bookings
- Active bookings
- Completed bookings
- Cancelled bookings
- Completion rate

Safety/support:
- Reports
- Disputes
- Appeals
- Bans
- Restrictions

---

## 36. Sitter Progress Dashboard

Each sitter receives a private progress dashboard.

Show:

- Earned this week
- Earned this month
- Total earned
- Average weekly earnings
- Houses completed
- Average rating
- Bookings completed
- Earnings over time

Example motivational message:

3 bookings this week • $247 earned • $53 more than last week

Do not create a public sitter leaderboard.

---

## 37. Owner Home

Owner home should prioritize:

- Find a Sitter
- My Bookings
- Messages
- My Animals
- Profile
- Notifications

Booking categories:

- Upcoming
- Active
- Completed

---

## 38. Sitter Home

Sitter home should prioritize:

- Find Customers
- My Schedule
- Messages
- My Bookings
- My Profile
- Notifications

Booking categories:

- Upcoming
- Active
- Completed

---

## 39. Settings

Keep settings simple.

Include:

- Edit Profile
- Payment Methods
- Notifications
- Privacy & Security
- Help & Support
- Terms & Policies
- Log Out
- Delete Account

---

## 40. Authentication and Security

System should support:

- Secure login
- Password reset
- Email verification
- Phone verification
- Verification codes
- Account recovery
- Session management
- Protection against suspicious login attempts

---

## 41. Core Backend Models

The backend will eventually need models including:

- Users
- Animals
- Sitter Profiles
- Availability
- Bookings
- Visit Blocks
- Matches
- Conversations
- Messages
- Reviews
- Reports
- Support Tickets
- Payments
- Notifications
- Audit Logs

Database structure must be implemented deliberately through Supabase migrations.

Do not create everything at once.

---

## 42. File Storage

Secure storage will eventually be needed for:

- Profile photos
- Animal photos
- Required booking house photos
- Required booking animal photos
- Chat photos
- Verification documents if used later

Sensitive verification information must not be publicly accessible.

---

## 43. Financial Records

Each payment should create a transaction record.

Relevant information may include:

- Booking
- Amount paid
- Platform fee
- Sitter earnings
- Refunds
- Payment status
- Date

Stripe remains the authoritative payment source.

---

## 44. Privacy

Protect:

- Home addresses
- Phone numbers
- Emails
- Identity information
- Payment information
- Private messages
- Verification documents

Users should see only information necessary for their current stage of the transaction.

---

## 45. Audit Logging

Important elevated actions should eventually be logged.

Examples:

- User banned
- User restricted
- Refund approved
- Review removed
- Report resolved
- Account modified
- Support case modified

---

## 46. Fraud and Abuse

Backend architecture should eventually support detection of:

- Repeated no-shows
- Repeated last-minute cancellations
- Fake accounts
- Payment abuse
- Suspicious booking behavior
- Review manipulation
- Ban evasion through multiple accounts

Flagged behavior goes to support/operator review.

---

## 47. Development Order

Build one system fully before moving to the next.

Recommended order:

1. Project foundation
2. Design system / application shell
3. Database/backend foundation
4. Authentication
5. Age enforcement
6. Owner/sitter role switching
7. Owner profile
8. Animal profiles
9. Sitter profile
10. Sitter pricing
11. Availability/calendar
12. Booking visit system
13. Marketplace queues
14. Matching
15. Messaging
16. Payment infrastructure
17. Check-in/check-out
18. Required photos
19. Reviews
20. Cancellations/no-shows/refunds
21. Replacement matching
22. Notifications
23. Support/reporting
24. Account enforcement
25. Sitter progress analytics
26. Operator controls
27. Platform analytics
28. Security/privacy/audit improvements
29. Testing
30. Launch preparation

Do not skip ahead simply because later features are more interesting.

---

## 48. Current Development Stage

The current project has:

- Working GitHub repository
- Working Expo SDK 57 project
- Working iPhone test through Expo Go
- Supabase project created
- Stripe account created

The next development goal is:

Build the application shell and visual design system.

Do NOT implement the full backend, payments, messaging, matching, or other major systems until specifically instructed.