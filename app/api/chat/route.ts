import { getVideoDetails } from "@/actions/get-video-details";
import { getVideoIdFromUrl } from "@/lib/get-video-from-url";
import { fetchTranscript } from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";
import { generateTitle } from "@/tools/generateTitle";
import { createAnthropic } from "@ai-sdk/anthropic";
import { currentUser } from "@clerk/nextjs/server";
import { streamText, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  headers: {
    'anthropic-beta': 'token-efficient-tools-2025-02-19'
  }
});

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if(!user) {
    return NextResponse.json({
      error: 'Unauthorized'
    }, {
      status: 401
    })
  };

  const videoDetails = await getVideoDetails(videoId);
  const systemMessage = `
    You are an Ai Agent ready to accept questions from the user about a specific video. The video ID in question is ${videoId}.
    But you will refer to this as ${videoDetails?.title || 'Selected Video'}. Use emojis to make the conversation engaging. If any error occurs, 
    explain it to the user and ask them to try again later. if error suggests user upgrade, ask the user to upgrade their subscription pack to access to 
    more features. Tell them to go to the 'Manage plan' page in the header and upgrade accordingly. If any tool is used, analyse the response and if it 
    contains a cache, say the transcript is cached, because they previously transribed the video. This will save the user a token. Use words like database 
    instead of cache, to make it more easily understandable. Format for notion.
  `;

  const model = anthropic('claude-3-7-sonnet-20250219');
  const result = streamText({
    model: model,
    messages: [
      {
        role: 'system',
        content: systemMessage
      },
      ...messages
    ],
    tools: {
      fetchTranscript: fetchTranscript,
      generateImage: generateImage(videoId, user.id),
      generateTitle: generateTitle,
      getVideoDetails: tool({
        description: 'Get the details of the youtube video',
        parameters: z.object({
          videoId: z.string().describe('The video ID to get the details for')
        }),
        execute: async ({ videoId }) => {
          const videoDetails = await getVideoDetails(videoId);
          return { videoDetails };
        }
      }),
      extractVIdeoId: tool({
        description: 'Extract Video ID from the URL',
        parameters: z.object({
          url: z.string().describe('URL to get the video ID from')
        }),
        execute: async ({ url }) => {
          const videoId = getVideoIdFromUrl(url);
          return { videoId };
        }
      })
    }
  });

  return result.toDataStreamResponse();
}