import React from 'react';
import { Filter, Calendar, Tag, ShieldAlert } from 'lucide-react';

export default function FilterBar({ filters, onFilterChange, onReset }) {
  return (
    <div className="filter-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        <Filter size={18} color="var(--accent-primary)" />
        <span>Analytics Filters</span>
      </div>

      <div className="filter-group">
        <Calendar size={16} color="var(--text-secondary)" />
        <span className="filter-label">Range:</span>
        <select
          className="filter-select"
          value={filters.dateRange || 'ALL'}
          onChange={(e) => onFilterChange('dateRange', e.target.value)}
        >
          <option value="ALL">All Time</option>
          <option value="LAST_30">Last 30 Days</option>
          <option value="LAST_90">Last 90 Days</option>
          <option value="YEAR_2026">Year 2026</option>
          <option value="YEAR_2025">Year 2025</option>
        </select>
      </div>

      <div className="filter-group">
        <Tag size={16} color="var(--text-secondary)" />
        <span className="filter-label">Category:</span>
        <select
          className="filter-select"
          value={filters.category || 'ALL'}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Apparel & Fashion">Apparel & Fashion</option>
          <option value="Fitness & Sports">Fitness & Sports</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
        </select>
      </div>

      <div className="filter-group">
        <ShieldAlert size={16} color="var(--text-secondary)" />
        <span className="filter-label">Status:</span>
        <select
          className="filter-select"
          value={filters.orderStatus || 'ALL'}
          onChange={(e) => onFilterChange('orderStatus', e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="SHIPPED">Shipped</option>
        </select>
      </div>

      <button
        className="btn-page"
        onClick={onReset}
        style={{ marginLeft: 'auto', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: 'none' }}
      >
        Reset Filters
      </button>
    </div>
  );
}
