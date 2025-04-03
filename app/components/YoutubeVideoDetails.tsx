'use client'

import { VideoDetails } from '@/types/types';
import React, { useEffect, useState } from 'react'

const YoutubeVideoDetails = ({ videoId }: { videoId: string }) => {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);
      setVideo(video)
    }

    fetchVideoDetails();
  }, [videoId]);

  return (
    <div>

    </div>
  )
}

export default YoutubeVideoDetails
