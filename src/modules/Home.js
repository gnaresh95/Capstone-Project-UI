import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [productId, setProductId] = useState("9cf31e30-a0ff-46e2-a172-fd023b92ae3f");
  const [productData, setProductData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (productId) {
      const url = `http://localhost:8080/getProduct?productId=${productId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProductData(data);
        console.log("Product Data:", data);
      } catch (error) {
        alert("Error fetching product: " + error.message);
      }
    } else {
      alert("Please enter a product ID.");
    }
  };

  const fetchAllProducts = async () => {
    const url = "http://localhost:8080/getallproducts";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch all products.");
      }
      const data = await response.json();
      setAllProducts(data);
      console.log("All Products:", data);
    } catch (error) {
      alert("Error fetching all products: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ Updated to navigate to viewcart with product
  const handleAddToCart = (product) => {
    navigate("/viewcart", { state: { product } });
  };

  const handleProductClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/getProduct?productId=${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }
      const product = await response.json();
      navigate("/viewcart", { state: { product } });
    } catch (error) {
      alert("Error fetching product for viewcart: " + error.message);
    }
  };

  return (
    <div className="home-container">
      <h1>Fashion Accessories</h1>
      <div className="main-content">
        <aside className="sidebar">
          <h3>Category</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  fetchAllProducts();
                }}
              >
                <strong>All Products</strong>
              </a>
            </li>
            <li><a href="#">Mens Fashion</a></li>
          </ul>
        </aside>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleSearch}>Search Product</button>
        </div>

        {productData ? (
          <div className="product-details">
            <h2>{productData.name}</h2>
            <p><strong>SKU:</strong> {productData.sku}</p>
            <p><strong>Slug:</strong> {productData.slug}</p>
            <p><strong>Description:</strong> {productData.description}</p>
            <h3><strong>Price:</strong> ${productData.price}</h3>
            <button onClick={() => handleProductClick(productData.id)}>Buy Now</button>
            <button onClick={() => handleAddToCart(productData)}>Add to Cart</button>
          </div>
        ) : (
          <p className="centered-message">
          Enter a Product ID to search and view the product details.
        </p>
        )}

        {allProducts.length > 0 && (
          <div className="all-products">
            <h2>All Products</h2>
            <div className="product-list">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/250x150"}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <h4>${product.price}</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      handleAddToCart(product); // ✅ goes to viewcart
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;