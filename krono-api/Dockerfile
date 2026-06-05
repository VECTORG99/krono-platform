FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S krono && adduser -S krono -G krono
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
USER krono
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
