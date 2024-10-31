import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import Edit from "./Edit/Edit";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleEdit = (product) => {
    setSelectedProduct(product);
    setShowEdit(!showEdit);
  };

  const updateProduct = async (id, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:5000/updateProduct/${id}`, updatedData);
        if (response.status === 200) {
            alert("Product updated successfully");
            
        } else {
            alert("Failed to update product");
        }
    } catch (error) {
        console.error("There was an error updating the product!", error);
        alert("There was an error updating the product");
    }
};

  useEffect(() => {
    const getInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getData");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    getInventory();
  }, []);

  const deleteProduct = async (_id) => {
    if (typeof _id !== 'string' && typeof _id !== 'number') {
      console.error("Invalid ID: ID should be a string or number.");
      return;
    }
  
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/deleteData/${_id}`);
        setInventory(inventory.filter((product) => product._id !== _id));  // Use `_id` here
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventory</h1>
        <input
          className="searchbar"
          type="text"
          placeholder="Enter Name or Weight"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Price</th>
                <th>Product Amount</th>
                <th>Product Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory
                .filter((product) => {
                  if (search === "") {
                    return true;
                  } else if (
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.weight.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((product) => (
                  <tr key={product._id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>{product.weight}</td>
                    <td>
                      <button className="edit-btn" onClick={() => toggleEdit(product)}>EDIT</button>
                      <button className="delete-btn" onClick={() => deleteProduct(product._id)}>DELETE</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEdit && selectedProduct && (
        <div className="modal-overlay">
          <Edit product={selectedProduct}
                toggle={toggleEdit}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct} />
        </div>
      )}
    </div>
  );
};

export default Inventory;
