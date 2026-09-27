# E-Commerce Sales Analysis & Business Intelligence Application

## Application Architecture Blueprint

### 1. System Overview
A layered, enterprise-standard full-stack Java application for e-commerce sales analytics and business intelligence.

```
+------------------------------------------------------------------+
|                     React 18 Frontend (SPA)                      |
| (Dashboard, Sales, Products, Customers, Orders, SQL Analytics)   |
+------------------------------------------------------------------+
                                |
                   HTTP / REST APIs (Axios)
                                |
+------------------------------------------------------------------+
|                     Spring Boot 3 REST API                       |
|   +----------------------------------------------------------+   |
|   | Controller Layer (HTTP endpoint handlers, DTO mapping)   |   |
|   +----------------------------------------------------------+   |
|                               |                                  |
|   +----------------------------------------------------------+   |
|   | Service Layer (Business logic, analytics calculation)    |   |
|   +----------------------------------------------------------+   |
|                               |                                  |
|   +----------------------------------------------------------+   |
|   | Repository Layer (Spring Data JPA, Custom Native Queries)|   |
|   +----------------------------------------------------------+   |
+------------------------------------------------------------------+
                                |
                             JDBC/JPA
                                |
+------------------------------------------------------------------+
|                      MySQL Database Engine                       |
| (ecommerce_sales DB: Tables, Indexes, Views, Native Analytics)   |
+------------------------------------------------------------------+
```

### 2. Backend Package Design (`com.ecommerce`)
- `com.ecommerce.controller`: Exposes REST API endpoints for dashboard KPI summary, time-series metrics, product/customer performance, order stats, and SQL query runner.
- `com.ecommerce.service`: Contains business logic, analytical calculations, data transformation, and service methods interface implementations.
- `com.ecommerce.repository`: Data access interfaces leveraging Spring Data JPA derived queries and custom native SQL annotations (`@Query`).
- `com.ecommerce.entity`: JPA Entities mapping to MySQL tables (`Customer`, `Product`, `Category`, `Order`, `OrderItem`, `Payment`).
- `com.ecommerce.dto`: Data Transfer Objects for decoupled API request/response payloads (e.g., `KpiSummaryDTO`, `MonthlyRevenueDTO`, `TopProductDTO`, `CustomerSpendingDTO`).
- `com.ecommerce.exception`: Global exception handling (`@RestControllerAdvice`), custom exceptions, and standardized error response models.
- `com.ecommerce.config`: CORS configuration, WebMvc configuration, Jackson mapping, and security/database configuration.
- `EcommerceApplication.java`: Main Spring Boot application entry point.

### 3. Key Design Principles
- **Separation of Concerns**: Controllers delegate 100% of analytical calculations and queries to Services.
- **DTO Projection**: Database entities are never directly leaked to REST responses.
- **Performance & Indexing**: Queries are optimized using DB indexing, views, and efficient SQL aggregates.
- **Error Resiliency**: Global error interception prevents unhandled exceptions from exposing raw trace dumps.
