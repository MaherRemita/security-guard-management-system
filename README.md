# Security Guard Management System

This project is a technical assessment demonstrating full-stack development skills using Laravel, React, and Inertia.js. The system includes two main parts: a user management admin panel and a RESTful API for mission booking operations.

---

## Quick Links

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-4CAF50?style=for-the-badge&logo=vercel&logoColor=white)](http://34.40.93.77:82)
[![Postman Workspace](https://img.shields.io/badge/📮_Postman_Workspace-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/planetary-spaceship-939256/guard-management-system/overview)

</div>

---

## Project Overview

This assessment is divided into two parts:

### Part 1: Admin Panel (Web Interface)
A complete user management system with authentication, CRUD operations, search/filter functionality, and data visualization features. Built using Laravel with Inertia.js and React for the frontend.

### Part 2: RESTful API
A mission booking API following REST principles with Sanctum authentication. Includes CRUD operations for missions, professions, and guard groups.

---

## Database Schema

### Entity Relationship Diagram

![ER Diagram](./diagram.png)

## Setup and Installation


### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/MaherRemita/security-guard-management-system.git
cd security-guard-management-system
```

2. Install PHP dependencies
```bash
composer install
```

3. Install JavaScript dependencies
```bash
npm install
```

4. Create environment file
```bash
cp .env.example .env
```

5. Configure database in `.env` file
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=security_guard_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Generate application key
```bash
php artisan key:generate
```

7. Run migrations
```bash
php artisan migrate
```

8. Seed the database (optional)
```bash
php artisan db:seed
```

9. Build frontend assets
```bash
npm run build
```
10. Start the development servers
```bash
php artisan dev
```

The application will be available at `http://localhost:8000`

### Default Admin Credentials

```
Email: maher@admin.com
Password: password
```
*(Update these if you seeded with different credentials)*

---

## Design Patterns

### Service Layer Pattern

All business logic is abstracted into service classes (`app/Services`) to keep controllers lean and focused on HTTP handling. This provides:

- **Separation of Concerns**: Controllers handle HTTP, Services handle business logic
- **Reusability**: Services can be used across multiple controllers
- **Testability**: Business logic can be tested independently
- **Maintainability**: Changes to business logic are isolated
