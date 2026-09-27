package com.ecommerce.repository;

import com.ecommerce.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Page<Customer> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String email, Pageable pageable);

    @Query(value = """
        SELECT 
            c.customer_id AS customerId,
            CONCAT(c.first_name, ' ', c.last_name) AS customerName,
            c.email AS email,
            c.city AS city,
            c.state AS state,
            COUNT(o.order_id) AS totalOrders,
            SUM(o.total_amount) AS totalSpent,
            RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS spendingRank
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        WHERE o.status = 'COMPLETED'
        GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city, c.state
        ORDER BY totalSpent DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Object[]> findTopSpendingCustomersNative(@Param("limit") int limit);

    @Query(value = """
        SELECT 
            c.customer_id AS customerId,
            CONCAT(c.first_name, ' ', c.last_name) AS customerName,
            c.email AS email,
            c.city AS city,
            c.state AS state,
            COUNT(o.order_id) AS totalOrders,
            SUM(o.total_amount) AS totalSpent,
            MAX(o.order_date) AS lastOrderDate
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        WHERE o.status = 'COMPLETED'
        GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city, c.state
        HAVING COUNT(o.order_id) >= 2
        ORDER BY totalOrders DESC, totalSpent DESC
        """, nativeQuery = true)
    List<Object[]> findRepeatCustomersNative();
}
