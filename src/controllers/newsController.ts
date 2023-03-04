import express from "express";
import { newsService } from "../services/newsService.js";
import {
  ResponseLikedNewsModel,
  ResponseNewsModel,
} from "../modelsDB/ArticleModel.js";

export interface FetchNewsParams {
  lang: string;
  pageSize: number;
}

export interface FetchLikeParams {
  id: string;
}

export interface FetchLikedNewsParams {
  lang: string;
}

const newsController = {
  getNewsAsync: async (
    req: express.Request<FetchNewsParams>,
    res: express.Response
  ): Promise<express.Response<any, any> | undefined> => {
    try {
      const result: ResponseNewsModel | null = await newsService.getNews(
        req.query,
        res
      );

      if (result) {
        return res.json(result);
      }
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  },

  likeArticleAsync: async (
    req: express.Request<FetchLikeParams>,
    res: express.Response
  ): Promise<express.Response<any, any> | undefined> => {
    try {
      const result: any | null = await newsService.likeArticle(req.query, res);

      if (result) {
        return res.json(result);
      }
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  },

  getLikedNewsAsync: async (
    req: express.Request<FetchLikedNewsParams>,
    res: express.Response
  ): Promise<express.Response<any, any> | undefined> => {
    try {
      const result: ResponseLikedNewsModel | null =
        await newsService.getLikedNews(req.query, res);

      if (result) {
        return res.json(result);
      }
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  },
};

export { newsController };
