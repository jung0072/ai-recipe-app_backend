"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const image_1 = __importDefault(require("./routes/image"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Parse incoming JSON into objects
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: ["http://localhost:3000", "https://recipeasy-v1.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/recipe", recipe_1.default);
app.use("/api/image", image_1.default);
app.get("/api", (req, res) => {
    res.send("Api Working!");
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});