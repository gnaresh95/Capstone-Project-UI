import React, { useState } from "react";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    sku: "",
    description: "",
    price: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ Success message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create product: ${errorText}`);
      }

      setProduct({
        name: "",
        slug: "",
        sku: "",
        description: "",
        price: ""
      });
      setSuccess(true); // ✅ Show success message
    } catch (err) {
      console.error("Error creating product:", err);
      setError("❌ " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create Product</h2>
      {success && <p style={{ color: "green" }}>Product created successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Slug:</label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;