// src/pages/dashboard.tsx

import React from 'react';
import { Dashboard } from './Dashboard'; // Adjust import if needed
import { ThemeProvider } from '@/context/ThemeContext';
// import CovalentForm from '@/components/CovalentForms';

const DashboardPage = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );

};

export default DashboardPage;