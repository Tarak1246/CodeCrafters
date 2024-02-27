## REQUIREMENTS

## FUNCTIONAL REQUIREMENTS

     R1. Register page: Contains a form with required fields to register a user to the platform
          R1.1  Form Fields:
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
          R1.2  Form Validation:
               * All required fields must be filled before submission
               * Display clear and specific error messages for invalid input
               * Proper message should be show after successfully register or failure in toast
          R1.3  Security:
               * Store passwords securely using hashing and salting techniques

     R2. Login Page: Contains a form with required fields to login a user into the platform.
          R2.1  Form Fields:
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
          R2.2  Form Validation:
               * Display an error message if the username or password is invalid
               * Form should clear after submission

     R3. Dashboard Page: The Dashboard module aims to provide users with a graphical representation of key metrics related to employees, 
                         contractors, and projects within the organization.
          R3.1 Visualize Project Data:
               *The dashboard shall visualize project data to provide insights into project status and progress.
               *It shall include a pie chart representing metrics such as project timelines.
               *The dashboard shall update these statistics dynamically based on changes to the project database.

          R3.2 Employee Statistics:
               *The dashboard shall display the total number of employees registered in the system.
               *It shall provide a breakdown of employee demographics, including department-wise distribution.
               *The dashboard shall update these statistics dynamically based on changes to the employee database.
               *The data for employees will be seen in donut chart

          R3.3 Contractor Information:
               *The dashboard will feature a component that displays information about the organization's contractors.
               *The data for the contractors is seen in bar chart

          Responsive Design:
               *The dashboard interface shall be responsive and compatible with various devices and screen sizes.
               *It shall adapt its layout and elements dynamically to provide an optimal viewing experience on desktops, tablets, and mobile devices.

     R4. Projects
          R4.1 Projects Listing(Table Format):
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

          R4.2. Form Fields (Edit/Add actions):

               * Upon clicking the edit or add action icon, a side tab will be opened to provide the user the ability to add/change the project information.

                    ID:
                         * Enter a ID for the project for distinct identification which will be an unique ID.
                    Name:
                         * Enter the project name as required.
                         * All the names should be unique.
                    Client:
                         * Client name for the particular project.
                    Start Date:
                         * Represents the project start date.
                    End Date:
                         * Represents the project end date.
                    Deadline:
                         * Due date for finishing and handing over the project.
                    Progress:
                         * Specified in percentage of the project completion stage. 
                         * Default values are present in it which can be selected to update project percentage completion i.e., (25%-Planning), (50%-Sprint), (75%-Testing).
                    Status:
                         * Lists the project status i.e, Completed or in progress or incomplete.
                    Save:
                         * Upon clicking save, the data will be saved.
                    Update:
                         * Updated information will be saved in the edit action.
                    Cancel:
                         * Clears the form in the edit/add action.

          R4.3 Search button:
               * A search button is present globally to search for any matching data present in the projects component.

          R4.4 Delete:
               * It will delete the project record from this UI and it will trigger the database query and delete the data entries from table completely.
               * Cancel delete action for few seconds before sending the query to the database for record deletion.

     R5. Contracts
          * List all the contracts in table format.
          * Able to search with contract name in search box field.
          * Able to add a new contract.
          * Able to edit the exiting contracts.
          * Able to delete the existing contracts.
          * Contracts in the table should be update after edit/delete operations.

     R6. Employees
          * List all the employees in table format.
          * Able to search with employees name in search box field.
          * Able to add a new employee.
          * Able to edit the exiting employees.
          * Able to delete the existing employees.
          * Employees in the table should be update after edit/delete operations.

     R7. Settings 
          R7.1 User Information
               * Show the user's current data, including:
                    username
                    email address
                    First name
                    Last name
          R7.2 Edit Option
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
2. Lakshmi Prasanna Yekkaladevi
3. S S Eswara Satyanarayana Aneesh Dangeti