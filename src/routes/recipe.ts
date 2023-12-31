import express, { Request, Response } from "express";
import { openaiRecipeGenerateService } from "../services/recipeGenerate";

const route = express.Router();

route.get("/", async (req: Request, res: Response) =>
  res.send("GET api/recipe")
);

route.post("/generate", async (req: Request, res: Response) =>
  openaiRecipeGenerateService(req, res)
);

export default route;
