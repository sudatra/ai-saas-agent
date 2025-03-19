import React from 'react'
import Form from 'next/form';
import AnalyzeButton from './AnalyzeButton';
import { analyzeYouTubeVideoURL } from '@/actions/analyze-youtube-video.action';

const VideoForm = () => {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <Form
        action={analyzeYouTubeVideoURL}
        className='flex flex-col sm:flex-row gap-2 items-center'
      >
        <input 
          type='text' 
          name='url'
          placeholder='Enter Your YouTube Video URL'
          className='flex-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:border-transparent transition-all duration-200'
        />

        <AnalyzeButton />
      </Form>
    </div>
  )
}

export default VideoForm
