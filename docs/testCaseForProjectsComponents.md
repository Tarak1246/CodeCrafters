# Projects Components Test cases

* Below are test case used to test each requirements.
* The test case covers all the test scenarios for the requirement.
* When the .js code is written, the necessary requirements in the form fields such as required: true or false, data type, acceptable items are passed by default.

* Below is sample lines of code that proves the above.

* For below id field, these are parameters that would be checked when a query is sent from UI to database schema.
/*
  id: {
    type: String, // Data type is String
    required: true, // Field is required
    default: "", // Default value is empty string
    unique: true, // Field must be unique
  },

*/

* Similarly below field code shows that the enum values have only 3 acceptable values to it.

/*
  status: {
    type: String, // Data type is String
    required: true, // Field is required
    enum: ["In-Progress", "Completed", "InComplete"], // Field values must be one of these
    default: "In-Progress", // Default value is "In-Progress"
  },
  */

# R5.1 Projects Listing(Table Format):
* Test Case 1: Verify Projects Listing Table Displays Correctly
  Description: Ensure that the Projects Listing table displays all projects from the database in a tabular format.
  Steps:
  Open the Projects page.
  Check if the table is visible.
  Verify that all project records are displayed in the table.
  Expected Result: All projects are listed in the table with the correct information.
  Status: Tested and working successfully.

# R5.2. Form Fields (Edit/Add actions):
* Test Case 2: Verify Form Fields for Adding a New Project
 Description: Ensure that the form for adding a new project contains all required fields and functionalities.
 Steps:
 Click on the "Add" button.
 Check if the form opens with the required fields: ID, Name, Client, Start Date, End Date, Deadline, Progress, Status, Save, Update, Cancel.
 Verify default values and options for Progress and Status fields.
 Expected Result: Form for adding a new project opens with all required fields and functionalities.
 Status: Tested and working successfully.

# R5.3 Search button:
* Test Case 3: Verify Search Functionality
  Description: Ensure that the search button allows users to search for projects using any desired keyword.
  Steps:
  Enter a keyword in the search box.
  Press the search button.
  Check if the projects matching the keyword are displayed in the table.
  Expected Result: Projects matching the keyword are displayed in the table.
  Status: Tested and working successfully.
# R5.4 Delete:
* Test Case 4: Verify Project Deletion Functionality
  Description: Ensure that the delete action removes the project record from the UI and triggers a database query to delete the data entry completely.
  Steps:
  Click on the delete button for a project.
  Wait for the confirmation popup.
  Click on "Confirm" to delete the project.
  Check if the project is removed from the UI and database.
  Expected Result: Project record is successfully deleted from the UI and database.
  Status: Tested and working successfully.