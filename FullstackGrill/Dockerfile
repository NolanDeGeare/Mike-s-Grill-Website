# Multi-stage Dockerfile for Mike's Grill
# Builds React frontend and packages into Spring Boot backend

# ============================================
# Stage 1: Build React Frontend
# ============================================
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files first for better caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy frontend source
COPY frontend/ ./

# Build production bundle
RUN npm run build

# ============================================
# Stage 2: Build Spring Boot Backend
# ============================================
FROM maven:3.9-eclipse-temurin-17 AS backend-build

WORKDIR /app/backend

# Copy Maven files first for dependency caching
COPY backend/pom.xml ./
COPY backend/mvnw ./
COPY backend/.mvn ./.mvn

# Download dependencies (cached if pom.xml unchanged)
RUN mvn dependency:go-offline -B

# Copy backend source
COPY backend/src ./src

# Copy frontend build to static resources
COPY --from=frontend-build /app/frontend/build ./src/main/resources/static

# Build the JAR
RUN mvn clean package -DskipTests -q

# ============================================
# Stage 3: Runtime Image
# ============================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create uploads directory for file uploads
RUN mkdir -p /app/uploads

# Copy the JAR from build stage
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Expose port (Render sets PORT env variable)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-8080}/api/public/restaurant || exit 1

# Run the application
# Render sets the PORT environment variable
ENTRYPOINT ["java", "-jar", "app.jar"]
