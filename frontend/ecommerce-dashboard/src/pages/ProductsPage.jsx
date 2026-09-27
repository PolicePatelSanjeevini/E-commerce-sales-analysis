import React, { useEffect, useState } from 'react';
import { Package, Award, AlertTriangle } from 'lucide-react';
import { fetchTopProducts, fetchLowPerformingProducts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);
  const [lowProducts, setLowProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [top, low] = await Promise.all([fetchTopProducts(10), fetchLowPerformingProducts()]);
        setTopProducts(top);
        setLowProducts(low);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Evaluating product sales performance..." />;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Product Intelligence Analysis</h1>
        <p className="page-subtitle">Product sales leaderboard ranked by gross revenue using DENSE_RANK() and low-performing inventory metrics.</p>
      </div>

      {/* Top Products Leaderboard */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award color="#f59e0b" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Top 10 Products by Gross Revenue</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Unit Price (₹)</th>
                <th>Units Sold</th>
                <th>Total Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.productId}>
                  <td>
                    <span style={{
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: p.revenueRank === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: p.revenueRank === 1 ? '#fbbf24' : 'var(--text-primary)'
                    }}>
                      #{p.revenueRank}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'white' }}>{p.productName}</td>
                  <td>{p.categoryName}</td>
                  <td>₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td>{p.unitsSold} units</td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>
                    ₹{Number(p.totalRevenue).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low-Performing Products Alert */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertTriangle color="#ef4444" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Low-Performing / Slow-Moving Inventory</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Units Sold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lowProducts.map((p) => (
                <tr key={p.productId}>
                  <td>#{p.productId}</td>
                  <td style={{ fontWeight: 700, color: 'white' }}>{p.productName}</td>
                  <td>{p.categoryName}</td>
                  <td>₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td style={{ color: '#f87171', fontWeight: 700 }}>{p.unitsSold} units</td>
                  <td>
                    <span className="badge badge-cancelled">Needs Marketing Boost</span>
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
