// pages/score.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';;
import { getCreditScore } from '../../services/covalentServices';

interface Feedback {
  score_exist: boolean;
  points: number;
  quality: string;
  longevity_days: number;
  cum_balance_now: number;
}

interface Advice {
  credibility_error: boolean;
  wealth_error: boolean;
  traffic_error: boolean;
  stamina_error: boolean;
}

interface Explanation {
  credibility: {
    verified: boolean;
    longevity_days: number;
  };
  wealth: {
    cum_balance_now: number;
    cum_balance_now_adjusted: number;
    avg_volume_per_txn: number;
  };
  traffic: {
    count_credit_txns: number;
    volume_credit_txns: number;
    count_debit_txns: number;
    volume_debit_txns: number;
    legit_txn_ratio: number;
    avg_running_balance_best_token: number;
    txn_frequency: string;
  };
  stamina: {
    methods_volume: number;
    coins_count: number;
    count_smart_trades: number;
  };
  fetch: {
    JSONDecodeError: boolean;
  };
}

interface CreditScoreData {
  endpoint: string;
  status: string;
  score: number;
  message: string;
  feedback: Feedback;
  advice: Advice;
  explanation: Explanation;
}

const Score: React.FC = () => {
  const router = useRouter();
  const { eth_address } = router.query;

  const [data, setData] = useState<CreditScoreData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreditScore = async () => {
      if (typeof eth_address === 'string') {
        try {
          const response = await getCreditScore({ eth_address });
          setData(response);
        } catch (error) {
          setError('Error fetching credit score');
          console.error('Error fetching credit score:', error);
        }
      }
    };

    fetchCreditScore();
  }, [eth_address]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Credit Score: {data.score}</h1>
      <p>{data.message}</p>
      <h2>Feedback</h2>
      <ul>
        <li>Score Exists: {data.feedback.score_exist.toString()}</li>
        <li>Points: {data.feedback.points}</li>
        <li>Quality: {data.feedback.quality}</li>
        <li>Longevity (days): {data.feedback.longevity_days}</li>
        <li>Total Balance: ${data.feedback.cum_balance_now}</li>
      </ul>
      <h2>Advice</h2>
      <ul>
        <li>Credibility Error: {data.advice.credibility_error.toString()}</li>
        <li>Wealth Error: {data.advice.wealth_error.toString()}</li>
        <li>Traffic Error: {data.advice.traffic_error.toString()}</li>
        <li>Stamina Error: {data.advice.stamina_error.toString()}</li>
      </ul>
      <h2>Explanation</h2>
      <h3>Credibility</h3>
      <ul>
        <li>Verified: {data.explanation.credibility.verified.toString()}</li>
        <li>Longevity (days): {data.explanation.credibility.longevity_days}</li>
      </ul>
      <h3>Wealth</h3>
      <ul>
        <li>Current Balance: ${data.explanation.wealth.cum_balance_now}</li>
        <li>Adjusted Balance: ${data.explanation.wealth.cum_balance_now_adjusted}</li>
        <li>Average Volume per Transaction: ${data.explanation.wealth.avg_volume_per_txn}</li>
      </ul>
      <h3>Traffic</h3>
      <ul>
        <li>Count of Credit Transactions: {data.explanation.traffic.count_credit_txns}</li>
        <li>Volume of Credit Transactions: ${data.explanation.traffic.volume_credit_txns}</li>
        <li>Count of Debit Transactions: {data.explanation.traffic.count_debit_txns}</li>
        <li>Volume of Debit Transactions: ${data.explanation.traffic.volume_debit_txns}</li>
        <li>Legit Transaction Ratio: {data.explanation.traffic.legit_txn_ratio}</li>
        <li>Average Running Balance (Best Token): ${data.explanation.traffic.avg_running_balance_best_token}</li>
        <li>Transaction Frequency: {data.explanation.traffic.txn_frequency}</li>
      </ul>
      <h3>Stamina</h3>
      <ul>
        <li>Methods Volume: {data.explanation.stamina.methods_volume}</li>
        <li>Coins Count: {data.explanation.stamina.coins_count}</li>
        <li>Count of Smart Trades: {data.explanation.stamina.count_smart_trades}</li>
      </ul>
      <h3>Fetch</h3>
      <ul>
        <li>JSON Decode Error: {data.explanation.fetch.JSONDecodeError.toString()}</li>
      </ul>
    </div>
  );
};

export default Score;
