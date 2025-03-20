'use client '

import { useUser } from '@clerk/nextjs';
import { useSchematicEvents } from '@schematichq/schematic-react'
import React, { useEffect } from 'react'

const SchematicWrapper = ({ children }: { children: React.ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const username = user?.username ?? user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? user?.id;
    if(user?.id) {
      identify({
        company: {
          keys: { id: user.id },
          name: username
        },
        keys: { id: user.id },
        name: username
      })
    } 
  }, [user, identify])

  return (
    <>
      {children}
    </>
  )
}

export default SchematicWrapper
