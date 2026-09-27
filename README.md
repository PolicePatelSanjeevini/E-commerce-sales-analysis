# E-Commerce Sales Analysis & Business Intelligence Application 📊🛒

An end-to-end enterprise Full Stack Java & React Business Intelligence platform designed to perform deep SQL analytics on e-commerce sales datasets.

Developed with **Spring Boot 3**, **MySQL 8.0**, and **React 18**, this application features real-time KPI metrics, time-series revenue trends, customer lifetime value rankings, product intelligence, and an interactive **SQL Analysis Showcase** page.

---

## 📌 Problem Statement & Objectives

Traditional e-commerce platforms focus primarily on order management and transactional cart operations. However, business executives and data analysts require specialized **Business Intelligence (BI)** platforms to answer crucial strategic questions:
- *What is our Month-over-Month (MoM) revenue growth velocity?*
- *Which product categories generate the highest margin and revenue share?*
- *Who are our top high-value repeat customers, and how can we retain them?*
- *What is our order fulfillment pipeline health and payment channel success rate?*

### Objectives
1. Build a normalized MySQL relational schema (`ecommerce_sales`) supporting 6 relational entities with strict FK constraints and performance indexes.
2. Formulate advanced native SQL analytical queries leveraging **Common Table Expressions (CTEs)**, **Window Functions** (`RANK()`, `DENSE_RANK()`, `LAG()`), and **Conditional Aggregation (`CASE`)**.
3. Implement a decoupled Java 17 / Spring Boot 3 REST API backend following clean layered architecture (`Controller` → `Service` → `Repository` → `MySQL`).
4. Develop a modern React 18 single page dashboard with interactive data visualization charts (Recharts) and dynamic multi-dimensional filtering.

---

## 🏗️ System Architecture

```text
+-------------------------------------------------------------------+
|                        React 18 Single Page App                   |
| (Dashboard, Sales, Products, Customers, Orders, SQL Showcase)     |
+-------------------------------------------------------------------+
                                  │
                    HTTP / REST APIs (Axios)
                                  │
+-------------------------------------------------------------------+
|                       Spring Boot 3 REST API                      |
|  ┌─────────────────────────────────────────────────────────────┐  |
|  │ Controller Layer  (HTTP Endpoints, DTO Mapping, Validation) │  |
|  └──────────────────────────────┬──────────────────────────────┘  |
|                                 │                                 |
|  ┌──────────────────────────────▼──────────────────────────────┐  |
|  │ Service Layer     (Business Logic, Analytics Aggregations)  │  |
|  └──────────────────────────────┬──────────────────────────────┘  |
|                                 │                                 |
|  ┌──────────────────────────────▼──────────────────────────────┐  |
|  │ Repository Layer  (Spring Data JPA & Native SQL @Query)     │  |
|  └─────────────────────────────────────────────────────────────┘  |
+-------------------------------------------------------------------+
                                  │
                               JDBC/JPA
                                  │
+-------------------------------------------------------------------+
|                       MySQL Database Engine                       |
|   (ecommerce_sales DB: 6 Tables, Views, Performance Indexes)      |
+-------------------------------------------------------------------+
```

---

## 💾 Database Schema & ER Diagram Specification

The normalized database schema consists of **6 primary entities**:

```text
  +------------------+         +------------------+         +------------------+
  |    categories    |         |     products     |         |    customers     |
  +------------------+         +------------------+         +------------------+
  | category_id (PK) |<-------1| product_id (PK)  |         | customer_id (PK) |
  | category_name    |       N | product_name     |         | first_name       |
  | description      |         | category_id (FK) |         | last_name        |
  +------------------+         | price            |         | email (UNIQUE)   |
                               | stock_quantity   |         | phone            |
                               +------------------+         | city, state      |
                                        ^                   +------------------+
                                        |                             ^
                                       1|                             |1
                                        |N                            |
                               +------------------+         +------------------+
                               |   order_items    |         |      orders      |
                               +------------------+         +------------------+
                               | item_id (PK)     |       N | order_id (PK)    |
                               | order_id (FK)   |<---------| customer_id (FK) |
                               | product_id (FK)  |         | order_date       |
                               | quantity         |         | status           |
                               | unit_price       |         | total_amount     |
                               | subtotal         |         +------------------+
                               +------------------+                   ^
                                                                      |1
                                                                      |1
                                                            +------------------+
                                                            |     payments     |
                                                            +------------------+
                                                            | payment_id (PK)  |
                                                            | order_id (FK,UQ) |
                                                            | payment_date     |
                                                            | payment_method   |
                                                            | amount, status   |
                                                            +------------------+
```

---

## ⚡ Key SQL Analytics Implemented

1. **Month-over-Month (MoM) Growth (`LAG()`)**:
   ```sql
   WITH MonthlySales AS (
       SELECT DATE_FORMAT(order_date, '%Y-%m') AS month_year, SUM(total_amount) AS revenue
       FROM orders WHERE status = 'COMPLETED' GROUP BY DATE_FORMAT(order_date, '%Y-%m')
   )
   SELECT month_year, revenue,
          LAG(revenue, 1) OVER (ORDER BY month_year) AS prev_revenue,
          ROUND(((revenue - LAG(revenue, 1) OVER (ORDER BY month_year)) / LAG(revenue, 1) OVER (ORDER BY month_year)) * 100, 2) AS mom_growth_pct
   FROM MonthlySales;
   ```
2. **Product Revenue Ranking (`DENSE_RANK()`)**: Ranks top products based on sales revenue without gaps in rank numbers.
3. **Customer Spending Leaderboard (`RANK()`)**: Identifies top spending customer accounts across orders.
4. **Conditional Aggregation (`CASE`)**: Calculates transaction success rates and revenue per payment channel (`CREDIT_CARD`, `UPI`, `NET_BANKING`, `DEBIT_CARD`, `COD`).

---

## 🔌 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Overall KPI summary (Revenue, Orders, AOV, Customers, Products Sold) |
| `GET` | `/api/sales/monthly` | Monthly revenue trend with MoM growth percentages |
| `GET` | `/api/sales/category` | Category-wise revenue and unit sales breakdown |
| `GET` | `/api/products/top?limit=10` | Top products ranked by total gross revenue |
| `GET` | `/api/products/low-performing` | Slow-moving products inventory alert |
| `GET` | `/api/customers/top?limit=10` | Top spending customer leaderboard |
| `GET` | `/api/customers/repeat` | Repeat customers with 2+ completed orders |
| `GET` | `/api/orders/status` | Order status distribution breakdown |
| `GET` | `/api/orders/payments/methods` | Payment gateway transaction success rate analysis |
| `GET` | `/api/sql-analysis` | Full query test suite for live presentation showcase |

---

## 💻 Local Installation & Setup Guide

### Prerequisites
- Java JDK 17+ installed
- Maven 3.8+ installed
- Node.js 18+ & npm installed
- MySQL Server 8.0+ running

### 1. Database Setup
Execute the SQL scripts in order using MySQL Workbench or running the following commands in **PowerShell**:
```powershell
# Command Prompt (cmd.exe) / PowerShell:
cmd /c "mysql -u root -p < database/schema.sql"
cmd /c "mysql -u root -p < database/sample_data.sql"

# Or using PowerShell pipeline:
Get-Content -Raw database/schema.sql | mysql -u root -p
Get-Content -Raw database/sample_data.sql | mysql -u root -p
```

### 2. Backend Setup (`Spring Boot`)
```bash
cd backend/ecommerce-api
mvn clean spring-boot:run
```
The REST API will start on `http://localhost:8080`.

### 3. Frontend Setup (`React`)
```bash
cd frontend/ecommerce-dashboard
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## ☁️ Cloud Deployment Instructions

1. **MySQL Database**: Provision a managed MySQL instance on **Aiven** or **Railway**. Run `schema.sql` and `sample_data.sql`.
2. **Spring Boot Backend**: Deploy `backend/ecommerce-api` on **Render** or **Railway**. Set Environment Variables:
   - `SPRING_DATASOURCE_URL` = `jdbc:mysql://<cloud-host>:3306/ecommerce_sales`
   - `SPRING_DATASOURCE_USERNAME` = `<username>`
   - `SPRING_DATASOURCE_PASSWORD` = `<password>`
3. **React Frontend**: Deploy `frontend/ecommerce-dashboard` on **Vercel** or **Netlify**.

---

## 📄 Resume Project Bullets

- **Full Stack E-Commerce Sales Analytics & BI Platform**: Designed and implemented an enterprise analytics web app using Spring Boot 3, MySQL 8.0, and React 18 to visualize sales performance and customer metrics.
- **Advanced SQL Analytics**: Formulated native MySQL queries featuring CTEs, Window Functions (`RANK`, `DENSE_RANK`, `LAG`), conditional `CASE` aggregates, and performance-indexed joins.
- **Layered REST Architecture**: Built decoupled REST APIs returning DTO projections, supported by centralized `@RestControllerAdvice` global exception handling and CORS configuration.
- **Interactive UI & Visualizations**: Developed responsive React dashboard using Recharts for dynamic line, bar, pie, and donut charts with real-time dynamic multi-filter controls.

---

## 🎯 10 Java Full Stack Interview Questions & Answers

### Q1: Why use DTOs instead of returning JPA entities directly from REST Controllers?
**Answer**: Returning entities directly risks exposing sensitive schema details, causes infinite recursion with bidirectional `@ManyToOne`/`@OneToMany` relationships during JSON serialization, and couples the API contract to database schema changes. DTOs ensure clean separation of concerns and optimized network payloads.

### Q2: How does the `LAG()` window function calculate Month-over-Month (MoM) revenue growth?
**Answer**: `LAG(revenue, 1) OVER (ORDER BY month_year)` fetches the revenue value from the preceding row in the partition. Subtracting the previous month revenue from current month revenue and dividing by previous month revenue yields the percentage growth rate.

### Q3: What is the difference between `RANK()` and `DENSE_RANK()` in SQL?
**Answer**: If two rows tie for 1st place, `RANK()` assigns `1, 1, 3` (skipping rank 2), whereas `DENSE_RANK()` assigns `1, 1, 2` (no gaps in ranking sequence).

### Q4: How do indexes improve analytical query performance in MySQL?
**Answer**: Indexes create B-Tree data structures on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses (e.g., `orders.order_date`, `orders.customer_id`), avoiding full table scans and accelerating aggregations.

### Q5: What is the purpose of `@RestControllerAdvice` in Spring Boot?
**Answer**: It acts as an interceptor for exceptions thrown across all controllers. It centralized exception handling logic, allowing custom exceptions like `ResourceNotFoundException` to return consistent JSON error objects (`ErrorDetails`) with appropriate HTTP status codes (e.g., `404 NOT_FOUND`).

### Q6: How does React Router v6 handle single-page application navigation without page reloads?
**Answer**: It uses HTML5 History API (`pushState`) to manipulate the browser URL bar client-side, conditionally rendering designated route components without initiating a traditional browser page reload.

### Q7: Why use Common Table Expressions (CTEs) with `WITH` clause over nested subqueries?
**Answer**: CTEs improve SQL code readability, maintainability, and reusability. Named temporary result sets allow complex multi-stage analytical queries to be broken into clean modular steps.

### Q8: What is the significance of `fetch = FetchType.LAZY` in JPA Entity mappings?
**Answer**: Lazy loading ensures associated child entities are loaded from the database only when explicitly accessed, preventing unnecessary database query overhead (the N+1 query problem).

### Q9: How do CORS (Cross-Origin Resource Sharing) headers work between React and Spring Boot?
**Answer**: Browsers block cross-origin HTTP requests by default. Configuring Spring Boot's `WebMvcConfigurer` with `.allowedOrigins("http://localhost:3000")` instructs the server to include `Access-Control-Allow-Origin` headers, permitting the React client to consume the backend API safely.

### Q10: How does `LEFT JOIN` differ from `INNER JOIN` in sales analytics?
**Answer**: `INNER JOIN` returns only rows with matching keys in both tables. `LEFT JOIN` returns all records from the left table regardless of whether a match exists in the right table—making it essential for finding inactive customers (`WHERE orders.order_id IS NULL`) or categories with 0 sales.
