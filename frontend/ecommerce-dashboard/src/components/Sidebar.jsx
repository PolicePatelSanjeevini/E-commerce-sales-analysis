import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Package, Users, ShoppingBag, Terminal, Info } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/sales', label: 'Sales Analysis', icon: TrendingUp },
    { path: '/products', label: 'Product Analysis', icon: Package },
    { path: '/customers', label: 'Customer Analysis', icon: Users },
    { path: '/orders', label: 'Orders Management', icon: ShoppingBag },
    { path: '/sql-analysis', label: 'SQL Analysis', icon: Terminal },
    { path: '/about', label: 'About Project', icon: Info },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} />
      )}

      <aside className={`app-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-section-title">
          Analytics Navigation
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} className="sidebar-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

