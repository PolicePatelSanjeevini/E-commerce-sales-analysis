import React from 'react';

export default function LoadingSpinner({ message = "Loading analytical metrics..." }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</p>
    </div>
  );
}
