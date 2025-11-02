# 🚀 CollabMate - Complete Full Stack Website

Welcome! This is your complete **CollabMate** application with frontend, backend, and MySQL database.

## ✅ What's Included

- ✅ **Frontend** - React + Vite + TypeScript
- ✅ **Backend** - Node.js + Express + MySQL
- ✅ **Database** - MySQL with schema and sample data
- ✅ **API Integration** - Frontend connected to backend
- ✅ **Authentication** - User login/register with JWT
- ✅ **Features** - Projects, Skill Swaps, User Management

## 🎯 Quick Start (Easy Way)

### Option 1: Use the startup script (Windows)

**Just double-click this file:**
```
start-everything.bat
```

This will automatically:
1. Start MySQL
2. Start the backend server (port 3001)
3. Start the frontend server (port 5173)
4. Open your browser

### Option 2: Manual Start (Any OS)

Open **TWO** terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Then open: http://localhost:5173

## 📱 Using the App

### Default Login Credentials

You can log in with these sample accounts:

**User 1:**
- Email: `alice@example.com`
- Password: `password123`

**User 2:**
- Email: `bob@example.com`
- Password: `password123`

**User 3:**
- Email: `charlie@example.com`
- Password: `password123`

Or create your own account by signing up!

## 🎨 Features

1. **Browse Projects** - Discover collaboration opportunities
2. **Join Projects** - Connect with other creators
3. **Skill Swaps** - Exchange skills with community members
4. **User Profiles** - Showcase your skills and availability
5. **Real-time Updates** - Data syncs with MySQL database

## 🔧 Troubleshooting

### Backend won't start?
```bash
cd backend
npm run dev
```
Check the console for errors.

### Frontend won't start?
```bash
npm run dev
```

### Database connection error?
- Make sure MySQL is running
- Check `.env` file in `backend/` folder
- Password is set to `mysql` (default)

### Port 3001 already in use?
- Change `PORT` in `backend/.env`
- Or stop the service using that port

## 📂 Project Structure

```
project/
├── Frontend (React/Vite)
│   ├── pages/       - Page components
│   ├── components/  - Reusable components
│   ├── context/     - State management
│   ├── services/    - API integration
│   └── types.ts     - TypeScript types
│
└── backend/         (Node/Express)
    ├── routes/      - API endpoints
    ├── database/    - MySQL schema
    ├── middleware/  - Auth middleware
    └── server.js    - Main server
```

## 🎯 Next Steps

1. **Explore** - Browse projects and users
2. **Create** - Sign up and create your profile
3. **Collaborate** - Join projects and exchange skills
4. **Customize** - Modify colors, styles, and features

## 📚 Documentation

- **Backend API:** See `backend/API.md`
- **Setup Guide:** See `backend/README.md`
- **Quick Start:** See `backend/QUICK_START.md`

## 💡 Tips

- Backend runs on http://localhost:3001
- Frontend runs on http://localhost:5173
- Database: MySQL on localhost
- All data persists in MySQL database
- Mock data available as fallback if backend is down

## 🎉 You're Ready!

Just run `start-everything.bat` or start both servers manually.
Everything is set up and ready to go!

Enjoy building amazing collaborations! 🚀

