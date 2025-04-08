import { currentUser } from "@clerk/nextjs/server";

export async function getYoutubeTranscript(videoId: string) {
  const user = await currentUser();
  if(!user?.id) {
    throw new Error('User not found');
  }
}