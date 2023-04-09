import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import {useState, useEffect} from 'react';


const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);
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
            <button style={{marginBottom:2rem,}} onclick={generateImage}>
            Get new Image
            </button>
            <div style={{height:'20vh'}}>

            {imageUrl && <img src={imageUrl} alt="Generated"/>}
            </div>
        </div>
        
    );
};


export default Home;