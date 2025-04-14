'use server'

import { FeatureFlag, featureFlagEvents } from "@/app/features/flags";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';

const IMAGE_SIZE = '1792x1024' as const;
const convexClient = getConvexClient();

export const dallEImageGeneration = async (prompt: string, videoId: string) => {
  try {
    const user = await currentUser();
    if(!user?.id) {
      throw new Error('User not found');
    }
  
    if(!prompt) {
      throw new Error('Failed to generate prompt');
    }
  
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: IMAGE_SIZE,
      quality: 'standard',
      style: 'vivid'
    });
    const imageUrl = imageResponse.data[0]?.url;
    if(!imageUrl) {
      console.log("No image url")
      throw new Error('Failed to generate image');
    }
  
    console.log(imageResponse, imageUrl)
  
    const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
    console.log(postUrl)
    const image: Blob = await fetch(imageUrl).then((res) => res.blob());
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': image!.type },
      body: image
    });
    const { storageId } = await result.json();
  
    await convexClient.mutation(api.images.storeImage, {
      storageId: storageId,
      videoId,
      userId: user.id
    });
    
    const dbImageUrl = await convexClient.query(api.images.getImage, {
      videoId,
      userId: user.id
    });
  
    await client.track({
      event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
      company: { id: user.id },
      user: { id: user.id }
    });
  
    return { imageUrl: dbImageUrl };
  }
  catch(error) {
    console.error('Error in dall-e image generation: ', error);
  }
}