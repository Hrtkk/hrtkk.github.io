export function readingTime(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function sortedPosts(posts) {
  return [...posts].sort((a, b) => b.data.date - a.data.date);
}
