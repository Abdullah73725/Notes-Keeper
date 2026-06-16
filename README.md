# Notes Keeper App

A full-stack Notes Management application that allows users to securely create, update, delete, and organize personal notes.

## Features

* User Authentication and Authorization
* Create New Notes
* View All Notes
* Update Existing Notes
* Delete Notes
* Secure Backend APIs
* Responsive User Interface
* PostgreSQL Database Integration

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
* Spring Security
* Spring Data JPA
* Maven

### Database

* PostgreSQL

### Version Control

* Git
* GitHub

---

## Project Structure

```text
Notes-Keeper-App
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── keeper-backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/Abdullah73725/Notes-Keeper.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd keeper-backend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Database Configuration

Update the database credentials in:

```text
keeper-backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/your_database_name
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

---

## Future Improvements

* Note Categories
* Search Notes
* Dark Mode
* File Attachments
* Cloud Deployment
* Email Notifications

---

## Author

**Abdullah Ansari**

GitHub: https://github.com/Abdullah73725
