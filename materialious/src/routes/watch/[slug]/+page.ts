import { amSubscribed, getComments, getDislikes, getVideo, postHistory } from '$lib/Api/index.js';
import { get } from 'svelte/store';
import { auth } from '../../../store';

export async function load({ params }) {
  const video = await getVideo(params.slug);
  if (get(auth)) {
    postHistory(video.videoId);
  }
  return {
    video: video,
    returnYTDislikes: await getDislikes(params.slug),
    comments: await getComments(params.slug, { sort_by: "top", source: "youtube" }),
    subscribed: await amSubscribed(video.authorId)
  };
};
