# 🚀 GigFlow – Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace where clients can create gigs and freelancers can place bids. Clients can review bids and hire freelancers, while freelancers can track the status of their bids — all with secure authentication.

---

## 📌 Project Overview

**GigFlow allows users to:**

- Register and log in securely
- Create and manage gigs (clients)
- Browse gigs and place bids (freelancers)
- User are fluid they can do both
- View bids for a gig and hire freelancers
- Track bid status (pending, hired, rejected)
- Search gigs and bids
- Use a clean, responsive UI

Authentication is handled using JWT (cookie-based), and the application follows a clean separation of frontend and backend.

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie-based authentication
- CORS

---

## 📁 Project Structure

### Frontend (`/Frontend`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Gigs.jsx
│   │   ├── Bids.jsx
│   │   ├── GigDetail.jsx
│   │   ├── CreateGig.jsx
│   │   ├── PlaceBid.jsx
│   │   ├── SpecficBid.jsx
│   │   └── Login.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── context/
│   │   └── authContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   ├── config/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── .env
└── package.json
```

### Backend (`/Backend`)

```
backend/
├── controllers/
│   ├── userController.js
│   ├── gigController.js
│   └── bidController.js
├── models/
│   ├── User.js
│   ├── Gig.js
│   └── Bid.js
├── routes/
│   ├── userRoutes.js
│   ├── gigRoutes.js
│   └── bidRoutes.js
├── middlewares/
│   └── auth.js
├── config/
│   └── db.js
├── server.js
├── .env
└── package.json
```

---

## 🔐 Environment Variables - check .env.example

### Frontend (`.env`)

```
VITE_BASE_URL=your_backend_url
```

### Backend (`.env`)

```
PORT=your_port
MONGODB_URI=your_mongodb_connection_string_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url
```

> ⚠️ **Never commit `.env` files to version control.**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Kailashk-26/gigflow.git
cd gigflow
```

### 2️⃣ Backend Setup

```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` and add environment variables.
- Start the backend server:

```sh
npm run dev
```

### 3️⃣ Frontend Setup

```sh
cd frontend
npm install
```

- Create a `.env` file in `frontend/` and add:

```
VITE_BASE_URL=http://localhost:5000
```

- Start the frontend:

```sh
npm run dev
```

---

## 🔑 Authentication Flow

- JWT is stored in HTTP-only cookies
- User session is verified via `/api/users/auth`
- Frontend maintains auth state using `AuthContext`
- Protected routes require authentication

---

## 👨‍💻 Author

**Kailash**  
Full-Stack Developer  
_Built as a assessment project, real-world freelance platform project._
