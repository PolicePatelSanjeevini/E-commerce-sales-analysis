import React, { useEffect, useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { fetchMonthlySales, fetchCategoryRevenue } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [categoryRevenue, setCategoryRevenue] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [mRes, cRes] = await Promise.all([fetchMonthlySales(), fetchCategoryRevenue()]);
        setMonthlySales(mRes);
        setCategoryRevenue(cRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Fetching sales analytics data..." />;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Sales & Revenue Analysis</h1>
        <p className="page-subtitle">Detailed breakdown of monthly sales performance, MoM growth rates, and category contributions.</p>
      </div>

      {/* Section 1: Monthly Sales Table */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <TrendingUp color="var(--accent-primary)" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Monthly Revenue Trend & MoM Growth Analysis</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Month Year</th>
                <th>Completed Orders</th>
                <th>Gross Revenue (₹)</th>
                <th>Avg Order Value (₹)</th>
                <th>MoM Growth Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {monthlySales.map((m, idx) => {
                const growth = m.momGrowthPercentage;
                const isPositive = growth !== null && growth >= 0;
                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'white' }}>{m.monthYear}</td>
                    <td>{m.orderCount} orders</td>
                    <td style={{ fontWeight: 700 }}>₹{Number(m.revenue).toLocaleString('en-IN')}</td>
                    <td>₹{Number(m.avgOrderValue).toLocaleString('en-IN')}</td>
                    <td>
                      {growth === null ? (
                        <span style={{ color: 'var(--text-muted)' }}>Base Month</span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: isPositive ? '#34d399' : '#f87171',
                          fontWeight: 700
                        }}>
                          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {growth}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Category Revenue Breakdown Table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Layers color="var(--accent-blue)" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Category Performance Breakdown</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Total Products</th>
                <th>Total Units Sold</th>
                <th>Category Revenue (₹)</th>
                <th>Revenue Share (%)</th>
              </tr>
            </thead>
            <tbody>
              {categoryRevenue.map((c) => (
                <tr key={c.categoryId}>
                  <td>#{c.categoryId}</td>
                  <td style={{ fontWeight: 700, color: 'white' }}>{c.categoryName}</td>
                  <td>{c.totalProducts} items</td>
                  <td>{c.totalUnitsSold} units</td>
                  <td style={{ fontWeight: 700 }}>₹{Number(c.categoryRevenue).toLocaleString('en-IN')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${c.revenueSharePercentage}%`,
                          height: '100%',
                          background: 'var(--accent-gradient)'
                        }} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '45px' }}>
                        {c.revenueSharePercentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
