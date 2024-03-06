# User Story

**Title:** User Login

**Description:**

As a registered user, I want to log in to the application using my username and password so that I can access its features and functionalities.

## Acceptance Criteria

1. A username and password are needed to access the login form.
2. The username field shouldn't display values that have already been input.
3. The password field must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, digit, and special symbol.
4. The password field should be masked for security.
5. The username and password are mandatory fields.
6. A register link is available on the login page.
7. Selecting the "Register" link navigates to the registration page and clears the login form.
8. The login button submits the form data for processing.
9. Upon successful submission, the user is redirected to the dashboard page.
10. Upon failed submission due to invalid credentials, an error message is displayed in toast.
11. The login button is disabled after submission to prevent multiple login attempts.
12. While processing the login request, a loading indicator is shown.
13. Whether it is successful or unsuccessful, the form becomes obvious after submission.
