# REST API Documentation & Verification Guide

## Base URL
```text
http://localhost:8080/api
```

---

## Response Wrapper Format
All endpoints return a standardized JSON structure:

```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... },
  "timestamp": "2026-09-26T19:50:00"
}
```

In case of error:
```json
{
  "timestamp": "2026-09-26T19:50:00",
  "status": 404,
  "error": "Not Found",
  "message": "Resource description not found",
  "path": "/api/resource"
}
```

---

## API Endpoints Summary

### 1. Dashboard
- **`GET /api/dashboard`**
  - **Description**: Returns overall KPI metrics summary.
  - **Sample Response**:
    ```json
    {
      "success": true,
      "message": "Dashboard KPI summary retrieved successfully",
      "data": {
        "totalRevenue": 894380.00,
        "totalOrders": 28,
        "totalCustomers": 25,
        "totalProductsSold": 38,
        "averageOrderValue": 31942.14
      }
    }
    ```

### 2. Sales Analytics
- **`GET /api/sales/monthly`**
  - **Description**: Monthly revenue breakdown and MoM growth rate calculated via `LAG()`.
- **`GET /api/sales/category`**
  - **Description**: Revenue and units sold per product category with revenue share percentage.

### 3. Product Analytics
- **`GET /api/products/top?limit=10`**
  - **Description**: Top products ranked by total gross revenue using `DENSE_RANK()`.
- **`GET /api/products/low-performing`**
  - **Description**: Slow-moving products with low unit sales.
- **`GET /api/products?search={q}&page=0&size=10&sortBy=price&sortDir=DESC`**
  - **Description**: Paginated product list with keyword search support.

### 4. Customer Analytics
- **`GET /api/customers/top?limit=10`**
  - **Description**: Top spending customers ranked via `RANK()`.
- **`GET /api/customers/repeat`**
  - **Description**: High-value repeat customers with 2 or more completed orders.
- **`GET /api/customers?search={q}&page=0&size=10`**
  - **Description**: Customer directory with pagination and search.

### 5. Orders & Payments
- **`GET /api/orders/status`**
  - **Description**: Distribution of order statuses (`COMPLETED`, `PENDING`, `CANCELLED`, `SHIPPED`, `PROCESSING`).
- **`GET /api/orders/payments/methods`**
  - **Description**: Payment channel breakdown (`CREDIT_CARD`, `UPI`, `NET_BANKING`, `DEBIT_CARD`, `COD`) with transaction success rates.
- **`GET /api/orders?status={status}&page=0&size=10`**
  - **Description**: Paginated order transaction history with optional status filter.

### 6. Interactive SQL Analysis Showcase
- **`GET /api/sql-analysis`**
  - **Description**: Executes and returns the analytical SQL query test suite for live presentation on the frontend SQL Analysis page.

---

## Postman Collection Import JSON (Exportable)

Save the snippet below as `E-Commerce_Sales_Analysis.postman_collection.json` and import into Postman:

```json
{
  "info": {
    "name": "E-Commerce Sales Analysis API Collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Dashboard KPI Summary",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/dashboard", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "dashboard"] }
      }
    },
    {
      "name": "Monthly Sales Trend",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/sales/monthly", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "sales", "monthly"] }
      }
    },
    {
      "name": "Category Revenue Breakdown",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/sales/category", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "sales", "category"] }
      }
    },
    {
      "name": "Top Products by Revenue",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/products/top?limit=10", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "products", "top"], "query": [{ "key": "limit", "value": "10" }] }
      }
    },
    {
      "name": "Top Customers by Spending",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/customers/top?limit=10", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "customers", "top"], "query": [{ "key": "limit", "value": "10" }] }
      }
    },
    {
      "name": "Order Status Distribution",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/orders/status", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "orders", "status"] }
      }
    },
    {
      "name": "Payment Methods Analysis",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/orders/payments/methods", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "orders", "payments", "methods"] }
      }
    },
    {
      "name": "SQL Analysis Showcase",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:8080/api/sql-analysis", "protocol": "http", "host": ["localhost"], "port": "8080", "path": ["api", "sql-analysis"] }
      }
    }
  ]
}
```
