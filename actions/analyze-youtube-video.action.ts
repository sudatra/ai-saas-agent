'use server'

import { getVideoIdFromUrl } from "@/lib/get-video-from-url";
import { redirect } from "next/navigation";

export async function analyzeYouTubeVideoURL(formData: FormData) {
  const url = formData.get('url')?.toString();
  if(!url) {
    return;
  }

  const videoId = getVideoIdFromUrl(url);
  if(!videoId) {
    return;
  }

  redirect(`/video/${videoId}/analysis`);
}