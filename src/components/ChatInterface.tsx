import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Upload, X, ArrowLeft } from 'lucide-react';
import type { Message, UploadedFile } from '../types';
import { aiService } from '../services/ai';

interface ChatInterfaceProps {
  toolName: string;
  systemPrompt: string;
  onClose: () => void;
}

export default function ChatInterface({ toolName, systemPrompt, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        setFiles(prev => [...prev, {
          name: file.name,
          size: file.size,
          type: file.type,
          data
        }]);
      };

      if (file.type.startsWith('text/') || file.type === 'application/pdf') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && files.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim() || 'Please analyze the uploaded files.',
      timestamp: new Date(),
      files: files.length > 0 ? files : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setFiles([]);
    setIsLoading(true);

    try {
      let prompt = userMessage.content;

      if (userMessage.files && userMessage.files.length > 0) {
        prompt += '\n\nAttached files:\n';
        userMessage.files.forEach(file => {
          prompt += `\n- ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
          if (file.type.startsWith('text/')) {
            prompt += `\nContent preview: ${file.data.substring(0, 500)}...`;
          }
        });
      }

      const response = await aiService.chat([
        ...messages,
        { ...userMessage, content: prompt }
      ], systemPrompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-white">{toolName}</h2>
                  <p className="text-sm text-gray-400">
                    Powered by {aiService.getProviderName()} ({aiService.getModelName()})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="container mx-auto max-w-4xl">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  Start a conversation or upload files to begin
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="text-xs opacity-80 mb-2">Attached files:</div>
                          {message.files.map((file, idx) => (
                            <div key={idx} className="text-xs opacity-80">
                              📎 {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            {files.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="text-sm text-white">{file.name}</span>
                    <button
                      onClick={() => removeFile(idx)}
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.csv"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                disabled={isLoading}
              >
                <Upload className="w-5 h-5 text-white" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
              />

              <button
                type="submit"
                disabled={isLoading || (!input.trim() && files.length === 0)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
