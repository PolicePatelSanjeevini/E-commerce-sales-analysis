package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategoryCategoryId(Integer categoryId);

    Page<Product> findByProductNameContainingIgnoreCase(String name, Pageable pageable);

    @Query(value = """
        SELECT 
            p.product_id AS productId,
            p.product_name AS productName,
            c.category_name AS categoryName,
            p.price AS price,
            COALESCE(SUM(oi.quantity), 0) AS unitsSold,
            COALESCE(SUM(oi.subtotal), 0) AS totalRevenue,
            DENSE_RANK() OVER (ORDER BY COALESCE(SUM(oi.subtotal), 0) DESC) AS revenueRank
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.order_id AND o.status = 'COMPLETED'
        GROUP BY p.product_id, p.product_name, c.category_name, p.price
        ORDER BY totalRevenue DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Object[]> findTopProductsNative(@Param("limit") int limit);

    @Query(value = """
        SELECT 
            p.product_id AS productId,
            p.product_name AS productName,
            c.category_name AS categoryName,
            p.price AS price,
            p.stock_quantity AS stockQuantity,
            COALESCE(SUM(oi.quantity), 0) AS unitsSold,
            COALESCE(SUM(oi.subtotal), 0) AS totalRevenue
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.order_id AND o.status = 'COMPLETED'
        GROUP BY p.product_id, p.product_name, c.category_name, p.price, p.stock_quantity
        HAVING unitsSold < 5 OR unitsSold IS NULL
        ORDER BY unitsSold ASC, p.stock_quantity DESC
        """, nativeQuery = true)
    List<Object[]> findLowPerformingProductsNative();
}
