'use server'

import { FeatureFlag, featureFlagEvents } from "@/app/features/flags";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { checkFeatureUsageLimit } from "@/lib/check-feature-usage-limit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
  success: boolean;
  data?: Doc<'videos'>,
  error?: string
}

export const createOrGetVideo = async (videoId: string, userId: string): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user =  await currentUser();

  if(!user) {
    return {
      success: false,
      error: 'User not found'
    }
  }

  const featureCheck = await checkFeatureUsageLimit(user.id, featureFlagEvents[FeatureFlag.VIDEO_ANALYSIS].event)
  if(!featureCheck.success) {
    return {
      success: false,
      error: featureCheck.error
    }
  }

  try {
    const video = await convex.query(api.videos.getVideoById, {
      videoId,
      userId
    });

    if(!video) {
      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId
      });
      const newVideo = await convex.query(api.videos.getVideoById, {
        videoId: newVideoId,
        userId
      });

      await client.track({
        event: featureFlagEvents[FeatureFlag.VIDEO_ANALYSIS].event,
        company: { id: userId },
        user: { id: userId }
      });

      return {
        success: true,
        data: newVideo!
      }
    }
    else {
      console.log('Video already exists - No token spend needed');
      return {
        success: true,
        data: video
      }
    }
  }
  catch(error) {
    console.error('Error fetching video: ', error);
    return {
      success: false,
      error: 'Unexpected error. Please try again later'
    }
  }
}