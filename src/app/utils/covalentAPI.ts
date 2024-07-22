import axios from 'axios';

interface CovalentItem {
  chainid: string;
  eth_address: string;
  covalent_key: string;
  coinmarketcap_key: string;
}

const API_KEY = 'cqt_rQT34QB4J7VdBfg3Kv8RjVT9H3gP'; // Replace with your Covalent API key

const API_URL = 'https://jm-mode-score.onrender.com/covalent';  // Adjust this URL to match your backend

export const getUserAssets = async (address: string) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${API_KEY}`);
    return response.data;
  };
  
export const getUserTransactions = async (address: string) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${API_KEY}`);
    return response.data;
  };


export const getCreditScore = async (item: CovalentItem) => {
    try {
      const response = await axios.post(API_URL, item);
      return response.data;
    } catch (error) {
      console.error('Error fetching credit score:', error);
      throw error;
    }
  };