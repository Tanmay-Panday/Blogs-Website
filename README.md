# 📝 Blogs World

Blogs World is a full-stack MERN application that provides a complete platform for creating, sharing, and managing blog posts. It features a modern, responsive user interface, robust user authentication, role-based access control (Users and Admins), and a dedicated admin dashboard for site management.

## ✨ Live Demo

You can view the live application here: [**🌐 https://blogs-website-frontend.vercel.app**](https://blogs-website-frontend.vercel.app)

*(Note:* This is *the production frontend URL found in the backend CORS configuration. The backend is likely deployed on a similar service.)*

## 🚀 Features

* 🔐 **User Authentication**: Secure Sign-Up, Sign-In, and Sign-Out functionality using JWT.
* 🎭 **Role-Based Access**:
    * **Users**: Can create, read, update, and delete their own blogs.
    * **Admins**: Can manage all blogs and view site-wide statistics from a dedicated dashboard.
* ✍️ **Full Blog CRUD**: Complete Create, Read, Update, and Delete operations for blog posts.
* 🖼️ **Image Uploads**: Seamless image uploads for blog thumbnails, hosted on Cloudinary.
* 👤 **Rich User Profiles**: Users can view their profile and manage all their blog posts in one place.
* 📊 **Admin Dashboard**: A comprehensive dashboard for admins showing key stats (total users, admins, blogs) and a table to manage all blog posts.
* 🔍 **Dynamic Search & Filtering**:
    * Search blogs by title on the main blog page.
    * Advanced search (by title, email, or ID) and date filtering on the admin dashboard.
* 📱 **Responsive Design**: Excellent user experience across all devices, from mobile to desktop.
* 🌗 **Dark/Light Mode**: A theme toggler for user comfort.
* 🛡️ **Protected Routes**: Frontend routes are protected to ensure only authenticated users can access sensitive pages like profile and blog creation.

## 🛠️ Tech Stack

This project is built with the MERN stack and other modern technologies.

| Area           | Technology                                                                                                                              |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Frontend** | React, Vite, Tailwind CSS, Material-Tailwind, React Router, Axios, `react-toastify`                                                     |
| ⚙️ **Backend** | Node.js, Express.js, MongoDB                                                                                                            |
| 🗃️ **Database** | MongoDB with Mongoose ODM                                                                                                               |
| 🔑 **Auth** | JSON Web Tokens (JWT), bcrypt                                                                                                           |
| ☁️ **File Storage** | Cloudinary for image hosting, Multer for file handling                                                                                  |
| 🚀 **Deployment** | Vercel (Frontend & Backend)                                                                                                           |

## 🏛️ Project Architecture

The project is logically separated into `frontend` and `backend` directories.

```
└── tanmay-panday-blogs-website/
    ├── Architechture Diagrams/ # Contains Draw.io diagrams
    │   └── Backend.drawio
    ├── backend/                # Node.js & Express server
    │   ├── src/
    │   │   ├── config/         # DB & Cloudinary connections
    │   │   ├── controllers/    # Business logic
    │   │   ├── middleware/     # Auth & file upload middleware
    │   │   ├── models/         # Mongoose schemas
    │   │   └── routes/         # API routes
    │   └── server.js           # Main server entry point
    └── frontend/               # React & Vite client
        ├── src/
        │   ├── assets/
        │   ├── components/     # Reusable UI components
        │   ├── context/        # React context for state management
        │   ├── pages/          # Top-level page components
        │   └── utils/          # Utilities like Protected Routes
        └── vite.config.js      # Vite configuration
```

The `Architecture Diagrams` directory contains detailed visual plans for the backend, including:
* **Component Diagram**: Shows the high-level components (Frontend, Express Server, MongoDB, Cloudinary) and their interactions.
* **Flowcharts & Sequence Diagrams**: Detail the logic for each API endpoint, such as creating a blog, fetching all blogs, and deleting a blog.

## 🔌 API Endpoints

The backend server exposes the following RESTful API endpoints.

### User Routes (`/api/user`)

| Method | Endpoint                 | Description                               |
| :----- | :----------------------- | :---------------------------------------- |
| `POST` | `/add-user`              | Registers a new user.                     |
| `POST` | `/add-admin`             | Registers a new admin (for internal use). |
| `POST` | `/sign-in`               | Authenticates a user and returns a JWT.   |
| `POST` | `/get-user-by-email`     | Fetches a user's name and admin status.   |
| `GET`  | `/get-number-of-users`   | Returns the count of users and admins.    |

### Blog Routes (`/api/blog`)

| Method   | Endpoint              | Description                                        | Auth Required     |
| :------- | :-------------------- | :------------------------------------------------- | :---------------- |
| `POST`   | `/add-blog_post`      | Creates a new blog post with an image upload.      | Yes               |
| `GET`    | `/get-blog_posts`     | Fetches all blog posts.                            | No                |
| `GET`    | `/get-one-blog_post`  | Fetches a single blog post by its ID.              | No                |
| `DELETE` | `/delete-blog_post`   | Deletes a blog post and its image from Cloudinary. | Yes (Admin/Owner) |
| `POST`   | `/get-blogs-by-email` | Fetches all blogs created by a specific user.      | Yes               |
| `POST`   | `/update-one-blog`    | Updates a blog post's details and/or image.      | Yes (Owner)       |

## ⚙️ Getting Started

Follow these instructions to set up and run the project on your local machine.

### ✅ Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A MongoDB Atlas account (or local MongoDB instance)
* A Cloudinary account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tanmay-panday-blogs-website
```

### 2. Backend Setup 🖥️

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
touch .env
```

Add the following environment variables to your `backend/.env` file:

```env
PORT=4000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_strong_jwt_secret"

CLOUDINARY_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_api_secret"
CLOUDINARY_BLOG_IMAGES_FOLDER="your_cloudinary_folder_name"
```

### 3. Frontend Setup 🎨

```bash
# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
touch .env
```

Add the following environment variable to your `frontend/.env` file. This should point to your local backend server.

```env
VITE_BACKEND_SERVER_URL=http://localhost:4000/api
```

### 4. Running the Application ▶️

1.  **Start the Backend Server**:
    ```bash
    # From the /backend directory
    npm run server
    ```
    Your backend should now be running on `http://localhost:4000`.

2.  **Start the Frontend Development Server**:
    ```bash
    # From the /frontend directory
    npm run dev
    ```
    Your frontend should now be accessible at `http://localhost:5173`.