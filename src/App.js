import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TDModel from './3dmodel';
import Home from './pages/index';
import Aitee from './pages/aitee';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/aitee" elements={<Aitee />} />
            <Route exact path="/" elements={<Home />} />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
