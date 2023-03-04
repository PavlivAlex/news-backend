export interface ArticleModel {
  url: string;
  title: string;
  image: string;
  isLiked: boolean;
  content: string;
  language: string;
  description: string;
  publishedAt: string;
  source: { name: string; url: string };
}

export interface ResponseNewsModel {
  articles: ArticleModel[];
  totalArticles: number;
}
