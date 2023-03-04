import express from "express";
import Article from "../schemas/Article.js";
import {
  ResponseLikedNewsModel,
  ResponseNewsModel,
} from "../modelsDB/ArticleModel.js";

const newsService = {
  getNews: async (
    params: any,
    res: express.Response
  ): Promise<ResponseNewsModel | null> => {
    try {
      const { lang, pageSize = 10 } = params;

      if (!lang) {
        res.status(400).json({ message: "Parameter lang is required" });
        return null;
      }

      const articles = await Article.find();

      const findedArticles = articles.reduce(
        (acc, article) => {
          if (article.language === lang) {
            if (acc.articles.length < pageSize) {
              acc.articles.push(article.toObject());
            }
            acc.totalArticlesByLang += 1;
          }

          return acc;
        },
        { articles: [], totalArticlesByLang: 0 }
      );

      if (!articles || !articles.length) {
        res.status(400).json({ message: "Articles not found" });
        return null;
      }

      return {
        articles: findedArticles.articles,
        totalArticles: findedArticles.totalArticlesByLang,
      };
    } catch (e) {
      res.status(500).send({ message: "Something went wrong" });
      return null;
    }
  },

  likeArticle: async (params: any, res: express.Response): Promise<any> => {
    try {
      const { id } = params;

      const article = await Article.findById(id);

      if (!article) {
        res.status(400).json({ message: "Article not found" });
        return null;
      }

      const test = article.toObject();

      article.set({ isLiked: !test.isLiked });

      await article.save();

      return article.toObject();
    } catch (e) {
      res.status(500).send({ message: "Something went wrong" });
      return null;
    }
  },

  getLikedNews: async (
    params: any,
    res: express.Response
  ): Promise<ResponseLikedNewsModel | null> => {
    try {
      const { lang } = params;

      if (!lang) {
        res.status(400).json({ message: "Parameter lang is required" });
        return null;
      }

      const articles = await Article.find();

      const likedArticles = articles.filter(
        (article) => lang === article.language && article.isLiked
      );

      if (!likedArticles || !likedArticles.length) {
        res.status(400).json({ message: "Articles not found" });
        return null;
      }

      return {
        data: { articles: likedArticles },
      };
    } catch (e) {
      res.status(500).send({ message: "Something went wrong" });
      return null;
    }
  },
};

export { newsService };
