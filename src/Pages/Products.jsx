import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Devices from '../components/devices';

const ProductPage = () => {
  const { CompanyName } = useParams(); 

  return (
    <>
    <Navbar/>
    <Devices Company={CompanyName}/>
    </>
    
  );
};

export default ProductPage;
