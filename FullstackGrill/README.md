# Mike's Grill Full-Stack Website

A full-stack restaurant website built with Spring Boot (backend), React (frontend), and MySQL (database).

## Architecture

- **Backend**: Spring Boot with JPA and MySQL
- **Frontend**: React with TypeScript
- **Database**: MySQL 8.0
- **Styling**: Custom CSS based on 1950s diner theme

## Project Structure

```
FullstackGrill/
├── backend/          # Spring Boot application
├── frontend/         # React application
├── database/         # MySQL Docker setup
├── contact.html      # Static HTML files (legacy)
├── index.html
├── menu.html
├── mockup.html
└── style.css
```

## Quick Start

1. **Start Database**: `cd database && docker-compose up -d`
2. **Start Backend**: `cd backend && ./mvnw spring-boot:run`
3. **Start Frontend**: `cd frontend && npm start`

Visit:
- **Restaurant Site**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin/login

## Sample Data

The database is automatically populated with sample menu items including burgers, sandwiches, fries, drinks, and desserts.

## Admin Portal

The application includes a secured admin portal for managing menu items.

### Admin Access
- **URL**: http://localhost:3000/admin/login
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

### Admin Features
- **Add Menu Items**: Create new menu items with name, description, price, image URL, and category
- **Edit Menu Items**: Update existing menu items
- **Delete Menu Items**: Remove menu items from the database
- **View All Items**: See all current menu items in a list

### Menu Item Fields
- **Name**: Item name (required)
- **Description**: Detailed description (required)
- **Price**: Price in dollars (required)
- **Image URL**: URL to item image (optional)
- **Category**: One of: burgers, sandwiches, fries, drinks, desserts (required)

### API Endpoints
- `GET /api/public/menu` - Get all menu items (public)
- `GET /api/admin/menu` - Get all menu items (admin only)
- `POST /api/admin/menu` - Create new menu item (admin only)
- `PUT /api/admin/menu/{id}` - Update menu item (admin only)
- `DELETE /api/admin/menu/{id}` - Delete menu item (admin only)

## Development

- Backend API is configured to allow CORS from http://localhost:3000
- Database connection: MySQL on localhost:3306, database: mikesgrill
- Styles are extracted from mockup.html and applied to React components
