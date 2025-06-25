# 🩸 Pran Rokto – Blood Donor Finder Web App

**Pran Rokto** is a full-stack blood donor finder application built with the **MERN stack**. It allows users to search for blood donors by blood group and location, manage donor profiles, post reviews, and connect with others. The app features secure authentication, image uploads via Cloudinary, and a responsive UI.

🔗 **Live Website**: [https://pran-rokto.vercel.app](https://pran-rokto.vercel.app)

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

## 🛠️ Tech Stack

| Package                 | Version    |
|-------------------------|------------|
| React                  | ^18.3.1    |
| Vite                   | ^5.4.1     |
| React Router DOM       | ^6.26.2    |
| Tailwind CSS           | ^3.4.11    |
| DaisyUI                | —          |
| React Select           | ^5.8.1     |
| React Slick            | ^0.30.2    |
| Slick Carousel         | ^1.8.1     |
| React Icons            | ^5.3.0     |
| LDRS (Loaders)         | ^1.0.2     |

### 🖥️ Backend
🔗[**Backend Repository**](https://github.com/tahmid122/pranRokto-API)

| Package                  | Version     |
|--------------------------|-------------|
| Node.js                 | ≥18.x       |
| Express                 | ^4.21.0     |
| MongoDB (native)        | ^6.9.0      |
| Mongoose                | ^8.6.3      |
| Bcrypt.js               | ^2.4.3      |
| JSON Web Token (JWT)    | ^9.0.2      |
| Passport                | ^0.7.0      |
| Passport-JWT            | ^4.0.1      |
| Multer                  | ^1.4.5-lts.1|
| Multer-Cloudinary       | ^4.0.0      |
| Cloudinary              | ^1.41.3     |
| Dotenv                  | ^16.4.5     |
| Body-Parser             | ^1.20.3     |
| CORS                    | ^2.8.5      |
| Nodemon                 | ^3.1.7      |

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
git clone https://github.com/tahmid122/pranRokto-API.git
cd pranRokto-API
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

## 📝Author

- Name: **Tahmid Alam**
- GitHub: [@tahmid122](www.github.com/tahmid122)
- Email: <mdtahmidalam122@gmail.com>
