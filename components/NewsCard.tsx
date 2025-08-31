import { useState } from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleSummarize = async () => {
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }

    setIsSummarizing(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.description || article.content || '',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate summary');

      const data = await response.json();
      setSummary(data.summary);
      setShowSummary(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-secondary/10">
      {article.urlToImage && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm text-black bg-light px-2 py-1 rounded-full font-medium">
            {article.source?.name || 'Unknown Source'}
          </span>
          <span className="text-sm text-black">
            {article.publishedAt ? formatDate(article.publishedAt) : 'Unknown Date'}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-black mb-3 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-black mb-4 line-clamp-3">
          {article.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="flex items-center gap-2 bg-red text-black px-4 py-2 rounded-lg hover:bg-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSummarizing ? <span className="animate-spin">⏳</span> : <span>📄</span>}
            {summary ? (showSummary ? 'Hide Summary' : 'Show Summary') : 'Summarize'}
          </button>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-red transition-colors font-medium"
            >
              <span>🔗</span>
              Read Full
            </a>
          )}
        </div>

        {showSummary && summary && (
          <div className="mt-4 p-4 bg-light rounded-lg border-l-4 border-red">
            <h4 className="font-semibold text-black mb-2">AI Summary</h4>
            <p className="text-secondary text-sm leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
