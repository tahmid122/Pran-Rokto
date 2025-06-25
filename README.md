# 🩸 Pran Rokto – Blood Donor Finder Web App

**Pran Rokto** is a full-stack blood donor finder application built with the **MERN stack**. It allows users to search for blood donors by blood group and location, manage donor profiles, post reviews, and connect with others. The app features secure authentication, image uploads via Cloudinary, and a responsive UI.

🔗 **Live Website**: [https://pran-rokto.vercel.app](https://pran-rokto.vercel.app)

---

## 🛠️ Tech Stack

### 💻 Frontend
- React 18
- Vite
- Tailwind CSS & DaisyUI
- React Router DOM
- React Select
- React Slick & Slick Carousel
- React Icons
- LDRS (Loaders)

### 🖥️ Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Passport JWT Authentication
- Bcrypt.js for password hashing
- Multer + Cloudinary for image upload
- Dotenv for environment variables
- CORS & Body-Parser

---

## ✨ Features

- 🔍 Search blood donors by blood group, district, and upazilla
- 🔐 Secure donor and admin authentication (JWT)
- 🧾 Donor profile creation, update, and password management
- 🖼️ Image upload and storage via Cloudinary
- 💬 Public reviews and chatbox functionality
- 📱 Fully responsive interface
- 🌐 Hosted on Vercel (frontend) and Render (or any Node server)

---

---

## 🚀 Getting Started

### 🔹 Frontend

```bash
git clone https://github.com/tahmid122/pranrokto.git
cd pranrokto
npm install
npm run dev
```

### 🔹 Backend

```bash
cd apipranrokto
npm install
```

Create a .env file in the root with the following:
```
PORT=5000
MONGO_URL=your_mongodb_url
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
Run the backend:
```
npm start
```

## 📡 API Overview

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| POST   | `/donorsData`                 | Register a new donor      |
| POST   | `/login`                      | Donor login               |
| POST   | `/admin-login`                | Admin login               |
| GET    | `/donor/:number`              | Get donor details         |
| POST   | `/main-review`                | Submit a main review      |
| GET    | `/main-review`                | Retrieve all main reviews |
| POST   | `/getSearchResult`            | Search donors             |
| POST   | `/donor/update/photo/:number` | Upload donor photo        |
| POST   | `/change-password/:number`    | Change donor password     |

And more routes for reviews, chat, password reset, and profile management.
