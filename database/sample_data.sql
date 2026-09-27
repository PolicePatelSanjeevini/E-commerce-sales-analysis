-- ============================================================================
-- E-Commerce Sales Analysis & Business Intelligence Sample Data
-- Database: ecommerce_sales
-- ============================================================================

USE ecommerce_sales;

-- Disable Foreign Key checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE payments;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE customers;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. Insert Categories
-- ----------------------------------------------------------------------------
INSERT INTO categories (category_id, category_name, description) VALUES
(1, 'Electronics', 'Smartphones, laptops, headphones, audio equipment, and wearables'),
(2, 'Apparel & Fashion', 'Men, women, and children clothing, shoes, and fashion accessories'),
(3, 'Home & Kitchen', 'Furniture, cookware, home appliances, and decor items'),
(4, 'Books & Stationery', 'Fiction, technical literature, notebooks, and writing instruments'),
(5, 'Fitness & Sports', 'Gym gear, sporting goods, outdoor equipment, and supplements'),
(6, 'Beauty & Personal Care', 'Skincare, cosmetics, hair care, and grooming products');

-- ----------------------------------------------------------------------------
-- 2. Insert Products
-- ----------------------------------------------------------------------------
INSERT INTO products (product_id, product_name, category_id, price, stock_quantity) VALUES
(1, 'UltraBook Pro 15', 1, 89999.00, 45),
(2, 'Wireless Noise-Canceling Headphones', 1, 14999.00, 120),
(3, 'Smartphone Galaxy X', 1, 54999.00, 80),
(4, 'Smartwatch Series 7', 1, 19999.00, 60),
(5, '4K Ultra HD Smart TV 55"', 1, 45999.00, 30),
(6, 'Men Cotton Slim Fit Shirt', 2, 1899.00, 200),
(7, 'Women Floral Summer Dress', 2, 2499.00, 150),
(8, 'Unisex Running Sneakers', 2, 4999.00, 90),
(9, 'Denim Designer Jacket', 2, 3499.00, 75),
(10, 'Stainless Steel Cookware Set (10 pcs)', 3, 6999.00, 40),
(11, 'Ergonomic Office Mesh Chair', 3, 12499.00, 35),
(12, 'Robot Vacuum Cleaner V2', 3, 22999.00, 25),
(13, 'Air Fryer XL 5.5L', 3, 7999.00, 50),
(14, 'System Design & Microservices Guide', 4, 899.00, 300),
(15, 'Clean Code Architecture Handbook', 4, 1199.00, 250),
(16, 'Hardcover Executive Journal & Pen Set', 4, 599.00, 400),
(17, 'Adjustable Dumbbell Set 20kg', 5, 5499.00, 60),
(18, 'Non-Slip Yoga Mat 6mm', 5, 1299.00, 180),
(19, 'Organic Hydrating Face Serum 50ml', 6, 1499.00, 220),
(20, 'Professional Hair Dryer & Styler', 6, 3299.00, 110);

-- ----------------------------------------------------------------------------
-- 3. Insert Customers
-- ----------------------------------------------------------------------------
INSERT INTO customers (customer_id, first_name, last_name, email, phone, city, state) VALUES
(1, 'Aarav', 'Sharma', 'aarav.sharma@example.com', '9876543210', 'Mumbai', 'Maharashtra'),
(2, 'Priya', 'Verma', 'priya.verma@example.com', '9876543211', 'Bengaluru', 'Karnataka'),
(3, 'Rohan', 'Mehta', 'rohan.mehta@example.com', '9876543212', 'Delhi', 'Delhi'),
(4, 'Ananya', 'Iyer', 'ananya.iyer@example.com', '9876543213', 'Chennai', 'Tamil Nadu'),
(5, 'Vikram', 'Singh', 'vikram.singh@example.com', '9876543214', 'Hyderabad', 'Telangana'),
(6, 'Sneha', 'Patel', 'sneha.patel@example.com', '9876543215', 'Ahmedabad', 'Gujarat'),
(7, 'Aditya', 'Nair', 'aditya.nair@example.com', '9876543216', 'Kochi', 'Kerala'),
(8, 'Kavya', 'Gupta', 'kavya.gupta@example.com', '9876543217', 'Pune', 'Maharashtra'),
(9, 'Rahul', 'Deshmukh', 'rahul.d@example.com', '9876543218', 'Nagpur', 'Maharashtra'),
(10, 'Ishita', 'Roy', 'ishita.roy@example.com', '9876543219', 'Kolkata', 'West Bengal'),
(11, 'Manish', 'Kumar', 'manish.k@example.com', '9876543220', 'Jaipur', 'Rajasthan'),
(12, 'Pooja', 'Joshi', 'pooja.j@example.com', '9876543221', 'Indore', 'Madhya Pradesh'),
(13, 'Siddharth', 'Chawla', 'siddharth.c@example.com', '9876543222', 'Chandigarh', 'Punjab'),
(14, 'Neha', 'Reddy', 'neha.r@example.com', '9876543223', 'Visakhapatnam', 'Andhra Pradesh'),
(15, 'Karan', 'Malhotra', 'karan.m@example.com', '9876543224', 'Noida', 'Uttar Pradesh'),
(16, 'Divya', 'Bhat', 'divya.b@example.com', '9876543225', 'Mangaluru', 'Karnataka'),
(17, 'Varun', 'Saxena', 'varun.s@example.com', '9876543226', 'Lucknow', 'Uttar Pradesh'),
(18, 'Ritu', 'Sen', 'ritu.sen@example.com', '9876543227', 'Bhubaneswar', 'Odisha'),
(19, 'Amit', 'Trivedi', 'amit.t@example.com', '9876543228', 'Bhopal', 'Madhya Pradesh'),
(20, 'Meera', 'Pillai', 'meera.p@example.com', '9876543229', 'Thiruvananthapuram', 'Kerala'),
(21, 'Harsh', 'Vardhan', 'harsh.v@example.com', '9876543230', 'Surat', 'Gujarat'),
(22, 'Shweta', 'Kulkarni', 'shweta.k@example.com', '9876543231', 'Nashik', 'Maharashtra'),
(23, 'Gaurav', 'Bansal', 'gaurav.b@example.com', '9876543232', 'Gurugram', 'Haryana'),
(24, 'Tanvi', 'Mukherjee', 'tanvi.m@example.com', '9876543233', 'Siliguri', 'West Bengal'),
(25, 'Abhishek', 'Chaudhary', 'abhishek.c@example.com', '9876543234', 'Patna', 'Bihar');

-- ----------------------------------------------------------------------------
-- 4. Insert Orders
-- ----------------------------------------------------------------------------
INSERT INTO orders (order_id, customer_id, order_date, status, total_amount) VALUES
(1,  1, '2025-10-05 10:15:00', 'COMPLETED', 104998.00),
(2,  2, '2025-10-12 14:30:00', 'COMPLETED',  17498.00),
(3,  3, '2025-10-18 09:45:00', 'COMPLETED',  54999.00),
(4,  4, '2025-10-25 18:20:00', 'CANCELLED',  12499.00),
(5,  5, '2025-11-02 11:10:00', 'COMPLETED',  45999.00),
(6,  6, '2025-11-08 16:05:00', 'COMPLETED',   4398.00),
(7,  1, '2025-11-15 13:40:00', 'COMPLETED',  19999.00),
(8,  7, '2025-11-20 19:15:00', 'COMPLETED',  22999.00),
(9,  8, '2025-11-28 10:00:00', 'SHIPPED',    14999.00),
(10, 2, '2025-12-03 15:25:00', 'COMPLETED',   7999.00),
(11, 9, '2025-12-10 12:50:00', 'COMPLETED',   6999.00),
(12,10, '2025-12-14 17:10:00', 'COMPLETED',   2098.00),
(13, 3, '2025-12-19 20:30:00', 'COMPLETED',  89999.00),
(14,11, '2025-12-24 11:00:00', 'COMPLETED',   5499.00),
(15,12, '2025-12-28 14:45:00', 'CANCELLED',  54999.00),
(16, 4, '2026-01-04 10:30:00', 'COMPLETED',   7498.00),
(17,13, '2026-01-09 16:15:00', 'COMPLETED',  19999.00),
(18,14, '2026-01-15 18:40:00', 'COMPLETED',   3499.00),
(19, 5, '2026-01-20 13:10:00', 'COMPLETED',  14999.00),
(20,15, '2026-01-26 15:00:00', 'COMPLETED',   4798.00),
(21, 1, '2026-02-02 11:20:00', 'COMPLETED',   6999.00),
(22,16, '2026-02-07 14:05:00', 'COMPLETED',  45999.00),
(23,17, '2026-02-12 09:30:00', 'PENDING',    12499.00),
(24, 2, '2026-02-18 17:45:00', 'COMPLETED',  89999.00),
(25,18, '2026-02-22 12:15:00', 'COMPLETED',   3299.00),
(26,19, '2026-02-27 19:00:00', 'CANCELLED',  22999.00),
(27,20, '2026-03-03 10:45:00', 'COMPLETED',  14999.00),
(28,21, '2026-03-08 15:30:00', 'COMPLETED',   5499.00),
(29, 3, '2026-03-12 11:10:00', 'COMPLETED',  19999.00),
(30,22, '2026-03-17 14:20:00', 'PROCESSING', 54999.00),
(31,23, '2026-03-21 16:50:00', 'COMPLETED',   6999.00),
(32, 6, '2026-03-24 18:00:00', 'COMPLETED',   1499.00);

-- ----------------------------------------------------------------------------
-- 5. Insert Order Items
-- ----------------------------------------------------------------------------
INSERT INTO order_items (item_id, order_id, product_id, quantity, unit_price, subtotal) VALUES
(1,  1, 1,  1, 89999.00, 89999.00),
(2,  1, 2,  1, 14999.00, 14999.00),
(3,  2, 2,  1, 14999.00, 14999.00),
(4,  2, 7,  1,  2499.00,  2499.00),
(5,  3, 3,  1, 54999.00, 54999.00),
(6,  4, 11, 1, 12499.00, 12499.00),
(7,  5, 5,  1, 45999.00, 45999.00),
(8,  6, 6,  1,  1899.00,  1899.00),
(9,  6, 7,  1,  2499.00,  2499.00),
(10, 7, 4,  1, 19999.00, 19999.00),
(11, 8, 12, 1, 22999.00, 22999.00),
(12, 9, 2,  1, 14999.00, 14999.00),
(13,10, 13, 1,  7999.00,  7999.00),
(14,11, 10, 1,  6999.00,  6999.00),
(15,12, 14, 1,   899.00,   899.00),
(16,12, 15, 1,  1199.00,  1199.00),
(17,13, 1,  1, 89999.00, 89999.00),
(18,14, 17, 1,  5499.00,  5499.00),
(19,15, 3,  1, 54999.00, 54999.00),
(20,16, 8,  1,  4999.00,  4999.00),
(21,16, 7,  1,  2499.00,  2499.00),
(22,17, 4,  1, 19999.00, 19999.00),
(23,18, 9,  1,  3499.00,  3499.00),
(24,19, 2,  1, 14999.00, 14999.00),
(25,20, 18, 1,  1299.00,  1299.00),
(26,20, 20, 1,  3299.00,  3299.00),
(27,21, 10, 1,  6999.00,  6999.00),
(28,22, 5,  1, 45999.00, 45999.00),
(29,23, 11, 1, 12499.00, 12499.00),
(30,24, 1,  1, 89999.00, 89999.00),
(31,25, 20, 1,  3299.00,  3299.00),
(32,26, 12, 1, 22999.00, 22999.00),
(33,27, 2,  1, 14999.00, 14999.00),
(34,28, 17, 1,  5499.00,  5499.00),
(35,29, 4,  1, 19999.00, 19999.00),
(36,30, 3,  1, 54999.00, 54999.00),
(37,31, 10, 1,  6999.00,  6999.00),
(38,32, 19, 1,  1499.00,  1499.00);

-- ----------------------------------------------------------------------------
-- 6. Insert Payments
-- ----------------------------------------------------------------------------
INSERT INTO payments (payment_id, order_id, payment_date, payment_method, amount, payment_status) VALUES
(1,  1, '2025-10-05 10:16:00', 'CREDIT_CARD', 104998.00, 'SUCCESS'),
(2,  2, '2025-10-12 14:31:00', 'UPI',         17498.00, 'SUCCESS'),
(3,  3, '2025-10-18 09:46:00', 'NET_BANKING',  54999.00, 'SUCCESS'),
(4,  4, '2025-10-25 18:21:00', 'CREDIT_CARD',  12499.00, 'REFUNDED'),
(5,  5, '2025-11-02 11:11:00', 'DEBIT_CARD',   45999.00, 'SUCCESS'),
(6,  6, '2025-11-08 16:06:00', 'UPI',           4398.00, 'SUCCESS'),
(7,  7, '2025-11-15 13:41:00', 'CREDIT_CARD',  19999.00, 'SUCCESS'),
(8,  8, '2025-11-20 19:16:00', 'NET_BANKING',  22999.00, 'SUCCESS'),
(9,  9, '2025-11-28 10:01:00', 'UPI',          14999.00, 'SUCCESS'),
(10,10, '2025-12-03 15:26:00', 'COD',           7999.00, 'SUCCESS'),
(11,11, '2025-12-10 12:51:00', 'UPI',           6999.00, 'SUCCESS'),
(12,12, '2025-12-14 17:11:00', 'DEBIT_CARD',    2098.00, 'SUCCESS'),
(13,13, '2025-12-19 20:31:00', 'CREDIT_CARD',  89999.00, 'SUCCESS'),
(14,14, '2025-12-24 11:01:00', 'UPI',           5499.00, 'SUCCESS'),
(15,15, '2025-12-28 14:46:00', 'NET_BANKING',  54999.00, 'FAILED'),
(16,16, '2026-01-04 10:31:00', 'UPI',           7498.00, 'SUCCESS'),
(17,17, '2026-01-09 16:16:00', 'CREDIT_CARD',  19999.00, 'SUCCESS'),
(18,18, '2026-01-15 18:41:00', 'COD',           3499.00, 'SUCCESS'),
(19,19, '2026-01-20 13:11:00', 'UPI',          14999.00, 'SUCCESS'),
(20,20, '2026-01-26 15:01:00', 'DEBIT_CARD',    4798.00, 'SUCCESS'),
(21,21, '2026-02-02 11:21:00', 'UPI',           6999.00, 'SUCCESS'),
(22,22, '2026-02-07 14:06:00', 'CREDIT_CARD',  45999.00, 'SUCCESS'),
(23,23, '2026-02-12 09:31:00', 'NET_BANKING',  12499.00, 'PENDING'),
(24,24, '2026-02-18 17:46:00', 'CREDIT_CARD',  89999.00, 'SUCCESS'),
(25,25, '2026-02-22 12:16:00', 'UPI',           3299.00, 'SUCCESS'),
(26,26, '2026-02-27 19:01:00', 'CREDIT_CARD',  22999.00, 'REFUNDED'),
(27,27, '2026-03-03 10:46:00', 'UPI',          14999.00, 'SUCCESS'),
(28,28, '2026-03-08 15:31:00', 'DEBIT_CARD',    5499.00, 'SUCCESS'),
(29,29, '2026-03-12 11:11:00', 'CREDIT_CARD',  19999.00, 'SUCCESS'),
(30,30, '2026-03-17 14:21:00', 'UPI',          54999.00, 'PENDING'),
(31,31, '2026-03-21 16:51:00', 'COD',           6999.00, 'SUCCESS'),
(32,32, '2026-03-24 18:01:00', 'UPI',           1499.00, 'SUCCESS');
