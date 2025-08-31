import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TopicSelector from '../components/TopicSelector';
import NewsCard from '../components/NewsCard';
import { NewsArticle } from '../types';

export default function NewsUpdates() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTopicSelect = async (topic: string) => {
    setSelectedTopic(topic);
    await fetchNews(topic);
  };

  const fetchNews = async (topic: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`);
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

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                News Updates
              </h1>
              <p className="text-secondary mt-2">
                Select a topic to browse the latest news articles
              </p>
            </div>
            <button
              onClick={handleBackToHome}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              ← Back to Home
            </button>
          </div>

          {!selectedTopic ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-primary mb-8">
                Choose a Topic to Get Started
              </h2>
              <TopicSelector onTopicSelect={handleTopicSelect} />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)} News
                  </h2>
                  <p className="text-secondary mt-2">
                    {articles.length} articles found
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTopic('')}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  Change Topic
                </button>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red mx-auto"></div>
                  <p className="mt-4 text-secondary">Loading news...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red text-lg mb-4">{error}</p>
                  <button
                    onClick={() => fetchNews(selectedTopic)}
                    className="bg-red text-white px-6 py-2 rounded-lg hover:bg-red/90 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : articles.length === 0 ? (
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
          )}
        </div>
      </div>
    </Layout>
  );
}
