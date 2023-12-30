import express, { Express, Request, Response } from "express";
import cors from "cors";
import openaiRecipeGenerateRoute from "./route";

const app: Express = express();
const PORT = process.env.PORT || 6001;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/recipe/generate", openaiRecipeGenerateRoute);

app.get("/api", (req: Request, res: Response) => {
  res.send("Api Working!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
