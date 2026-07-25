import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bytescribble.com',
  trailingSlash: 'ignore',
  // Old Jekyll URLs (indexed by Google before the 2026-07 Astro cutover).
  redirects: {
    '/blog/2024/09/26/Stream-processing-introduction.html': '/blog/stream-processing-introduction/',
    '/blog/2024/09/27/Fundamentals-Part-one.html': '/blog/stream-processing-fundamentals-part-one/',
    '/blog/2024/09/27/Fundamentals-Part-two.html': '/blog/stream-processing-fundamentals-part-two/',
    '/blog/2026/07/25/The-Architecture-of-Apache-Flink.html': '/blog/the-architecture-of-apache-flink/',
    '/blog/2026/07/25/Introduction-to-Kafka.html': '/blog/introduction-to-apache-kafka/',
    '/blog/2026/07/25/Data-Replication.html': '/blog/data-replication/',
    '/blog/2026/07/25/Database-Partitioning.html': '/blog/database-partitioning/',
    '/blog/2026/07/25/Change-Data-Capture-with-Debezium.html': '/blog/change-data-capture-with-debezium/',
    '/blogs/': '/blog/',
    '/about-me/': '/about/'
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: false
    }
  }
});
