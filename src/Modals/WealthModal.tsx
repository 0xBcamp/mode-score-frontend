import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

interface WealthModalProps {
  data: any;
}

export function WealthModal({ data }: WealthModalProps) {
  const explanation = data?.explanation?.wealth;

  if (!explanation) {
    return <p>No wealth data available</p>;
  }

  const formatAmount = (amount: number | undefined) => {
    return amount !== undefined ? `$${amount.toFixed(2)}` : 'N/A';
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Wealth</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>{formatAmount(explanation.cum_balance_now)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Adjusted Balance</CardTitle>
            <CardDescription>{formatAmount(explanation.cum_balance_now_adjusted)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Volume Per Transaction</CardTitle>
            <CardDescription>{formatAmount(explanation.avg_volume_per_txn)}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default WealthModal;