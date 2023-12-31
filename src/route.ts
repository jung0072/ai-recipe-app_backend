import express, { Request, Response } from "express";
import { openaiRecipeGenerateService } from "./service";

const route = express.Router();

route.post("/", async (req: Request, res: Response) =>
  openaiRecipeGenerateService(req, res)
);

export default route;
