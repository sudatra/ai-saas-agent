import { tool } from "ai";
import { z } from "zod";

export const fetchTranscript = (videoId: string) => tool({
  description: 'Fetch the transcript of a youtube video in segments',
  parameters: z.object({
    videoId: z.string().describe('The video ID to fetch the transcript for')
  }),
  execute: async ({ videoId }) => {
    const transcript = await getYoutubeTranscript(videoId);
  }
})