// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';

const Home = () => {
    const navigate = useNavigate();
    const [prices, setPrices] = useState([]);
    const [timestamps, setTimestamps] = useState([]);
    
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
    };

    useEffect(() => {
        const socket = new WebSocket('wss://easy-completely-whale.ngrok-free.app/ws/bitcoin_price/');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrices((prevPrices) => [...prevPrices, data.price]);
            const formattedDate = format(new Date(data.timestamp), 'dd MMM yyyy HH:mm:ss');
            setTimestamps((prevTimestamps) => [...prevTimestamps, formattedDate]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: 'Цена Bitcoin',
                data: prices,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="home-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><Link to="/home">Главная</Link></li>
                        <li><Link to="/transactions">Транзакции</Link></li> 
                        <li><Link to="/transaction-history">История транзакций</Link></li> 
                        <li><Link to="/" onClick={handleLogout}>Выход</Link></li>
                    </ul>
                </nav>
            </header>
            <h1>Добро пожаловать в CryptoApp!</h1>
            <h2>График цен на Bitcoin</h2>
            <div className="chart-container">
                <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default Home;
