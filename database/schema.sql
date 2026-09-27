-- ============================================================================
-- E-Commerce Sales Analysis & Business Intelligence Database Schema
-- Database Name: ecommerce_sales
-- Engine: MySQL 8.0+
-- ============================================================================

DROP DATABASE IF EXISTS ecommerce_sales;
CREATE DATABASE ecommerce_sales CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_sales;

-- ----------------------------------------------------------------------------
-- Table 1: categories
-- Stores product categories
-- ----------------------------------------------------------------------------
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Table 2: products
-- Stores product details linked to categories
-- ----------------------------------------------------------------------------
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) 
        REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Table 3: customers
-- Stores customer profiles
-- ----------------------------------------------------------------------------
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Table 4: orders
-- Stores order transaction details
-- ----------------------------------------------------------------------------
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED',
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_order_status CHECK (status IN ('COMPLETED', 'PENDING', 'CANCELLED', 'SHIPPED', 'PROCESSING'))
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Table 5: order_items
-- Line items for each order
-- ----------------------------------------------------------------------------
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) 
        REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Table 6: payments
-- Payment details linked to orders
-- ----------------------------------------------------------------------------
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    payment_date DATETIME NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
    payment_status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_payment_method CHECK (payment_method IN ('CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'COD')),
    CONSTRAINT chk_payment_status CHECK (payment_status IN ('SUCCESS', 'PENDING', 'FAILED', 'REFUNDED'))
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- INDEXES FOR OPTIMIZED QUERY PERFORMANCE
-- ----------------------------------------------------------------------------
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_payments_method ON payments(payment_method);
CREATE INDEX idx_customers_city_state ON customers(state, city);

-- ----------------------------------------------------------------------------
-- DATABASE VIEWS FOR COMMON ANALYTICAL QUERY REUSE
-- ----------------------------------------------------------------------------

-- View 1: Detailed Order Overview
CREATE OR REPLACE VIEW vw_order_details AS
SELECT 
    o.order_id,
    o.order_date,
    o.status AS order_status,
    o.total_amount,
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.email AS customer_email,
    c.city,
    c.state,
    p.payment_method,
    p.payment_status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN payments p ON o.order_id = p.order_id;

-- View 2: Monthly Sales Summary
CREATE OR REPLACE VIEW vw_monthly_sales_summary AS
SELECT 
    DATE_FORMAT(o.order_date, '%Y-%m') AS month_year,
    YEAR(o.order_date) AS sales_year,
    MONTH(o.order_date) AS sales_month,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_revenue,
    AVG(o.total_amount) AS avg_order_value
FROM orders o
WHERE o.status = 'COMPLETED'
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m'), YEAR(o.order_date), MONTH(o.order_date);
