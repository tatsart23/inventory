import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./styles/Kebab.css";
import { AuthContext } from '../Auth/AuthContext';

const Kebab = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dailyAmount, setDailyAmount] = useState(0);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      axios({
        method: "GET",
        url: "http://localhost:5000/getData",
      })
        .then((res) => {
          const kebabItems = res.data.filter((item) => item.type === "Kebab");
          setItems(kebabItems);
          console.log(kebabItems);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  const addProduction = async () => {
    if (!selectedItem) {
      alert("Please select an item first.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/getData/${selectedItem._id}`
      );
      const currentAmount = response.data.amount;

      const updatedAmount = currentAmount + dailyAmount;

      const updateResponse = await axios.put(
        `http://localhost:5000/updateAmount/${selectedItem._id}`,
        {
          amount: updatedAmount,
        }
      );

      console.log("Amount updated successfully:", updateResponse.data);

      setSelectedItem((prevSelectedItem) => ({
        ...prevSelectedItem,
        amount: updatedAmount,
      }));

      setDailyAmount(0);
    } catch (err) {
      console.error(
        "Error updating amount:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleAdd = () => {
    setDailyAmount((prevAmount) => Math.max(prevAmount + 1, 0)); 
  };

  const handleSubtract = () => {
    setDailyAmount((prevAmount) => Math.max(prevAmount - 1, 0)); 
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;

    if (!selectedId) {
      setSelectedItem(null); 
    }

    const item = items.find((item) => item._id === selectedId);

    if (item) {
      console.log("Found item:", item); 
      setSelectedItem(item);
      setDailyAmount(0);
    } else {
      console.log("Item not found");
      setSelectedItem(null); 
    }
  };

  if (!loggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="kebab-container">
      <h1>Kebab Products</h1>
      <select onChange={handleSelectChange}>
        <option value="">Choose product</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name} {item.weight}
          </option>
        ))}
      </select>
      {selectedItem && (
        <div className="kebab-data">
          <h2>{selectedItem.name}</h2>
          <h3>Weight: {selectedItem.weight}</h3>
          <h3>Amount: {selectedItem.amount} /Lavaa</h3>
          <div className="kebab-btn-container">
            <button onClick={handleAdd} className="kebab-btn">+</button>
            <button onClick={handleSubtract} className="kebab-btn">-</button>
          </div>
          <h3>Todays production: {dailyAmount}</h3>
          <button onClick={addProduction} className="kebab-btn">Submit Production</button>
        </div>
      )}
    </div>
  );
};

export default Kebab;
