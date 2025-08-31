import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 shadow-lg border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <Link href="/" className="text-2xl font-bold text-white hover:text-light/90 transition-colors">
                AI Content Curator
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-light/90 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/topics" className="text-light/90 hover:text-white transition-colors font-medium">
                Topics
              </Link>
              <Link href="/feed" className="text-light/90 hover:text-white transition-colors font-medium">
                News Feed
              </Link>
              <Link href="/ai-chat" className="text-light/90 hover:text-white transition-colors font-medium">
                AI Chat
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Content Curator</h3>
              <p className="text-light/80 text-sm">
                Discover, curate, and summarize the latest news with AI-powered insights.
                Stay informed with personalized content curation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="text-light/80 text-sm space-y-2">
                <li>• AI-powered news summarization</li>
                <li>• Topic-based content curation</li>
                <li>• Real-time news updates</li>
                <li>• Personalized content discovery</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/80 hover:text-white transition-colors"
                >
                  <span className="text-2xl">📚</span>
                </a>
              </div>
              <p className="text-light/80 text-sm mt-4">
                Built with Next.js, TypeScript, and AI
              </p>
            </div>
          </div>
          
          <div className="border-t border-secondary/30 mt-8 pt-8 text-center">
            <p className="text-light/60 text-sm">
              © 2024 AI Content Curator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
