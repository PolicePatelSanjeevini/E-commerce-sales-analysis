import React, { useEffect, useState, useMemo } from 'react';
import { DollarSign, ShoppingBag, Users, CreditCard, AlertCircle, RefreshCw } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import FilterBar from '../components/FilterBar';
import QuickExplore from '../components/QuickExplore';
import LoadingSpinner from '../components/LoadingSpinner';
import SalesByCategoryChart from '../components/SalesByCategoryChart';
import TopProductsChart from '../components/TopProductsChart';
import ProductSpotlight from '../components/ProductSpotlight';
import {
  fetchDashboardKpis, fetchCategoryRevenue,
  fetchTopProducts, fetchOrderStatusDistribution
} from '../services/api';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [kpiRaw, setKpiRaw] = useState(null);
  const [categoryRevenueRaw, setCategoryRevenueRaw] = useState([]);
  const [topProductsRaw, setTopProductsRaw] = useState([]);
  const [orderStatusRaw, setOrderStatusRaw] = useState([]);

  // Selected Product for Product Spotlight
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    dateRange: 'ALL',
    category: 'ALL',
    orderStatus: 'ALL'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [kpiRes, catRes, prodRes, statusRes] = await Promise.all([
        fetchDashboardKpis(),
        fetchCategoryRevenue(),
        fetchTopProducts(20),
        fetchOrderStatusDistribution()
      ]);

      setKpiRaw(kpiRes);
      setCategoryRevenueRaw(catRes || []);
      setTopProductsRaw(prodRes || []);
      setOrderStatusRaw(statusRes || []);

      if (prodRes && prodRes.length > 0) {
        setSelectedProduct(prodRes[0]);
      }
    } catch (err) {
      console.error("Failed loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setFilters({ dateRange: 'ALL', category: 'ALL', orderStatus: 'ALL' });
  };

  // Filtered Datasets based on Global Filters
  const filteredCategoryRevenue = useMemo(() => {
    if (!categoryRevenueRaw.length) return [];
    if (filters.category === 'ALL') return categoryRevenueRaw;
    return categoryRevenueRaw.filter(c => c.categoryName === filters.category);
  }, [categoryRevenueRaw, filters.category]);

  const filteredTopProducts = useMemo(() => {
    if (!topProductsRaw.length) return [];
    if (filters.category === 'ALL') return topProductsRaw;
    return topProductsRaw.filter(p => p.categoryName === filters.category);
  }, [topProductsRaw, filters.category]);

  const filteredOrderStatus = useMemo(() => {
    if (!orderStatusRaw.length) return [];
    if (filters.orderStatus === 'ALL') return orderStatusRaw;
    return orderStatusRaw.filter(s => s.status === filters.orderStatus);
  }, [orderStatusRaw, filters.orderStatus]);

  // Keep selected product in sync with filtered products
  useEffect(() => {
    if (filteredTopProducts.length > 0) {
      if (!selectedProduct || !filteredTopProducts.some(p => p.productId === selectedProduct.productId)) {
        setSelectedProduct(filteredTopProducts[0]);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [filteredTopProducts]);

  // Derived filtered KPIs (4 original KPIs)
  const displayedKpis = useMemo(() => {
    if (!kpiRaw) return { revenue: 0, orders: 0, aov: 0, customers: 0 };
    let revenue = Number(kpiRaw.totalRevenue || 0);
    let orders = Number(kpiRaw.totalOrders || 0);
    let aov = Number(kpiRaw.averageOrderValue || 0);
    let customers = Number(kpiRaw.totalCustomers || 0);

    // If filtering by specific category, recalculate KPI values from filtered dataset
    if (filters.category !== 'ALL' && filteredCategoryRevenue.length > 0) {
      const catObj = filteredCategoryRevenue[0];
      revenue = Number(catObj.categoryRevenue || 0);
    }

    // If filtering by order status, update order count from filtered status
    if (filters.orderStatus !== 'ALL' && filteredOrderStatus.length > 0) {
      const statusObj = filteredOrderStatus[0];
      orders = Number(statusObj.orderCount || 0);
      revenue = Number(statusObj.totalAmount || 0);
      aov = orders > 0 ? revenue / orders : 0;
    }

    return { revenue, orders, aov, customers };
  }, [kpiRaw, filters, filteredCategoryRevenue, filteredOrderStatus]);

  if (loading) return <LoadingSpinner message="Loading interactive business intelligence dashboard..." />;

  const formattedRevenue = `₹${Math.round(displayedKpis.revenue).toLocaleString('en-IN')}`;
  const formattedAov = `₹${Math.round(displayedKpis.aov).toLocaleString('en-IN')}`;

  const hasData = filteredCategoryRevenue.length > 0 || filteredTopProducts.length > 0;

  return (
    <div className="page-wrapper">
      {/* 1. HEADER */}
      <div className="page-header">
        <div className="page-brand-tag">
          SalesIntel
        </div>
        <h1 className="page-title">E-Commerce Sales Analysis & BI Dashboard</h1>
        <p className="page-subtitle">Understand sales, products, customers and orders through interactive analytics.</p>
      </div>

      {/* 2. ANALYTICS FILTERS */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

      {/* 3. QUICK EXPLORE MODULES */}
      <QuickExplore />

      {/* 4. ORIGINAL KPI CARDS (EXACTLY 4 CARDS) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <KpiCard
          label="Total Revenue"
          value={formattedRevenue}
          icon={DollarSign}
          gradient="var(--accent-gradient)"
          tooltip="Total gross earnings generated from all completed order transactions."
        />
        <KpiCard
          label="Completed Orders"
          value={displayedKpis.orders}
          icon={ShoppingBag}
          gradient="var(--accent-blue)"
          tooltip="Total count of successfully fulfilled customer orders."
        />
        <KpiCard
          label="Average Order Value"
          value={formattedAov}
          icon={CreditCard}
          gradient="var(--accent-green)"
          tooltip="Average amount spent per completed order."
        />
        <KpiCard
          label="Active Customers"
          value={displayedKpis.customers}
          icon={Users}
          gradient="var(--accent-amber)"
          tooltip="Total count of distinct registered customers in database."
        />
      </div>

      {/* 5. CHART SECTION & PRODUCT SPOTLIGHT */}
      {!hasData ? (
        <div className="empty-state-card">
          <AlertCircle size={36} color="#ef4444" />
          <h3 className="empty-state-title">No sales found for the selected filters</h3>
          <p className="empty-state-desc">
            No matching records were found for category "{filters.category}" with status "{filters.orderStatus}".
          </p>
          <button className="btn-page" onClick={handleReset} style={{ marginTop: '1rem', gap: '0.5rem' }}>
            <RefreshCw size={15} /> Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* CHART SECTION: Sales by Category (Left) | Top Products (Right) */}
          <div className="charts-grid" style={{ marginBottom: '1.5rem' }}>
            <SalesByCategoryChart categories={filteredCategoryRevenue} />
            <TopProductsChart
              products={filteredTopProducts}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />
          </div>

          {/* PRODUCT SPOTLIGHT SECTION */}
          <div className="charts-grid">
            <ProductSpotlight
              product={selectedProduct}
              allProducts={filteredTopProducts}
              onSelectProduct={setSelectedProduct}
            />
          </div>
        </>
      )}
    </div>
  );
}
