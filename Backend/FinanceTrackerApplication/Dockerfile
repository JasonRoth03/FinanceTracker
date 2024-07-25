# Stage 1: Build
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Package
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /app/target/FinanceTrackerApplication-0.1.jar app.jar

EXPOSE 8080
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

