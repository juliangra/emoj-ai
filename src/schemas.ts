import { z } from "zod";

const recommendationInputSchema = z.object({
  query: z.string().min(1).max(100),
});

const recommendationOutputSchema = z.object({
  response: z.object({
    icon_1: z.object({
      icon_emoji: z.string(),
      icon_name: z.string(),
      icon_description: z.string(),
    }),
    icon_2: z.object({
      icon_emoji: z.string(),
      icon_name: z.string(),
      icon_description: z.string(),
    }),
    icon_3: z.object({
      icon_emoji: z.string(),
      icon_name: z.string(),
      icon_description: z.string(),
    }),
  }),
});

export { recommendationInputSchema, recommendationOutputSchema };
