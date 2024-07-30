import React, { useState, useEffect } from 'react';
import { getCreditScore } from '../services/covalentServices';
import { useAccount, useChainId } from 'wagmi'; // Import useChainID from wagmi

interface CreditScoreFormProps {
  setResult: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditScoreForm: React.FC<CreditScoreFormProps> = ({ setResult, setError, setLoading }) => {
  const { address, isConnected } = useAccount(); // Get the wallet address from wagmi
  const initialChainId = useChainId(); // Use the custom hook to get the initial chain ID
  const [ethAddress, setEthAddress] = useState('');
  const [chainId, setChainId] = useState(initialChainId.toString()); // Default to the initial chain ID as a string

  useEffect(() => {
    if (isConnected && address) {
      setEthAddress(address); // Set the wallet address if connected
    }
  }, [isConnected, address]);

  useEffect(() => {
    setChainId(initialChainId.toString()); // Update the chain ID when it changes
  }, [initialChainId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = {
      eth_address: ethAddress,
      chain_id: chainId, // Include chain_id as a string
    };

    try {
      const response = await getCreditScore(data);
      setResult(response);
    } catch (error) {
      setError('Failed to fetch credit score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={ethAddress}
            onChange={(e) => setEthAddress(e.target.value)}
            required
            disabled={isConnected} // Disable the input if connected to a wallet
          />
        </div>
        <div>
          <label>Chain ID:</label>
          <select value={chainId} onChange={(e) => setChainId(e.target.value)}>
            <option value="34443">Mode Mainnet (34443)</option>
            <option value="1">Ethereum Mainnet (1)</option>
            <option value="919">Mode Testnet (919)</option>
            <option value="11155111">Sepolia Testnet (11155111)</option>
            {/* Add other chain IDs as needed */}
          </select>
        </div>
        <button type="submit">Get Mode Score</button>
      </form>
    </div>
  );
};

export default CreditScoreForm;
