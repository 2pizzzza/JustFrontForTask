// src/components/Transactions.jsx
import React, { useEffect, useState } from 'react';
import Menu from './Menu'; 

const Transactions = () => {
    const [coins, setCoins] = useState([]);
    const [wallet, setWallet] = useState({ usdt_balance: 0, coins: [] });
    const [selectedCoin, setSelectedCoin] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [transactionType, setTransactionType] = useState('BUY');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://justtesttask.onrender.com/coins/')
            .then(response => response.json())
            .then(data => setCoins(data))
            .catch(error => console.error('Error fetching coins:', error));

        const token = localStorage.getItem('access');
        fetch('https://justtesttask.onrender.com/wallet/', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => setWallet(data))
            .catch(error => console.error('Error fetching wallet data:', error));
    }, []);

    const handleTransaction = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access');
        const coinId = coins.find(coin => coin.name === selectedCoin)?.id;

        if (!token || !coinId) {
            setMessage('Ошибка: невозможно выполнить транзакцию.');
            return;
        }

        const requestData = {
            coin: coinId,
            amount: parseFloat(amount),
            price: parseFloat(price),
            transaction_type: transactionType
        };

        fetch('https://justtesttask.onrender.com/transaction/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Транзакция успешно выполнена!');
                } else {
                    return response.json().then(data => {
                        setMessage(`Ошибка: ${data.detail || 'неизвестная ошибка'}`);
                    });
                }
            })
            .catch(error => setMessage(`Ошибка: ${error.message}`));
    };

    return (
        <div className="transactions-container">
            <Menu handleLogout={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';
            }} />
            <h1>Транзакции</h1>
            <div className='mamam'>
                <div className="wallet-info">
                    <h2>Баланс кошелька</h2>
                    <p>USDT Баланс: {wallet.usdt_balance}</p>
                    <ul>
                        {wallet.coins.map((coin) => (
                            <li key={coin.coin_name}>
                                {coin.coin_name}: {coin.balance}
                            </li>
                        ))}
                    </ul>
                </div>

                <form onSubmit={handleTransaction}>
                    <label>
                        Выберите монету:
                        <select value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)} required>
                            <option value="">Выберите монету</option>
                            {coins.map(coin => (
                                <option key={coin.id} value={coin.name}>
                                    {coin.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Количество:
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
                    </label>
                    <label>
                        Цена:
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    </label>
                    <label>
                        Тип транзакции:
                        <select value={transactionType} onChange={e => setTransactionType(e.target.value)}>
                            <option value="BUY">Купить</option>
                            <option value="SELL">Продать</option> {/* Исправлено на "SELL" */}
                        </select>
                    </label>
                    <button type="submit">Отправить</button>
                </form>
                {message && <p style={{ color: 'red' }}>{message}</p>} {/* Красный цвет для ошибок */}
            </div>
        </div>
    );
};

export default Transactions;
