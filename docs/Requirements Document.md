# REQUIREMENTS

## FUNCTIONAL REQUIREMENTS

* R1. Admin user creation: A controlled method for creating admin user through a REST API.
  * R1.1 API Endpoint: It is necessary to set up a POST request endpoint especially for the creation of admin user.
  * R1.2 Request Payload: The API request body (payload) should contain the following mandatory fields.
    * Username: A unique identifier for a user.
    * Email: A unique identifier for a user.
    * Password: The admin user's password.
    * First Name: The admin user's first name (optional).
    * Last Name: The admin user's last name (optional).
    * Role: The admin user's role(value must be admin).
  * E1: Functionally creates admin via POST request with validated unique username, email, and strong password.

* R2. Register page: Contains a form with required fields to register a user to the platform.
  * R2.1  Form Fields:
    * Username
      * Mandatory text field.
      * It needs to be distinct and unoccupied by another user.
      * Show an error message exists if the username is already taken.
      * No suggestions( should not suggest previously entered values).
    * Email Address
      * Mandatory text field.
      * Must accept valid email addresses only (e.g., [@gmail]).
      * Must be unaffected by case.
      * Should look for email addresses already in use to avoid duplication.
      * Display an error message if the email address is invalid or already exists.
      * No suggestions( should not suggest previously entered values).
    * password
      * Mandatory text field.
      * Minimum length of 8 characters.
      * Should contain at least one uppercase letter, lowercase letter, digit, and special symbol.
      * Password field should be masked for security.
      * Display an error message if the password is invalid.
      * No suggestions( should not suggest previously stored values).
    * Confirm Password
      * Mandatory text field.
      * Must match the Password field exactly.
      * Display an error message if the passwords don't match.
     Login link
      * Navigate to user login form to login into the platform.
      * Form should clear when login link is clicked.
    * Register
      * Button field.
      * After submitting, it deactivates itself to avoid repeated registrations.
      * Form should clear after submission.
  * R2.2  Form Validation:
    * All required fields must be filled before submission.
    * Display clear and specific error messages for invalid input.
    * Proper message should be show after successfully register or failure in toast.
  * R2.3  Security:
    * Store passwords securely using hashing and salting techniques.
  * E2: Secure user registration form with validated unique username, email, and strong password with confirmation, clear error messages, and successful registration/failure toast notification.

* R3. Login Page: Contains a form with required fields to login a user into the platform.
  * R3.1  Form Fields:
    * Username
      * Mandatory text field.
      * No suggestions( should not suggest previously entered values).
    * Password
      * Mandatory text field.
      * Minimum length of 8 characters.
      * Should contain at least one uppercase letter, lowercase letter, digit, and special symbol.
      * Password field should be masked for security.
      * No suggestions( should not suggest previously stored values).
    * Register link
      * Navigate to user register form to register to the platform.
      * Form should clear when register link is clicked.
    * Login
      * Button field.
      * Submits the form data for processing.
      * Disables itself after submission to prevent multiple login attempts.
  * R3.2  Form Validation:
    * Display an error message if the username or password is invalid.
    * Form should clear after submission.
  * E3: Secure user login form with validated username and strong password, masked input, and clear error messages. Form clears after submission.

* R4. Dashboard Page: The Dashboard module aims to provide users with a graphical representation of key metrics related to employees, contractors, and projects within the organization.
  * R4.1 Visualize Project Data:
    * The dashboard shall visualize project data to provide insights into project status and progress.
    * It shall include a pie chart representing metrics such as project timelines.
    * The dashboard shall update these statistics dynamically based on changes to the project database.
  * R4.2 Employee Statistics:
    * The dashboard shall display the total number of employees registered in the system.
    * It shall provide a breakdown of employee demographics, including department-wise distribution.
    * The dashboard shall update these statistics dynamically based on changes to the employee database.
    * The data for employees will be seen in donut chart.
  * R4.3 Contractor Information:
    * The dashboard will feature a component that displays information about the organization's contractors.
    * The data for the contractors is seen in bar chart.
  * Responsive Design:
    * The dashboard interface shall be responsive and compatible with various devices and screen sizes.
    * It shall adapt its layout and elements dynamically to provide an optimal viewing experience on desktops, tablets, and mobile devices.

* R5. Projects
  * R5.1 Projects Listing(Table Format):
    * Shows all the projects that are created and present in the database in a tabular format.
    * Each project record in the table will have action items for modifying(Edit/Delete) the project information.
    * Contains a search box to find the required project information using any desired keyword.
    * Add button that provides the ability to add new project and its information.
    * All these changes and additions will be reflected into the database immediately.
    * Below are the table items:
          1. ID - Project ID.
          2. Name - Project Name.
          3. Members - Total number of members involved in the project.
          4. Client - Tells the client name for the project being worked.
          5. Start/End date - Project start and end dates.
          6. Deadline - Project deadline.
          7. Progress & Status - Project percentage completion and completion status.
          8. Actions - Provides two action buttons for editing and deleting the projects.
  * R5.2. Form Fields (Edit/Add actions):
    * Upon clicking the edit or add action icon, a side tab will be opened to provide the user the ability to add/change the project information.
    * ID: Enter a ID for the project for distinct identification which will be an unique ID.
    * Name:
      * Enter the project name as required.
      * All the names should be unique.
    * Client: Client name for the particular project.
    * Start Date: Represents the project start date.
    * End Date: Represents the project end date.
    * Deadline: Due date for finishing and handing over the project.
    * Progress:
      * Specified in percentage of the project completion stage.
      * Default values are present in it which can be selected to update project percentage completion i.e., (25%-Planning), (50%-Sprint), (75%-Testing).
    * Status: Lists the project status i.e, Completed or in progress or incomplete.
    * Save: Upon clicking save, the data will be saved.
    * Update: Updated information will be saved in the edit action.
    * Cancel: Clears the form in the edit/add action.
  * R5.3 Search button: A search button is present globally to search for any matching data present in the projects component.
  * R5.4 Delete:
    * It will delete the project record from this UI and it will trigger the database query and delete the data entries from table completely.
    * Cancel delete action for few seconds before sending the query to the database for record deletion.

* R6. Contracts
  * R6.1. List Contracts in Table Format:
    * The information in the contracts table must be presented in an understandable tabular format.
    * A distinct contract will be represented by each row in the table, and pertinent contract properties will be shown in the columns.
    * Users will be able to easily navigate through a potentially huge number of contracts with the table's functionality for scrolling.
  * R6.2. Search Functionality:
    * On the "Contracts" page, a clear search box will be shown.
    * For searching, users will be able to input partial or whole contract names.
    * As the user types, the search results will dynamically refresh, giving them instant feedback.
    * The user may get the relevant contract data in the table by clicking on a search result.
  * R6.3 Add New Contract:
    * The page must have an obvious "Add New Contract" button or link.
    * After selecting the "Add New Contract" option, a form including the parties, start and end dates, contract name, and other necessary information is              shown.
    * The entered data must be validated by the system to guarantee correctness and completeness.
    * The new entry will be added to the contracts table upon the new contract's successful submission.
  * R6.4. Edit Current Contracts:
    * Every contract row in the table has to include an editable field or an "Edit" button that lets users start modifying.
    * When the "Edit" button is clicked, a form containing the most recent contract details will pop up.
    * Users will have the ability to edit and submit modifications to the contract's details.
    * The updated data will be included in the contracts table following a successful submission.
  * R6.5. Delete Existing Contracts:
    * A "Delete" button or a selection checkbox should be included in each contract row in the table.
    * In order to prevent unintentional deletions, users must be asked to confirm their purpose before deleting a contract.
    * The chosen contract will be updated in the contracts table and deleted from the system upon confirmation.
  * R6.6. Table Update Following Edit/Delete Operations:
    * Immediately following the editing of an existing contract, the modifications will be reflected in the contract table.
    * Once a contract is removed, its information will no longer be visible in the contracts table.
    * Users will receive real-time feedback on the state of their operations through a smooth updating procedure.

* R7. Employees
  * R7.1. List all Employees in Table Format:
    * Table Format: Display a table on the main page to list all employees with the following columns:
      * ID
      * Name
      * Type
      * Project Name
      * Location
      * Allocation Start Date
      * Allocation End Date
      * Email
      * Designation
      * Role
      * Actions
  * R7.2. Search with Employee Name:
    * Search Box: Provide a search box at the top of the page to search for employees by name.
    * Search Functionality: As the user types in the search box, dynamically filter and display employees whose names match the entered text.
  * R7.3. Add New Employee:
    * Add Employee Button: Include a button (e.g., "Add Employee") to initiate the process of adding a new employee.
    * Add Employee Form:
      * Display a form with fields for entering employee details:
            Name
            Type
            Project Name
            Location
            Allocation Start Date
            Allocation End Date
            Email
            Designation
            Role
      * Validation: Ensure that required fields (e.g., Name, Email) are filled out before allowing the addition.
      * Confirmation: Provide a confirmation message after successfully adding a new employee.
  * R7.4. Edit Existing Employee:
    * Edit Button: Include an "Edit" button in the "Actions" column next to each employee in the table.
    * Edit Employee Form: When the "Edit" button is clicked, open a form pre-filled with the existing employee details.
    * Save Changes: Allow the user to make changes and save them, updating the employee record.
  * R7.5. Delete Existing Employee:
    * Delete Button: Include a "Delete" button in the "Actions" column next to each employee in the table.
    * Confirmation: Prompt the user with a confirmation dialog before proceeding with the deletion.
    * Deletion Process: After confirmation, delete the employee record and update the table.
  * R7.6. Table Update after Edit/Delete:
    * Real-time Update: After an edit or delete operation, reflect the changes immediately in the displayed employee table without requiring a page refresh.
  * Additional Considerations:
    * User Feedback: Provide feedback messages (success, error) to keep users informed about the outcome of their actions.
    * Security: Implement proper authentication to control access to employee management features.
    * Error Handling: Handle errors gracefully and provide clear error messages to users.
    * Data Validation: Implement data validation on the server-side to ensure data integrity.

* R8. Settings
  * R8.1 User Information
    * Show the user's current data, including:
      * username
      * email address
      * First name
      * Last name
  * R8.2 Edit Option
    * Make sure there is a button for editing the user's data.
    * Click on an edit button to see fields for every piece of information that is shown.
    * Permit users to edit their personal data (firstname, lastname, and email format only) within certain bounds.
    * Include a save button so that modifications may be made and the information shown is updated.
    * Provide clear error messages for invalid input.
    * Provide a way to undo edits and return to the original data.
    * Provide a logout option so that users can safely log out.
  * E8: User settings page showing current username, email, first name, and last name. Offers "Edit" button to update editable information (first name, last name, and email format) with validation and error messages. Allows saving changes, undoing edits, and secure logout.

* R9. Users
  * R9.1 List user
    * List all registered users in table format with edit option. Table contains below user information.
      * username
      * email
      * status
      * role
      * admin privilege
    * Edit user:
      * Logged in user who has admin privilege can able to edit the users.
  * R9.2 Edit user form
    * Display existed user data.
    * Able to change user status.
    * Able to change user role.
    * Able to change user privilege.
  * E9: Admin-only user management page listing all users in a table with username, email, status, role, and admin privilege. Edit option allows admins to edit user data (status, role, and potentially privilege) within a dedicated form.

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
2. Lakshmi Prasanna Yekkaladevi
3. S S Eswara Satyanarayana Aneesh Dangeti
4. Akshay Reddy Yalla
5. Pavan teja Jukanti
