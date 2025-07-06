# Task Scheduler Application

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Set task priorities (low, medium, high)
- Set task status (pending, in-progress, completed)
- Set due dates and reminders for tasks
- Filter tasks by status, priority, and search term

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with MongoDB Compass
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API requests
- React Icons
- React Datepicker
- React Toastify for notifications

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   └── src/                # React source files
│       ├── components/     # Reusable components
│       ├── context/        # Context API files
│       ├── pages/          # Page components
│       ├── reducers/       # Reducers for context
│       └── utils/          # Utility functions
└── server/                 # Backend Node.js/Express application
    ├── middleware/         # Express middleware
    ├── models/             # Mongoose models
    └── routes/             # API routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd client
   npm install
   ```

4. Configure environment variables
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRE=30d
     ```

### Running the Application

1. Start the server
   ```bash
   cd server
   npm run dev
   ```

2. Start the client
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PUT /api/tasks/:id/status` - Update task status

## License

This project is licensed under the MIT License.