import axios from 'axios';

interface CovalentItem {
  eth_address: string;
  chain_id: string;
}

const COVALENT_KEY = process.env.NEXT_PUBLIC_COVALENT_KEY;

const acceptedChainIds = ['1', '34443', '919', '11155111']; // Ethereum Mainnet Mode Mainnet, Mode Testnet, Sepolia Testnet

export const getTransactions = async (data: CovalentItem) => {
  if (!acceptedChainIds.includes(data.chain_id)) {
    throw new Error('Unsupported chain ID');
  }

  try {
    const response = await axios.get(`https://api.covalenthq.com/v1/${data.chain_id}/address/${data.eth_address}/transactions_v2/?key=${COVALENT_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getAssets = async (data: CovalentItem) => {
  const response = await axios.get(`https://api.covalenthq.com/v1/${data.chain_id}/address/${data.eth_address}/balances_v2/?key=${COVALENT_KEY}`);
  return response.data;
};

export const getCreditScore = async (data: CovalentItem) => {
  if (!acceptedChainIds.includes(data.chain_id)) {
    throw new Error('Unsupported chain ID');
  }


  try {
    const response = await axios.post('https://jm-mode-score.onrender.com/credit_score/covalent', {
      chainid: data.chain_id,
      eth_address: data.eth_address,
      covalent_key: COVALENT_KEY,
      coinmarketcap_key: process.env.NEXT_PUBLIC_COINMARKETCAP_KEY,
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
