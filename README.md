# Vanta: Digital Clone Platform

[Live Frontend](https://vanta-ai-iu1g.vercel.app/)

---

## Overview
Vanta is a full-stack web application for creating and interacting with your own digital clone. It features:
- **Frontend:** React (Vite, TypeScript, TailwindCSS, cyberpunk UI)
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL (managed by Render)
- **Deployment:**
  - Backend: [Render.com](https://render.com/)
  - Frontend: [Vercel](https://vercel.com/)

---

## Features
- User signup, login, and onboarding
- Forgot/reset password (no email, direct modal reset)
- Unique clone naming with suggestions
- Chat interface with digital clone
- Guest/demo mode with chat limits
- Cyberpunk-themed UI and loading animations

---

## Live Demo
- **Frontend:** [https://vanta-ai-iu1g.vercel.app/](https://vanta-ai-iu1g.vercel.app/)
- **Backend:** Deployed on Render (API base: `https://vanta-ai-1.onrender.com/api/`)

---

## Local Development

### Backend (Django)
1. `cd backend`
2. Create a virtual environment and activate it:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set environment variables (see `.env.example` or Render dashboard):
   - `DJANGO_SECRET_KEY`
   - `DATABASE_URL`
   - `DEBUG=True`
5. Run migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the server:
   ```sh
   python manage.py runserver
   ```

### Frontend (React)
1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   # or
   bun install
   ```
3. Set environment variable in `.env`:
   ```env
   VITE_API_BASE=https://vanta-ai-1.onrender.com/api/
   ```
4. Start the dev server:
   ```sh
   npm run dev
   # or
   bun dev
   ```

---

## Deployment Notes
- **Backend:**
  - Deploy to Render. Set environment variables in the Render dashboard.
  - Use `gunicorn` as the WSGI server.
  - Set `ALLOWED_HOSTS` to your Render domain.
- **Frontend:**
  - Deploy to Vercel. Set `VITE_API_BASE` to your backend API URL.

---

## Environment Variables
- See `backend/backend/settings.py` and `frontend/.env.example` for required variables.

---

## License
MIT 