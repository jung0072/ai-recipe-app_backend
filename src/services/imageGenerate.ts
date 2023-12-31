import { Request, Response } from "express";

import OpenAI from "openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { calculateCost } from "../utils/calculate-cost";
import { ChatPromptTemplate } from "langchain/prompts";

export const dalleImageGenerateService = async (
  req: Request,
  res: Response
) => {
  console.log("\x1b[32m>>> API POST api/image/generate <<<\x1b[0m");

  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-1106-preview",
    callbacks: [
      {
        handleLLMEnd: (output, runId, parentRunId, tags) => {
          const { promptTokens, completionTokens } =
            output.llmOutput?.tokenUsage;
          totalInputTokens += promptTokens ?? 0;
          totalOutputTokens += completionTokens ?? 0;
        },
      },
    ],
  });

  const openai = new OpenAI();

  const generateImage = async (prompt: string) => {
    //   console.log(`( prompt )===============>`, prompt);
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        size: "1024x1024",
        n: 1,
      });
      return response.data[0].url;
    } catch (error) {
      console.error(error);
    }
  };

  async function generatePromptForDallE(recipe_markdown: string) {
    const instruction = `You are an experienced AI image generation prompt engineer. Write a prompt for Dall-E-3 to create an image based on this recipe: ${recipe_markdown}`;
    const prompt_template = ChatPromptTemplate.fromMessages([
      ["system", instruction],
    ]);
    const messages = await prompt_template.formatMessages({
      topLvBlocksMarkdown: recipe_markdown,
    });
    const promptForDallE: any = await chatModel
      .predictMessages(messages)
      .then((response) => {
        calculateCost(totalInputTokens, totalOutputTokens);
        return response.content;
      });

    return promptForDallE;
  }

  try {
    const { block: recipe_markdown } = req.body;
    const promptForDallE = await generatePromptForDallE(recipe_markdown);

    const completion = await generateImage(promptForDallE);
    console.log(`( completion )===============>`, completion);

    return res.status(200).send(JSON.stringify({ url: completion }));
  } catch (error: any) {
    console.error(error);
    return res.status(200).send(JSON.stringify({ error: error.message }));
  }
};
