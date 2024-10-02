import { z } from "zod";
import { recommendationOutputSchema } from "./schemas";

export type EmojiRecommendationResults = z.infer<
  typeof recommendationOutputSchema
>["response"];

export type IconResult =
  EmojiRecommendationResults[keyof EmojiRecommendationResults];

export type GenAISafetySettings = Array<{
  category:
    | "HARM_CATEGORY_HATE_SPEECH"
    | "HARM_CATEGORY_DANGEROUS_CONTENT"
    | "HARM_CATEGORY_HARASSMENT"
    | "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  threshold:
    | "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
    | "BLOCK_LOW_AND_ABOVE"
    | "BLOCK_MEDIUM_AND_ABOVE"
    | "BLOCK_ONLY_HIGH"
    | "BLOCK_NONE";
}>;
