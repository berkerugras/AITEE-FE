import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import styled from "styled-components";
import Background from "./components/background";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
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
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { getUsers } from './actions/users'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import AuthContext, { AuthContextProvider } from './components/shared/AuthContext';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CheckoutPage from './pages/checkout';
import ListingPage from './pages/list';
import ProductDetailPage from "./pages/productDetailPage";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default function App() {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(true);
  const AuthProfileWrapper = () => {
    return localStorage.getItem('userData') === null || localStorage.getItem('userData') === undefined
      ? <Navigate to="/signup" replace />
      : <ProfilePage />;
  };

  const AuthSignInWrapper = () => {
    return localStorage.getItem('userData') === null || localStorage.getItem('userData') === undefined
      ? <SignInPage />
      : <Navigate to="/home" replace />;
  };

  const AuthSignUpWrapper = () => {
    return localStorage.getItem('userData') === null || localStorage.getItem('userData') === undefined
      ? <SignupPage />
      : <Navigate to="/home" replace />;
  };

  useEffect(() => { dispatch(getUsers()) }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      try {
        let token = JSON.parse(localStorage.getItem("userData")).token;
        console.log(token);
        if (token !== null) {
          let decodedToken = jwt_decode(token);
          console.log("Decoded Token", decodedToken);
          let currentDate = new Date();
          console.log(currentDate.getTime());
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            setValid(false);
            localStorage.clear();
            window.dispatchEvent(new Event("storage"));
          } else {
            setValid(true);
            console.log("Valid token");
          }
        }
      } catch {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <>
      <BrowserRouter>

        <Navbar>

        </Navbar>
        <Routes>
          <Route path="/aitee" element={<Aitee />}>
            <Route index element={<Aitee />} />
          </Route>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/profile" element={<AuthProfileWrapper />}>
            <Route index element={<ProfilePage />} />
          </Route>
          <Route path="/cart" element={<CartPage />}>
            <Route index element={<CartPage />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />}>
            <Route index element={<CheckoutPage />} />
          </Route>
          <Route path="/signup" element={<AuthSignUpWrapper />}>
            <Route index element={<SignupPage />} />
          </Route>
          <Route path="/signin" element={<AuthSignInWrapper />}>
            <Route index element={<SignInPage />} />
          </Route>
          <Route path="/market" element={<Marketplace />}>
            <Route index element={<Marketplace />} />
          </Route>
          <Route path="/list-item" element={<ListingPage />}>
            <Route index element={<ListingPage />} />
          </Route>
          <Route path="/buy-market-item" element={<ProductDetailPage />}>
            <Route index element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(<Provider store={store}><App /></Provider>);


