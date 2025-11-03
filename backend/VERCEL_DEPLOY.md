# Deploy Backend to Vercel

## Steps:

1. **Push backend code to GitHub** (already done)

2. **Go to Vercel Dashboard**
   - Click "Add New..." → "Project"
   - Select your GitHub repository

3. **Configure Project Settings:**
   - **Root Directory**: Set to `backend`
   - **Framework Preset**: Other (or None)
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - `DB_HOST` = your database host
   - `DB_USER` = your database user
   - `DB_PASSWORD` = your database password
   - `DB_NAME` = `collabmate`
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = `production`

5. **Deploy!**

6. **Get Your Backend URL:**
   - After deployment, Vercel will give you a URL like: `https://your-backend.vercel.app`
   - Your API will be at: `https://your-backend.vercel.app/api`

7. **Update Frontend:**
   - Go to your frontend Vercel project
   - Settings → Environment Variables
   - Update `VITE_API_URL` = `https://your-backend.vercel.app/api`
   - Redeploy frontend

## Important Notes:

- You need a **database** (MySQL/PostgreSQL) - Vercel doesn't provide databases
- For free database, use: PlanetScale (MySQL) or Supabase (PostgreSQL)
- Or use Railway/Render for database hosting

