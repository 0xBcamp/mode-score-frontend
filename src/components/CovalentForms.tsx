import React, { useState } from 'react';
import { getCreditScore } from '../services/covalentServices';

interface CreditScoreFormProps {
  setResult: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreditScoreForm: React.FC<CreditScoreFormProps> = ({ setResult, setError }) => {
  const [ethAddress, setEthAddress] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const data = {
      eth_address: ethAddress,
    };

    try {
      const response = await getCreditScore(data);
      setResult(response);
    } catch (error) {
      setError('Failed to fetch credit score.');
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
