'use client'

import { getVideoDetails } from '@/actions/get-video-details';
import { VideoDetails } from '@/types/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const YoutubeVideoDetails = ({ videoId }: { videoId: string }) => {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);
      setVideo(video);
    }

    fetchVideoDetails();
  }, [videoId]);

  if(!video) {
    return <div>Video not found</div>
  }

  return (
    <div className='@container bg-white rounded-xl'>
      <div className='flex flex-col gap-8'>
        <div className='flex-shrink-0'>
          <Image 
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className='w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300'
          />
        </div>

        <div className='flex-grow space-y-4'>
          <h1 className='text-2xl @lg:text-3xl font-bold text-gray-900 leading-tight line-clamp-2'>{video.title}</h1>
        </div>

        <div className='flex items-center gap-4'>
          <Image 
            src={video.channel.thumbnail}
            alt={video.channel.title}
            width={48}
            height={48}
            className='w-10 h-10 @md:h-12 rounded-full border-2 border-gray-100'
          />

          <div>
            <p className='text-base @md:text-lg font-semibold text-gray-900'>{video.channel.title}</p>
            <p className='text-sm @md:text-base text-gray-600'>{video.channel.subscribers} subscribers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeVideoDetails
