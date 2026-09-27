import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

// Fallback Mock Dataset for Instant UI Visuals if Spring Boot Backend is offline
const MOCK_DATA = {
  kpi: {
    totalRevenue: 894380.00,
    totalOrders: 32,
    totalCustomers: 25,
    totalProductsSold: 38,
    averageOrderValue: 27949.38
  },
  monthlySales: [
    { monthYear: '2025-10', orderCount: 4, revenue: 194994.00, avgOrderValue: 48748.50, momGrowthPercentage: null },
    { monthYear: '2025-11', orderCount: 5, revenue: 97794.00,  avgOrderValue: 19558.80, momGrowthPercentage: -49.85 },
    { monthYear: '2025-12', orderCount: 6, revenue: 192093.00, avgOrderValue: 32015.50, momGrowthPercentage: 96.43 },
    { monthYear: '2026-01', orderCount: 5, revenue: 53793.00,  avgOrderValue: 10758.60, momGrowthPercentage: -71.99 },
    { monthYear: '2026-02', orderCount: 5, revenue: 149295.00, avgOrderValue: 29859.00, momGrowthPercentage: 177.54 },
    { monthYear: '2026-03', orderCount: 7, revenue: 206411.00, avgOrderValue: 29487.28, momGrowthPercentage: 38.26 }
  ],
  categoryRevenue: [
    { categoryId: 1, categoryName: 'Electronics', totalProducts: 5, totalUnitsSold: 16, categoryRevenue: 593984.00, revenueSharePercentage: 66.41 },
    { categoryId: 3, categoryName: 'Home & Kitchen', totalProducts: 4, totalUnitsSold: 6, categoryRevenue: 82494.00, revenueSharePercentage: 9.22 },
    { categoryId: 5, categoryName: 'Fitness & Sports', totalProducts: 2, totalUnitsSold: 3, categoryRevenue: 12297.00, revenueSharePercentage: 1.37 },
    { categoryId: 2, categoryName: 'Apparel & Fashion', totalProducts: 4, totalUnitsSold: 7, categoryRevenue: 22893.00, revenueSharePercentage: 2.56 },
    { categoryId: 6, categoryName: 'Beauty & Personal Care', totalProducts: 2, totalUnitsSold: 4, categoryRevenue: 10896.00, revenueSharePercentage: 1.22 },
    { categoryId: 4, categoryName: 'Books & Stationery', totalProducts: 3, totalUnitsSold: 2, categoryRevenue: 2098.00, revenueSharePercentage: 0.23 }
  ],
  topProducts: [
    { productId: 1, productName: 'UltraBook Pro 15', categoryName: 'Electronics', price: 89999.00, unitsSold: 3, totalRevenue: 269997.00, revenueRank: 1 },
    { productId: 3, productName: 'Smartphone Galaxy X', categoryName: 'Electronics', price: 54999.00, unitsSold: 3, totalRevenue: 164997.00, revenueRank: 2 },
    { productId: 5, productName: '4K Ultra HD Smart TV 55"', categoryName: 'Electronics', price: 45999.00, unitsSold: 2, totalRevenue: 91998.00, revenueRank: 3 },
    { productId: 2, productName: 'Wireless Noise-Canceling Headphones', categoryName: 'Electronics', price: 14999.00, unitsSold: 5, totalRevenue: 74995.00, revenueRank: 4 },
    { productId: 4, productName: 'Smartwatch Series 7', categoryName: 'Electronics', price: 19999.00, unitsSold: 3, totalRevenue: 59997.00, revenueRank: 5 },
    { productId: 12, productName: 'Robot Vacuum Cleaner V2', categoryName: 'Home & Kitchen', price: 22999.00, unitsSold: 2, totalRevenue: 45998.00, revenueRank: 6 },
    { productId: 11, productName: 'Ergonomic Office Mesh Chair', categoryName: 'Home & Kitchen', price: 12499.00, unitsSold: 2, totalRevenue: 24998.00, revenueRank: 7 },
    { productId: 10, productName: 'Stainless Steel Cookware Set', categoryName: 'Home & Kitchen', price: 6999.00, unitsSold: 3, totalRevenue: 20997.00, revenueRank: 8 },
    { productId: 17, productName: 'Adjustable Dumbbell Set 20kg', categoryName: 'Fitness & Sports', price: 5499.00, unitsSold: 2, totalRevenue: 10998.00, revenueRank: 9 },
    { productId: 13, productName: 'Air Fryer XL 5.5L', categoryName: 'Home & Kitchen', price: 7999.00, unitsSold: 1, totalRevenue: 7999.00, revenueRank: 10 },
    { productId: 7, productName: 'Women Floral Summer Dress', categoryName: 'Apparel & Fashion', price: 2499.00, unitsSold: 3, totalRevenue: 7497.00, revenueRank: 11 },
    { productId: 20, productName: 'Professional Hair Dryer & Styler', categoryName: 'Beauty & Personal Care', price: 3299.00, unitsSold: 2, totalRevenue: 6598.00, revenueRank: 12 },
    { productId: 8, productName: 'Unisex Running Sneakers', categoryName: 'Apparel & Fashion', price: 4999.00, unitsSold: 1, totalRevenue: 4999.00, revenueRank: 13 },
    { productId: 9, productName: 'Denim Designer Jacket', categoryName: 'Apparel & Fashion', price: 3499.00, unitsSold: 1, totalRevenue: 3499.00, revenueRank: 14 },
    { productId: 6, productName: 'Men Cotton Slim Fit Shirt', categoryName: 'Apparel & Fashion', price: 1899.00, unitsSold: 1, totalRevenue: 1899.00, revenueRank: 15 },
    { productId: 19, productName: 'Organic Hydrating Face Serum 50ml', categoryName: 'Beauty & Personal Care', price: 1499.00, unitsSold: 1, totalRevenue: 1499.00, revenueRank: 16 },
    { productId: 18, productName: 'Non-Slip Yoga Mat 6mm', categoryName: 'Fitness & Sports', price: 1299.00, unitsSold: 1, totalRevenue: 1299.00, revenueRank: 17 },
    { productId: 15, productName: 'Clean Code Architecture Handbook', categoryName: 'Books & Stationery', price: 1199.00, unitsSold: 1, totalRevenue: 1199.00, revenueRank: 18 },
    { productId: 14, productName: 'System Design & Microservices Guide', categoryName: 'Books & Stationery', price: 899.00, unitsSold: 1, totalRevenue: 899.00, revenueRank: 19 },
    { productId: 16, productName: 'Hardcover Executive Journal & Pen Set', categoryName: 'Books & Stationery', price: 599.00, unitsSold: 0, totalRevenue: 0.00, revenueRank: 20 }
  ],
  lowPerformingProducts: [
    { productId: 14, productName: 'System Design & Microservices Guide', categoryName: 'Books & Stationery', price: 899.00, unitsSold: 1, totalRevenue: 899.00, revenueRank: 1 },
    { productId: 15, productName: 'Clean Code Architecture Handbook', categoryName: 'Books & Stationery', price: 1199.00, unitsSold: 1, totalRevenue: 1199.00, revenueRank: 2 },
    { productId: 19, productName: 'Organic Hydrating Face Serum 50ml', categoryName: 'Beauty & Personal Care', price: 1499.00, unitsSold: 1, totalRevenue: 1499.00, revenueRank: 3 },
    { productId: 16, productName: 'Hardcover Executive Journal Set', categoryName: 'Books & Stationery', price: 599.00, unitsSold: 0, totalRevenue: 0.00, revenueRank: 4 }
  ],
  topCustomers: [
    { customerId: 1, customerName: 'Aarav Sharma', email: 'aarav.sharma@example.com', city: 'Mumbai', state: 'Maharashtra', totalOrders: 3, totalSpent: 131996.00, spendingRank: 1 },
    { customerId: 3, customerName: 'Rohan Mehta', email: 'rohan.mehta@example.com', city: 'Delhi', state: 'Delhi', totalOrders: 3, totalSpent: 164997.00, spendingRank: 2 },
    { customerId: 2, customerName: 'Priya Verma', email: 'priya.verma@example.com', city: 'Bengaluru', state: 'Karnataka', totalOrders: 3, totalSpent: 115496.00, spendingRank: 3 },
    { customerId: 5, customerName: 'Vikram Singh', email: 'vikram.singh@example.com', city: 'Hyderabad', state: 'Telangana', totalOrders: 2, totalSpent: 60998.00, spendingRank: 4 },
    { customerId: 16, customerName: 'Divya Bhat', email: 'divya.b@example.com', city: 'Mangaluru', state: 'Karnataka', totalOrders: 1, totalSpent: 45999.00, spendingRank: 5 },
    { customerId: 7, customerName: 'Aditya Nair', email: 'aditya.nair@example.com', city: 'Kochi', state: 'Kerala', totalOrders: 1, totalSpent: 22999.00, spendingRank: 6 }
  ],
  orderStatus: [
    { status: 'COMPLETED', orderCount: 24, totalAmount: 765476.00, percentage: 75.0 },
    { status: 'CANCELLED', orderCount: 3,  totalAmount: 90497.00,  percentage: 9.38 },
    { status: 'PENDING',   orderCount: 2,  totalAmount: 67498.00,  percentage: 6.25 },
    { status: 'SHIPPED',   orderCount: 2,  totalAmount: 29998.00,  percentage: 6.25 },
    { status: 'PROCESSING',orderCount: 1,  totalAmount: 54999.00,  percentage: 3.12 }
  ],
  paymentMethods: [
    { paymentMethod: 'CREDIT_CARD', totalTransactions: 10, successfulRevenue: 434990.00, successfulCount: 8, failedCount: 0, refundedCount: 2, successRatePercentage: 80.0 },
    { paymentMethod: 'UPI',         totalTransactions: 12, successfulRevenue: 154988.00, successfulCount: 11, failedCount: 0, refundedCount: 0, successRatePercentage: 91.67 },
    { paymentMethod: 'NET_BANKING', totalTransactions: 4,  successfulRevenue: 77998.00,  successfulCount: 2, failedCount: 1, refundedCount: 0, successRatePercentage: 50.0 },
    { paymentMethod: 'DEBIT_CARD',  totalTransactions: 4,  successfulRevenue: 58395.00,  successfulCount: 4, failedCount: 0, refundedCount: 0, successRatePercentage: 100.0 },
    { paymentMethod: 'COD',         totalTransactions: 2,  successfulRevenue: 11498.00,  successfulCount: 2, failedCount: 0, refundedCount: 0, successRatePercentage: 100.0 }
  ],
  sqlQueries: [
    {
      id: 'q1',
      title: 'Overall Business KPI Metrics Summary',
      category: 'Sales Analytics',
      description: 'Calculates overall revenue, completed orders count, average order value, total registered customers, and total products sold.',
      sqlQuery: `SELECT 
    SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) AS total_revenue,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS total_orders,
    AVG(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE NULL END) AS avg_order_value,
    (SELECT COUNT(DISTINCT customer_id) FROM customers) AS total_customers,
    (SELECT COALESCE(SUM(oi.quantity), 0) FROM order_items oi JOIN orders o ON oi.order_id = o.order_id WHERE o.status = 'COMPLETED') AS total_units_sold
FROM orders`,
      columns: ['total_revenue', 'total_orders', 'avg_order_value', 'total_customers', 'total_units_sold'],
      rows: [
        { total_revenue: 894380.00, total_orders: 24, avg_order_value: 31890.83, total_customers: 25, total_units_sold: 38 }
      ],
      executionTimeMs: 14
    },
    {
      id: 'q2',
      title: 'Month-over-Month (MoM) Revenue Growth Rate using LAG()',
      category: 'Advanced SQL Analytics',
      description: 'Uses Common Table Expression (CTE) and the LAG() window function to compare monthly revenue against the preceding month.',
      sqlQuery: `WITH MonthlySales AS (
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
FROM MonthlySales`,
      columns: ['month_year', 'current_revenue', 'prev_revenue', 'mom_growth_pct'],
      rows: [
        { month_year: '2025-10', current_revenue: 194994.00, prev_revenue: null, mom_growth_pct: null },
        { month_year: '2025-11', current_revenue: 97794.00,  prev_revenue: 194994.00, mom_growth_pct: -49.85 },
        { month_year: '2025-12', current_revenue: 192093.00, prev_revenue: 97794.00, mom_growth_pct: 96.43 },
        { month_year: '2026-01', current_revenue: 53793.00,  prev_revenue: 192093.00, mom_growth_pct: -71.99 },
        { month_year: '2026-02', current_revenue: 149295.00, prev_revenue: 53793.00, mom_growth_pct: 177.54 },
        { month_year: '2026-03', current_revenue: 206411.00, prev_revenue: 149295.00, mom_growth_pct: 38.26 }
      ],
      executionTimeMs: 18
    },
    {
      id: 'q3',
      title: 'Top 10 Products by Revenue using DENSE_RANK()',
      category: 'Product Intelligence',
      description: 'Ranks products based on gross sales revenue generated across all completed transactions using DENSE_RANK().',
      sqlQuery: `WITH ProductRev AS (
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
LIMIT 10`,
      columns: ['product_id', 'product_name', 'category_name', 'total_units_sold', 'total_revenue', 'revenue_rank'],
      rows: [
        { product_id: 1, product_name: 'UltraBook Pro 15', category_name: 'Electronics', total_units_sold: 3, total_revenue: 269997.00, revenue_rank: 1 },
        { product_id: 3, product_name: 'Smartphone Galaxy X', category_name: 'Electronics', total_units_sold: 3, total_revenue: 164997.00, revenue_rank: 2 },
        { product_id: 5, product_name: '4K Ultra HD Smart TV 55"', category_name: 'Electronics', total_units_sold: 2, total_revenue: 91998.00, revenue_rank: 3 }
      ],
      executionTimeMs: 12
    }
  ]
};

export const fetchDashboardKpis = async () => {
  try {
    const res = await client.get('/dashboard');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.kpi;
  }
};

export const fetchMonthlySales = async () => {
  try {
    const res = await client.get('/sales/monthly');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.monthlySales;
  }
};

export const fetchCategoryRevenue = async () => {
  try {
    const res = await client.get('/sales/category');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.categoryRevenue;
  }
};

export const fetchTopProducts = async (limit = 10) => {
  try {
    const res = await client.get(`/products/top?limit=${limit}`);
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.topProducts;
  }
};

export const fetchLowPerformingProducts = async () => {
  try {
    const res = await client.get('/products/low-performing');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.lowPerformingProducts;
  }
};

export const fetchTopCustomers = async (limit = 10) => {
  try {
    const res = await client.get(`/customers/top?limit=${limit}`);
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.topCustomers;
  }
};

export const fetchOrderStatusDistribution = async () => {
  try {
    const res = await client.get('/orders/status');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.orderStatus;
  }
};

export const fetchPaymentMethodsAnalysis = async () => {
  try {
    const res = await client.get('/orders/payments/methods');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.paymentMethods;
  }
};

export const fetchSqlAnalysisQueries = async () => {
  try {
    const res = await client.get('/sql-analysis');
    return res.data.data;
  } catch (err) {
    return MOCK_DATA.sqlQueries;
  }
};
