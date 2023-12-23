import React from 'react';
import './ProgressBar_vert.css'; // Import your CSS file

function ProgressBar_vert({ progress, color = 'blue', weight = '20px' }) {
  // Inline style for the inner div based on the progress prop
  const gradient = 'linear-gradient(45deg, blue, orange)';
  const fillerStyles = {
    weight: '100%',
    height: `${progress}%`,
    background: gradient,
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div className="progress-bar-vert" style={{ weight }}>
      <div style={fillerStyles} />
    </div>
  );
}

export default ProgressBar_vert;