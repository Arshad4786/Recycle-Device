import React from 'react';
import '../CSS/company.css'
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Apple', image: 'https://cdn.recycledevice.com/brands/apple.png' },
  { id: 2, name: 'Oppo', image: 'https://cdn.recycledevice.com/brands/oppo.png' },
  { id: 3, name: 'Vivo', image: 'https://cdn.recycledevice.com/brands/vivo.png' },
  { id: 4, name: 'Xiaomi', image: 'https://cdn.recycledevice.com/brands/xiaomi.png' },
  { id: 5, name: 'OnePlus', image: 'https://cdn.recycledevice.com/brands/oneplus.png' },
  { id: 6, name: 'Poco', image: 'https://cdn.recycledevice.com/brands/poco.png' },
  { id: 7, name: 'Samsung', image: 'https://cdn.recycledevice.com/brands/samsung.png' },
  { id: 8, name: 'Nokia', image: 'https://cdn.recycledevice.com/brands/nokia.png' },
];

const Company = () => {
  return (
    <div className='bg'>
      <h1 className='center bg'>Select Device Cateogary</h1>
    <div className="product-grid bg">
      {products.map(product => (
        <Link to={`/${product.name}`}>
        <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
          </div>
        </Link> 
      ))}
    </div>
    </div>
    

  );
};

export default Company;
