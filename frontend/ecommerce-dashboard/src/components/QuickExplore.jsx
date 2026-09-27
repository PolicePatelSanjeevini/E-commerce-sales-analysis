import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Package, Users, ShoppingBag, Terminal } from 'lucide-react';

export default function QuickExplore() {
  const navigate = useNavigate();

  const exploreItems = [
    {
      label: 'Sales Analysis',
      desc: 'Monthly revenue & MoM growth trends',
      icon: TrendingUp,
      path: '/sales',
      color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    {
      label: 'Product Analytics',
      desc: 'Leaderboard & slow-moving stock',
      icon: Package,
      path: '/products',
      color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    {
      label: 'Customer Insights',
      desc: 'Lifetime spending & order frequency',
      icon: Users,
      path: '/customers',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      label: 'Orders & Payments',
      desc: 'Fulfillment health & payment gateways',
      icon: ShoppingBag,
      path: '/orders',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      label: 'SQL Analysis',
      desc: 'Execute CTEs & window function queries',
      icon: Terminal,
      path: '/sql-analysis',
      color: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
    }
  ];

  return (
    <div className="quick-explore-container">
      <div className="quick-explore-title">Quick Explore Modules</div>
      <div className="quick-explore-grid">
        {exploreItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              className="quick-explore-card"
              onClick={() => navigate(item.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(item.path); }}
            >
              <div className="quick-explore-icon" style={{ background: item.color }}>
                <Icon size={20} />
              </div>
              <div className="quick-explore-info">
                <span className="quick-explore-label">{item.label}</span>
                <span className="quick-explore-desc">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
