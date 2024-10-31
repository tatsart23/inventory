import React, { useState } from 'react';
import "./Edit.css";

const Edit = ({ product, toggle, deleteProduct, updateProduct }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        amount: product.amount,
        price: product.price,
        type: product.type,
        weight: product.weight,
        id: product.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product._id, formData); 
    };

    return (
        <div className="edit-container">
            <h1>Edit product</h1>
            <button className='close-button' onClick={toggle}>Close</button>
            <form onSubmit={handleSubmit}>
                <div className="edit-field">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-field">
                    <label>Amount:</label>
                    <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-field">
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-field">
                    <label>Product Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-field">
                    <label>Product Weight:</label>
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-field">
                    <label>Product ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        readOnly
                    />
                </div>
                <button className='submit-btn' type="submit">Submit</button>
            </form>
            <button className='delete-button' onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
    );
};

export default Edit;
