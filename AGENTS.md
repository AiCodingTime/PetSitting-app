# Pet Sitting App — Development Rules

## Project
This is a two-sided mobile marketplace for animal sitting and care.

The current name "PetSittingApp" is temporary. Do not treat it as the final public brand name and do not hard-code the brand unnecessarily.

Users can operate as:
- Pet/animal owners who need care
- Sitters who want to accept paid jobs

A single account can switch between owner and sitter modes.

## Core Technology

Use this stack unless explicitly instructed otherwise:

- React Native
- Expo SDK 57
- TypeScript
- Expo Router
- GitHub
- Supabase
- Stripe Connect

The application is iPhone/mobile-first.

Do not convert this project into a website.

## Development Rules

1. Build one system at a time.
2. Do not attempt to build the entire application at once.
3. Do not remove working functionality unless necessary.
4. Do not rewrite unrelated files when working on one feature.
5. Before making major architectural changes, explain why they are needed.
6. Do not install unnecessary packages.
7. Prefer Expo-compatible packages.
8. Keep TypeScript enabled.
9. Keep the code organized and maintainable.
10. Test meaningful changes before considering them complete.
11. Do not represent mock or placeholder functionality as finished functionality.
12. Do not silently change business rules.
13. Preserve existing working code whenever possible.
14. Mobile usability takes priority over desktop/web behavior.

## Security

- Never commit passwords, API secrets, service-role keys, Stripe secret keys, or private credentials to GitHub.
- Environment secrets must use environment variables.
- Only public client-safe keys may exist in mobile client code.
- Supabase Row Level Security must be used for private user data.
- Users must never be able to access another user's private records without authorization.
- Exact home addresses must not be exposed publicly.
- Payment information must be handled through Stripe rather than stored directly by the app.

## Supabase

Supabase will provide:

- Authentication
- PostgreSQL database
- Realtime features
- File/photo storage
- Backend functions where appropriate

Database changes should be made through documented migrations.

Do not create duplicate tables or fields when an existing structure can be extended safely.

## Payments

Use Stripe Connect for marketplace payments.

The intended flow is:

Owner payment
→ Stripe
→ platform fee
→ sitter payout

Do not build a custom system that manually holds or transfers sitter money.

Use Stripe test mode during development.

## Application Architecture

The application should support:

- Authentication
- Owner profiles
- Sitter profiles
- Saved animal profiles
- Sitter availability
- Individual visit schedules
- Marketplace discovery
- Matching
- Private chat after matching
- Booking management
- Check-in and check-out
- Required booking photos
- Payments
- Sitter payouts
- Reviews
- Cancellations
- Refunds
- Replacement sitter matching
- Push notifications
- Reporting and blocking
- Support
- Operator controls
- Analytics

Do not build all of these simultaneously.

## Marketplace Principle

Owners should be able to discover compatible sitters.

Sitters should be able to discover compatible customer requests.

Do not blast every booking request to every sitter.

Matching should eventually consider:

- Location
- Distance
- Animal types
- Number of animals
- Required dates
- Exact visit time blocks
- Sitter availability
- Rates
- Ratings
- Compatibility

## Privacy

Before a booking reaches the appropriate confirmed stage:

- Do not show an exact home address.
- Do not expose phone numbers.
- Do not expose private email addresses.
- Do not expose exact map pins for a residence.

Only show information necessary for that stage of the transaction.

## Operator Account

Do not create a separate admin application.

The platform operator should use the same application with elevated permissions.

All sensitive operator actions should eventually be audit logged.

## Workflow

For each feature:

1. Understand the requested feature.
2. Inspect the existing code before modifying it.
3. Plan the smallest safe implementation.
4. Implement it.
5. Check for TypeScript/build errors.
6. Test the relevant flow.
7. Report exactly what changed.
8. Do not begin unrelated features without being asked.

## Important

If a requested change conflicts with these rules or with the project's product specification, stop and point out the conflict instead of silently changing the architecture.