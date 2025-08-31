// pages/api/summarize.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { content, title } = req.body;

    if (!content || !title) {
        return res.status(400).json({ message: "Content and title are required" });
    }

    try {
        // Call your local LLaMA 3.2 server
        const response = await axios.post("http://localhost:8080/v1/completions", {
            model: "llama-3.2",
            prompt: `You are a helpful assistant that summarizes news articles. Provide concise, informative summaries that capture the key points and main ideas. Keep summaries under 150 words and focus on the most important information.\n\nTitle: ${title}\nContent: ${content}\n\nSummary:`,
            max_tokens: 200,
            temperature: 0.3
        });

        const summary = response.data.choices?.[0]?.text || "Unable to generate summary";

        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({
            message: "Failed to generate summary",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
