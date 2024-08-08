import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/company.css';

const Devices = ({ Company }) => {
  const [devices, setDevices] = useState([]); 

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/fetch/${Company}`)
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error(`There was an error fetching the devices! at http://127.0.0.1:5000/fetch/${Company}`, error);
      });
  }, []);

  return (
    <>
    <div className='bg'>
      <h1 className='center bg'>Select Device Cateogary</h1>
      <div className="product-grid bg">
        {devices.map((device, index) => (
          
          <Link key={index} to={`${device.device.replace(/\s+/g, '_')}`}>
          <div key={index} className="product-card">
            <img src="https://cdn.recycledevice.com/device/4888.jpeg" alt={device.device} className="product-image" />
            <h3 className="product-name">{device.device}</h3>
          </div>
          </Link>
            ))}
      </div>
    </div>
    </>
  );
};

export default Devices;
