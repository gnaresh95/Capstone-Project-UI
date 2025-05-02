import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function ViewCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedBrand, setSelectedBrand] = useState(product?.brand || "Brand A");
  const [selectedSize, setSelectedSize] = useState(product?.size || "M");
  const [selectedColor, setSelectedColor] = useState(product?.color || "Red");

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!product) {
    return <div className="centered-message">No product selected. Go back and try again.</div>;
  }

  const basePrice = parseFloat(product.price || 300);
  const discountAmount = (basePrice * discountPercent) / 100;
  const finalPrice = basePrice - discountAmount;

  const handleApplyCoupon = () => {
    const trimmed = coupon.trim().toUpperCase();
    if (trimmed === "SAVE10") {
      setDiscountPercent(10);
    } else if (trimmed === "SAVE20") {
      setDiscountPercent(20);
    } else {
      setDiscountPercent(0);
      alert("Invalid coupon code. Try SAVE10 or SAVE20.");
    }
  };

  const handlePayment = () => {
    alert(`Payment successful!\nPaid: $${finalPrice.toFixed(2)}\nThank you for your purchase.`);
    navigate("/");
  };

  return (
    <div className="viewcart-container">
      <h1>View Cart</h1>
      <div className="product-summary">
        <div style={{ position: "relative", width: "300px", height: "300px" }}>
          <img
            alt={product.name}
            src={`/images/${product.name.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_")}.jpg`}
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              objectFit: "contain",
              color: "transparent",
              borderRadius: "8px"
            }}
          />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Description:</strong> {product.description}</p>

          <p>
            <strong>Brand:</strong>{" "}
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              <option value="Brand C">Brand C</option>
            </select>
          </p>

          <p>
            <strong>Size:</strong>{" "}
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
            </select>
          </p>

          <p>
            <strong>Color:</strong>{" "}
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
            </select>
          </p>

          <p><strong>Original Price:</strong> ${basePrice.toFixed(2)}</p>

          <div className="coupon-section">
            <label><strong>Discount Coupon:</strong></label>
            <input
              type="text"
              placeholder="Enter coupon code (e.g., SAVE10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
            <button onClick={handleApplyCoupon} style={{ marginLeft: "10px" }}>
              Apply Coupon
            </button>
            {discountPercent > 0 && (
              <p style={{ color: "green" }}>
                {discountPercent}% discount applied! You save ${discountAmount.toFixed(2)}
              </p>
            )}
          </div>

          <p><strong>Total Price:</strong> ${finalPrice.toFixed(2)}</p>

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <button onClick={handlePayment} style={{ marginLeft: "10px", backgroundColor: "#28a745", color: "white" }}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCart;