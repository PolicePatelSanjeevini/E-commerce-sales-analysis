import React, { useEffect, useState } from 'react';
import { Terminal, Code, Clock, Play } from 'lucide-react';
import { fetchSqlAnalysisQueries } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SqlAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSqlAnalysisQueries();
        setQueries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Executing MySQL analytical query test suite..." />;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">SQL Business Analytics Showcase</h1>
        <p className="page-subtitle">Interactive showcase demonstrating complex SQL queries (CTEs, Window Functions RANK/DENSE_RANK/LAG, Aggregates) and live execution outputs.</p>
      </div>

      {queries.map((q) => (
        <div key={q.id} className="sql-card">
          <div className="sql-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-completed">{q.category}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{q.title}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {q.description}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Clock size={15} color="#10b981" />
              <span>Execution Time: {q.executionTimeMs}ms</span>
            </div>
          </div>

          <div className="sql-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 700 }}>
              <Code size={16} />
              <span>SQL Query:</span>
            </div>
            <pre className="sql-code">{q.sqlQuery}</pre>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
              <Play size={16} />
              <span>Query Execution Output Matrix:</span>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    {q.columns.map((col, cIdx) => (
                      <th key={cIdx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {q.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {q.columns.map((col, cIdx) => {
                        const val = row[col];
                        return (
                          <td key={cIdx} style={{ fontWeight: cIdx === 0 ? 700 : 400 }}>
                            {val === null || val === undefined ? (
                              <span style={{ color: 'var(--text-muted)', italic: true }}>NULL</span>
                            ) : typeof val === 'number' && col.toLowerCase().includes('revenue') ? (
                              `₹${Number(val).toLocaleString('en-IN')}`
                            ) : (
                              String(val)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
