import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils.js';

export async function GET(context) {
  const posts = publishedPosts(await getCollection('blog'));
  posts.sort((a, b) => b.data.date - a.data.date);
  return rss({
    title: 'ByteScribble',
    description:
      'Research notes on AI, multimodal systems, context, memory, and distributed systems by Hritik Kumar.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`
    }))
  });
}
