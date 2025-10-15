import * as Icons from 'lucide-react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const IconComponent = (Icons as any)[tool.icon] || Icons.Sparkles;

  const categoryColors = {
    ai: 'from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:border-blue-500/50',
    pdf: 'from-red-500/20 to-orange-500/20 border-red-500/30 hover:border-red-500/50',
    email: 'from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-500/50',
    image: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 hover:border-pink-500/50',
  };

  return (
    <button
      onClick={onClick}
      className={`relative group p-6 rounded-xl bg-gradient-to-br ${categoryColors[tool.category]} border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/5 text-left w-full`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {tool.isPro && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-semibold text-white">
          PRO
        </div>
      )}
    </button>
  );
}
