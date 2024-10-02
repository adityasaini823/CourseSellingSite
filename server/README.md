frontend/
│
├── public/
│   ├── index.html           # Main HTML file
│   ├── favicon.ico          # Favicon
│
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Top navigation bar
│   │   ├── CourseCard.js    # Reusable course card component
│   │   ├── SearchBar.js     # Search bar for course discovery
│   │   ├── ReviewForm.js    # Review submission form
│   │   └── Pagination.js    # Pagination component for course lists
│   │
│   ├── pages/
│   │   ├── HomePage.js      # Home page (course discovery, featured courses)
│   │   ├── CourseDetail.js  # Course details (syllabus, reviews, buy button)
│   │   ├── InstructorDashboard.js  # Instructor panel (manage courses)
│   │   ├── AdminDashboard.js       # Super admin panel
│   │   ├── StudentDashboard.js     # Student panel (purchased courses, reviews)
│   │   ├── LoginPage.js            # Login page
│   │   ├── RegisterPage.js         # Register page
│   │   └── PaymentPage.js          # Payment page
│   │
│   ├── contexts/
│   │   ├── AuthContext.js    # Authentication state management (JWT handling)
│   │   ├── CourseContext.js  # Global state for courses (React Context or Recoil)
│   │
│   ├── hooks/
│   │   ├── useAuth.js        # Custom hook for authentication logic
│   │   ├── useCourses.js     # Fetch courses, search, filtering
│   │
│   ├── services/
│   │   ├── api.js            # Axios or Fetch setup for API requests
│   │   ├── authService.js    # Authentication-related API calls
│   │   ├── courseService.js  # Course-related API calls
│   │   ├── paymentService.js # Payment-related API calls
│   │
│   ├── styles/
│   │   ├── global.css        # Global CSS styles
│   │   └── theme.js          # MUI theme customization
│   │
│   ├── App.js                # Main App component (routes)
│   ├── index.js              # Main entry point, ReactDOM render
│   ├── routes.js             # React Router setup for page navigation
│   ├── store.js              # Global state management (Recoil or Redux)
│   └── package.json          # Frontend dependencies (React, MUI, Axios, etc.)

backend/
│
├── config/
│   ├── db.js               # MongoDB connection
│   ├── keys.js             # Environment variables (JWT secret, Stripe keys)
│
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── courseController.js  # Course creation, update, delete
│   ├── paymentController.js # Stripe/PayPal payment logic
│   ├── reviewController.js  # Course reviews
│   ├── userController.js    # User profile, instructor management
│   ├── adminController.js   # Admin functionalities (platform-wide)
│
├── middlewares/
│   ├── authMiddleware.js    # JWT token verification
│   ├── roleMiddleware.js    # Role-based access control (admin, instructor, student)
│
├── models/
│   ├── User.js              # User schema (students, instructors)
│   ├── Course.js            # Course schema (title, description, price, content)
│   ├── Review.js            # Review schema (user, rating, review text)
│   ├── Payment.js           # Payment schema (payment status, user, course)
│
├── routes/
│   ├── authRoutes.js        # Auth routes (login, register)
│   ├── courseRoutes.js      # Course routes (add, get, update, delete)
│   ├── paymentRoutes.js     # Payment routes (process, refund)
│   ├── reviewRoutes.js      # Review routes (add, delete)
│   ├── userRoutes.js        # User routes (profile, instructor management)
│   ├── adminRoutes.js       # Admin routes (admin panel actions)
│
├── utils/
│   ├── errorHandler.js      # Centralized error handling
│   ├── asyncWrapper.js      # Async middleware wrapper
│   ├── jwtHelper.js         # JWT token generation and verification
│
├── .env                     # Environment variables (MongoDB URI, JWT secret, etc.)
├── app.js                   # Express app setup
├── server.js                # Server entry point
├── package.json             # Backend dependencies (Express, Mongoose, etc.)
└── README.md                # Backend documentation

DB SCHEMAS
USERS
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String,
  "role": { "type": String, "enum": ["student", "instructor", "admin"] },
  "coursesEnrolled": [{ "type": ObjectId, "ref": "Course" }],
  "createdAt": Date,
  "updatedAt": Date
}

COURSES
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "price": Number,
  "instructor": { "type": ObjectId, "ref": "User" },
  "content": [
    {
      "type": { "type": String, "enum": ["video", "text", "quiz"] },
      "title": String,
      "url": String
    }
  ],
  "category": String,
  "reviews": [{ "type": ObjectId, "ref": "Review" }],
  "rating": { "type": Number, "default": 0 },
  "createdAt": Date,
  "updatedAt": Date
}

REVIEWS
{
  "_id": ObjectId,
  "user": { "type": ObjectId, "ref": "User" },
  "course": { "type": ObjectId, "ref": "Course" },
  "rating": { "type": Number, "min": 1, "max": 5 },
  "comment": String,
  "createdAt": Date
}

PAYMENTS
{
  "_id": ObjectId,
  "user": { "type": ObjectId, "ref": "User" },
  "course": { "type": ObjectId, "ref": "Course" },
  "paymentMethod": { "type": String, "enum": ["Stripe", "PayPal"] },
  "paymentStatus": { "type": String, "enum": ["pending", "completed", "failed"] },
  "amount": Number,
  "createdAt": Date
}

ADMINS
{
  "_id": ObjectId,
  "user": { "type": ObjectId, "ref": "User" },
  "role": { "type": String, "enum": ["superadmin", "admin"] },
  "permissions": Array, 
  "createdAt": Date
}
