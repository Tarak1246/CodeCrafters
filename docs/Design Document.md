# Design Documentation

**Project Name:** Project Tracker (Organizational project management platform)

**Date:** 02/15/2024 

**Team Name:** Code Crafters

**Introduction:**
    The upcoming paper outlines the design factors for an online platform, including the UI design, functionality requirements for each component and their complexities, and the technology tools used. It includes architectural plans and development process-related procedures.

**System Overview:**
    Project Tracker is a user-friendly web-based platform designed for project management in organizations. It serves as a project tracking and external customer engagement application. The website maintains project details including client information, timelines, and updates. We aim to replace traditional methods like using Excel sheets, as this offers ease of access at fingertips, statistics, and secure authentication.

**Architecture Plan**
    All the database, server and client will be hosted on the same local machine using the listed ports.
![Architectural Plan](Architectural%20Plan.png)

**Architectural Strategies:**
    - **EDA (Event-Driven Architecture)**
        - Here all the components are dependent on each other, as the real-time data is always being queried from the Database and the modifications get changed to the Database as the emitting and consuming events. This provides scalability when real-time updates are needed.
    - **API Design and Documentation**
        - Create clear and simple APIs to facilitate communication between the system's many components. The API documentation covers everything from endpoint descriptions to request/response formats, error handling, and authentication procedures.


**Components Interface Design**


- **D1.Register Screen:**
    - Contains a form with required fields to register a user to the platform.
    - **Mockup Images**
        - **D1.1 Form Fields** 
            ![Register Form](Register%20Form.png)
        - **D1.2 Form Validation**
            ![Register Form Validation 1](Regiter%20Form%20Validation-1.png)
            ![Register Form Validation 2](Regiter%20Form%20Validation-2.png)
            ![Register Form Validation 3](Regiter%20Form%20Validation-3.png)
        - **D1.3 Security(password stored in hash format)**
            ![Register Form Security](Register%20Form%20Security.png)

    - **Data Flow Diagram**
        - Data flow diagram for entire user register component
        ![alt text](<user registration dataflow-diagram.png>)


- **D2.Login Page:**
    - Contains a form with required fields to login a user into the platform.
    - **Mockup Images**
        - **D2.1 Form Fields**
            ![Login Form](Login%20Form.png)
        - **D2.2 Form Validation**
            ![Login Form Validation 1](Login%20Form%20Validation-1.png)
            ![Login Form Validation 2](Login%20Form%20Validation-2.png)
    - **Data Flow Diagram**
        - Data flow diagram for entire user login component
        ![alt text](<user login dataflow-diagram.png>)


- **D3.Dashboard:**
    - Contains real-time data of projects, contracts, and employee details.
    - **Mockup Images**
        ![Dashboard](dashboard.png)


- **D4.Projects:**
    - Contains the project details as listed above. The data can be changed dynamically, and respective changes will be affected in the database accordingly.
    - **Mockup Images**
        - **D4.1:** Lists all the project details in below tabular format as per requirement R4.1
            ![Projects](projects.png)
        - **D4.2:** Edit and add project information.
            ![Add project information](Add%20project%20information.png)
            ![Edit Project Information](Edit%20Project%20Information.png)
        - **D4.3:** Lists the search criteria if there are any matches
            ![Search](search.jpg)
        - **D4.4:** Prompts the user to confirm the delete.
            ![Delete](Delete.jpg)
            ![Item deleted](item%20deleted.jpg)


- **D5.Contracts:**
    - Lists the contracts being worked on by the organization. Data can be modified dynamically, and changes get reflected in the DB.
    - **Mockup Images**
        ![Contracts](contracts.png)


- **D6.Employees:**
    - Provides the employee details and their roles in the projects. Data can be modified dynamically, and changes get reflected in the DB.
    - **Mockup Images**
        ![Employees](employees.png)


- **D7.Settings:**
    - This component allows users to view and manage their personal information, edit it, and log out of their account.
    - **Mockup Images**
        - **D7.1:** User Information
            ![User Settings](user%20settings.png)
        - **D7.2:** Edit User Settings
            ![Edit User](edit%20user.png)
    - **Data Flow Diagram**
        - Data flow diagram for entire user settings component.
        ![alt text](<user settings dataflow-diagram.png>)


**Team Members:**
1. S S Eswara Satyanarayana Aneesh Dangeti
2. Taraka Sai Reddy Seelam
3. Lakshmi Prasanna Yekkaladevi
4. Pavan Teja Jukanti
5. Akshay Reddy Yalla