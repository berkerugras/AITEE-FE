import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from "styled-components";
import Background from "./components/background";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aitee from './pages/aitee';
import Home from './pages/home';
import ButtonTest from './pages/buttonTest';
import Navbar from './components/navbar/NavbarTop';
import './styles/style.css';
import ProfilePage from './pages/profilePage';
import CartPage from './pages/cart';
import SignupPage from './pages/signup';
import SignInPage from './pages/signin';
import Marketplace from './pages/marketplace';
import ThemeButtons from './components/ThemeButtons';
export default function App() {
  return (
    <>
      <Navbar>
      
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/aitee" element={<Aitee />}>
            <Route index element={<Aitee />} />
          </Route>
          <Route path="/" element={<SignupPage />}>
            <Route index element={<SignupPage />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<Home />} />
          </Route>        
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<ProfilePage />} />
          </Route>
          <Route path="/cart" element={<CartPage />}>
            <Route index element={<CartPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />}>
            <Route index element={<SignupPage />} />
          </Route>
          <Route path="/signin" element={<SignInPage />}>
            <Route index element={<SignInPage />} />
          </Route>
          <Route path="/market" element={<Marketplace />}>
            <Route index element={<Marketplace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


