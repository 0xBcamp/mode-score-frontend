import axios from 'axios';

interface CovalentItem {
  chainid: string;
  eth_address: string;
  covalent_key: string;
  coinmarketcap_key: string;
}

const API_KEY = 'process.env.NEXT_PUBLIC_COVALENT_KEY'; // Replace with your Covalent API key

const API_URL = 'https://jm-mode-score.onrender.com/covalent';  // Adjust this URL to match your backend

export const getUserAssets = async (address: string) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${API_KEY}`);
    return response.data;
  };
  
export const getUserTransactions = async (address: string) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${API_KEY}`);
    return response.data;
  };

  export const getTransactions = async ({ eth_address, chain_id }: { eth_address: string, chain_id: string }) => {
    const url = `https://api.covalenthq.com/v1/${chain_id}/address/${eth_address}/transactions_v2/?key=${API_KEY}`;
    const response = await axios.get(url);
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