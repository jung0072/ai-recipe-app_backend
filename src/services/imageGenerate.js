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
exports.dalleImageGenerateService = void 0;
const openai_1 = __importDefault(require("openai"));
const openai_2 = require("langchain/chat_models/openai");
const calculate_cost_1 = require("../utils/calculate-cost");
const prompts_1 = require("langchain/prompts");
const dalleImageGenerateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\x1b[32m>>> API POST api/image/generate <<<\x1b[0m");
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    const chatModel = new openai_2.ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-4-1106-preview",
        callbacks: [
            {
                handleLLMEnd: (output, runId, parentRunId, tags) => {
                    var _a;
                    const { promptTokens, completionTokens } = (_a = output.llmOutput) === null || _a === void 0 ? void 0 : _a.tokenUsage;
                    totalInputTokens += promptTokens !== null && promptTokens !== void 0 ? promptTokens : 0;
                    totalOutputTokens += completionTokens !== null && completionTokens !== void 0 ? completionTokens : 0;
                },
            },
        ],
    });
    const openai = new openai_1.default();
    const generateImage = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
        //   console.log(`( prompt )===============>`, prompt);
        try {
            const response = yield openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                size: "1024x1024",
                n: 1,
            });
            return response.data[0].url;
        }
        catch (error) {
            console.error(error);
        }
    });
    function generatePromptForDallE(topLvBlocksMarkdown) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = `You are an experienced AI image generation prompt engineer. Write a prompt for Dall-E-3 to create an image based on this recipe: ${topLvBlocksMarkdown}`;
            const prompt_template = prompts_1.ChatPromptTemplate.fromMessages([
                ["system", instruction],
            ]);
            const messages = yield prompt_template.formatMessages({
                topLvBlocksMarkdown: topLvBlocksMarkdown,
            });
            const promptForDallE = yield chatModel
                .predictMessages(messages)
                .then((response) => {
                (0, calculate_cost_1.calculateCost)(totalInputTokens, totalOutputTokens);
                return response.content;
            });
            return promptForDallE;
        });
    }
    try {
        console.log(`( req.body )===============>`, req.body);
        const { block } = req.body;
        console.log(`( blocks )===============>`, block);
        const promptForDallE = yield generatePromptForDallE(block);
        console.log(`( promptForDallE )===============>`, promptForDallE);
        const completion = yield generateImage(promptForDallE);
        console.log(`( completion )===============>`, completion);
        return res.status(200).send(JSON.stringify({ url: completion }));
    }
    catch (error) {
        console.error(error);
        return res.status(200).send(JSON.stringify({ error: error.message }));
    }
});
exports.dalleImageGenerateService = dalleImageGenerateService;
