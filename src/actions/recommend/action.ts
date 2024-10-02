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
import { sql } from "@vercel/postgres";

async function queryAlreadyExists(query: string) {
  // Check if query already exists in database

  const res = await sql`
        SELECT emoji_results 
        FROM emoji_requests 
        WHERE search_string = ${query};
     `;

  return res.rows;
}

async function cacheQuery(query: string, emojiResults: string) {
  // Insert query into database
  await sql`SELECT upsert_emoji_request(${query}, ${emojiResults});`;
}

export async function generateEmojiRecommendations(
  _: z.infer<typeof recommendationInputSchema>,
  formData: FormData,
) {
  try {
    // Validate input
    const query = formData.get("query");

    const result = recommendationInputSchema.safeParse({ query });

    if (!result.success) throw new Error("Invalid input provided");

    const { query: temp_query } = result.data;

    const sanitizedQuery = temp_query.trim().toLowerCase();

    const exists = await queryAlreadyExists(sanitizedQuery);
    if (exists.length > 0) {
      console.log("retrieved result from database");
      cacheQuery(sanitizedQuery, exists[0].emoji_results);
      return { result: exists[0].emoji_results };
    }

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

    await cacheQuery(sanitizedQuery, JSON.stringify(object.response));

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
