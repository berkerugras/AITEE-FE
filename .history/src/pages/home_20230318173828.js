import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import {useState, useEffect} from 'react';


const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      fetch('/api/generate')
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        });
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
            <div style={height:''}>
            {imageUrl && <img src={imageUrl} alt="Generated"/>}
            </div>
        </div>
        
    );
};


export default Home;