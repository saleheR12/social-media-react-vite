export function getTrendingPosts(posts, limit = 3) {
  return [...posts]
    .map((post) => ({
      ...post,
      score: post.likes + post.commentsCount * 2
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
