# ✅ Deployment Checklist

Follow this checklist step by step to deploy your website.

## Part 1: GitHub Setup
- [ ] Create GitHub account (if needed)
- [ ] Create new repository on GitHub
- [ ] Initialize git in project folder (`git init`)
- [ ] Add all files (`git add .`)
- [ ] Commit (`git commit -m "Initial commit"`)
- [ ] Push to GitHub (`git push -u origin main`)

## Part 2: Vercel (Frontend)
- [ ] Sign up/login to Vercel (use GitHub login)
- [ ] Import GitHub repository
- [ ] Verify build settings (Vite auto-detected)
- [ ] Add environment variable: `VITE_API_URL` (leave empty for now)
- [ ] Click Deploy
- [ ] **Save your Vercel URL**: _______________________

## Part 3: Railway (Backend)
- [ ] Sign up/login to Railway (use GitHub login)
- [ ] Create new project → Deploy from GitHub
- [ ] Set Root Directory to: `backend`
- [ ] Create PostgreSQL database in Railway (or use external MySQL)
- [ ] Add environment variables:
  - [ ] `DB_HOST` = _______________________
  - [ ] `DB_USER` = _______________________
  - [ ] `DB_PASSWORD` = _______________________
  - [ ] `DB_NAME` = `collabmate`
  - [ ] `PORT` = `3001`
  - [ ] `NODE_ENV` = `production`
  - [ ] `JWT_SECRET` = `your-random-secret-key`
- [ ] Generate domain/public URL
- [ ] **Save your Railway backend URL**: _______________________
- [ ] Initialize database (run schema.sql or migration)

## Part 4: Connect Everything
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Update `VITE_API_URL` = `https://your-backend.railway.app/api`
- [ ] Redeploy frontend on Vercel

## Part 5: Test
- [ ] Visit Vercel URL - frontend loads?
- [ ] Try to sign up - works?
- [ ] Try to login - works?
- [ ] Browse projects - shows?
- [ ] Check backend health: `https://your-backend.railway.app/health`

## Part 6: Final Checks
- [ ] Both frontend and backend URLs working?
- [ ] No CORS errors in browser console?
- [ ] Database connection working?
- [ ] All features tested?

---

## 🎉 DONE!

Your website is now live at: `https://your-project.vercel.app`

