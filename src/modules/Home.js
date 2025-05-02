import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [productId, setProductId] = useState("9cf31e30-a0ff-46e2-a172-fd023b92ae3f");
  const [productData, setProductData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // Hardcoded image map
  const productImageMap = {
    "9cf31e30-a0ff-46e2-a172-fd023b92ae3f": "watch.jpg",
    "product-id-2": "bag.jpg",
    "product-id-3": "sunglasses.jpg",
    "product-id-4": "shoes.jpg",
    "product-id-5": "belt.jpg",
    // Add more productId-image mappings as needed
  };

  const handleSearch = async () => {
    if (productId) {
      const url = `http://localhost:8080/getProduct?productId=${productId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch product details.");
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
      if (!response.ok) throw new Error("Failed to fetch all products.");
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

  const handleAddToCart = (product) => {
    navigate("/viewcart", { state: { product } });
  };

  const handleProductClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/getProduct?productId=${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product details.");
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
              <a href="#" onClick={(e) => { e.preventDefault(); fetchAllProducts(); }}>
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
          <p className="centered-message">Enter a Product ID to search and view the product details.</p>
        )}

        {allProducts.length > 0 && (
          <div className="all-products">
            <h2>All Products</h2>
            <div className="product-list">
              {allProducts.map((product) => {
                const imageFile = productImageMap[product.id] || "placeholder.jpg";
                return (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <img
                      alt={product.name}
                      src={`/images/${imageFile}`}
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        objectFit: "contain",
                        color: "transparent",
                      }}
                    />
                    <div style={{ position: "relative", background: "#fff", padding: "1rem" }}>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <span className="mt-4 font-light text-gray-900 text-2xl">
                        ${product.price ? product.price.toFixed(2) : "300.00"} USD
                      </span>
                      <br />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;