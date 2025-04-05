'use client'

import ThumbnailGeneration from '@/app/components/ThumbnailGeneration'
import TitleGeneration from '@/app/components/TitleGeneration'
import Usage from '@/app/components/Usage'
import YoutubeVideoDetails from '@/app/components/YoutubeVideoDetails'
import { FeatureFlag } from '@/app/features/flags'
import { useParams } from 'next/navigation'
import React from 'react'

const AnalysisPage = () => {
  const params = useParams<{ videoId: string }>();
  const videoId = params.videoId;

  return (
    <div className='xl:container mx-auto px-4 md:px-0'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='order-2 lg:order-1 flex flex-col gap-2 bg-white lg:border-r border-gray-200 p-6'>
          <div className='flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6'>
            <Usage 
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title='Analyse Video'
            />
          </div>

          <YoutubeVideoDetails videoId={videoId} />
          <ThumbnailGeneration videoId={videoId} />
          <TitleGeneration videoId={videoId} />
        </div>

        <div className='order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]'>

        </div>
      </div>
    </div>
  )
}

export default AnalysisPage
