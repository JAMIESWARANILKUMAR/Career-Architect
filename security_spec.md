# Security Specification for PathFinder AI

## Data Invariants
1. A user can only read and write their own profile document.
2. A user can only manage their own subcollections (resumes, quizzes).
3. The `careerPoints` field is system-calculated (but for this prototype, we'll allow updates with limits).
4. Onboarding must be completed before accessing other features (client-side enforced, but rules should restrict).

## The Dirty Dozen Payloads (Red Team Tests)
1. **Identity Spoofing**: Attempting to set `uid` to another user's ID during creation.
2. **Privilege Escalation**: Attempting to set `role` or `isAdmin` (if they existed).
3. **Cross-User Data Leak**: Requesting `users/otherUserId`.
4. **Sub-resource Hijacking**: Attempting to create a resume under another user's path.
5. **Junk Data Injection**: Sending a 1MB string as `targetRole`.
6. **Immutable Field Tampering**: Changing `createdAt` on update.
7. **Score Padding**: Incrementing `careerPoints` by 1,000,000 in one go.
8. **Invalid ID Format**: Using a 2KB string as a document ID.
9. **Anonymous Vandalism**: Writing while not signed in.
10. **State Skipping**: Setting `onboardingComplete` to true without providing data.
11. **Shadow Field Injection**: Adding `isVerified: true` to a user profile.
12. **Relational Orphan**: Creating a resume for a user that doesn't exist.

## Test Runner (Logic Overview)
The `firestore.rules.test.ts` would verify that these payloads return `PERMISSION_DENIED`.
For this turn, I will focus on the rules implementation.
