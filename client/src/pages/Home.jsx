import axios from "axios";
import React, {useState, useEffect} from "react";
import { useLocation} from 'react-router-dom';
import {PieChart, Pie, BarChart, Bar} from 'recharts';

function Home() {

    const location = useLocation();
    const [data, setData] = useState([]);
    const [beefData, setBeefData] = useState([]);
    const [kebabData, setKebabData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/getData/");

        const flattenedData = response.data.flat();
        
        setData(flattenedData);
        const beef = flattenedData.filter((item) => item.type === "Beef");
        const kebab = flattenedData.filter((item) => item.type === "Kebab");
        const kebabFlat = kebab.flat();

        console.log(beef, kebabFlat);
    };


    return (
        <div className="homepage">
            <h1>Welcome to the Home Page</h1>
            <h2>{location.state ? `Hello ${location.state.id}` : ""}</h2>
            
        </div>
    );
}

export default Home;
