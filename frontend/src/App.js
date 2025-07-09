import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    fetch(`${backendURL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch products. Is the backend running?");
      });
  }, []);

  return (
    <div className="App">
      <h1>🏍️ Product Showcase</h1>
      <p>Browse our latest motorcycle accessories and gear!</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> <br />
            ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
