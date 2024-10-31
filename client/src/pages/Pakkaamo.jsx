import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import axios from "axios";
import "./styles/Pakkaamo.css";
import { AuthContext } from "../Auth/AuthContext";

const Pakkaamo = () => {
  const [items, setItems] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [dailyAmount1, setDailyAmount1] = useState(0);
  const [dailyAmount2, setDailyAmount2] = useState(0);

  useEffect(() => {
    if (loggedIn) {
      axios.get("http://localhost:5000/getData")
        .then((res) => {
          const beefItems = res.data.filter((item) => item.type === "Beefs");
          setItems(beefItems);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [loggedIn]);

  const addProduction = useCallback(async (selectedItem, dailyAmount, setDailyAmount, setSelectedItem) => {
    if (!selectedItem) {
      alert("Please select an item first.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/getData/${selectedItem._id}`);
      const currentAmount = response.data.amount;
      const updatedAmount = currentAmount + dailyAmount;

      await axios.put(`http://localhost:5000/updateAmount/${selectedItem._id}`, {
        amount: updatedAmount,
      });

      setSelectedItem((prevSelectedItem) => ({
        ...prevSelectedItem,
        amount: updatedAmount,
      }));

      setDailyAmount(0);
    } catch (err) {
      console.error("Error updating amount:", err.response ? err.response.data : err.message);
    }
  }, []);

  const handleAdd1 = useCallback(() => setDailyAmount1((prev) => Math.max(prev + 1, 0)), []);
  const handleSubtract1 = useCallback(() => setDailyAmount1((prev) => Math.max(prev - 1, 0)), []);

  const handleAdd2 = useCallback(() => setDailyAmount2((prev) => Math.max(prev + 1, 0)), []);
  const handleSubtract2 = useCallback(() => setDailyAmount2((prev) => Math.max(prev - 1, 0)), []);

  const handleSelectChange1 = useCallback((event) => {
    const selectedId = event.target.value;
    const selectedItem = items.find((item) => item._id === selectedId);
    setSelectedItem1(selectedItem || null);
  }, [items]);

  const handleSelectChange2 = useCallback((event) => {
    const selectedId = event.target.value;
    const selectedItem = items.find((item) => item._id === selectedId);
    setSelectedItem2(selectedItem || null);
  }, [items]);

  const selectedItemData1 = useMemo(() => selectedItem1 && (
    <div className="beef-data">
      <h3>{selectedItem1.name}</h3>
      <h3>Weight: {selectedItem1.weight}</h3>
      <h3>Amount: {selectedItem1.amount}</h3>
      <h3>Todays production: {dailyAmount1}</h3>
    </div>
  ), [selectedItem1, dailyAmount1]);

  const selectedItemData2 = useMemo(() => selectedItem2 && (
    <div className="beef-data">
      <h3>{selectedItem2.name}</h3>
      <h3>Weight: {selectedItem2.weight}</h3>
      <h3>Amount: {selectedItem2.amount}</h3>
      <h3>Todays production: {dailyAmount2}</h3>
    </div>
  ), [selectedItem2, dailyAmount2]);

  if (!loggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="beef-container">
      <h1>Beef Products</h1>
      <div className="choice-container">
        <div className="choice-item">
          <h2>Linja 1</h2>
          <select onChange={handleSelectChange1}>
            <option value="">Choose product</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} {item.weight}
              </option>
            ))}
          </select>
          {selectedItemData1}
          {selectedItem1 && (
            <>
              <div className="beef-btn-container">
                <button onClick={handleAdd1} className="beef-btn">+</button>
                <button onClick={handleSubtract1} className="beef-btn">-</button>
              </div>
              <button
                className="beef-btn"
                onClick={() => addProduction(selectedItem1, dailyAmount1, setDailyAmount1, setSelectedItem1)}
              >
                Submit Production
              </button>
            </>
          )}
        </div>

        <div className="choice-item">
          <h2>Linja 2</h2>
          <select onChange={handleSelectChange2}>
            <option value="">Choose product</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} {item.weight}
              </option>
            ))}
          </select>
          {selectedItemData2}
          {selectedItem2 && (
            <>
              <div className="beef-btn-container">
                <button onClick={handleAdd2} className="beef-btn">+</button>
                <button onClick={handleSubtract2} className="beef-btn">-</button>
              </div>
              <button
                className="beef-btn"
                onClick={() => addProduction(selectedItem2, dailyAmount2, setDailyAmount2, setSelectedItem2)}
              >
                Submit Production
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pakkaamo;
