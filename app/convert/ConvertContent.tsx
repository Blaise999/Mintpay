// app/convert/ConvertContent.tsx
"use client";

import BackToDashboard from "@/components/BackToDashboard";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppGate } from "@/components/AppGate";

const partners = [
  {
    name: "Aboki.xyz",
    url: "https://www.aboki.xyz/",
    description: "Trusted P2P platform for crypto onramp and offramp."
  },
];

export default function ConvertContent() {
  return (
    <AppGate>
      <div className="container py-10 max-w-2xl mx-auto">
        <BackToDashboard />
        <h1 className="text-3xl font-bold mb-4">Convert Crypto</h1>
        <p className="text-muted-foreground mb-8">
          Instantly convert your crypto with our trusted partners. These platforms support P2P onramp and offramp services.
        </p>

        <div className="grid gap-6">
          {partners.map((partner) => (
            <Card key={partner.name}>
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription>{partner.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit {partner.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppGate>
  );
}