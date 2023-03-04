import { Router } from "express";
import { newsController } from "../controllers/newsController.js";

const newsRouter = Router();

newsRouter.get("/", newsController.getNewsAsync);
newsRouter.put("/like", newsController.likeArticleAsync);

export default newsRouter;
