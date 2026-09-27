import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function KpiCard({ label, value, icon: Icon, gradient, tooltip, indicator }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon-wrapper" style={{ background: gradient }}>
        <Icon size={22} />
      </div>
      <div className="kpi-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="kpi-label">{label}</span>
            {tooltip && (
              <div className="tooltip-container">
                <HelpCircle size={13} className="tooltip-icon" />
                <div className="tooltip-box">{tooltip}</div>
              </div>
            )}
          </div>
          {indicator && (
            <span className="kpi-indicator-badge">
              {indicator}
            </span>
          )}
        </div>
        <div className="kpi-value">{value}</div>
      </div>
    </div>
  );
}


