# Use the Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Use the OpenJDK image to run the application
FROM openjdk:17-jdk-slim
COPY --from=build /app/target/FinanceTrackerApplication-0.1.jar /app/FinanceTrackerApplication-0.1.jar
ENTRYPOINT ["java", "-jar", "/app/FinanceTrackerApplication-0.1.jar"]
