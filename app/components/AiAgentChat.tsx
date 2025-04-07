'use client'

import { useChat } from '@ai-sdk/react'
import React from 'react'

const AiAgentChat = ({ videoId }: { videoId: string }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    body: { videoId }
  });

  return (
    <div>
      
    </div>
  )
}

export default AiAgentChat
