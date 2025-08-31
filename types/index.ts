export interface NewsSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export interface SummaryResponse {
    summary: string;
}

export interface NewsAPIError {
    status: string;
    code: string;
    message: string;
}
