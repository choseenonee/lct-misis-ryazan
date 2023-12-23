import React from 'react';
import './ProgressBar.css'; // Import your CSS file

function ProgressBar({ progress, color = 'blue', height = '20px' }) {
  // Inline style for the inner div based on the progress prop
  const gradient = 'linear-gradient(to right, blue, orange)';
  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    background: gradient,
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div className="progress-bar" style={{ height }}>
      <div style={fillerStyles} />
    </div>
  );
}

export default ProgressBar;