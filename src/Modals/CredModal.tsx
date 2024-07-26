import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { EclipseIcon } from "lucide-react"

interface CredModalProps {
  data: any;
}

export function CredModal({ data }: CredModalProps) {
  const explanation = data?.explanation?.credibility;

  if (!explanation) {
    return <p>No credibility data available</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Credibility</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Credibility Verified</CardTitle>
            <CardDescription>{explanation.verified ? 'Yes' : 'No'}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Longevity Days</CardTitle>
            <CardDescription>{explanation.longevity_days}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default CredModal;
