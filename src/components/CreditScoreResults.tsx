import React from 'react';
import { Circles } from 'react-loader-spinner';

interface CreditScoreResultProps {
  result: {
    score: number;
  } | null;
  error: string | null;
  loading: boolean;
}

const CreditScoreResult: React.FC<CreditScoreResultProps> = ({ result, error, loading }) => {
  return (
    <div>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-full">
          <Circles color="yellow" height={80} width={80} />
          <p className="mt-4">Patience please, calculations are in progress</p>
        </div>
      ) : result ? (
        <div>
          <p className="text-4xl text-yellow-400 font-bold pb-5 pt-5 flex-grow flex items-center justify-center">
            {result.score}
          </p>
          <p>Congratulations on taking your first step into financial efficiency. Click here for more details. 😎</p>
        </div>
      ) : error ? (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      ) : (
        <p className="text-4xl font-bold pb-5 pt-5 flex-grow flex items-center justify-center">Find Out Your Score Here!</p>
      )}
    </div>
  );
};

export default CreditScoreResult;