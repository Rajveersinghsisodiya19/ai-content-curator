import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your local Llama 3.2 AI assistant. Paste any news content and I can provide summaries and analysis.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseStyle, setResponseStyle] = useState<'paragraph' | 'bullets'>('bullets'); // ✅ new state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/llama-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          style: responseStyle, // ✅ pass style to API
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I couldn\'t generate a response. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Error: Could not connect to local Llama 3.2. Make sure it is running.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToHome = () => router.push('/');

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Layout>
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">AI Chat with Llama 3.2</h1>
              <p className="text-secondary mt-2">Summarize and analyze news content</p>
            </div>
            <button
              onClick={handleBackToHome}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              ← Back to Home
            </button>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-secondary/10 overflow-hidden">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-black'
                          : 'bg-light text-black'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-white/70' : 'text-secondary'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-light text-black px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm">Llama is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-secondary/20 p-4">
                <div className="flex space-x-4 mb-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Paste news content or ask me anything..."
                    className="flex-1 resize-none border border-secondary/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-black placeholder-secondary/60"
                    rows={3}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-secondary disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors self-end"
                  >
                    Send
                  </button>
                </div>

                {/* ✅ Response Style Selector */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm text-black">Response Style:</label>
                  <select
                    value={responseStyle}
                    onChange={(e) => setResponseStyle(e.target.value as 'paragraph' | 'bullets')}
                    className="border border-secondary/30 rounded-lg px-2 py-1 text-sm text-black"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="bullets">Bullet Points</option>
                  </select>
                </div>

                <p className="text-xs text-black mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-secondary/10">
              <h3 className="text-lg font-semibold text-black mb-4">💡 Tips for Better Results</h3>
              <ul className="text-black space-y-2 text-sm">
                <li>• Paste complete news articles for better summaries</li>
                <li>• Ask specific questions about the content</li>
                <li>• Use the "Response Style" selector to choose bullets or paragraph</li>
                <li>• Make sure your local Llama 3.2 instance is running</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
