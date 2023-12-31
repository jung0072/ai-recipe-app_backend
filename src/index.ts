import express, { Express, Request, Response } from "express";
import cors from "cors";
import openaiRecipeGenerateRoute from "./route";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:3000", "https://recipeasy-v1.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/recipe/generate", openaiRecipeGenerateRoute);

app.get("/api", (req: Request, res: Response) => {
  res.send("Api Working!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
