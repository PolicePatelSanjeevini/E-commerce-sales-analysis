import React from 'react';
import { BarChart3, Database, ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="brand-logo">
          <div className="brand-icon">
            <BarChart3 size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">SalesIntel</span>
            <span className="brand-badge">Java FullStack</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="tech-tag">
          <Database size={15} color="#10b981" />
          <span>MySQL 8.0</span>
        </div>
        <div className="tech-divider">|</div>
        <div className="tech-tag">
          <ShieldCheck size={15} color="#6366f1" />
          <span>Spring Boot REST API</span>
        </div>
      </div>
    </header>
  );
}

