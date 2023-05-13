import React from 'react';
import Home from '../pages/home';
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css'

import { forwardRef, useImperativeHandle } from 'react';



const ThemeButtons = React.forwardRef((props, ref) => {
  
const [isArt, setArt] = useState(false);
const [isClicked, setClicked] = useState(false);
const [isRockClicked, setRockClicked] = useState(false);

useImperativeHandle(ref, () => ({getMyState: () => {return isArt}}), [isArt]);


const styleArtButton = {
  backgroundColor: isClicked ? '#F5DEB3' : "red",
  color: '#333',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '16px',

};

const styleRockButton = {
  backgroundColor: isRockClicked ? '#A020F0' : "red",
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  fontSize: '16px',

};

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='theme-style'>Choose a Theme</h1>
      <button
        style={styleArtButton}
        onClick={() => {setArt(true); setClicked(true); setRockClicked(false);}}
        onMouseOver={() => console.log(isArt)}
      >
        Art
      </button>
      <button
        style={styleRockButton}
        onClick={() => {setArt(false); setClicked(false); setRockClicked(true);}}
        onMouseOver={() => console.log(isArt)}
      >
        Rock
      </button>
    </div>
  );
});

export default ThemeButtons;