export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'pdf' | 'email' | 'image';
  icon: string;
  isPro?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: UploadedFile[];
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  data: string;
}

export interface AIConfig {
  provider: 'gemini' | 'openai' | 'anthropic';
  model: string;
  temperature: number;
  maxTokens: number;
}
