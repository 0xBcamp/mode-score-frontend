import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

interface StaminaModalProps {
  data: any;
}

export function StaminaModal({ data }: StaminaModalProps) {
  const explanation = data?.explanation?.stamina;

  if (!explanation) {
    return <p>No stamina data available</p>;
  }

  return (
    <div className="grid gap-4 ">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Stamina</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Methods Volume</CardTitle>
            <CardDescription>{explanation.methods_volume}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Coins Count</CardTitle>
            <CardDescription>{explanation.coins_count}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Smart Trades Count</CardTitle>
            <CardDescription>{explanation.count_smart_trades}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default StaminaModal;
