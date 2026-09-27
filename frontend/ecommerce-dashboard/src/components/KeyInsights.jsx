import React, { useMemo } from 'react';
import { Lightbulb, TrendingUp, Award, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KeyInsights({ kpis, monthlySales = [], categoryRevenue = [], topProducts = [], orderStatus = [], filters }) {
  const insights = useMemo(() => {
    const list = [];

    // 1. Revenue Velocity / Total
    const totalRev = kpis?.revenue || 0;
    const revFormatted = `₹${Math.round(totalRev).toLocaleString('en-IN')}`;
    
    let latestGrowth = null;
    if (monthlySales.length > 0) {
      const lastMonth = monthlySales[monthlySales.length - 1];
      latestGrowth = lastMonth.momGrowthPercentage;
    }

    if (latestGrowth !== null && latestGrowth !== undefined) {
      const isPos = latestGrowth >= 0;
      list.push({
        icon: TrendingUp,
        color: isPos ? '#34d399' : '#f87171',
        title: 'MoM Revenue Velocity',
        text: `Recent month revenue ${isPos ? 'increased' : 'declined'} by ${Math.abs(latestGrowth)}% (${revFormatted} total revenue).`
      });
    } else {
      list.push({
        icon: TrendingUp,
        color: '#6366f1',
        title: 'Total Gross Revenue',
        text: `Generated ${revFormatted} in gross revenue across completed transactions.`
      });
    }

    // 2. Top Category Performance
    if (categoryRevenue.length > 0) {
      const sortedCat = [...categoryRevenue].sort((a, b) => (b.categoryRevenue || 0) - (a.categoryRevenue || 0));
      const topCat = sortedCat[0];
      const share = topCat.revenueSharePercentage ? `${topCat.revenueSharePercentage}%` : 'top';
      list.push({
        icon: Layers,
        color: '#3b82f6',
        title: 'Dominant Sales Category',
        text: `Top category: ${topCat.categoryName} generating ${share} of total business revenue.`
      });
    }

    // 3. Top Product Spotlight
    if (topProducts.length > 0) {
      const topProd = topProducts[0];
      const prodRev = `₹${Number(topProd.totalRevenue || 0).toLocaleString('en-IN')}`;
      list.push({
        icon: Award,
        color: '#f59e0b',
        title: 'Best Selling Product',
        text: `Top item: ${topProd.productName} with ${prodRev} in total revenue (${topProd.unitsSold} units sold).`
      });
    }

    // 4. Order Health & Fulfillment
    if (orderStatus.length > 0) {
      const completed = orderStatus.find(s => s.status === 'COMPLETED');
      const totalCount = orderStatus.reduce((acc, curr) => acc + (curr.orderCount || 0), 0);
      if (completed && totalCount > 0) {
        const pct = ((completed.orderCount / totalCount) * 100).toFixed(1);
        list.push({
          icon: CheckCircle2,
          color: '#10b981',
          title: 'Order Pipeline Health',
          text: `Fulfillment success rate is ${pct}% (${completed.orderCount} completed of ${totalCount} orders).`
        });
      }
    } else if (kpis?.orders) {
      list.push({
        icon: CheckCircle2,
        color: '#10b981',
        title: 'Order Volume',
        text: `Total of ${kpis.orders} orders processed with average order value of ₹${Math.round(kpis.aov || 0).toLocaleString('en-IN')}.`
      });
    }

    return list;
  }, [kpis, monthlySales, categoryRevenue, topProducts, orderStatus, filters]);

  return (
    <div className="chart-card insights-card col-5">
      <div className="chart-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb color="#fbbf24" size={18} />
          <h3 className="chart-title" style={{ fontSize: '1rem', letterSpacing: '0.04em' }}>
            KEY INSIGHTS
          </h3>
        </div>
        <span className="insights-badge">Auto-Calculated</span>
      </div>

      <div className="insights-list">
        {insights.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No key insights available for the selected dataset.
          </p>
        ) : (
          insights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="insight-item">
                <div className="insight-icon" style={{ color: item.color, background: `${item.color}15` }}>
                  <Icon size={16} />
                </div>
                <div className="insight-content">
                  <span className="insight-title">{item.title}</span>
                  <p className="insight-text">{item.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
