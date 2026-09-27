import React from 'react';
import { Sparkles, Tag, ShoppingBag, TrendingUp, Star, Award, Layers } from 'lucide-react';

const PRODUCT_DESCRIPTIONS = {
  'UltraBook Pro 15': 'High-performance 15-inch workstation laptop engineered for software development, creative design, and intensive computing tasks.',
  'Smartphone Galaxy X': 'Flagship 5G smartphone featuring high-refresh AMOLED display, multi-lens camera system, and all-day battery life.',
  '4K Ultra HD Smart TV 55"': '55-inch 4K Smart Television with HDR10+, built-in streaming apps, and high contrast display for home entertainment.',
  'Wireless Noise-Canceling Headphones': 'Over-ear bluetooth headphones equipped with active noise cancellation, ambient sound mode, and 30-hour battery life.',
  'Smartwatch Series 7': 'Advanced fitness and health tracker featuring AMOLED display, heart rate monitor, GPS, and water resistance.',
  'Robot Vacuum Cleaner V2': 'Autonomous robotic vacuum cleaner with smart mapping LiDAR navigation and multi-surface automated cleaning.',
  'Ergonomic Office Mesh Chair': 'Adjustable mesh office chair designed with lumbar support, 3D armrests, and breathable fabric for workplace ergonomics.',
  'Stainless Steel Cookware Set': '10-piece professional-grade stainless steel induction-compatible cookware set for home kitchen culinary use.',
  'Adjustable Dumbbell Set 20kg': 'Versatile quick-adjust dumbbell set ranging from 2kg to 20kg for home strength training and workout routines.',
  'Air Fryer XL 5.5L': 'Large capacity digital air fryer utilizing rapid air circulation technology for healthy oil-free cooking.',
  'Women Floral Summer Dress': 'Lightweight breathable cotton floral summer dress tailored for casual and everyday comfort.',
  'Professional Hair Dryer & Styler': 'High-speed ionic hairdryer with thermal heat protection sensors and multiple styling attachments.',
  'Unisex Running Sneakers': 'Cushioned lightweight athletic running shoes with high-grip rubber outsoles for outdoor training.',
  'Denim Designer Jacket': 'Classic denim jacket crafted with premium stretch cotton and reinforced stitching.',
  'Men Cotton Slim Fit Shirt': 'Formal button-down slim fit cotton shirt designed for professional business attire.',
  'Organic Hydrating Face Serum 50ml': 'Nourishing facial serum formulated with hyaluronic acid and vitamin C for skin hydration.',
  'Non-Slip Yoga Mat 6mm': 'High-density eco-friendly TPE yoga mat providing anti-slip cushioning for fitness and yoga.',
  'Clean Code Architecture Handbook': 'Comprehensive technical reference book detailing software engineering patterns, clean code principles, and architecture.',
  'System Design & Microservices Guide': 'In-depth guide covering distributed system design, microservices architecture, scalability, and cloud patterns.',
  'Hardcover Executive Journal & Pen Set': 'Premium leatherette bound notebook with acid-free pages and metallic executive pen.'
};

export default function ProductSpotlight({ product, allProducts = [], onSelectProduct }) {
  if (!product) {
    return (
      <div className="chart-card spotlight-card col-12">
        <div className="spotlight-header">
          <Sparkles color="#f59e0b" size={18} />
          <h3 className="chart-title">PRODUCT SPOTLIGHT</h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
          Select a product from rankings to view detailed intelligence.
        </p>
      </div>
    );
  }

  const name = product.productName || 'Unknown Product';
  const category = product.categoryName || 'General';
  const price = product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'N/A';
  const totalRevenue = product.totalRevenue ? `₹${Number(product.totalRevenue).toLocaleString('en-IN')}` : '₹0';
  const unitsSold = product.unitsSold || 0;
  const rank = product.revenueRank || '#1';
  
  // Custom or fallback description
  const description = PRODUCT_DESCRIPTIONS[name] || `Enterprise product in the ${category} category with strong sales volume.`;

  return (
    <div className="chart-card spotlight-card col-12">
      <div className="chart-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="#f59e0b" size={18} />
          <h3 className="chart-title" style={{ fontSize: '1rem', letterSpacing: '0.04em' }}>
            PRODUCT SPOTLIGHT
          </h3>
        </div>

        {allProducts.length > 1 && (
          <select
            className="spotlight-select"
            value={product.productId || ''}
            onChange={(e) => {
              const selected = allProducts.find(p => String(p.productId) === e.target.value);
              if (selected && onSelectProduct) onSelectProduct(selected);
            }}
          >
            {allProducts.slice(0, 10).map(p => (
              <option key={p.productId} value={p.productId}>
                #{p.revenueRank || ''} {p.productName}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="spotlight-body">
        <div className="spotlight-top-row">
          <div>
            <h4 className="spotlight-product-name">{name}</h4>
            <div className="spotlight-category-badge">
              <Tag size={12} />
              <span>{category}</span>
            </div>
          </div>
          <div className="spotlight-rank-badge">
            <Award size={14} color="#f59e0b" />
            <span>Rank #{rank}</span>
          </div>
        </div>

        <p className="spotlight-description">
          "{description}"
        </p>

        <div className="spotlight-metrics-grid">
          <div className="spotlight-metric-item">
            <span className="spotlight-metric-label">Gross Revenue</span>
            <span className="spotlight-metric-value highlight">{totalRevenue}</span>
          </div>
          <div className="spotlight-metric-item">
            <span className="spotlight-metric-label">Units Sold</span>
            <span className="spotlight-metric-value">{unitsSold} units</span>
          </div>
          <div className="spotlight-metric-item">
            <span className="spotlight-metric-label">Unit Price</span>
            <span className="spotlight-metric-value">{price}</span>
          </div>
          <div className="spotlight-metric-item">
            <span className="spotlight-metric-label">Demand Status</span>
            <span className="spotlight-metric-badge">
              <TrendingUp size={12} /> High Demand
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
