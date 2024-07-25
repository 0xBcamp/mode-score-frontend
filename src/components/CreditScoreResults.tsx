import React from 'react';

interface CreditScoreResultProps {
  result: {
    score: number;
    message: string;
  } | null;
  error: string | null;
}

const CreditScoreResult: React.FC<CreditScoreResultProps> = ({ result, error }) => {
  return (
    <div>
      {result && (
        <div>
          <p className='text-4xl font-bold pb-5 pt-5 flex-grow flex items-center justify-center'>{result.score}</p>
          {/* <p className='text-sm font-small flex-grow flex items-center justify-center'>{result.message}</p> */}
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
