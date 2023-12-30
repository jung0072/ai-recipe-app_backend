import express, { Request, Response } from "express";
import { openaiRecipeGenerateService } from "./service";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    console.log("Request body: ", req.body);
  const response = await openaiRecipeGenerateService(req, res);
  res.status(response?["status"] || 200 );
  res.send(response);
});

export default route;
