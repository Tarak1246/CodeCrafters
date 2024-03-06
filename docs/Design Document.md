# Design Documentation

* Project Name: Project Tracker (Organizational project management platform)

* Date: 02/15/2024

* Team Name: Code Crafters

* Introduction
  * The upcoming paper outlines the design factors for an online platform, including the UI design, functionality requirements for each component and their complexities, and the technology tools used. It includes architectural plans and development process-related procedures.

* System Overview
  * Project Tracker is a user-friendly web-based platform designed for project management in organizations. It serves as a project tracking and external customer engagement application. The website maintains project details including client information, timelines, and updates. We aim to replace traditional methods like using Excel sheets, as this offers ease of access at fingertips, statistics, and secure authentication.

* Architecture Plan
  * All the database, server and client will be hosted on the same local machine using the listed ports.
  * ![Architectural Plan](Architectural%20Plan.png)

* Architectural Strategies
  * EDA (Event-Driven Architecture)
    * Here all the components are dependent on each other, as the real-time data is always being queried from the Database and the modifications get changed to the Database as the emitting and consuming events. This provides scalability when real-time updates are needed.
  * API Design and Documentation
    * Create clear and simple APIs to facilitate communication between the system's many components. The API documentation covers everything from endpoint descriptions to request/response formats, error handling, and authentication procedures.

## Components Interface Design

* D1. Admin user creation
  * A controlled method for creating admin user through a REST API.
  * Mockup Images
    * D1.1, D1.2
      * ![alt text](admin_user_creation.png)
  * Data Flow Diagram (D1.1,D1.2)
    * ![alt text](<admin user creation data flow diagram.png>)

* D2.Register Screen
  * Contains a form with required fields to register a user to the platform.
  * Mockup Images
    * D2.1 Form Fields
      * ![alt text](<Register Form.png>)
      * ![alt text](<Register Form Fields Validation.png>)
    * D2.2 Form Validation
      * ![alt text](<Register Form Validation.png>)
      * ![alt text](<Register success scenario.png>)
      * ![alt text](<Register failure scenario.png>)
    * D2.3 Security(password stored in hash format)
      * ![Register Form Security](Register%20Form%20Security.png)
  * Data Flow Diagram
    * Data flow diagram for user register component(D2.1,D2.2,D2.3)
    * ![alt text](<user registration dataflow-diagram.png>)

* D3.Login Page
  * Contains a form with required fields to login a user into the platform.
  * Mockup Images
    * D3.1 Form Fields
      * ![alt text](<Login Form.png>)
      * ![alt text](<Login Form Field validation 1.png>)
      * ![alt text](<Login Form Field validation 2.png>)
    * D3.2 Form Validation
      * ![alt text](<Login Form Validation.png>)
      * ![alt text](<Login success scenario.png>)
      * ![alt text](<Login failure scenario.png>)
  * Data Flow Diagram
    * Data flow diagram for user login component(D3.1,D3.2,D3.3)
    * ![alt text](<user login dataflow-diagram.png>)

* D4.Dashboard
  * Contains real-time data of projects, contracts, and employee details.
  * Mockup Images
    * D4.1 D4.2 D4.3
      * ![Dashboard](dashboard.png)
  * Data Flow Diagram
    * Data flow diagram for Dashboard component
    * ![alt text](<Dashboard dataflow-diagram.png.png>)

* D5.Projects
  * Contains the project details as listed above. The data can be changed dynamically, and respective changes will be affected in the database accordingly.
  * Mockup Images
    * D5.1 Lists all the project details in below tabular format as per requirement R4.1
      * ![Projects](projects.png)
    * D5.2 Edit and add project information.
      * ![Add project information](Add%20project%20information.png)
      * ![Edit Project Information](Edit%20Project%20Information.png)
    * D5.3 Lists the search criteria if there are any matches
      * ![Search](search.jpg)
    * D5.4 Prompts the user to confirm the delete.
      * ![Delete](Delete.jpg)
      * ![Item deleted](item%20deleted.jpg)
    * Data Flow Diagram for the project's component
      * ![Data Flow Diagram - Projects](projects_data_flow_diagram.png)

* D6.Contracts
  * Lists the contracts being worked on by the organization. Data can be modified dynamically, and changes get reflected in the DB.
  * Mockup Images
    * ![Contracts](contracts.png)
  * Data Flow Diagram for the contracts component
    * ![Data Flow Diagram - Contracts](Contracts_dataFlowDiagram.jpg)

* D7.Employees
  * Provides the employee details and their roles in the projects. Data can be modified dynamically, and changes get reflected in the DB.
  * Mockup Images
    * ![Employees](employees.png)

* D8.Settings
  * This component allows users to view and manage their personal information, edit it, and log out of their account.
  * Mockup Images
    * D8.1 User Information
      * ![alt text](<user information.png>)
    * D8.2 Edit User Settings
      * ![alt text](<user information edit.png>)
      * ![alt text](<User Settings Validation.png>)
  * Data Flow Diagram
    * Data flow diagram for user settings component(D8.1,D8.2).
    * ![alt text](<user settings dataflow-diagram.png>)

* D9.Users
  * This component will display all the registered users in table format and provides an option to modify the user.
  * Mockup Images
    * D9.1 List users
      * ![alt text](Users.png)
    * D9.2 Edit user
      * ![Edit user](https://github.com/TeamCodeCrafterss/CodeCrafters/assets/36734811/8d3af64d-51dc-413e-9852-19a5ff9ee49a)
  * Data Flow Diagram
    * Data flow diagram for users component(D9.1,D9.2).
    * ![alt text](<users data flow diagram.png>)

* Team Members
        1. S S Eswara Satyanarayana Aneesh Dangeti
        2. Taraka Sai Reddy Seelam
        3. Lakshmi Prasanna Yekkaladevi
        4. Pavan Teja Jukanti
        5. Akshay Reddy Yalla
