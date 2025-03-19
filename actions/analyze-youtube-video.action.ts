'use server'

import { redirect } from "next/navigation";

export async function analyzeYouTubeVideoURL(formData: FormData) {
  const url = formData.get('url')?.toString();
  if(!url) {
    return;
  }

  // const videoId = getVideoIdFromUrl(url);
  const videoId = '';
  if(!videoId) {
    return;
  }

  redirect(`/video/${videoId}/analysis`);
}