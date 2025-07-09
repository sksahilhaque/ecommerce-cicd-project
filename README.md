# 🛍️ E-commerce CI/CD Project

This is a full-stack e-commerce application built with:

- 🌱 **Frontend**: React.js  
- ☕ **Backend**: Spring Boot  
- 🛢️ **Database**: MySQL (via Docker)  
- 🐳 **Containerization**: Docker + Docker Compose  
- 🔄 **CI/CD Ready**: Suitable for Jenkins integration  

---

## 🚀 Features

- Browse products (React frontend)
- Spring Boot backend API with Hibernate
- MySQL database with user-defined schema
- Dockerized with production-ready Dockerfiles
- Wait-for-DB logic ensures stable container boot
- `.env`-ready for CI/CD use

---

## 🧰 Technologies

| Layer     | Tech                  |
|-----------|------------------------|
| Frontend  | React, Bootstrap       |
| Backend   | Spring Boot, Maven     |
| Database  | MySQL (via Docker)     |
| DevOps    | Docker, Docker Compose |

---

## 🐳 Running Locally with Docker

```bash
docker-compose up --build
