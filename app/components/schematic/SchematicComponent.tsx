import React from 'react'
import SchematicEmbed from './SchematicEmbed'
import { getTemporaryAccessToken } from '@/actions/get-temporary-access-token'

const SchematicComponent = async ({ componentId }: { componentId: string }) => {
  if(!componentId) {
    return null;
  }

  const accessToken = await getTemporaryAccessToken();
  if(!accessToken) {
    throw new Error('Failed to fetch access token');
  }

  return (
    <SchematicEmbed 
      accessToken={accessToken}
      componentId={componentId}
    />
  )
}

export default SchematicComponent;
