import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Transactions from './components/Transactions'; 
import TransactionHistory from './components/TransactionHistory'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} /> 
                <Route path="/transaction-history" element={<TransactionHistory />} />
            </Routes>
        </Router>
    );
};

export default App;
