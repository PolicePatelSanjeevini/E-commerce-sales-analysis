import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SalesPage from './pages/SalesPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import SqlAnalysisPage from './pages/SqlAnalysisPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="main-content">
          <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/sql-analysis" element={<SqlAnalysisPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

