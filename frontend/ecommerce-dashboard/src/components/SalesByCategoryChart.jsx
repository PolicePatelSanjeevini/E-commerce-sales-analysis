import React from 'react';
import { Layers } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SalesByCategoryChart({ categories = [] }) {
  return (
    <div className="chart-card col-6">
      <div className="chart-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers color="#3b82f6" size={18} />
          <h3 className="chart-title">Sales by Category</h3>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Category Revenue Distribution
        </span>
      </div>

      {categories.length === 0 ? (
        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          No category sales recorded for selected filters.
        </div>
      ) : (
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={categories} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="categoryName"
                stroke="#9ca3af"
                style={{ fontSize: '0.75rem' }}
                interval={0}
                tickFormatter={(val) => (val && val.length > 12 ? val.substring(0, 12) + '...' : val)}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '0.75rem' }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
                formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']}
              />
              <Bar dataKey="categoryRevenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
