import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "interview/server/api/trpc";

export const postRouter = createTRPCRouter({
  fetchData: publicProcedure
    .input(
      z.object({
        dotNumbers: z.array(z.number()), // Input validation for `dotNumbers`
      })
    )
    .query(async ({ input }) => {
      const API_URL = process.env.API_URL as string; // Fetch from environment variables
      const API_KEY = process.env.API_KEY as string;

      const requestBody = {
        dotNumbers: input.dotNumbers, // Use input from the frontend
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`, // Add API key
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        return await response.json(); // Return the API response
      } catch (error) {
        console.error("Error fetching carrier data:", error);
        throw new Error("Failed to fetch carrier data");
      }
    }),
});
