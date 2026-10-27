import { articles } from './articles.js';

function countArticleWords(article) {
  const sectionWords = article.sections.flatMap((section) => [
    section.heading,
    ...(section.paragraphs || []),
    ...(section.bullets || []),
  ]);
  return [article.title, article.excerpt, ...sectionWords]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// Blog posts with derived reading time. Kept apart from siteData.js so the article bodies
// only ship with the blog, article and home chunks that render them.
export const blogPosts = articles.map((article) => {
  const wordCount = countArticleWords(article);
  return {
    ...article,
    wordCount,
    readTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
  };
});
