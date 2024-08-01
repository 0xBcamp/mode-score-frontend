// src/pages/dashboard.tsx

import React from 'react';
import { Landing } from './Landing'; // Adjust import if needed
import { ThemeProvider } from '@/context/ThemeContext';

const LandingPage = () => {
  return (
  <ThemeProvider>
    <Landing />
  </ThemeProvider>


);
};

export default LandingPage;