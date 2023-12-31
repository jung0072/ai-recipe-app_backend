"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeGenerate_1 = require("../services/recipeGenerate");
const route = express_1.default.Router();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.send("GET api/recipe"); }));
route.post("/generate", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, recipeGenerate_1.openaiRecipeGenerateService)(req, res); }));
exports.default = route;
