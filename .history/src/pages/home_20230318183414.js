import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import {useState, useEffect} from 'react';


const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };

    const style = {
        backgroundColor: isHovered ? 'red' : 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        // add other styles here
      };

   function generateImage(){
    fetch('/api/generate')
    .then(response => response.blob())
    .then(imageBlob => {
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
    })
    .catch(err=>{
        console.log(err);
    })
    }
    useEffect(()=>generateImage(), []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            paddingTop: '10vh'
        }}
        >
            <Teem></Teem>
            <button style={{marginBottom: '2rem',
                            backgroundColor:"blue",
                            padding: "1.25rem",
                            borderRadius: "1.25rem"
                            }} 
                            onClick={generateImage}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
            <span style={{color:"white"}}>Get new Image</span>
            </button>
            <div style={{height:'20vh'}}>

            {imageUrl && <img src={imageUrl} alt="Generated"/>}
            </div>
        </div>
        
    );
};


export default Home;