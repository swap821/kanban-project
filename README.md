# 📋 Full-Stack Kanban Task Manager : https://kanban-project-gamma-roan.vercel.app/

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A powerful full-stack Kanban-style task management application inspired by Trello, built using the MERN stack. The application provides seamless drag-and-drop task organization, dynamic CRUD operations, persistent cloud-based storage, and a responsive modern user interface.

This project demonstrates advanced frontend state management, scalable backend architecture, real-time UI synchronization, and interactive user experiences using modern web technologies.

---

# ✨ Key Features

## 🎯 Interactive Drag & Drop
- Smooth drag-and-drop task movement between columns
- Reorder tasks dynamically within the same column
- Built using `@hello-pangea/dnd`
- Responsive drag animations and transitions

## 📝 Full CRUD Operations
- Create, edit, and delete tasks
- Dynamically create and manage columns
- Real-time updates across the application
- Persistent task management system

## 💾 Persistent Database Storage
- MongoDB database integration
- Data synchronization between frontend and backend
- Tasks and columns remain saved after refresh

## 🎨 Modern Responsive UI
- Fully responsive design using Tailwind CSS
- Minimal and clean dashboard interface
- Interactive hover states and drag effects
- Optimized user experience for desktop and mobile

## ⚡ Scalable Monorepo Architecture
- Clean separation between frontend and backend
- Organized project structure for scalability
- Easy deployment and maintenance

---

# 🛠️ Tech Stack

## Frontend (`/kanban-board`)
- React.js
- TypeScript
- Vite
- Tailwind CSS
- `@hello-pangea/dnd`

## Backend (`/kanban-api`)
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- CORS
- Dotenv

---

# 📂 Project Structure

```plaintext
kanban-project/
│
├── kanban-api/               # Backend API Server
│   ├── models/               # MongoDB Schemas
│   ├── routes/               # API Routes
│   ├── controllers/          # Business Logic
│   ├── server.js             # Express Server Configuration
│   └── package.json
│
├── kanban-board/             # Frontend React Application
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── Column
│   │   │   └── TaskCard
│   │   │
│   │   ├── pages/            # Application Pages
│   │   ├── App.tsx           # Main State Management Logic
│   │   └── data.ts           # TypeScript Interfaces
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

To run this project locally, make sure Node.js and MongoDB are installed.

---

# 📌 Prerequisites

Install the following:
- Node.js
- npm
- MongoDB Atlas account or local MongoDB instance

Download Node.js:
https://nodejs.org/

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/swap821/kanban-project.git
cd kanban-project
```

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd kanban-api
npm install
```

---

## 🌐 Configure Backend Environment Variables

Create a `.env` file inside `kanban-api`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

---

## ▶️ Start the Backend Server

```bash
npm run dev
```

---

# 🎨 Frontend Setup

Open a second terminal and navigate to the frontend:

```bash
cd kanban-board
npm install
```

---

## 🌍 Configure Frontend Environment Variables

Create a `.env` file inside `kanban-board`:

```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Start Frontend Development Server

```bash
npm run dev
```

---

# 🌐 Run the Application

Visit:

```bash
http://localhost:5174
```

The frontend will now communicate successfully with the local Node.js backend server.

---

# 🧠 Concepts & Skills Demonstrated

This project demonstrates strong understanding of:

- Full-Stack MERN Development
- Advanced React State Management
- TypeScript Integration
- Drag-and-Drop Systems
- REST API Development
- MongoDB Database Architecture
- Frontend & Backend Communication
- Asynchronous Data Handling
- Responsive UI/UX Design
- Scalable Project Structure
- Modern Software Engineering Practices

---

# 🚀 Future Improvements

- User Authentication & Authorization
- Team Collaboration Features
- Due Dates & Notifications
- Real-Time Collaboration with WebSockets
- Activity History Tracking
- Dark/Light Theme Toggle
- Task Priority Labels
- File Attachments & Comments

---

# 🌐 Deployment

This application can be deployed using:

## Frontend Hosting
- Vercel
- Netlify

## Backend Hosting
- Render
- Railway

## Database
- MongoDB Atlas

---

# 👨‍💻 Author

## Swapnil Kumar

- GitHub: https://github.com/swap821
- LinkedIn: https://www.linkedin.com/in/swapnil-kumar-73a68a308

---

# ⭐ Project Goal

This project was built to strengthen and demonstrate:
- Advanced Full-Stack Development Skills
- Interactive Frontend Engineering
- Database Design & Integration
- Scalable Application Architecture
- Drag-and-Drop User Experiences
- Professional Software Engineering Practices

---

# 📜 License

This project is open-source and available for educational and learning purposes.
