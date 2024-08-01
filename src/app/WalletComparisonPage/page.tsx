// src/pages/score.tsx

import React from 'react';
import WalletComp from './WalletComp'; // Adjust import if needed
import { ThemeProvider } from '@/context/ThemeContext';

const CompareWalletPage = () => {
  return (
    <ThemeProvider>
        <WalletComp data={{
            score: 0,
            feedback: {
                score: {
                    quality: ''
                }
            },
            explanation: {
                credibility: {
                    verified: false,
                    longevity_days: 0
                },
                stamina: {
                    methods_volume: 0,
                    coins_count: 0,
                    count_smart_trades: 0
                },
                traffic: {
                    count_credit_txns: 0,
                    volume_credit_txns: 0,
                    count_debit_txns: 0,
                    volume_debit_txns: 0,
                    legit_txn_ratio: 0,
                    avg_running_balance_best_token: 0,
                    txn_frequency: 0
                },
                wealth: {
                    cum_balance_now: 0,
                    cum_balance_now_adjusted: 0,
                    avg_volume_per_txn: 0
                }
            }
        }} />
    </ThemeProvider>
);
};

export default CompareWalletPage;