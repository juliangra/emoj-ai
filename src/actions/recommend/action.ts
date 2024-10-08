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
import sql from "@/db";

/*
 *
 * queryAlreadyExists
 *
 * Server-side function to check if a query already exists in the database.
 *
 */
async function queryAlreadyExists(query: string) {
  const res =
    await sql` SELECT emoji_results FROM emoji_requests WHERE search_string = ${query};`;

  return res.rows;
}

/*
 *
 * cacheQuery
 *
 * Server-side function to cache a query and its results.
 *
 */
async function cacheQuery(query: string, emojiResults: string) {
  await sql`SELECT upsert_emoji_request(${query}, ${emojiResults});`;
}

/*
 *
 * updateCount
 *
 * Server-side function to update the count and last_queried timestamp of a query.
 *
 */
async function updateCount(query: string) {
  await sql` UPDATE emoji_requests SET last_queried = CURRENT_TIMESTAMP, total_queries = total_queries + 1 WHERE search_string = ${query}; `;
}

/*
 *
 * generateEmojiRecommendations
 *
 * Server-side function to generate emoji recommendations based on a query.
 *
 */
export async function generateEmojiRecommendations(
  _: z.infer<typeof recommendationInputSchema>,
  formData: FormData,
) {
  try {
    const query = formData.get("query");

    // Validate the input query
    const result = recommendationInputSchema.safeParse({ query });
    if (!result.success) throw new Error("Invalid input provided");

    const { query: temp_query } = result.data;

    // Trim and lowercase the input query
    const sanitizedQuery = temp_query.trim().toLowerCase();

    const exists = await queryAlreadyExists(sanitizedQuery);

    if (exists.length > 0) {
      console.log(`${sanitizedQuery} already exists in the database.`);

      updateCount(sanitizedQuery);
      return { result: exists[0].emoji_results };
    }

    // Use a profanity filter to check for inappropriate language
    const filter = new Filter();

    if (filter.isProfane(sanitizedQuery)) {
      throw new Error("Please don't use profanity in your query 😇");
    }

    // Get the AI configuration
    const { model, system, safetySettings } = config;

    // Generate the response object
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

    // Cache the query and its results
    await cacheQuery(sanitizedQuery, JSON.stringify(object.response));

    return { result: object.response };
  } catch (e) {
    // Convert errors
    const error =
      e instanceof Error
        ? { message: e.message }
        : { message: "An unknown error occurred" };

    return { error: error.message };
  }
}
