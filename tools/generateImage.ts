import { dallEImageGeneration } from "@/actions/dall-e-image-generation";
import { FeatureFlag } from "@/app/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";

export const generateImage = (videoId: string, userId: string) => tool({
  description: 'Generate an Image',
  parameters: z.object({
    prompt: z.string().describe('The prompt to generate an image for'),
    videoId: z.string().describe('The Youtube video ID')
  }),
  execute: async ({ prompt }) => {
    const schematicCtx = {
      company: { id: userId },
      user: { id: userId }
    }

    const isImageGenerationEnabled = await client.checkFlag(schematicCtx, FeatureFlag.IMAGE_GENERATION);
    if(!isImageGenerationEnabled) {
      return { error: 'Image Generation is not enabled, upgrade plan!!' };
    }
    
    const image = await dallEImageGeneration(prompt, videoId);
    return { image };
  }
})