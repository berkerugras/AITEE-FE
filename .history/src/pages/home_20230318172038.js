import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';



const Home = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            paddingTop: '10vh'
        }}
        >
            {/* <Tee></Tee> */}
            <Teem></Teem>
        </div>
    );
};


export default Home;