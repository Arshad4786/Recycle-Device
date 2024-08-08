import React from 'react';
import Navbar from '../components/navbar';
import { useParams  } from 'react-router-dom';
import { useState , useEffect } from 'react';
import axios from 'axios';
import '../CSS/deviceInfo.css'; 



const PredictPage= () => {
    const { DeviceName } = useParams(); 
    const [device, setDevices] = useState([]); 
    const [price, setPrice] = useState([]); 
    const encodedDeviceName = DeviceName.split('_').join('%20');

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/${encodedDeviceName}`)
          .then(response => {
            setDevices(response.data);
          })
          .catch(error => {
            console.error(`There was an error fetching the devices! at http://127.0.0.1:5000/${encodedDeviceName}`, error);
          });
      }, []);

      useEffect(() => {
        axios.get(`http://127.0.0.1:5000/predict/${encodedDeviceName}`)
          .then(response => {
            setPrice(response.data);
          })
          .catch(error => {
            console.error(`There was an error fetching the devices! at http://127.0.0.1:5000/predict/${encodedDeviceName}`, error);
          });
      }, []);
    
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="header">
        <span>{DeviceName.split('_').join(' ')}</span>
      </div>
      <div className="breadcrumb">
        Home &gt; Sell Old Mobile &gt; Sell Old  &gt; Sell {DeviceName.split('_').join(' ')}
      </div>
    
      <div className="content">
        <div>
            {device && device.length > 0 ? (
            <img 
            src={`${device[0].url}`} 
            alt='Phone' 
            className="device-image" 
          />
            ) : null}
            </div>
        
        <div className="details">
          <div className="sold-info">568+ Devices sold with us</div>
          <div className="specifications">
          <div>
            {device && device.length > 0 ? (
            <div className="specification">
              <span className="label">Processor:</span>
              <span className="value">{device[0].processor}</span>
            </div>
            ) : null}
            </div>
            <div>
            {device && device.length > 0 ? (
            <div className="specification">
              <span className="label">RAM:</span>
              <span className="value">{device[0].ram}</span>
            </div>
            ) : null}
            </div>
            <div>
            {device && device.length > 0 ? (
            <div className="specification">
              <span className="label">Storage:</span>
              <span className="value">{device[0].storage}</span>
            </div>
            ) : null}
            </div>
            <div>
            {device && device.length > 0 ? (
            <div className="specification">
              <span className="label">Battery Capacity:</span>
              <span className="value">{device[0].battery}</span>
            </div>
            ) : null}
            </div>
          </div>

            <div className='predictBlock'>
            <h2>Estimated Price</h2>
            <p className='predictedprice'>₹{price}</p>
          </div>
          
          

        </div>
      </div>
    </div>
    </>
  );
};

export default PredictPage;
