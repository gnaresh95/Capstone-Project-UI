// src/pages/Checkout.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ViewCart() {
  const location = useLocation();
  const product = location.state?.product;

  // State for selected options
  const [selectedBrand, setSelectedBrand] = useState(product?.brand || "Brand A");
  const [selectedSize, setSelectedSize] = useState(product?.size || "M");
  const [selectedColor, setSelectedColor] = useState(product?.color || "Red");

  if (!product) {
    return <div>No product selected. Go back and try again.</div>;
  }

  return (
    <div className="checkout-page">
      <h1>ViewCart</h1>
      <div className="product-summary">
        <h2>{product.name}</h2>
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Description:</strong> {product.description}</p>
        
        {/* Brand Dropdown */}
        <p>
          <strong>Brand:</strong>
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="Brand A">Brand A</option>
            <option value="Brand B">Brand B</option>
            <option value="Brand C">Brand C</option>
          </select>
        </p>

        {/* Size Dropdown */}
        <p>
          <strong>Size:</strong>
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
        </p>

        {/* Color Dropdown */}
        <p>
          <strong>Color:</strong>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
          </select>
        </p>

        <h3><strong>Price:</strong> ${product.price}</h3>
      </div>
    </div>
  );
}

export default ViewCart;