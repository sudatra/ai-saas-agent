'use server'

import { FeatureFlag, featureFlagEvents } from "@/app/features/flags";
import { Doc } from "@/convex/_generated/dataModel";
import { checkFeatureUsageLimit } from "@/lib/check-feature-usage-limit";
import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
  success: boolean;
  data?: Doc<'videos'>,
  error?: string
}

export const createOrGetVideo = async (userId: string, videoId: string): Promise<VideoResponse> => {
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

  }
  catch(error) {
    console.error('Error fetching video: ', error);
    return {
      success: false,
      error: 'Unexpected error. Please try again later'
    }
  }
}