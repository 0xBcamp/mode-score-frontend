// src/pages/score.tsx

import React from 'react';
import WalletComp from './WalletComp'; // Adjust import if needed
import { ThemeProvider } from '@/context/ThemeContext';

const CompareWalletPage = () => {
  return (
    <ThemeProvider>
      <WalletComp />
    </ThemeProvider>
  );
};

export default CompareWalletPage;
