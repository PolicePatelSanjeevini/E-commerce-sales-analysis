-- ============================================================================
-- E-Commerce Sales Analysis & Business Intelligence - SQL Queries
-- Database: ecommerce_sales
-- Includes: Aggregations, Multi-table JOINs, Subqueries, CTEs, & Window Functions
-- ============================================================================

USE ecommerce_sales;

-- ============================================================================
-- SECTION 1: EXECUTIVE DASHBOARD KPI METRICS
-- ============================================================================

-- Query 1.1: Overall KPI Summary Card Metrics
SELECT 
    SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) AS total_revenue,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS total_orders,
    AVG(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE NULL END) AS average_order_value,
    (SELECT COUNT(DISTINCT customer_id) FROM customers) AS total_customers,
    (SELECT COALESCE(SUM(oi.quantity), 0) 
     FROM order_items oi 
     JOIN orders o ON oi.order_id = o.order_id 
     WHERE o.status = 'COMPLETED') AS total_products_sold;


-- ============================================================================
-- SECTION 2: SALES & REVENUE TIME-SERIES ANALYSIS
-- ============================================================================

-- Query 2.1: Monthly Revenue Trend (For Dashboard Line Chart)
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month_year,
    COUNT(order_id) AS order_count,
    SUM(total_amount) AS monthly_revenue,
    ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
WHERE status = 'COMPLETED'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month_year ASC;


-- Query 2.2: Month-over-Month (MoM) Revenue Growth Rate using LAG() Window Function
WITH MonthlySales AS (
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') AS month_year,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT 
    month_year,
    revenue AS current_month_revenue,
    LAG(revenue, 1) OVER (ORDER BY month_year) AS previous_month_revenue,
    ROUND(
        ((revenue - LAG(revenue, 1) OVER (ORDER BY month_year)) / 
         LAG(revenue, 1) OVER (ORDER BY month_year)) * 100, 2
    ) AS mom_growth_percentage
FROM MonthlySales;


-- Query 2.3: Daily Sales Analysis for Recent 30 Days
SELECT 
    DATE(order_date) AS sales_date,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS daily_revenue
FROM orders
WHERE status = 'COMPLETED'
GROUP BY DATE(order_date)
ORDER BY sales_date DESC
LIMIT 30;


-- ============================================================================
-- SECTION 3: PRODUCT & CATEGORY PERFORMANCE ANALYSIS
-- ============================================================================

-- Query 3.1: Category Revenue & Units Sold Breakdown (For Category Bar Chart)
SELECT 
    c.category_name,
    COUNT(DISTINCT p.product_id) AS total_products,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.subtotal), 0.00) AS category_revenue,
    ROUND(
        COALESCE(SUM(oi.subtotal), 0.00) / 
        (SELECT SUM(total_amount) FROM orders WHERE status = 'COMPLETED') * 100, 2
    ) AS revenue_share_percentage
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.order_id AND o.status = 'COMPLETED'
GROUP BY c.category_id, c.category_name
ORDER BY category_revenue DESC;


-- Query 3.2: Top 10 Products by Revenue using DENSE_RANK() Window Function
WITH ProductRevenue AS (
    SELECT 
        p.product_id,
        p.product_name,
        c.category_name,
        p.price,
        SUM(oi.quantity) AS total_units_sold,
        SUM(oi.subtotal) AS total_revenue
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'COMPLETED'
    GROUP BY p.product_id, p.product_name, c.category_name, p.price
)
SELECT 
    product_id,
    product_name,
    category_name,
    price,
    total_units_sold,
    total_revenue,
    DENSE_RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank
FROM ProductRevenue
LIMIT 10;


-- Query 3.3: Low-Performing / Slow-Moving Products (Units Sold < 5 or No Sales)
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    p.price,
    p.stock_quantity,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.subtotal), 0.00) AS total_revenue
FROM products p
JOIN categories c ON p.category_id = c.category_id
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.order_id AND o.status = 'COMPLETED'
GROUP BY p.product_id, p.product_name, c.category_name, p.price, p.stock_quantity
HAVING total_units_sold < 5 OR total_units_sold IS NULL
ORDER BY total_units_sold ASC, p.stock_quantity DESC;


-- ============================================================================
-- SECTION 4: CUSTOMER SEGMENTATION & BEHAVIOR ANALYSIS
-- ============================================================================

-- Query 4.1: Top Spending Customers using RANK()
WITH CustomerSpending AS (
    SELECT 
        c.customer_id,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        c.email,
        c.city,
        c.state,
        COUNT(o.order_id) AS total_orders,
        SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'COMPLETED'
    GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city, c.state
)
SELECT 
    customer_id,
    customer_name,
    email,
    city,
    state,
    total_orders,
    total_spent,
    RANK() OVER (ORDER BY total_spent DESC) AS spending_rank
FROM CustomerSpending
LIMIT 10;


-- Query 4.2: Repeat Customers (Customers with 2 or More Orders)
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email,
    COUNT(o.order_id) AS completed_orders,
    SUM(o.total_amount) AS lifetime_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'COMPLETED'
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
HAVING COUNT(o.order_id) >= 2
ORDER BY completed_orders DESC, lifetime_value DESC;


-- Query 4.3: Inactive Customers (Customers with 0 Orders) via LEFT JOIN & NULL Filter
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email,
    c.city,
    c.state,
    c.created_at AS registration_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;


-- ============================================================================
-- SECTION 5: ORDER STATUS & PAYMENT METHOD ANALYSIS
-- ============================================================================

-- Query 5.1: Order Status Breakdown & Percentage Distribution (For Pie Chart)
SELECT 
    status,
    COUNT(order_id) AS order_count,
    SUM(total_amount) AS status_total_amount,
    ROUND(
        COUNT(order_id) / (SELECT COUNT(*) FROM orders) * 100, 2
    ) AS percentage_of_total
FROM orders
GROUP BY status
ORDER BY order_count DESC;


-- Query 5.2: Payment Method Revenue & Success Rate Analysis
SELECT 
    p.payment_method,
    COUNT(p.payment_id) AS total_transactions,
    SUM(CASE WHEN p.payment_status = 'SUCCESS' THEN p.amount ELSE 0 END) AS successful_revenue,
    COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) AS successful_count,
    COUNT(CASE WHEN p.payment_status = 'FAILED' THEN 1 END) AS failed_count,
    COUNT(CASE WHEN p.payment_status = 'REFUNDED' THEN 1 END) AS refunded_count,
    ROUND(
        COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) / COUNT(p.payment_id) * 100, 2
    ) AS success_rate_percentage
FROM payments p
GROUP BY p.payment_method
ORDER BY successful_revenue DESC;
