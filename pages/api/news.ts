import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNewsFromAPI } from '../../utils/api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { topic } = req.query;

    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ message: 'Topic parameter is required' });
    }

    try {
        const articles = await fetchNewsFromAPI(topic);
        res.status(200).json({ articles });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            message: 'Failed to fetch news',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
