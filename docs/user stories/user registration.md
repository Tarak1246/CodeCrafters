# User Story

**Title:** User Registration

**Description:**

I want to sign up for a new user account on the platform so that I can access its features and functionalities. I will need to provide a distinct username, email address, and password.

**Acceptance Criteria:**

1. The registration form requires a username, email address, password, and password confirmation.
2. The username must be unique and cannot already be in use by another user.
3. The username field should not suggest previously entered values.
4. The email address must be valid and cannot be already in use by another user.
5. The email address field should not suggest previously entered values.
6. The password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, digit, and special symbol.
7. The password field should be masked for security.
8. The password confirmation must match the password exactly.
9. A login link is available on the registration page.
10. Clicking the login link clears the registration form.
11. The register button submits the form data for processing.
12. The form clears and a toast notice with a success message appears after a successful submit.
13. Specific error messages are given for each field in an unsuccessful scenario.
14. Hashing and salting methods are used to safely store passwords.