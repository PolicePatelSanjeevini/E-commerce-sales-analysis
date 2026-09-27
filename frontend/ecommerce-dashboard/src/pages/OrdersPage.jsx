import React, { useEffect, useState } from 'react';
import { ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';
import { fetchOrderStatusDistribution, fetchPaymentMethodsAnalysis } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [statusList, setStatusList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          fetchOrderStatusDistribution(),
          fetchPaymentMethodsAnalysis()
        ]);
        setStatusList(sRes);
        setPaymentList(pRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Analyzing order fulfillment & payment channels..." />;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED': return <span className="badge badge-completed">Completed</span>;
      case 'PENDING': return <span className="badge badge-pending">Pending</span>;
      case 'CANCELLED': return <span className="badge badge-cancelled">Cancelled</span>;
      case 'SHIPPED': return <span className="badge badge-shipped">Shipped</span>;
      default: return <span className="badge badge-processing">{status}</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Order Status & Payment Method Analysis</h1>
        <p className="page-subtitle">Order fulfillment pipeline health metrics and payment gateway transaction success rates.</p>
      </div>

      {/* Section 1: Order Status Table */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <ShoppingBag color="var(--accent-primary)" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Order Status Breakdown</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Fulfillment Status</th>
                <th>Order Count</th>
                <th>Status Share (%)</th>
                <th>Total Volume Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {statusList.map((s, idx) => (
                <tr key={idx}>
                  <td>{getStatusBadge(s.status)}</td>
                  <td style={{ fontWeight: 700, color: 'white' }}>{s.orderCount} orders</td>
                  <td>{s.percentage}%</td>
                  <td style={{ fontWeight: 700 }}>₹{Number(s.totalAmount).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Payment Methods Table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <CreditCard color="#10b981" size={20} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Payment Method Success Rates & Volume</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Payment Channel</th>
                <th>Total Transactions</th>
                <th>Successful Revenue (₹)</th>
                <th>Successful Count</th>
                <th>Failed / Refunded</th>
                <th>Success Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: 'white' }}>{p.paymentMethod}</td>
                  <td>{p.totalTransactions} transactions</td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>
                    ₹{Number(p.successfulRevenue).toLocaleString('en-IN')}
                  </td>
                  <td>{p.successfulCount}</td>
                  <td>{(p.failedCount || 0) + (p.refundedCount || 0)}</td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: p.successRatePercentage >= 80 ? '#34d399' : '#f87171'
                    }}>
                      {p.successRatePercentage}%
                    </span>
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
