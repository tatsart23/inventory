import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import "./styles/Admin.css";
import Inventory from "../components/Inventory/Inventory";
import { AuthContext } from "../Auth/AuthContext";

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("Beefs");
  const [productId, setProductId] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const { loggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
        name: productName,
        price: productPrice,
        type: productType,
        id: productId,
        amount: productAmount,
        weight: productWeight,
    };

    axios.post('http://localhost:5000/insertData', [product])
        .then(response => {
            console.log("Product inserted successfully:", response.data);
        })
        .catch(error => {
            console.error("Failed to insert product:", error.message);
        });
};

  if (!loggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <>
      <div className="admin-container">
        <div className="product-form">
          <h2>Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="product-info">
              <label>Product ID:</label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div className="product-info">
              <label>Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="product-info">
              <label>Product Weight:</label>
              <input
                type="text"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
              />
            </div>
            <div className="product-info">
              <label>Amount:</label>
              <input
                type="text"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
              />
            </div>
            <div className="product-info">
              <label>Price:</label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="product-info">
              <label>Product Type:</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="Beefs">Beefs</option>
                <option value="Kebab">Kebab</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              Create Product
            </button>
          </form>
        </div>
        <Inventory />
      </div>
    </>
  );
};

export default Admin;
