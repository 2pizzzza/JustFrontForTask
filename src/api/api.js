import axios from 'axios';

const API_URL = 'https://easy-completely-whale.ngrok-free.app/api';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { username, password });
        return response.data; 
    } catch (error) {
        throw error.response.data; 
    }
};

export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register/`, { username, email, password });
        return response.data; 
    } catch (error) {
        throw error.response.data; 
    }
};
