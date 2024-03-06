# User Story

**Title:** Create Admin User via API

As a system administrator, I want to create new a admin user through a secure API endpoint, providing their username, email, password, and optional name information, so that I can manage system access and assign administrative privileges.

**Acceptance criteria:**

1. A designated POST request endpoint is established specifically for creating admin users.
2. The API request body (payload) must include the following mandatory fields:
    * Username: Unique identifier for the admin user.
    * Email: Unique identifier for the admin user.
    * Password: The admin user's password meeting complexity requirements.
    * Role: Set to "admin" (predefined value).
3. Optionally, the payload can also include:
    * First Name: The admin user's first name.
    * Last Name: The admin user's last name.
4. Upon successful creation, the API returns a response code indicating success (e.g., HTTP 201 Created) and potentially includes a success message.
5. In case of errors (e.g., missing fields, invalid data, duplicate username), the API returns an appropriate error code (e.g., HTTP 400 Bad Request) with a detailed error message describing the issue.
