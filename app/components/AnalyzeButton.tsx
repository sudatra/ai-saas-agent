'use client'

import { Button } from '@/components/ui/button';
import React from 'react'
import { useFormStatus } from 'react-dom'

const AnalyzeButton = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button
        type='submit'
        disabled={pending}
        className='px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-70 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium'
      >
        {pending ? 'Analyzing' : 'Analyze'}
      </Button>
    </div>
  )
}

export default AnalyzeButton
