package com.ecommerce.service.impl;

import com.ecommerce.dto.SqlQueryResultDto;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.service.SqlAnalysisService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SqlAnalysisServiceImpl implements SqlAnalysisService {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Map<String, QueryMeta> QUERIES = new LinkedHashMap<>();

    private record QueryMeta(String title, String category, String description, String sql, List<String> columns) {}

    static {
        QUERIES.put("q1", new QueryMeta(
                "Overall Business KPI Metrics Summary",
                "Sales Analytics",
                "Calculates overall revenue, completed orders count, average order value, total registered customers, and total products sold.",
                """
                SELECT 
                    SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) AS total_revenue,
                    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS total_orders,
                    AVG(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE NULL END) AS avg_order_value,
                    (SELECT COUNT(DISTINCT customer_id) FROM customers) AS total_customers,
                    (SELECT COALESCE(SUM(oi.quantity), 0) FROM order_items oi JOIN orders o ON oi.order_id = o.order_id WHERE o.status = 'COMPLETED') AS total_units_sold
                FROM orders
                """,
                List.of("total_revenue", "total_orders", "avg_order_value", "total_customers", "total_units_sold")
        ));

        QUERIES.put("q2", new QueryMeta(
                "Month-over-Month (MoM) Revenue Growth Rate using LAG()",
                "Advanced SQL Analytics",
                "Uses Common Table Expression (CTE) and the LAG() window function to compare monthly revenue against the preceding month.",
                """
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
                    revenue AS current_revenue,
                    LAG(revenue, 1) OVER (ORDER BY month_year) AS prev_revenue,
                    ROUND(((revenue - LAG(revenue, 1) OVER (ORDER BY month_year)) / NULLIF(LAG(revenue, 1) OVER (ORDER BY month_year), 0)) * 100, 2) AS mom_growth_pct
                FROM MonthlySales
                """,
                List.of("month_year", "current_revenue", "prev_revenue", "mom_growth_pct")
        ));

        QUERIES.put("q3", new QueryMeta(
                "Top 10 Products by Revenue using DENSE_RANK()",
                "Product Intelligence",
                "Ranks products based on gross sales revenue generated across all completed transactions using DENSE_RANK().",
                """
                WITH ProductRev AS (
                    SELECT 
                        p.product_id,
                        p.product_name,
                        c.category_name,
                        SUM(oi.quantity) AS total_units_sold,
                        SUM(oi.subtotal) AS total_revenue
                    FROM products p
                    JOIN categories c ON p.category_id = c.category_id
                    JOIN order_items oi ON p.product_id = oi.product_id
                    JOIN orders o ON oi.order_id = o.order_id
                    WHERE o.status = 'COMPLETED'
                    GROUP BY p.product_id, p.product_name, c.category_name
                )
                SELECT 
                    product_id,
                    product_name,
                    category_name,
                    total_units_sold,
                    total_revenue,
                    DENSE_RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank
                FROM ProductRev
                LIMIT 10
                """,
                List.of("product_id", "product_name", "category_name", "total_units_sold", "total_revenue", "revenue_rank")
        ));

        QUERIES.put("q4", new QueryMeta(
                "Customer Lifetime Spending Ranking using RANK()",
                "Customer Analytics",
                "Groups customer transactions and applies the RANK() window function to identify high-value customer accounts.",
                """
                WITH CustomerSpending AS (
                    SELECT 
                        c.customer_id,
                        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
                        c.email,
                        c.city,
                        COUNT(o.order_id) AS total_orders,
                        SUM(o.total_amount) AS total_spent
                    FROM customers c
                    JOIN orders o ON c.customer_id = o.customer_id
                    WHERE o.status = 'COMPLETED'
                    GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city
                )
                SELECT 
                    customer_id,
                    customer_name,
                    email,
                    city,
                    total_orders,
                    total_spent,
                    RANK() OVER (ORDER BY total_spent DESC) AS spending_rank
                FROM CustomerSpending
                LIMIT 10
                """,
                List.of("customer_id", "customer_name", "email", "city", "total_orders", "total_spent", "spending_rank")
        ));

        QUERIES.put("q5", new QueryMeta(
                "Payment Method Revenue & Transaction Success Rate",
                "Financial Analytics",
                "Analyzes payment channel volume, successful revenue collection, and success percentages using conditional CASE aggregation.",
                """
                SELECT 
                    p.payment_method,
                    COUNT(p.payment_id) AS total_transactions,
                    SUM(CASE WHEN p.payment_status = 'SUCCESS' THEN p.amount ELSE 0 END) AS successful_revenue,
                    COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) AS success_count,
                    COUNT(CASE WHEN p.payment_status = 'FAILED' THEN 1 END) AS failed_count,
                    ROUND(COUNT(CASE WHEN p.payment_status = 'SUCCESS' THEN 1 END) / COUNT(p.payment_id) * 100, 2) AS success_rate_pct
                FROM payments p
                GROUP BY p.payment_method
                ORDER BY successful_revenue DESC
                """,
                List.of("payment_method", "total_transactions", "successful_revenue", "success_count", "failed_count", "success_rate_pct")
        ));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SqlQueryResultDto> getAllSqlAnalysisQueries() {
        List<SqlQueryResultDto> list = new ArrayList<>();
        for (String id : QUERIES.keySet()) {
            list.add(executeAnalysisQuery(id));
        }
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public SqlQueryResultDto executeAnalysisQuery(String queryId) {
        QueryMeta meta = QUERIES.get(queryId);
        if (meta == null) {
            throw new ResourceNotFoundException("SQL Analysis Query not found with ID: " + queryId);
        }

        long start = System.currentTimeMillis();
        Query query = entityManager.createNativeQuery(meta.sql());
        List<?> resultList = query.getResultList();
        long duration = System.currentTimeMillis() - start;

        List<Map<String, Object>> rows = new ArrayList<>();
        for (Object item : resultList) {
            Map<String, Object> map = new LinkedHashMap<>();
            if (item instanceof Object[] rowArray) {
                for (int i = 0; i < meta.columns().size() && i < rowArray.length; i++) {
                    map.put(meta.columns().get(i), rowArray[i]);
                }
            } else {
                if (!meta.columns().isEmpty()) {
                    map.put(meta.columns().get(0), item);
                }
            }
            rows.add(map);
        }

        return SqlQueryResultDto.builder()
                .id(queryId)
                .title(meta.title())
                .category(meta.category())
                .description(meta.description())
                .sqlQuery(meta.sql())
                .columns(meta.columns())
                .rows(rows)
                .executionTimeMs(duration)
                .build();
    }
}
