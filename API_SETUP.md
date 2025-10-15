# API Setup Guide for EternalArchive

This guide will help you configure an AI API key to enable all tools in the application. You can use **any** of the following AI providers.

## Choose Your AI Provider

The application supports three AI providers. You only need **ONE** API key to use all features!

| Provider | Cost | Pros | Get API Key |
|----------|------|------|-------------|
| **Google Gemini** | FREE | • No credit card required<br>• Generous free limits<br>• Great for beginners | [Get Key](https://makersuite.google.com/app/apikey) |
| **OpenAI** | Paid | • GPT-3.5/GPT-4 models<br>• High quality<br>• Industry standard | [Get Key](https://platform.openai.com/api-keys) |
| **Anthropic Claude** | Paid | • Claude 3 models<br>• Long context<br>• Advanced reasoning | [Get Key](https://console.anthropic.com/) |

---

## Option 1: Google Gemini (Recommended - FREE!)

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Create a new API key for your project
5. Copy the API key (starts with `AIzaSy...`)

### Step 2: Add to Your Project

1. Open the `.env` file in the project root
2. Find this line:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Replace with your actual key:
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Save the file and restart your server

**That's it!** All tools will now work with Gemini.

---

## Option 2: OpenAI (Paid)

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Name it (e.g., "EternalArchive")
6. Copy the API key (starts with `sk-...`)

### Step 2: Add to Your Project

1. Open the `.env` file
2. Find this line:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Replace with your actual key:
   ```
   VITE_OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Save and restart

**Models Used:**
- GPT-3.5-turbo for all text generation
- Cost: ~$0.002 per 1K tokens

---

## Option 3: Anthropic Claude (Paid)

### Step 1: Get Your Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

### Step 2: Add to Your Project

1. Open the `.env` file
2. Find this line:
   ```
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```
3. Replace with your actual key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Save and restart

**Models Used:**
- Claude 3 Haiku for fast, efficient responses
- Cost: ~$0.25 per million input tokens

---

## Can I Use Multiple API Keys?

Yes! The app will automatically detect which API keys you've configured and use them in this priority order:

1. **Gemini** (if configured)
2. **OpenAI** (if Gemini not configured)
3. **Anthropic** (if neither Gemini nor OpenAI configured)

This means you can:
- Start with free Gemini
- Switch to OpenAI when you need it
- Use Anthropic for specific tasks
- Keep all keys configured and switch by commenting/uncommenting

---

## File Upload Support

All tools now support file uploads! You can upload:

- **PDF** (.pdf) - Documents, reports, papers
- **Text** (.txt) - Plain text files
- **Word** (.doc, .docx) - Microsoft Word documents
- **Images** (.jpg, .jpeg, .png, .gif) - Screenshots, diagrams
- **CSV** (.csv) - Data files, spreadsheets

### How to Use

1. Click any tool to open it
2. Use the "Upload Files" section
3. Select one or multiple files
4. Add optional text instructions
5. Click "Process"

The AI will analyze your files along with your text input!

### Use Case Examples

**Resume Optimizer + PDF:**
```
Upload: resume.pdf
Text: "Optimize for senior software engineer role"
Result: Detailed improvement suggestions
```

**Email from Report:**
```
Upload: quarterly-report.pdf
Text: "Write a professional email summarizing this"
Result: Professional email draft
```

**Multi-Document Analysis:**
```
Upload: doc1.pdf, doc2.pdf, doc3.pdf
Text: "Compare these documents"
Result: Comprehensive comparison
```

---

## Troubleshooting

### "No AI API key configured" Error

**Solution:**
1. Make sure you've added at least ONE API key to `.env`
2. Check that the key doesn't still say "your_xxx_api_key_here"
3. Restart your development server
4. Clear browser cache

### API Key Not Working

**For Gemini:**
- Verify key starts with `AIzaSy`
- Check it's valid at [AI Studio](https://makersuite.google.com/app/apikey)

**For OpenAI:**
- Verify key starts with `sk-`
- Check you have credits in your OpenAI account

**For Anthropic:**
- Verify key starts with `sk-ant-`
- Check you have credits in your Anthropic account

---

## Switching Between Providers

To switch providers:

1. Open `.env`
2. Comment out current key (add `#` at start)
3. Uncomment desired key (remove `#`)
4. Restart server

Example:
```bash
# Using Gemini
VITE_GEMINI_API_KEY=AIzaSy...

# Switch to OpenAI
# VITE_GEMINI_API_KEY=AIzaSy...
VITE_OPENAI_API_KEY=sk-proj-...
```

---

## Cost Comparison

### For 1,000 Requests (approx):

| Provider | Estimated Cost |
|----------|----------------|
| Gemini | **FREE** |
| OpenAI (GPT-3.5) | ~$0.50 - $2.00 |
| Anthropic (Claude 3 Haiku) | ~$0.25 - $1.00 |

---

## Quick Start Checklist

- [ ] Choose an AI provider (Gemini recommended)
- [ ] Get your API key from provider website
- [ ] Add key to `.env` file
- [ ] Restart development server
- [ ] Test with any tool
- [ ] Try uploading a file!

**Ready to use all 32 AI-powered tools with file upload support!** 🎉
