import type { Message, AIConfig } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export class AIService {
  private config: AIConfig;

  constructor() {
    this.config = this.detectProvider();
  }

  private detectProvider(): AIConfig {
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      return {
        provider: 'gemini',
        model: GEMINI_MODEL,
        temperature: 0.7,
        maxTokens: 2048,
      };
    }

    if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here') {
      return {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 2048,
      };
    }

    if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here') {
      return {
        provider: 'anthropic',
        model: 'claude-3-haiku-20240307',
        temperature: 0.7,
        maxTokens: 2048,
      };
    }

    throw new Error('No AI API key configured. Please add at least one API key to your .env file.');
  }

  async chat(messages: Message[], systemPrompt?: string): Promise<string> {
    switch (this.config.provider) {
      case 'gemini':
        return this.geminiChat(messages, systemPrompt);
      case 'openai':
        return this.openaiChat(messages, systemPrompt);
      case 'anthropic':
        return this.anthropicChat(messages, systemPrompt);
      default:
        throw new Error('Unknown AI provider');
    }
  }

  private async geminiChat(messages: Message[], systemPrompt?: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${GEMINI_API_KEY}`;

    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (systemPrompt) {
      contents.unshift({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Gemini API request failed');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
  }

  private async openaiChat(messages: Message[], systemPrompt?: string): Promise<string> {
    const url = 'https://api.openai.com/v1/chat/completions';

    const openaiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    if (systemPrompt) {
      openaiMessages.unshift({ role: 'system', content: systemPrompt });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: openaiMessages,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated';
  }

  private async anthropicChat(messages: Message[], systemPrompt?: string): Promise<string> {
    const url = 'https://api.anthropic.com/v1/messages';

    const anthropicMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: anthropicMessages,
        system: systemPrompt,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Anthropic API request failed');
    }

    const data = await response.json();
    return data.content?.[0]?.text || 'No response generated';
  }

  getProviderName(): string {
    return this.config.provider.charAt(0).toUpperCase() + this.config.provider.slice(1);
  }

  getModelName(): string {
    return this.config.model;
  }
}

export const aiService = new AIService();
