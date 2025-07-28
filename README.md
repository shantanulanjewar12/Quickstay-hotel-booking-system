# 🏨 QuickStay – Modern Hotel Booking Platform

**QuickStay** is a full-stack hotel booking platform where users can search and book hotel rooms, while hotel owners manage listings and bookings. Powered by modern technologies like React (Vite), Node.js (Express), MongoDB, and Clerk for authentication, it offers seamless booking and management experiences for both users and hotel owners.

🌐 [Live Demo](https://quickstay-dclf8hnux-shantanus-projects-6dff41f7.vercel.app) &nbsp;&nbsp;&nbsp;💻 Built with ❤️ for real-world scalability

---

## ✨ Features

### 👤 User Features
- 🔍 Browse & search hotels by city or category
- 🛏️ View room details with amenities and photos
- 📅 Book rooms with real-time availability
- 💳 Secure payments via Stripe
- 📬 Booking confirmation emails
- 🔐 Clerk authentication & profile dashboard

### 🛠️ Hotel Owner Features
- 🏨 Register as a hotel owner
- ➕ Add, edit, and delete hotel rooms with images
- 📊 Owner dashboard with bookings & revenue stats
- 📦 Upload hotel images via Cloudinary
- 🔒 Access owner-specific pages via protected routes

---

## 🖼️ App Screenshots

### 🏠 Home Page
![Home](path/to/homepage.png)

---

### 🏨 Search Results
![Search Results](path/to/search.png)

---

### 🛏️ Hotel Details Page
![Hotel Details](path/to/details.png)

---

### ✅ Booking Confirmation
![Booking](path/to/booking-confirmation.png)

---

### 👤 User Profile
![Profile](path/to/profile.png)

---

### 🏗️ Hotel Registration (Admin)
![Register](path/to/register.png)


---

🔁 Frontend-Backend Flow
- React frontend sends authenticated API requests using Axios.
- Clerk manages user sessions; tokens are passed in headers.
- Backend verifies user via Clerk middleware.
- Cloudinary handles image uploads from hotel owners.
- Stripe processes booking payments and notifies backend.
- Inngest runs async workflows or serverless tasks.
- Nodemailer sends booking confirmation emails.


---

## 🧰 Tech Stack

| 🧩 Category        | ⚙️ Technologies                           |
|-------------------|-------------------------------------------|
| 🖼️ Frontend       | React (Vite), TailwindCSS                 |
| 🚀 Backend        | Node.js, Express.js                      |
| 💾 Database       | MongoDB (Mongoose ODM)                   |
| 🔐 Authentication | Clerk                                     |
| 💳 Payments       | Stripe                                    |
| ✉️ Emails         | Nodemailer                                |
| 📦 Media Storage  | Cloudinary                                |
| 🔄 Event Handling | Inngest                                   |
| ☁️ Hosting        | Vercel (Client), Render (Server)          |
| 📊 Monitoring     | Vercel Analytics & Speed Insights         |


---

## 📂 Folder Structure

```bash
QuickStay/
├── client/               # React Frontend
│   ├── src/
│   │   ├── assets/       # Static images/icons
│   │   ├── components/   # Shared UI components
│   │   ├── context/      # AppContext for global state
│   │   ├── pages/        # Main routes like Home, Rooms, Booking, Owner Dashboard
│   │   └── main.jsx      # React app entry
│   ├── public/
│   ├── .env.local        # Frontend environment variables
│   └── vite.config.js
│
├── server/               # Express Backend
│   ├── configs/          # Cloudinary, DB, Nodemailer config
│   ├── controllers/      # Logic for hotel, booking, user, stripe
│   ├── middleware/       # Auth & upload middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── inngest/          # Event handling logic
│   ├── .env              # Server environment variables
│   └── server.js         # Express server entry

```

---

## 🔧 Installation & Setup

### 📦 Backend (Express Server)
```bash
cd server
npm install
npm run server  # Starts server at http://localhost:5000
```

---


### 🌐 Frontend (React Vite App)
```bash
cd client
npm install
npm run dev     # Starts frontend at http://localhost:3000
```

---


###🙌 Acknowledgments
```bash
Clerk.dev – for Authentication
Stripe – for Payment Integration
Cloudinary – for Image Uploads
Nodemailer – for Email Notifications
Inngest – for Serverless Workflows
```

---

###🏆 Built with Passion, Shared with the Community
"Travel should be easy. Booking should be effortless."


