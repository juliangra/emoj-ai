"use server";

import {
  recommendationInputSchema,
  recommendationOutputSchema,
} from "@/schemas";
import { config } from "@/ai";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { Filter } from "bad-words";
import { z } from "zod";

export async function generateEmojiRecommendations(
  _: z.infer<typeof recommendationInputSchema>,
  formData: FormData,
) {
  try {
    // Validate input
    const query = formData.get("query");

    const result = recommendationInputSchema.safeParse({ query });

    if (!result.success) throw new Error("Invalid input provided");

    const { query: sanitizedQuery } = result.data;

    // Filter out profanity
    const filter = new Filter();

    if (filter.isProfane(sanitizedQuery)) {
      throw new Error("Please don't use profanity in your query 😇");
    }

    const { model, system, safetySettings } = config;

    // Call AI service with validated query
    const { finishReason, object } = await generateObject({
      model: google(model, {
        safetySettings,
      }),
      system,
      prompt: `Word: ${sanitizedQuery}`,
      schema: recommendationOutputSchema,
    });

    // Handle rate-limiting or unexpected behavior
    if (finishReason !== "stop") throw new Error("Failed to generate object");

    // Return successful response
    return { result: object.response };
  } catch (e) {
    // Handle errors and return consistent error structure
    const error =
      e instanceof Error
        ? { message: e.message }
        : { message: "An unknown error occurred" };

    return { error: error.message };
  }
}
