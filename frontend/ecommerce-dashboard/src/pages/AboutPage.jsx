import React from 'react';
import { Info, Code, Database, Server, Cpu, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">About E-Commerce Sales Analytics Platform</h1>
        <p className="page-subtitle">Full Stack Java & React Portfolio Project for CSE Graduates & Placement Technical Interviews.</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card col-8">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
            System Architecture & Tech Stack
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            This application is designed with a decoupled layered architecture. The backend REST APIs expose native database analytics calculated via MySQL window functions and common table expressions, which are consumed by an interactive React 18 single page application.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Server size={18} />
                <span>Backend Framework</span>
              </div>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                <li>Java 17 & Spring Boot 3.2</li>
                <li>Spring Data JPA & Hibernate</li>
                <li>Spring Web REST APIs</li>
                <li>Centralized Exception Handling</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Database size={18} />
                <span>Database Engine</span>
              </div>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                <li>MySQL 8.0 Engine</li>
                <li>6 Normalized Tables & Indexes</li>
                <li>CTEs & Window Functions (`RANK`, `LAG`)</li>
                <li>Database Views for Aggregates</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="chart-card col-4">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
            Core Capabilities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <CheckCircle size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Real-time executive KPI metrics (Revenue, Orders, AOV).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <CheckCircle size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>MoM Sales trend analysis using `LAG()` window function.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <CheckCircle size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Product rankings via `DENSE_RANK()` and inventory alert query.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <CheckCircle size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Interactive SQL Analysis query execution showcase.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
