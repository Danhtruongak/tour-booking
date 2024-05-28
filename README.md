completion:

1. Set up project structure and connected to MongoDB database
2. Defined data models using Mongoose
3. Created routes for tours and users
4. Implemented user authentication:
5. User registration and login using JWT
6. Password hashing with bcrypt
7. Password reset functionality
8. Implemented authentication and authorization middleware
9. Developed tour management:
10. CRUD operations for tour listings
11. Tour search functionality
12. Implemented booking management
13. Developed user review functionality
14. Implemented error handling and validation
15. Created custom AppError class
16. Implemented catchAsync function
17. Developed mailer utility using nodemailer
18. Developed views router and controllers for tour overview and individual tour pages

future completion:

1. Implement text search, aggreation and lookup
2. Complete pug templates and connect data sources
3. Obtain nessesary images for display
4. Implement testing for each route
5. Setting on github for deploment

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Project Proposal: Tour Booking API

The project aims to develop a Tour Booking API that allows users to browse, book, and manage tours. The API will provide functionality for tour operators to create and manage tour listings, while users can search for tours, make bookings, and leave reviews.

Problem Statement:
Currently, there is a lack of a centralized platform for users to easily find and book tours, and for tour operators to efficiently manage their tour listings. The Tour Booking API seeks to address this problem by providing a seamless and user-friendly interface for both tour operators and users.

Technical Components:

1.Routes:
/api/tours: CRUD operations for tour listings
/api/users: User registration, authentication, and profile management
/api/bookings: Booking management for users and tour operators
/api/reviews: User reviews for tours

2.Data Models:
Tour: Represents a tour listing with details such as name, duration, price, description, images, and available dates

    User: Represents a user with information like name, email, password, and role (user or tour operator)

    Booking: Represents a booking made by a user for a specific tour, including booking date and status

    Review: Represents a user review for a tour, including rating and comment

    External Data Sources:
    None identified at the moment, but potential integration with third-party APIs for payment processing or location-based services

3.Project Requirements:

    User Authentication:
    Implement user registration and login functionality using JWT (JSON Web Tokens)Secure user passwords using bcrypt for hashing

    Tour Management:
    Allow tour operators to create, update, and delete tour listings
    Implement tour search functionality based on criteria such as location, date, and price range

    Booking Management:
    Enable users to make bookings for specific tours and dates
    Allow tour operators to view and manage bookings for their tours

    User Reviews:
    Allow users to leave reviews and ratings for tours they have booked
    Display average ratings and user reviews for each tour listing

    Error Handling and Validation:
    Implement proper error handling and validation for user inputs and API requests
    Provide meaningful error messages and status codes

Project Timeline:

Week 7:
Set up the project structure and database connection
Implement user registration and authentication functionality
Develop tour management endpoints (CRUD operations)
Implement tour search functionality

Week 8:
Develop booking management endpoints
Implement user profile management
Develop user review endpoints
Integrate user reviews with tour listings
Implement error handling and validation

Week 9
Perform thorough testing and bug fixing
Deploy the API to a production environment
Prepare project presentation and documentation
