import axios from 'axios';

interface CovalentItem {
  eth_address: string;
}

const CHAIN_ID = '1';
const COVALENT_KEY = 'cqt_rQT34QB4J7VdBfg3Kv8RjVT9H3gP';
const COINMARKETCAP_KEY = '4facdf20-ac84-460e-8992-0f957d602234';

export const getCreditScore = async (data: CovalentItem) => {
  try {
    const response = await axios.post('https://jm-mode-score.onrender.com/credit_score/covalent', {
      chainid: CHAIN_ID,
      eth_address: data.eth_address,
      covalent_key: COVALENT_KEY,
      coinmarketcap_key: COINMARKETCAP_KEY,
    },{
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching credit score:', error);
    throw error;
  }
};
