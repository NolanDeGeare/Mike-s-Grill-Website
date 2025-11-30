# Single-Service Deployment Guide for Mike's Grill

This guide explains how to deploy the Mike's Grill application as a **single service** on Render, where the Spring Boot backend serves the React frontend as static files.

## Architecture Overview

When deployed as a single service:
- The React app is built and its static files are placed in `backend/src/main/resources/static/`
- Spring Boot serves these static files and handles API requests
- React Router client-side routes are forwarded to `index.html` by the `SpaController`
- No CORS issues since everything runs on the same origin

---

## 🚀 Deploy to Render (Recommended)

### Prerequisites
- GitHub repository with your code
- A MySQL database (see Database Options below)
- Render account (free tier available)

### Step 1: Set Up Your Database

You'll need a MySQL database. Options:

1. **PlanetScale** (Recommended - free tier with MySQL)
   - Go to [planetscale.com](https://planetscale.com)
   - Create a database
   - Get your connection string

2. **Railway MySQL** (free tier available)
   - Go to [railway.app](https://railway.app)
   - Create a new MySQL database
   - Copy the connection credentials

3. **Your existing Filess.io database** (if still active)

### Step 2: Deploy on Render

1. **Go to [render.com](https://render.com)** and sign in

2. **Create New Web Service**:
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository: `NolanDeGeare/Mike-s-Grill-Website`

3. **Configure the service**:
   | Setting | Value |
   |---------|-------|
   | **Name** | `mikesgrill` (or your choice) |
   | **Root Directory** | `FullstackGrill` |
   | **Runtime** | `Docker` |
   | **Dockerfile Path** | `./Dockerfile` |
   | **Instance Type** | `Free` |

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

   **Required - Database:**
   | Variable | Description | Example |
   |----------|-------------|---------|
   | `DATABASE_URL` | Full JDBC MySQL URL | `jdbc:mysql://host:3306/dbname?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
   | `DATABASE_USERNAME` | Database username | `your_username` |
   | `DATABASE_PASSWORD` | Database password | `your_password` |

   **Optional - Email (for contact form):**
   | Variable | Description | Example |
   |----------|-------------|---------|
   | `MAIL_USERNAME` | Gmail address | `your-email@gmail.com` |
   | `MAIL_PASSWORD` | Gmail App Password* | `xxxx xxxx xxxx xxxx` |
   | `ADMIN_EMAIL` | Email to receive contacts | `admin@example.com` |

   > *For Gmail, create an [App Password](https://support.google.com/accounts/answer/185833)

5. **Click "Create Web Service"**

Render will:
- Build the React frontend
- Package it into Spring Boot
- Deploy the application
- Give you a URL like `https://mikesgrill.onrender.com`

### Step 3: Verify Deployment

Once deployed, visit your Render URL and check:
- ✅ Homepage loads with menu carousel
- ✅ Menu page shows items from database  
- ✅ Contact form works (if email configured)
- ✅ Admin login works at `/admin/login`

---

## Environment Variables Reference

All environment variables used by the application:

```properties
# Database (REQUIRED)
DATABASE_URL=jdbc:mysql://host:port/database?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Connection Pool (optional - has defaults)
HIKARI_MAX_POOL_SIZE=5        # Default: 5
HIKARI_MIN_IDLE=1             # Default: 1

# JPA (optional)
JPA_SHOW_SQL=false            # Default: false

# Email - for contact form (optional)
MAIL_HOST=smtp.gmail.com      # Default: smtp.gmail.com
MAIL_PORT=587                 # Default: 587
MAIL_USERNAME=                # Your email
MAIL_PASSWORD=                # App password
MAIL_SMTP_AUTH=true           # Default: true
MAIL_STARTTLS=true            # Default: true
ADMIN_EMAIL=                  # Receives contact form messages
```

---

## Local Development

For local development, you can either:

### Option A: Run Frontend and Backend Separately (Recommended for Development)

1. **Start the backend**:
   ```bash
   cd FullstackGrill/backend
   ./mvnw spring-boot:run
   ```

2. **Start the frontend** (in another terminal):
   ```bash
   cd FullstackGrill/frontend
   npm start
   ```

3. The frontend runs on `http://localhost:3000` and proxies API calls to the backend.

### Option B: Build and Run as Single Service

Use the build script:
```bash
cd FullstackGrill
chmod +x render-build.sh
./render-build.sh

# Then run:
java -jar backend/target/backend-0.0.1-SNAPSHOT.jar
```

---

## Database Setup

### Using PlanetScale (Recommended for Production)

1. Create account at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Go to **Connect** → Select **Java** → Copy the connection string
4. Use these as your Render environment variables

### Using Your Existing Database

If your Filess.io database is still active:
```
DATABASE_URL=jdbc:mysql://so8d22.h.filess.io:3307/MikesGrill_sincedull?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DATABASE_USERNAME=MikesGrill_sincedull
DATABASE_PASSWORD=<your-password>
```

---

## Troubleshooting

### Build fails on Render
- Check the build logs for specific errors
- Ensure all files are committed to GitHub
- Verify the Dockerfile path is correct

### API calls returning 404
- Ensure the React build was properly included
- Check that `index.html` exists in the static folder

### Database connection fails
- Verify your `DATABASE_URL` format is correct
- Check that your database allows external connections
- Try the connection locally first

### SPA routes not working (refresh shows 404)
- The `SpaController` forwards these routes to `index.html`
- If adding new routes, update `SpaController.java`

### Images not loading
- Uploaded images are stored in `/app/uploads/` in the container
- For persistent storage, consider using cloud storage (S3, Cloudinary)
- Note: Render free tier has ephemeral storage - uploaded images may be lost on redeploy

---

## Files Created for Deployment

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build for Render |
| `render-build.sh` | Local build script |
| `render.yaml` | Render Blueprint (optional) |
| `SpaController.java` | Handles React Router routes |

---

## Summary of Code Changes Made

1. **Frontend**: Changed all `http://localhost:8080/api/...` to `/api/...` (relative paths)
2. **Backend**:
   - `application.properties`: All sensitive values use environment variables with defaults
   - Created `SpaController.java` to handle React Router routes
   - Updated `SecurityConfig.java` with flexible CORS and static resource permissions
   - Updated `WebConfig.java` to serve static files properly
   - Removed hardcoded `@CrossOrigin` annotations from controllers

These changes allow the app to work both locally and in production on Render!
