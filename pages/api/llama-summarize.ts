import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        // Configure your local Llama 3.2 API endpoint
        const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://localhost:11434/api/generate';

        // Prepare the prompt for news summarization
        const prompt = `You are an AI news analyst and summarizer. Please analyze the following news content and provide:

1. A concise summary (2-3 sentences)
2. Key points and insights
3. Any potential biases or important context
4. Relevant questions for further exploration

News content: ${message}

Please provide a helpful, informative response:`;

        const response = await fetch(LLAMA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.LLAMA_MODEL || 'llama3.2:latest',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                    max_tokens: 500,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Llama API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract the response from Llama
        const aiResponse = data.response || 'I apologize, but I couldn\'t generate a response. Please try again.';

        res.status(200).json({
            response: aiResponse,
            model: data.model || 'llama3.2',
            usage: data.usage || null
        });

    } catch (error) {
        console.error('Error calling Llama API:', error);

        // Provide helpful error messages for common issues
        let errorMessage = 'Failed to get AI response';

        if (error instanceof Error) {
            if (error.message.includes('fetch')) {
                errorMessage = 'Cannot connect to local Llama 3.2 instance. Please make sure it\'s running on the configured port.';
            } else if (error.message.includes('Llama API error: 500')) {
                errorMessage = 'Llama 3.2 encountered an internal error. Please check your model configuration.';
            } else {
                errorMessage = error.message;
            }
        }

        res.status(500).json({
            message: errorMessage,
            error: error instanceof Error ? error.message : 'Unknown error',
            suggestion: 'Make sure your local Llama 3.2 instance is running and accessible at the configured URL.'
        });
    }
}
