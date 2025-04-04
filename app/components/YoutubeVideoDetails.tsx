'use client'

import { getVideoDetails } from '@/actions/get-video-details';
import { VideoDetails } from '@/types/types';
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

  console.log(video)

  return (
    <div>

    </div>
  )
}

export default YoutubeVideoDetails
