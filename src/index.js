import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aitee from './pages/aitee';
import Home from './pages/home';
import ButtonTest from './pages/buttonTest';
import Navbar from './components/navbar/NavbarTop';
export default function App() {
  return (
    <>   
    <BrowserRouter>
      <Routes>
        <Route path="/aitee" element={<Aitee />}>
          <Route index element={<Aitee />} />         
        </Route>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />          
        </Route>
        <Route path="/buttontest" element={<ButtonTest />}>
          <Route index element={<ButtonTest />} />          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
