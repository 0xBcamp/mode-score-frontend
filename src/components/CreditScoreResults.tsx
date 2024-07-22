import React from 'react';

interface CreditScoreResultProps {
  result: any;
  error: string | null;
}

const CreditScoreResult: React.FC<CreditScoreResultProps> = ({ result, error }) => {
  return (
    <div>
      {result && (
        <div>
          <h3>Credit Score Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreditScoreResult;
