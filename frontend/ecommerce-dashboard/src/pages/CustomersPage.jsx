import React, { useEffect, useState } from 'react';
import { Users, Crown, RefreshCw } from 'lucide-react';
import { fetchTopCustomers } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchTopCustomers(10);
        setTopCustomers(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating customer lifetime value rankings..." />;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Customer Segmentation & Lifetime Spending</h1>
        <p className="page-subtitle">Rankings based on overall customer spending using RANK() and order velocity.</p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Crown color="#f59e0b" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Top Spending Customer Leaderboard</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>City & State</th>
                <th>Total Orders</th>
                <th>Lifetime Spent (₹)</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((c) => (
                <tr key={c.customerId}>
                  <td>
                    <span style={{
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: c.spendingRank === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: c.spendingRank === 1 ? '#fbbf24' : 'var(--text-primary)'
                    }}>
                      #{c.spendingRank}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'white' }}>{c.customerName}</td>
                  <td>{c.email}</td>
                  <td>{c.city}, {c.state}</td>
                  <td>{c.totalOrders} completed orders</td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>
                    ₹{Number(c.totalSpent).toLocaleString('en-IN')}
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
