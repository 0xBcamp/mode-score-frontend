import React, { useState } from 'react';
import { getCreditScore } from '../services/covalentServices';

interface CreditScoreFormProps {
  setResult: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Add loading state setter
}

const CreditScoreForm: React.FC<CreditScoreFormProps> = ({ setResult, setError, setLoading }) => {
  const [ethAddress, setEthAddress] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true when starting the request

    const data = {
      eth_address: ethAddress,
    };

    try {
      const response = await getCreditScore(data);
      setResult(response);
    } catch (error) {
      setError('Failed to fetch credit score.');
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ETH Address:</label>
          <input
            type="text"
            value={ethAddress}
            onChange={(e) => setEthAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Idle Score</button>
      </form>
    </div>
  );
};

export default CreditScoreForm;
