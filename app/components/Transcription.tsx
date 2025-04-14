'use client'

import { useSchematicEntitlement } from '@schematichq/schematic-react'
import React, { useCallback, useEffect, useState } from 'react'
import { FeatureFlag } from '../features/flags'
import Usage from './Usage';
import { getYoutubeTranscript } from '@/actions/get-youtube-transcript';

interface TranscriptEntry {
  text: string;
  timeStamp: string;
}

const Transcription = ({ videoId }: { videoId: string }) => {
  const [transcript, setTranscript] = useState<{ transcript: TranscriptEntry[], cache: string } | null>(null);
  const { featureUsageExceeded } = useSchematicEntitlement(FeatureFlag.TRANSCRIPTION);

  const handleGenerateTranscription = useCallback(async (videoId: string) => {
    if(featureUsageExceeded) {
      console.log('Feature Usage limit reached!!');
      return;
    }

    const result = await getYoutubeTranscript(videoId);
    setTranscript(result);
  }, [featureUsageExceeded]);

  useEffect(() => {
    handleGenerateTranscription(videoId);
  }, [handleGenerateTranscription, videoId])

  return (
    <div className='border p-4 pb-0 rounded-xl gap-4 flex flex-col'>
      <Usage 
        featureFlag={FeatureFlag.TRANSCRIPTION}
        title='Transcription'
      />

      {
        !featureUsageExceeded ? (
          <div className='flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4'>
            {
              transcript ? (
                transcript.transcript.map((entry, index) => (
                  <div
                    key={index}
                    className='flex gap-2'
                  >
                    <span className='text-sm text-gray-400 min-w-[50px]'>{entry.timeStamp}</span>
                    <p className='text-sm text-gray-700'>{entry.text}</p>
                  </div>
                ))
              ) : (
                <p className='text-sm text-gray-500'>No Transcription available</p>
              )
            }
          </div>
        ) : null
      }
    </div>
  )
}

export default Transcription
