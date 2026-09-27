import React from 'react';
import { Award } from 'lucide-react';

export default function TopProductsChart({ products = [], selectedProduct, onSelectProduct }) {
  const top5 = products.slice(0, 5);

  return (
    <div className="chart-card col-6">
      <div className="chart-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award color="#f59e0b" size={18} />
          <h3 className="chart-title">Top Products</h3>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Top 5 Products by Revenue
        </span>
      </div>

      {top5.length === 0 ? (
        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          No top products found for selected filters.
        </div>
      ) : (
        <div className="top-products-list">
          {top5.map((p, idx) => {
            const isSelected = selectedProduct && selectedProduct.productId === p.productId;
            const maxRev = top5[0]?.totalRevenue || 1;
            const pct = Math.min(100, Math.round(((p.totalRevenue || 0) / maxRev) * 100));

            return (
              <div
                key={p.productId || idx}
                className={`product-bar-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectProduct && onSelectProduct(p)}
                role="button"
                tabIndex={0}
              >
                <div className="product-bar-header">
                  <div className="product-bar-rank-name">
                    <span className="product-rank-tag">#{p.revenueRank || idx + 1}</span>
                    <span className="product-bar-name">{p.productName}</span>
                  </div>
                  <div className="product-bar-meta">
                    <span className="product-bar-units">{p.unitsSold} units</span>
                    <span className="product-bar-revenue">₹{Number(p.totalRevenue).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="product-progress-track">
                  <div
                    className="product-progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: isSelected
                        ? 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)'
                        : 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
