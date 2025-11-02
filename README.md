<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CollabMate - Collaboration Platform

A platform for connecting developers, designers, and creatives to collaborate on projects and exchange skills.

## Backend Setup

The project includes a complete backend API with MySQL database support.

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Setting Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=collabmate
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=your_secret_key_here
   ```

4. Set up the MySQL database:
   ```bash
   # Option 1: Run the migration script
   node database/migrations/createSchema.js

   # Option 2: Or manually run the SQL file
   mysql -u root -p < database/schema.sql
   ```

5. Start the backend server:
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

The backend API will be available at `http://localhost:3001`

For more details, see [backend/README.md](backend/README.md)

## Frontend Setup

### Prerequisites

- Node.js

### Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if needed)

3. Run the app:
   ```bash
   npm run dev
   ```

View your app in AI Studio: https://ai.studio/apps/drive/1kJKG7TCNO4UK9in0r70Fizk5rO1GaEor
