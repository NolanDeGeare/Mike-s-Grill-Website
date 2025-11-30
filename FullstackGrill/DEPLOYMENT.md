# Mike's Grill - Deployment Guide

This guide explains how the Mike's Grill application is structured and deployed as a **single service**, where the Spring Boot backend serves the React frontend as static files.

---

## Architecture Overview

This is a **monorepo** containing both frontend and backend:

```
FullstackGrill/
├── frontend/          # React TypeScript application
├── backend/           # Spring Boot Java API
├── database/          # SQL scripts for database setup
├── Dockerfile         # Multi-stage build for production
└── render-build.sh    # Local build script
```

When deployed:
- The React app is built and bundled into the Spring Boot JAR
- Spring Boot serves the React static files and handles API requests
- Everything runs on a single port (no CORS issues)
- React Router routes are handled by `SpaController.java`

---

## Current Deployment (Render)

The application is currently deployed on [Render](https://render.com) using Docker.

### Service Configuration

| Setting | Value |
|---------|-------|
| **Root Directory** | `FullstackGrill` |
| **Runtime** | `Docker` |
| **Dockerfile Path** | `./Dockerfile` |

### Environment Variables

The following environment variables must be configured:

| Variable | Required | Description |
|----------|----------|-------------|
| `SPRING_DATA_SOURCE_URL` | ✅ Yes | JDBC MySQL connection URL |
| `DATABASE_USERNAME` | ✅ Yes | Database username |
| `DATABASE_PASSWORD` | ✅ Yes | Database password |

Example `DATABASE_URL` format:
```
jdbc:mysql://hostname:port/database_name?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

### Deployment Process

When you push to the connected GitHub branch, Render automatically:
1. Pulls the latest code
2. Runs the Dockerfile which:
   - Builds the React frontend (`npm run build`)
   - Copies the build output to Spring Boot's static resources
   - Builds the Spring Boot JAR (`mvn package`)
   - Creates a minimal runtime image
3. Starts the application

---

## Docker Build Process

The `Dockerfile` uses a multi-stage build:

### Stage 1: Build React Frontend
- Uses Node.js to install dependencies and build the React app
- Output: `frontend/build/` directory

### Stage 2: Build Spring Boot Backend
- Uses Maven to compile the Java application
- Copies the React build into `src/main/resources/static/`
- Output: `backend-*.jar` file

### Stage 3: Runtime Image
- Uses a minimal Java runtime image
- Runs the JAR file on the port specified by `$PORT` environment variable

---

## Database Requirements

The application requires a **MySQL 8.0+** database with the following tables:
- `menu_items` - Menu items with name, description, price, category
- `menu_categories` - Categories for organizing menu items
- `restaurant_hours` - Hours of operation for each day
- `site_settings` - Site configuration (hero image, etc.)
- `admin_users` - Admin login credentials
- `contact_messages` - Contact form submissions

The database schema is created automatically by Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

Initial data can be loaded using `database/init.sql`.

---

## Moving to a Different Host

To deploy on a different hosting service:

### Requirements
- Docker support (recommended) OR Java 17+ runtime
- MySQL 8.0+ database
- Ability to set environment variables

### Option A: Docker Deployment (Recommended)

1. Build the Docker image:
   ```bash
   cd FullstackGrill
   docker build -t mikesgrill .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 \
     -e DATABASE_URL="jdbc:mysql://host:port/db" \
     -e DATABASE_USERNAME="user" \
     -e DATABASE_PASSWORD="pass" \
     mikesgrill
   ```

### Option B: Manual JAR Deployment

1. Build the frontend:
   ```bash
   cd FullstackGrill/frontend
   npm install
   npm run build
   ```

2. Copy frontend to backend:
   ```bash
   cp -r build/* ../backend/src/main/resources/static/
   ```

3. Build the JAR:
   ```bash
   cd ../backend
   ./mvnw clean package -DskipTests
   ```

4. Run the JAR:
   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar \
     --spring.datasource.url="jdbc:mysql://host:port/db" \
     --spring.datasource.username="user" \
     --spring.datasource.password="pass"
   ```

### Option C: Using the Build Script

A convenience script is provided:
```bash
cd FullstackGrill
chmod +x render-build.sh
./render-build.sh
```

This builds everything and outputs the JAR location.

---

## Configuration Reference

All configuration is in `backend/src/main/resources/application.properties`.

Key settings that can be overridden via environment variables:

| Property | Environment Variable | Default |
|----------|---------------------|---------|
| Database URL | `DATABASE_URL` | localhost |
| Database User | `DATABASE_USERNAME` | user |
| Database Password | `DATABASE_PASSWORD` | password |
| Server Port | `PORT` | 8080 |
| Connection Pool Size | `HIKARI_MAX_POOL` | 5 |

---

## Key Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Production build configuration |
| `render-build.sh` | Local build script |
| `backend/src/main/java/.../SpaController.java` | Routes React Router paths to index.html |
| `backend/src/main/java/.../SecurityConfig.java` | Security and CORS configuration |
| `database/init.sql` | Initial database schema and seed data |

---

## Troubleshooting

### Application won't start
- Check database connection credentials
- Verify database is accessible from the host
- Check logs for specific error messages

### Pages return 404 on refresh
- Ensure `SpaController.java` includes all frontend routes
- Verify `index.html` exists in the static resources

### Database connection refused
- Verify the database host allows external connections
- Check firewall/security group settings
- Confirm credentials are correct

### Images not persisting after redeploy
- Uploaded images are stored in `/app/uploads/` inside the container
- This storage is ephemeral on most platforms
- For persistent storage, consider using cloud storage (S3, etc.)

---

## Admin Access

The admin panel is accessible at `/admin/login`.

Default credentials should be changed after initial setup. Admin users are stored in the `admin_users` table with BCrypt-hashed passwords.

---

## Support

For questions about this codebase, refer to:
- `README.md` in each directory for component-specific documentation
- Code comments throughout the application
- This deployment guide for infrastructure concerns
