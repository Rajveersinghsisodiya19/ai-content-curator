import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import NewsCard from '../components/NewsCard';
import { NewsArticle } from '../types';

export default function Feed() {
  const router = useRouter();
  const { topic } = router.query;
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topic && typeof topic === 'string') {
      fetchNews(topic);
    }
  }, [topic]);

  const fetchNews = async (selectedTopic: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news?topic=${encodeURIComponent(selectedTopic)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTopics = () => {
    router.push('/');
  };

  const getTopicTitle = () => {
    if (typeof topic === 'string') {
      return `${topic.charAt(0).toUpperCase() + topic.slice(1)} News`;
    }
    return 'News Feed';
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-light flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red mx-auto"></div>
            <p className="mt-4 text-secondary">Loading news...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-light flex items-center justify-center">
          <div className="text-center">
            <p className="text-red text-lg mb-4">{error}</p>
            <button
              onClick={() => typeof topic === 'string' && fetchNews(topic)}
              className="bg-red text-white px-6 py-2 rounded-lg hover:bg-red/90 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {getTopicTitle()}
              </h1>
              <p className="text-secondary mt-2">
                {articles.length} articles found
              </p>
            </div>
            <button
              onClick={handleBackToTopics}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              ← Back to Topics
            </button>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">No articles found for this topic.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
