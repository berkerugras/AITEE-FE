import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import styled from "styled-components";
import Background from "./components/background";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aitee from './pages/aitee';
import Home from './pages/home';
import AntdCard from './components/BuyCard';
import ButtonTest from './pages/buttonTest';
import Navbar from './components/navbar/NavbarTop';
import './styles/style.css';
import ProfilePage from './pages/profilePage';
import CartPage from './pages/cart';
import SignupPage from './pages/signup';
import SignInPage from './pages/signin';
import Marketplace from './pages/marketplace';
import ThemeButtons from './components/ThemeButtons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { getUsers } from './actions/users'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { useDispatch } from 'react-redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getUsers()) }, [dispatch]);


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
root.render(<Provider store={store}><App /></Provider>);


