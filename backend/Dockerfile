# ----------- Stage 1: Build the Spring Boot app -------------
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy Maven wrapper and pom files first (for layer caching)
COPY pom.xml .
COPY mvnw .
COPY .mvn/ .mvn/

# Pre-download dependencies
RUN ./mvnw dependency:go-offline -B

# Now copy the rest of the project
COPY src/ src/

# Package without running tests
RUN ./mvnw clean package -DskipTests


# ----------- Stage 2: Minimal Runtime Image ---------------
FROM eclipse-temurin:17-jdk

# Install netcat to wait for DB readiness
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Add wait-for script (make sure it's in root directory)
COPY wait-for.sh .
RUN chmod +x wait-for.sh

# Entrypoint waits for DB (like MySQL) then starts app
ENTRYPOINT ["sh", "./wait-for.sh"]
