FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

COPY ./api-1.0.jar /app/api.jar

EXPOSE 8080

CMD ["java", "-jar", "api.jar"]