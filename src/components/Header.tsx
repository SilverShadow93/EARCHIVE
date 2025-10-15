import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                EternalArchive
              </h1>
              <p className="text-xs text-gray-400">AI-Powered Toolkit</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-400">
              32 Tools Available
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
