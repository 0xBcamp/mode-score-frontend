import React, { useState } from 'react';
import { getCreditScore } from '../services/covalentServices';
import { Button } from '@/components/ui/button';

interface PeerCreditScoreFormProps {
  setResult: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeerCreditScoreForm: React.FC<PeerCreditScoreFormProps> = ({ setResult, setError, setLoading }) => {
  const [ethAddress, setEthAddress] = useState('');
  const [chainId, setChainId] = useState('1'); // Default to Ethereum Mainnet

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = {
      eth_address: ethAddress,
      chain_id: chainId,
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
        <div className='p-2'>
          <label>Address:   </label>
          <input
            className="bg-background border rounded-lg"
            type="text"
            value={ethAddress}
            onChange={(e) => setEthAddress(e.target.value)}
            required
          />
        </div>
        <div className='p-2'>
          <label>Chain ID:   </label>
          <select className="bg-background border rounded-lg" value={chainId} onChange={(e) => setChainId(e.target.value)}>
            <option value="34443">Mode Mainnet (34443)</option>
            <option value="1">Ethereum Mainnet (1)</option>
            <option value="919">Mode Testnet (919)</option>
            <option value="11155111">Sepolia Testnet (11155111)</option>
            {/* Add other chain IDs as needed */}
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm" type="submit">Get Mode Score</Button>
        </div>
      </form>
    </div>
  );
};

export default PeerCreditScoreForm;
