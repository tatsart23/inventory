const mongoose = require('mongoose');
const cors = require('cors'); 
const express = require('express');
const PORT = 5000;

const app = express();
app.use(express.json()); 
app.use(cors());

const newSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true }
});

const collection = mongoose.model("collection", newSchema);

mongoose.connect('mongodb://127.0.0.1:27017/inventory')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Failed to connect to database', err);
    });

const ItemSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    price: String,
    type: String,
    weight: String,
    id: String
});

const Item = mongoose.model('data', ItemSchema);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get('/getData', async (req, res) => {
    try {
        const data = await Item.find({});
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params;
    const { name, amount, price, type, weight } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, amount, price, type, weight },
            { new: true }
        );

        if (updatedItem) {
            res.status(200).json({ message: "Product updated successfully", updatedItem });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update product", error: err.message });
    }
});

app.get('/getData/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);
        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send({ message: "Item not found" });
        }
    } catch (err) {
        res.status(500).send({ message: "Error fetching item", error: err.message });
    }
});

app.post('/insertData', async (req, res) => {
    try {
        const items = req.body;
        const insertedItems = await Item.insertMany(items);
        res.status(201).json(insertedItems);
    } catch (err) {
        res.status(500).send({ message: "Failed to insert items", error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { user, password } = req.body;

    try {
        const userExists = await collection.findOne({ user });

        if (userExists && userExists.password === password) {
            res.status(200).json("exists");
        } else {
            res.status(400).json("not exists");
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

app.post("/signup", async (req, res) => {
    const { user, password } = req.body;

    try {
        const userExists = await collection.findOne({ user });

        if (userExists) {
            res.json("exists");
        } else {
            await collection.insertMany([{ user, password }]);
            res.json("not exists");
        }

    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

app.delete('/deleteData/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).send({ message: "Item not found" });
        }

        res.status(200).send({ message: "Item successfully deleted", item: deletedItem });
    } catch (err) {
        res.status(500).send({ message: "Failed to delete item", error: err.message });
    }
});

app.put('/updateAmount/:id', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount < 0) {
        return res.status(400).json({ message: "Invalid amount. Must be a non-negative number." });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id, 
            { amount: amount },
            { new: true }
        );

        if (updatedItem) {
            res.status(200).json({ message: "Amount updated successfully", updatedItem });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update item", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
