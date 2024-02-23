## REQUIREMENTS

## FUNCTIONAL REQUIREMENTS

     1. Register page: Contains a form with required fields to register a user to the platform
          1.1  Form Fields:
                    Username
                         * Mandatory field
                         * It needs to be distinct and unoccupied by another user
                         * Show an error message exists if the username is already taken
                         * No suggestions( should not suggest previously entered values)
                    Email Address
                         * Mandatory field
                         * Must accept valid email addresses only (e.g., [@gmail])
                         * Must be unaffected by case
                         * Should look for email addresses already in use to avoid duplication
                         * Display an error message if the email address is invalid or already exists
                         * No suggestions( should not suggest previously entered values)
                    password
                         * Mandatory field
                         * Minimum length of 8 characters
                         * Should contain at least one uppercase letter, lowercase letter, digit, and special symbol
                         * Password field should be masked for security
                         * Display an error message if the password is invalid
                         * No suggestions( should not suggest previously stored values)
                    Confirm Password
                         * Mandatory field
                         * Must match the Password field exactly
                         * Display an error message if the passwords don't match
                    Login link
                         * Navigate to user login form to login into the platform
                         * Form should clear when login link is clicked
                    Register Button
                         * After submitting, it deactivates itself to avoid repeated registrations
                         * When processing, a loading indication is displayed
                         * Form should clear after submission
          1.2  Form Validation:
               * All required fields must be filled before submission
               * Display clear and specific error messages for invalid input
               * Proper message should be show after successfully register or failure in toast
          1.3  Security:
               * Store passwords securely using hashing and salting techniques

     2. Login Page: Contains a form with required fields to login a user into the platform.
          2.1  Form Fields:
                    Username
                         * Mandatory field
                         * No suggestions( should not suggest previously entered values)
                    password
                         * Mandatory field
                         * Minimum length of 8 characters
                         * Should contain at least one uppercase letter, lowercase letter, digit, and special symbol
                         * Password field should be masked for security
                         * No suggestions( should not suggest previously stored values) 
                    Register link
                         * Navigate to user register form to register to the platform
                         * Form should clear when register link is clicked
                    Login Button:
                         * Submits the form data for processing.
                         * Disables itself after submission to prevent multiple login attempts.
                         * Displays a loading indicator while processing.
          2.2  Form Validation:
               * Display an error message if the username or password is invalid
               * Form should clear after submission

     3. Dashboard Page
          * Should display projects details in pie chart.
          * Should display contracts details in bar chart.
          * Should display employees details in donut chart.

     4. Projects
          * List all the projects in table format.
          * Able to search with project name in search box field.
          * Able to add a new project.
          * Able to edit the exiting projects.
          * Able to delete the existing projects.
          * Projects in the table should be update after edit/delete operations.

     5. Contracts
          * List all the contracts in table format.
          * Able to search with contract name in search box field.
          * Able to add a new contract.
          * Able to edit the exiting contracts.
          * Able to delete the existing contracts.
          * Contracts in the table should be update after edit/delete operations.

     6. Employees
          * List all the employees in table format.
          * Able to search with employees name in search box field.
          * Able to add a new employee.
          * Able to edit the exiting employees.
          * Able to delete the existing employees.
          * Employees in the table should be update after edit/delete operations.

     7. Settings 
          7.1 User Information
               * Show the user's current data, including:
                    username
                    email address
                    First name
                    Last name
          7.2 Edit Option
               * Make sure there is a button for editing the user's data
               * Click on an edit button to see fields for every piece of information that is shown
               * Permit users to edit their personal data (username, email format, etc.) within certain bounds
               * Include a save button so that modifications may be made and the information shown is updated
               * Provide clear error messages for invalid input
               * Provide a way to undo edits and return to the original data
               * Provide a logout option so that users can safely log out

## NON-FUNCTIONAL REQUIREMENTS

     * Maintainability: The codebase should follow coding standards and best practices to facilitate ease of maintenance and future enhancements.
     * Performance: The system should respond to user actions within 5 seconds under normal load conditions.
        
## TECHNICAL REQUIREMNETS

     * Frontend:
          * Programming Languages: JavaScript
          * Front-end Framework: React
          * Version Control: GitHub
          * Authentication: Implement secure user authentication  like JWT(json web tokens) Authentication

     * Database:
          * Database: MongoDB
          * ODM : Mongoose

     * Backend:
          * Back-end Framework: Node.js(ExpressJS)
          * Authentication: Implement secure user authentication  like JWT(json web tokens) Authentication

     * Tools: 
          * Postman
          * Visual Studio
          * Studio 3T


## Contributors
1. Taraka Sai Reddy Seelam