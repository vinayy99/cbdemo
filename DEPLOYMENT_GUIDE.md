# 🚀 Complete Deployment Guide - Step by Step

This guide will help you deploy CollabMate online so anyone can access it.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ GitHub account (free)
- ✅ Vercel account (free)
- ✅ Railway account (free tier available)
- ✅ Your code ready (we've prepared Part 1)

---

## STEP 1: Push Code to GitHub

### 1.1 Check if you already have Git initialized

Open your terminal/command prompt in the project folder and run:
```bash
git status
```

If you see "not a git repository", continue to step 1.2.
If you see file listings, you already have git - skip to step 1.3.

### 1.2 Initialize Git (if needed)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - CollabMate project"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com
2. Sign in or create account
3. Click the **"+"** icon (top right) → **"New repository"**
4. Fill in:
   - **Repository name**: `collabmate` (or any name you like)
   - **Description**: "Collaboration platform for developers"
   - **Visibility**: Choose Public (free) or Private
   - **DO NOT** check "Initialize with README" (we already have code)
5. Click **"Create repository"**

### 1.4 Connect and Push Your Code

GitHub will show you commands. Use these (replace YOUR_USERNAME with your GitHub username):

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/collabmate.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Note**: If asked for credentials:
- Use GitHub Personal Access Token (not password)
- Or use GitHub Desktop app for easier pushing

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Sign Up/Login to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"** (easiest)
4. Authorize Vercel to access your GitHub

### 2.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your `collabmate` repository in the list
3. Click **"Import"**

### 2.3 Configure Project Settings

Vercel will auto-detect settings, but verify:

- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: `./` (leave as root)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 2.4 Add Environment Variable (We'll update this later)

1. Scroll down to **"Environment Variables"**
2. Click **"Add"**
3. Add this variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Leave **empty for now** (we'll add backend URL after deploying backend)
4. Click **"Add"**

### 2.5 Deploy

1. Click **"Deploy"** button (bottom)
2. Wait 1-2 minutes for build to complete
3. ✅ **Success!** You'll get a URL like: `https://collabmate-xxx.vercel.app`

**Save this URL** - you'll need it later!

---

## STEP 3: Deploy Backend to Railway

### 3.1 Sign Up/Login to Railway

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Click **"Login with GitHub"** (or create account)
4. Authorize Railway access

### 3.2 Create New Project

1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Find and select your `collabmate` repository
4. Click **"Deploy Now"**

### 3.3 Configure Backend Service

Railway will detect Node.js, but we need to configure it:

1. Click on the service that was created
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Set Root Directory to: `backend`
5. Save changes

### 3.4 Set Up Database

You have two options:

#### Option A: Use Railway PostgreSQL (Easiest)

1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway creates database automatically
4. Click on the database
5. Go to **"Variables"** tab
6. **Copy** the connection details (you'll need these)

#### Option B: Use External MySQL (If you prefer MySQL)

Use free MySQL hosting:
- **PlanetScale**: https://planetscale.com (sign up, create database)
- **Aiven**: https://aiven.io (free tier)
- Get connection string from their dashboard

### 3.5 Add Environment Variables

In Railway → Your Backend Service → **"Variables"** tab:

Add these variables (click **"+ New Variable"** for each):

```
DB_HOST=your-database-host
DB_USER=your-database-user  
DB_PASSWORD=your-database-password
DB_NAME=collabmate
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-random-string-here-make-it-long
```

**How to fill these:**

If using Railway PostgreSQL:
- `DB_HOST` = `postgres.railway.internal` (or use Railway's generated host)
- `DB_USER` = From Railway database variables
- `DB_PASSWORD` = From Railway database variables
- `DB_NAME` = `railway` or from variables

If using external MySQL:
- Use the connection details from your MySQL provider

**JWT_SECRET**: Generate a random string (you can use any random text, minimum 32 characters)
- Example: `my-super-secret-jwt-key-for-collabmate-2024-production`

### 3.6 Deploy Backend

1. Railway auto-deploys when you push to GitHub
2. Or click **"Deploy"** in Railway dashboard
3. Go to **"Settings"** → **"Generate Domain"** to get public URL
4. Your backend URL will be like: `https://collabmate-production.up.railway.app`

**Save this URL!** You'll need it next.

### 3.7 Initialize Database

You need to run your database schema:

**Option 1: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migration (if you have a script)
railway run node database/migrations/createSchema.js
```

**Option 2: Manual SQL Execution**
1. Connect to your database using a MySQL client (like MySQL Workbench)
2. Use the connection details from Railway
3. Run the SQL from `backend/database/schema.sql`

---

## STEP 4: Connect Frontend to Backend

### 4.1 Get Your Backend API URL

From Railway dashboard:
- Your backend URL: `https://collabmate-production.up.railway.app`
- Your API URL: `https://collabmate-production.up.railway.app/api` (add `/api` at end)

### 4.2 Update Vercel Environment Variable

1. Go back to **Vercel Dashboard**
2. Click on your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Find `VITE_API_URL`
5. Click **"Edit"** or delete and recreate
6. Set value to: `https://collabmate-production.up.railway.app/api`
   (Replace with YOUR actual Railway URL + `/api`)
7. Click **"Save"**

### 4.3 Redeploy Frontend

1. In Vercel, go to **"Deployments"** tab
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## STEP 5: Update CORS in Backend (If Needed)

### 5.1 Update Backend CORS Settings

If you get CORS errors, update `backend/server.js`:

Find this line:
```javascript
app.use(cors());
```

Replace with:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

Replace `your-frontend-url.vercel.app` with your actual Vercel URL.

### 5.2 Redeploy Backend

1. Commit and push changes:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

2. Railway will auto-redeploy

---

## STEP 6: Test Your Deployment

### 6.1 Test Frontend

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Try these:
   - ✅ Page loads
   - ✅ Sign up/Login works
   - ✅ Can see projects
   - ✅ Can join projects
   - ✅ Skill swaps work

### 6.2 Test Backend

1. Visit: `https://your-backend.railway.app/health`
2. Should see: `{"status":"ok","message":"Server is running"}`

---

## ✅ Deployment Complete!

Your website is now live:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **API**: `https://your-backend.railway.app/api`

---

## 🔧 Troubleshooting

### Problem: Frontend can't connect to backend

**Solution:**
1. Check Vercel environment variable `VITE_API_URL` is set correctly
2. Verify backend is running (check Railway logs)
3. Check CORS settings in backend

### Problem: Database connection errors

**Solution:**
1. Verify all database environment variables in Railway
2. Make sure database is accessible (not localhost-only)
3. Check Railway database logs

### Problem: Build fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Make sure `package.json` has correct scripts
3. Verify Node.js version compatibility

### Problem: Backend won't start

**Solution:**
1. Check Railway logs (very helpful!)
2. Verify all environment variables are set
3. Make sure `backend/package.json` has `start` script

---

## 📝 Quick Reference

### Commands to Remember

```bash
# Push updates to GitHub
git add .
git commit -m "Your message"
git push

# Check Railway logs (if using CLI)
railway logs

# Check if backend is running
curl https://your-backend.railway.app/health
```

### URLs You Need to Save

- Frontend URL: _________________________
- Backend URL: _________________________
- Database connection: _________________________

---

## 🎉 Success!

Your CollabMate platform is now online and accessible to anyone!

**Next Steps:**
- Share your Vercel URL with others
- Test all features
- Monitor usage in Railway/Vercel dashboards
- Add more features as needed

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- GitHub Issues: Create an issue in your repo

