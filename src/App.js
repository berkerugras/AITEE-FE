import './App.css';
import Navbar from './components/navbar/NavbarTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Aitee from './pages/aitee';

function App() {
  return (
    <div>

      <div>
        MKANDFKGJLADFJKGJKLADFGNJKADFKGADFHJKGADFHJGJADFHJKGAFD
      </div>
      {/* <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/aitee" elements={<Aitee />} />
            <Route exact path="/home" elements={<Home />} />
          </Routes>
        </Navbar>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
