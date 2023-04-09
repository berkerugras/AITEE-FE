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
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            paddingTop: '10vh'
        }}
        >
            <Teem></Teem>
      
        </div>
              <div>
              {imageUrl && <img src={imageUrl} alt="Generated"/>}
              </div>
    );
};


export default Home;