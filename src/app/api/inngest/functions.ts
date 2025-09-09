import { gemini, createAgent } from "@inngest/agent-kit";
import { inngest } from "@/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    // Create a new agent with a system prompt (you can add optional tools, too)
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer. You summarize in 2 words.",
      model: gemini({
        model: "gemini-1.5-flash", // you can use gemini-1.5-pro, gemini-2.0-flash, etc.
        apiKey: process.env.GEMINI_API_KEY, // load from your .env file
      }),
    });

    const { output } = await summarizer.run(
      `summarize the following text: ${event.data.value}`,
    );

    return { output };
  },
);
