// src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ handleLogout }) => {
    return (
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
    );
};

export default Menu;
