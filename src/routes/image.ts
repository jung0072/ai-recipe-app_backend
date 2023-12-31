import express, { Request, Response } from "express";
import { dalleImageGenerateService } from "../services/imageGenerate";

const route = express.Router();

route.get("/", async (req: Request, res: Response) =>
  res.send("GET api/image")
);

route.post("/generate", async (req: Request, res: Response) =>
  dalleImageGenerateService(req, res)
);

export default route;
