// app/convert/page.tsx
"use client";

import dynamic from "next/dynamic";

const ConvertContent = dynamic(
  () => import("./ConvertContent"),
  { ssr: false }
);

export default function ConvertPage() {
  return <ConvertContent />;
}