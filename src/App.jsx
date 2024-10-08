import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import DevicePage from './Pages/DeviceInfo';
import PredictPage from './Pages/PredictPage';



function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:CompanyName" element={<Products />} />
        <Route path="/:CompanyName/:DeviceName" element={<DevicePage />} />
        <Route path="/:CompanyName/:DeviceName/Predict" element={<PredictPage />} />

      </Routes>
    </Router>

  
    
  );
}

export default App;
