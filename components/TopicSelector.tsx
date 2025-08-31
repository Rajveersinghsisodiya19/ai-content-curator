interface TopicSelectorProps {
  onTopicSelect: (topic: string) => void;
}

const topics = [
  { id: 'technology', name: 'Technology', icon: '💻', color: 'bg-blue-500 hover:bg-blue-600' },
  { id: 'business', name: 'Business', icon: '💼', color: 'bg-green-500 hover:bg-green-600' },
  { id: 'science', name: 'Science', icon: '🔬', color: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'health', name: 'Health', icon: '🏥', color: 'bg-red-500 hover:bg-red-600' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-pink-500 hover:bg-pink-600' },
  { id: 'politics', name: 'Politics', icon: '🏛️', color: 'bg-gray-500 hover:bg-gray-600' },
  { id: 'environment', name: 'Environment', icon: '🌱', color: 'bg-emerald-500 hover:bg-emerald-600' },
];

export default function TopicSelector({ onTopicSelect }: TopicSelectorProps) {
  const handleTopicClick = (topicId: string) => {
    onTopicSelect(topicId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary mb-8 text-center">
        Choose a Topic
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            className={`${topic.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-white`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{topic.icon}</div>
              <div className="font-semibold text-lg">{topic.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
