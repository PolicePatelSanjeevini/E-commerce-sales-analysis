package com.ecommerce.repository;

import com.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    Page<Order> findByStatus(String status, Pageable pageable);

    @Query(value = """
        SELECT 
            SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) AS totalRevenue,
            COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS totalOrders,
            AVG(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE NULL END) AS avgOrderValue,
            (SELECT COUNT(DISTINCT customer_id) FROM customers) AS totalCustomers,
            (SELECT COALESCE(SUM(oi.quantity), 0) FROM order_items oi JOIN orders o2 ON oi.order_id = o2.order_id WHERE o2.status = 'COMPLETED') AS totalProductsSold
        FROM orders
        """, nativeQuery = true)
    Object[] findKpiSummaryNative();

    @Query(value = """
        WITH MonthlySales AS (
            SELECT 
                DATE_FORMAT(order_date, '%Y-%m') AS monthYear,
                COUNT(order_id) AS orderCount,
                SUM(total_amount) AS revenue,
                ROUND(AVG(total_amount), 2) AS avgOrderValue
            FROM orders
            WHERE status = 'COMPLETED'
            GROUP BY DATE_FORMAT(order_date, '%Y-%m')
        )
        SELECT 
            monthYear,
            orderCount,
            revenue,
            avgOrderValue,
            LAG(revenue, 1) OVER (ORDER BY monthYear) AS prevRevenue,
            ROUND(
                ((revenue - LAG(revenue, 1) OVER (ORDER BY monthYear)) / 
                 NULLIF(LAG(revenue, 1) OVER (ORDER BY monthYear), 0)) * 100, 2
            ) AS momGrowthPercentage
        FROM MonthlySales
        ORDER BY monthYear ASC
        """, nativeQuery = true)
    List<Object[]> findMonthlySalesNative();

    @Query(value = """
        SELECT 
            c.category_id AS categoryId,
            c.category_name AS categoryName,
            COUNT(DISTINCT p.product_id) AS totalProducts,
            COALESCE(SUM(oi.quantity), 0) AS totalUnitsSold,
            COALESCE(SUM(oi.subtotal), 0.00) AS categoryRevenue
        FROM categories c
        LEFT JOIN products p ON c.category_id = p.category_id
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.order_id AND o.status = 'COMPLETED'
        GROUP BY c.category_id, c.category_name
        ORDER BY categoryRevenue DESC
        """, nativeQuery = true)
    List<Object[]> findCategoryRevenueNative();

    @Query(value = """
        SELECT 
            status,
            COUNT(order_id) AS orderCount,
            SUM(total_amount) AS totalAmount,
            ROUND(COUNT(order_id) / (SELECT COUNT(*) FROM orders) * 100, 2) AS percentage
        FROM orders
        GROUP BY status
        ORDER BY orderCount DESC
        """, nativeQuery = true)
    List<Object[]> findOrderStatusDistributionNative();
}
