package com.ecommerce.repository;

import com.ecommerce.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Optional<Payment> findByOrderOrderId(Integer orderId);

    @Query(value = """
        SELECT 
            p.payment_method AS paymentMethod,
            COUNT(p.payment_id) AS totalTransactions,
            SUM(CASE WHEN p.payment_status = 'SUCCESS' THEN p.amount ELSE 0 END) AS successfulRevenue,
            COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) AS successfulCount,
            COUNT(CASE WHEN p.payment_status = 'FAILED' THEN 1 END) AS failedCount,
            COUNT(CASE WHEN p.payment_status = 'REFUNDED' THEN 1 END) AS refundedCount,
            ROUND(
                COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) / COUNT(p.payment_id) * 100, 2
            ) AS successRatePercentage
        FROM payments p
        GROUP BY p.payment_method
        ORDER BY successfulRevenue DESC
        """, nativeQuery = true)
    List<Object[]> findPaymentMethodAnalysisNative();
}
