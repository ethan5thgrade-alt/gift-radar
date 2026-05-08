import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function getInstagramImages(username: string): Promise<string[]> {
  const run = await client.actor('apify/instagram-scraper').call({
    directUrls: [`https://www.instagram.com/${username}/`],
    resultsType: 'posts',
    resultsLimit: 12,
    addParentData: false,
  }, { waitSecs: 90 });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  const imageUrls: string[] = [];

  for (const item of items as Record<string, unknown>[]) {
    if (typeof item.displayUrl === 'string') imageUrls.push(item.displayUrl);
    if (Array.isArray(item.images)) {
      imageUrls.push(...(item.images as string[]).filter(u => typeof u === 'string'));
    }
  }

  return [...new Set(imageUrls)].slice(0, 12);
}

export async function getTikTokThumbnails(username: string): Promise<string[]> {
  const run = await client.actor('clockworks/tiktok-scraper').call({
    profiles: [`https://www.tiktok.com/@${username}`],
    resultsPerPage: 12,
  }, { waitSecs: 90 });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  return (items as Record<string, unknown>[])
    .map(item => {
      const meta = item.videoMeta as Record<string, unknown> | undefined;
      const covers = item.covers as string[] | undefined;
      return (meta?.coverUrl as string) || covers?.[0] || (item.cover as string);
    })
    .filter(Boolean)
    .slice(0, 12);
}
