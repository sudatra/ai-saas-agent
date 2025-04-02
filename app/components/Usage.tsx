'use client'

import React from 'react'
import { FeatureFlag } from '../features/flags'
import { useSchematicEntitlement, useSchematicIsPending } from '@schematichq/schematic-react'

const Usage = ({ featureFlag, title }: { featureFlag: FeatureFlag, title: string }) => {
  const isPending = useSchematicIsPending();
  const { featureAllocation, featureUsage, value: isFeatureEnabled } = useSchematicEntitlement(featureFlag);
  const hasUsedAllTokens = featureUsage && featureAllocation && featureUsage >= featureAllocation;

  if(isPending) {
    return (
      <div className='text-gray-500 text-center py-4'>
        Loading...
      </div>
    )
  }

  if(hasUsedAllTokens) {
    return (
      <div className='text-gray-500 text-center py-4'>
        
      </div>
    )
  }

  return (
    <div>
      
    </div>
  )
}

export default Usage
