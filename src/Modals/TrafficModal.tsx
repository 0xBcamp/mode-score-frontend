import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"


interface TrafficModalProps {
  data: any;
}

export function TrafficModal({ data }: TrafficModalProps) {
  const explanation = data?.explanation?.traffic;

  if (!explanation) {
    return <p>No traffic data available</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Traffic</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Credit Transactions Count</CardTitle>
            <CardDescription>{explanation.count_credit_txns}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Credit Transactions Volume</CardTitle>
            <CardDescription>${explanation.volume_credit_txns.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debit Transactions Count</CardTitle>
            <CardDescription>{explanation.count_debit_txns}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debit Transactions Volume</CardTitle>
            <CardDescription>${explanation.volume_debit_txns.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Legit Transaction Ratio</CardTitle>
            <CardDescription>{explanation.legit_txn_ratio}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Running Balance (Best Token)</CardTitle>
            <CardDescription>${explanation.avg_running_balance_best_token.toFixed(2)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Frequency</CardTitle>
            <CardDescription>{explanation.txn_frequency}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default TrafficModal;
