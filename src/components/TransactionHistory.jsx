import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from './Menu'; 

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access'); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://justtesttask.onrender.com/transactions/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(response.data);
            } catch (err) {
                setError('Ошибка при получении транзакций.');
            }
        };

        fetchTransactions();
    }, [token]);

    const coinNames = {
        1: 'BTC',
        2: 'ETH',
        3: 'LTC',
        4: 'XRP',
        5: 'ADA',
    };

    return (
        <div className="main-content">
            <h1>История транзакций</h1>
            <Menu handleLogout={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';
            }} />
            {error && <p className="error-message">{error}</p>}
            {transactions.length === 0 ? (
                <p>Нет транзакций.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Монета</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Сумма</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Цена</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Тип транзакции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {coinNames[transaction.coin] || 'Неизвестная монета'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {transaction.amount}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {transaction.price}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {transaction.transaction_type}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
