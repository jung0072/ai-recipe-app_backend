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
const service_1 = require("./service");
const route = express_1.default.Router();
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = yield (0, service_1.openaiRecipeGenerateService)(req, res);
    //   if ("status" in stream) {
    //     console.log("stream.status: ", stream.status);
    //     res.status(stream.status);
    //   } else {
    //     res.status(200);
    //   }
    // //   console.log("stream: ", stream);
    //   res.send(stream);
}));
exports.default = route;