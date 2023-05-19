import React from 'react';
import Home from '../pages/home';
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css'

import { forwardRef, useImperativeHandle } from 'react';



const ThemeButtons = React.forwardRef((props, ref) => {
  
const [isArt, setArt] = useState(null);
const [isClicked, setClicked] = useState(false);
const [isRockClicked, setRockClicked] = useState(false);
const [hoveredArt, setHoveredArt] = useState(false);
const [hoveredRock, setHoveredRock] = useState(false);

useImperativeHandle(ref, () => ({getMyState: () => {return isArt}}), [isArt]);



const handleArtMouseEnter = () => {
  setHoveredArt(true);
};

const handleArtMouseLeave = () => {
  setHoveredArt(false);
};

const handleRockMouseEnter = () => {
  setHoveredRock(true);
};

const handleRockMouseLeave = () => {
  setHoveredRock(false);
};
const styleArtButton = {
  backgroundColor: isClicked ?  "red" : '#A020F0',
  color: '#FFD700',
  padding: '10px 20px',
  border: hoveredArt?'solid black':' ',
  borderRadius: '5px',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor:"pointer"

};

const styleRockButton = {
  backgroundColor: isRockClicked ?  "red" :'#A020F0',
  color: '#FFD700',
  padding: '10px 20px',
  border: hoveredRock?'solid black':'',
  borderRadius: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor:"pointer"

};

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='theme-style'>Choose a Theme</h1>
      <button
        style={styleArtButton}
        onClick={() => {setArt(true); setClicked(true); setRockClicked(false);}}
         onMouseEnter={handleArtMouseEnter}
         onMouseLeave={handleArtMouseLeave}
      >
        Art
      </button>
      <button
        style={styleRockButton}
        onClick={() => {setArt(false); setClicked(false); setRockClicked(true);}}
        onMouseEnter={handleRockMouseEnter}
        onMouseLeave={handleRockMouseLeave}
      >
        Rock
      </button>
    </div>
  );
});

export default ThemeButtons;