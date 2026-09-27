# E-Commerce Sales Analysis & Business Intelligence System

## ER Diagram & Database Architecture

### Entity Relationship Specifications

```
  +------------------+         +------------------+         +------------------+
  |    categories    |         |     products     |         |    customers     |
  +------------------+         +------------------+         +------------------+
  | category_id (PK) |<-------1| product_id (PK)  |         | customer_id (PK) |
  | category_name    |       N | product_name     |         | first_name       |
  | description      |         | category_id (FK) |         | last_name        |
  +------------------+         | price            |         | email (UNIQUE)   |
                               | stock_quantity   |         | phone            |
                               +------------------+         | city             |
                                        ^                   | state            |
                                        |                   | created_at       |
                                       1|                   +------------------+
                                        |                             ^
                                        |                             |
                                        |                             |1
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
                                                                      |
                                                                      |1
                                                            +------------------+
                                                            |     payments     |
                                                            +------------------+
                                                            | payment_id (PK)  |
                                                            | order_id (FK,UQ) |
                                                            | payment_date     |
                                                            | payment_method   |
                                                            | amount           |
                                                            | payment_status   |
                                                            +------------------+
```

### Table Definitions & Relationships

1. **`categories`**
   - `category_id` (INT, Primary Key, AUTO_INCREMENT)
   - `category_name` (VARCHAR(100), NOT NULL, UNIQUE)
   - `description` (TEXT)

2. **`products`**
   - `product_id` (INT, Primary Key, AUTO_INCREMENT)
   - `product_name` (VARCHAR(150), NOT NULL)
   - `category_id` (INT, Foreign Key -> `categories.category_id`)
   - `price` (DECIMAL(10,2), NOT NULL)
   - `stock_quantity` (INT, NOT NULL DEFAULT 0)
   - `created_at` (TIMESTAMP)

3. **`customers`**
   - `customer_id` (INT, Primary Key, AUTO_INCREMENT)
   - `first_name` (VARCHAR(50), NOT NULL)
   - `last_name` (VARCHAR(50), NOT NULL)
   - `email` (VARCHAR(100), NOT NULL, UNIQUE)
   - `phone` (VARCHAR(20))
   - `city` (VARCHAR(50))
   - `state` (VARCHAR(50))
   - `created_at` (TIMESTAMP)

4. **`orders`**
   - `order_id` (INT, Primary Key, AUTO_INCREMENT)
   - `customer_id` (INT, Foreign Key -> `customers.customer_id`)
   - `order_date` (DATETIME, NOT NULL)
   - `status` (VARCHAR(20), NOT NULL) -- 'COMPLETED', 'PENDING', 'CANCELLED', 'SHIPPED'
   - `total_amount` (DECIMAL(12,2), NOT NULL)

5. **`order_items`**
   - `item_id` (INT, Primary Key, AUTO_INCREMENT)
   - `order_id` (INT, Foreign Key -> `orders.order_id` ON DELETE CASCADE)
   - `product_id` (INT, Foreign Key -> `products.product_id`)
   - `quantity` (INT, NOT NULL)
   - `unit_price` (DECIMAL(10,2), NOT NULL)
   - `subtotal` (DECIMAL(12,2), NOT NULL)

6. **`payments`**
   - `payment_id` (INT, Primary Key, AUTO_INCREMENT)
   - `order_id` (INT, UNIQUE, Foreign Key -> `orders.order_id` ON DELETE CASCADE)
   - `payment_date` (DATETIME, NOT NULL)
   - `payment_method` (VARCHAR(30), NOT NULL) -- 'CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'COD'
   - `amount` (DECIMAL(12,2), NOT NULL)
   - `payment_status` (VARCHAR(20), NOT NULL) -- 'SUCCESS', 'FAILED', 'PENDING'

### Key Database Constraints & Indexing Strategy
- **Foreign Key Constraints**: Maintain referential integrity across parent-child relationships.
- **Indexes**:
  - `idx_orders_customer` on `orders(customer_id)`
  - `idx_orders_date` on `orders(order_date)`
  - `idx_orders_status` on `orders(status)`
  - `idx_order_items_order` on `order_items(order_id)`
  - `idx_order_items_product` on `order_items(product_id)`
  - `idx_products_category` on `products(category_id)`
