'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import React from "react";
import SchematicWrapper from "./SchematicWrapper";

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
          <SchematicWrapper>
            {children}
          </SchematicWrapper>
        </SchematicProvider>
      </ClerkProvider>
    </>
  );
}
