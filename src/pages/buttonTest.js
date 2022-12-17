import React from 'react';
import { useNavigate } from "react-router-dom";


function ButtonTest() {
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../aitee`; 
    navigate(path);
  }
  
  return (
    
     <div className="app flex-row align-items-center">
      <div>         
          <button color="primary" className="px-4"
            onClick={routeChange}
              >
              Login
          </button>      
       </div>
    </div>
  );
}

export default ButtonTest;