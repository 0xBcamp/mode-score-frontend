import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface TrafficModalProps {
  data: any;
}

export function TrafficModal({ data }: TrafficModalProps) {
  const explanation = data?.explanation?.traffic;

  if (!explanation) {
    return <p>No traffic data available</p>;
  }

  const formatNumber = (value: number | undefined, decimals = 2) => {
    if (value === undefined) return 'N/A';
    return typeof value === 'number' ? value.toFixed(decimals) : value;
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return `$${formatNumber(value)}`;
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Traffic</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Credit Transactions Count</CardTitle>
            <CardDescription>{formatNumber(explanation.count_credit_txns, 0)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Credit Transactions Volume</CardTitle>
            <CardDescription>{formatCurrency(explanation.volume_credit_txns)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debit Transactions Count</CardTitle>
            <CardDescription>{formatNumber(explanation.count_debit_txns, 0)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debit Transactions Volume</CardTitle>
            <CardDescription>{formatCurrency(explanation.volume_debit_txns)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Legit Transaction Ratio</CardTitle>
            <CardDescription>{formatNumber(explanation.legit_txn_ratio)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Running Balance (Best Token)</CardTitle>
            <CardDescription>{formatCurrency(explanation.avg_running_balance_best_token)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Frequency</CardTitle>
            <CardDescription>{formatNumber(explanation.txn_frequency)}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default TrafficModal;