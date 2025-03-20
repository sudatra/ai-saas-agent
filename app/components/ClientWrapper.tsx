'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import React from "react";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schematicPublishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if(!schematicPublishableKey) {
    throw new Error('No Schematic publishable key found');
  }

  return (
    <>
      <ClerkProvider>
        <SchematicProvider publishableKey={schematicPublishableKey}>
          {children}
        </SchematicProvider>
      </ClerkProvider>
    </>
  );
}
