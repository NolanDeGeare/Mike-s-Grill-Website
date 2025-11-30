#!/bin/bash
# Render Build Script for Mike's Grill
# This script builds the React frontend and packages it into the Spring Boot backend

set -e  # Exit on any error

echo "=========================================="
echo "🍔 Mike's Grill - Render Build Script"
echo "=========================================="

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📁 Working directory: $SCRIPT_DIR"

# Step 1: Build React Frontend
echo ""
echo "📦 Step 1: Building React frontend..."
cd "$SCRIPT_DIR/frontend"

# Install Node dependencies
echo "   Installing npm dependencies..."
npm ci --legacy-peer-deps

# Build for production
echo "   Building production bundle..."
npm run build

# Step 2: Copy React build to Spring Boot static resources
echo ""
echo "📋 Step 2: Copying frontend build to backend..."
STATIC_DIR="$SCRIPT_DIR/backend/src/main/resources/static"

# Clean existing static files
rm -rf "$STATIC_DIR"/*
mkdir -p "$STATIC_DIR"

# Copy build files
cp -r build/* "$STATIC_DIR/"

echo "   ✓ Frontend files copied to: $STATIC_DIR"

# Step 3: Build Spring Boot JAR
echo ""
echo "🔨 Step 3: Building Spring Boot application..."
cd "$SCRIPT_DIR/backend"

# Make mvnw executable
chmod +x mvnw

# Build the JAR
./mvnw clean package -DskipTests -q

echo ""
echo "=========================================="
echo "✅ Build complete!"
echo "=========================================="
echo ""
echo "JAR location: $SCRIPT_DIR/backend/target/backend-0.0.1-SNAPSHOT.jar"
