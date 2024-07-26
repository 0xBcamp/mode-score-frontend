import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"


interface WealthModalProps {
  data: any;
}

export function WealthModal({ data }: WealthModalProps) {
  const explanation = data?.explanation?.wealth;

  if (!explanation) {
    return <p>No wealth data available</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Wealth</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>${explanation.cum_balance_now.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Adjusted Balance</CardTitle>
            <CardDescription>${explanation.cum_balance_now_adjusted.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Volume Per Transaction</CardTitle>
            <CardDescription>${explanation.avg_volume_per_txn.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default WealthModal;
