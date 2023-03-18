import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import {useState, useEffect} from 'react';

function generateImage()
const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);
   function generateImage(){

    }
    useEffect(() => {
      fetch('/api/generate')
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);

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
            <div style={{height:'20vh'}}>
            {imageUrl && <img src={imageUrl} alt="Generated"/>}
            </div>
        </div>
        
    );
};


export default Home;