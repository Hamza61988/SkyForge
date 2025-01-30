import React from 'react';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)', 
  fontFamily: 'Arial, sans-serif',
  color: '#fff',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.6)',
  padding: '2rem',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '600px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '1rem',
};

const MaintenancePage: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Sorry!</h1>
        <p>This is currently under maintenance.</p>
        <p>Please check back soon!</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
