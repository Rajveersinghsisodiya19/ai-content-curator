import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TopicSelector from '../components/TopicSelector';

export default function Topics() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    // Redirect to feed page with selected topic
    router.push(`/feed?topic=${encodeURIComponent(topic)}`);
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
                What Are You Interested In?
              </h1>
              <p className="text-secondary mt-2">
                Select a topic to get the latest news updates tailored to your interests
              </p>
            </div>
            <button
              onClick={handleBackToHome}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              ← Back to Home
            </button>
          </div>

          <div className="text-center py-8">
            <TopicSelector onTopicSelect={handleTopicSelect} />
            
            {selectedTopic && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800">
                  Loading news for <strong>{selectedTopic}</strong>...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
