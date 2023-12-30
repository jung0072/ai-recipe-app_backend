import express, { Request, Response } from "express";
import { openaiRecipeGenerateService } from "./service";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
  const response = await openaiRecipeGenerateService(req);
  res.status(response["status"]);
  res.send(response);
});

export default route;
