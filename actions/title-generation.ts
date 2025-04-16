'use server'

import { getConvexClient } from "@/lib/convex"
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();

export async function titleGeneration(videoId: string, videoSummary: string, considerations: string) {
  const user = await currentUser();
  if(!user?.id) {
    throw new Error('User not found');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const titleResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful Youtube video creator assistant that creates high quality SEO friendly concise video titles'
        },
        {
          role: 'user',
          content: `
            Please provide one concise Youtube title (and nothing else) for this video. Focus on the main points and key takeaways. It 
            should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const title = titleResponse.choices[0]?.message?.content || 'Unable to generate title';
    if(!title) {
      return {
        error: 'System Error: Failed to generate title'
      }
    }
  }
  catch(error) {
    console.error('Error generating title: ', error);
    throw new Error('Failed to generate title');
  }
}