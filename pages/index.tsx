import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary mb-6">
              AI Content Curator
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Discover, curate, and summarize the latest news with your local Llama 3.2 AI. 
              Choose how you want to interact with news content.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Update News Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 border border-secondary/10">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">📰</span>
                <h2 className="text-2xl font-semibold text-black mb-3">Update News</h2>
                <p className="text-secondary text-black">
                  Browse the latest news articles on your chosen topics. Get real-time updates from NewsAPI and stay informed.
                </p>
              </div>
              <Link 
                href="/topics" 
                className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Choose Topics
              </Link>
            </div>

            {/* AI Summarizer Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 border border-secondary/10">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">🤖</span>
                <h2 className="text-2xl font-semibold text-black mb-3">AI Summarizer</h2>
                <p className="text-secondary text-black">
                  Chat with your local Llama 3.2 AI to summarize and analyze news articles. Get intelligent insights and summaries.
                </p>
              </div>
              <Link 
                href="/ai-chat" 
                className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Start AI Chat
              </Link>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-secondary/70">
              Powered by NewsAPI and your local Llama 3.2 AI for intelligent content curation
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
