import axios from 'axios';

interface CovalentItem {
  eth_address: string;
}

const CHAIN_ID = 'your_chain_id';
const COVALENT_KEY = 'your_covalent_key';
const COINMARKETCAP_KEY = 'your_coinmarketcap_key';

export const getCreditScore = async (data: CovalentItem) => {
  try {
    const response = await axios.post('https://jm-mode-score.onrender.com/credit_score/covalent', {
      chainid: CHAIN_ID,
      eth_address: data.eth_address,
      covalent_key: COVALENT_KEY,
      coinmarketcap_key: COINMARKETCAP_KEY,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching credit score:', error);
    throw error;
  }
};
