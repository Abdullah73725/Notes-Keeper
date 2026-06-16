# Notes Keeper App

## Overview

Notes Keeper is a full-stack web application that allows users to create, manage, update, and organize their personal notes securely. The application provides a simple and user-friendly interface for note management while implementing a robust backend for data persistence and API handling.

## Features

* User Registration and Authentication
* Create Notes
* View Notes
* Update Existing Notes
* Delete Notes
* Secure API Communication
* Responsive User Interface
* Persistent Data Storage using PostgreSQL

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* Maven

### Database

* PostgreSQL

### Version Control

* Git
* GitHub

## Project Structure

```text
NOTES-KEEPER-APP
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── keeper-backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── README.md
```

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/Abdullah73725/Notes-Keeper.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd keeper-backend
mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8080
```

## Database Configuration

Update the database configuration in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/your_database_name
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

## API Endpoints

Examples:

* POST /api/auth/register
* POST /api/auth/login
* GET /api/notes
* POST /api/notes
* PUT /api/notes/{id}
* DELETE /api/notes/{id}

## Future Enhancements

* Note Categories
* Search Functionality
* File Attachments
* Dark Mode
* Note Sharing
* Cloud Deployment

## Author

Abdullah Ansari

GitHub: https://github.com/Abdullah73725
