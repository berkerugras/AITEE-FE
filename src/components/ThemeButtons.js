import React from 'react';
import Home from '../pages/home';
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css'




const ThemeButtons = () => {
  
const [isArt, setArt] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='theme-style'>Choose a Theme</h1>
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
        Rock
      </button>
    </div>
  );
};

export default ThemeButtons;