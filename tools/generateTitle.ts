import { titleGeneration } from "@/actions/title-generation";
import { tool } from "ai";
import { z } from "zod";

export const generateTitle = tool({
  description: 'Generate a title for a Youtube Video',
  parameters: z.object({
    videoId: z.string().describe('The Video ID to generate a title for'),
    videoSummary: z.string().describe('Te summary of the video to generate a title for'),
    considerations: z.string().describe('Additional considerations to generate the title')
  }),
  execute: async ({ videoId, videoSummary, considerations }) => {
    const title = await titleGeneration(videoId, videoSummary, considerations);
    return { title };
  }
});