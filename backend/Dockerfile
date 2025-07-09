# Stage 1: Build with Maven
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Runtime image (Debian-based)
FROM eclipse-temurin:17-jdk

RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
COPY wait-for.sh .
RUN chmod +x wait-for.sh
ENTRYPOINT ["sh", "./wait-for.sh"]
