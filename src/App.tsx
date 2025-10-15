import { useState } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import ChatInterface from './components/ChatInterface';
import { tools } from './data/tools';
import type { Tool } from './types';

const SYSTEM_PROMPTS: Record<string, string> = {
  'ai-chat': 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.',
  'summarizer': 'You are a text summarization expert. Provide concise, well-structured summaries that capture the key points.',
  'code-assistant': 'You are an expert programmer. Help with code, debugging, and programming concepts. Provide clear explanations and working code examples.',
  'content-generator': 'You are a creative content writer. Generate engaging, high-quality content for blogs, ads, and social media.',
  'grammar-checker': 'You are a grammar and style expert. Analyze text for errors and provide corrections with explanations.',
  'translator': 'You are a professional translator. Translate text accurately while maintaining tone and context.',
  'sentiment-analyzer': 'You are a sentiment analysis expert. Analyze text and provide detailed insights on emotional tone, sentiment, and intent.',
  'resume-optimizer': 'You are a professional resume coach. Analyze resumes and provide specific, actionable improvement suggestions.',
  'image-analyzer': 'You are an image analysis expert. Describe images in detail and answer questions about visual content.',
  'email-generator': 'You are a professional email writer. Create clear, professional emails for various business contexts.',
  'email-rewriter': 'You are an email improvement expert. Rewrite emails to be more clear, professional, and effective.',
  'email-summarizer': 'You are an email summarization expert. Condense email threads while preserving key information.',
  'cold-email': 'You are a cold email expert. Create compelling, personalized outreach emails that get responses.',
};

export default function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredTools = filter === 'all'
    ? tools
    : tools.filter(tool => tool.category === filter);

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'ai', name: 'AI Tools', count: tools.filter(t => t.category === 'ai').length },
    { id: 'pdf', name: 'PDF Tools', count: tools.filter(t => t.category === 'pdf').length },
    { id: 'email', name: 'Email Tools', count: tools.filter(t => t.category === 'email').length },
    { id: 'image', name: 'Image Tools', count: tools.filter(t => t.category === 'image').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />

      {selectedTool && (
        <ChatInterface
          toolName={selectedTool.name}
          systemPrompt={SYSTEM_PROMPTS[selectedTool.id] || SYSTEM_PROMPTS['ai-chat']}
          onClose={() => setSelectedTool(null)}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI-Powered Toolkit
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Powerful suite of AI tools, PDF utilities, and email assistants.
            Streamline your workflow with intelligent automation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tools found in this category.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>EternalArchive - AI-Powered Toolkit</p>
            <p className="mt-2">Powered by Gemini, OpenAI, and Anthropic</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
