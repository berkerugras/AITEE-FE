import React from 'react';

const ThemeButtons = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Themes</h2>
      <button
        style={{
          backgroundColor: '#F5DEB3',
          color: '#333',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        onClick={() => {}}
        onMouseOver={() => console.log('Hovered Art')}
      >
        Art
      </button>
      <button
        style={{
          backgroundColor: '#A020F0',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        onClick={() => {}}
        onMouseOver={() => console.log('Hovered Neon')}
      >
        Neon
      </button>
    </div>
  );
};

export default ThemeButtons;