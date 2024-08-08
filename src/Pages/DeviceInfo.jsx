import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../CSS/deviceInfo.css'; 


const DevicePage = () => {
  const { DeviceName } = useParams(); 

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="header">
        <span>Sell Old OnePlus 7 Pro</span>
      </div>
      <div className="breadcrumb">
        Home &gt; Sell Old Mobile &gt; Sell Old Oneplus &gt; Sell Oneplus 7-Pro
      </div>
      <div className="content">
        <img 
          src="https://cdn.recycledevice.com/device/4888.jpeg" 
          alt="OnePlus 7 Pro" 
          className="device-image" 
        />
        <div className="details">
          <div className="sold-info">568+ Devices sold with us</div>
          <div className="specifications">
            <div className="specification">
              <span className="label">Processor:</span>
              <span className="value">Qualcomm Snapdragon 855</span>
            </div>
            <div className="specification">
              <span className="label">RAM:</span>
              <span className="value">6GB / 8GB / 12GB</span>
            </div>
            <div className="specification">
              <span className="label">Storage:</span>
              <span className="value">128GB / 256GB</span>
            </div>
            <div className="specification">
              <span className="label">Battery Capacity:</span>
              <span className="value">4000 mAh</span>
            </div>
          </div>
          <div className="variant-selector">
            <span className="choose-variant">CHOOSE VARIANT</span>
            <div className="variants">
              <label>
                <input type="radio" name="variant" value="6GB / 128GB" />
                6GB / 128GB
              </label>
              <label>
                <input type="radio" name="variant" value="8GB / 256GB" />
                8GB / 256GB
              </label>
              <label>
                <input type="radio" name="variant" value="12GB / 256GB" />
                12GB / 256GB
              </label>
            </div>
            <button className="next-button">NEXT</button>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default DevicePage;
