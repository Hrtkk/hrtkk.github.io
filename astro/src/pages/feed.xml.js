import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.date - a.data.date);
  return rss({
    title: 'ByteScribble',
    description:
      'Notes on distributed systems, from first principles — stream processing, databases, and system design by Hritik Kumar.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`
    }))
  });
}
