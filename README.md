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
