import axios from 'axios';
import { NewsAPIResponse, NewsArticle } from '../types';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export async function fetchNewsFromAPI(topic: string): Promise<NewsArticle[]> {
    if (!NEWS_API_KEY) {
        throw new Error('NEWS_API_KEY is not configured');
    }

    try {
        const response = await axios.get<NewsAPIResponse>(`${NEWS_API_BASE_URL}/everything`, {
            params: {
                q: topic,
                apiKey: NEWS_API_KEY,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 20,
            },
        });

        if (response.data.status === 'error') {
            throw new Error('News API error: Invalid response');
        }

        return response.data.articles || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Invalid API key for News API');
            } else if (error.response?.status === 429) {
                throw new Error('News API rate limit exceeded');
            } else {
                throw new Error(`News API error: ${error.response?.data?.message || error.message}`);
            }
        }
        throw error;
    }
}

export async function searchNewsByKeyword(keyword: string): Promise<NewsArticle[]> {
    if (!NEWS_API_KEY) {
        throw new Error('NEWS_API_KEY is not configured');
    }

    try {
        const response = await axios.get<NewsAPIResponse>(`${NEWS_API_BASE_URL}/everything`, {
            params: {
                q: keyword,
                apiKey: NEWS_API_KEY,
                language: 'en',
                sortBy: 'relevancy',
                pageSize: 15,
            },
        });

        if (response.data.status === 'error') {
            throw new Error('News API error: Invalid response');
        }

        return response.data.articles || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`News API error: ${error.response?.data?.message || error.message}`);
        }
        throw error;
    }
}
