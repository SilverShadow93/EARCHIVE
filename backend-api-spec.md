# EternalArchive Backend API Specification

This document outlines the complete API specification for the EternalArchive backend system.

## Base URL
```
https://api.eternalarchive.com/v1
```

## Authentication
All API requests (except auth endpoints) require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "usage": {
    "requestsUsed": number,
    "requestsRemaining": number
  }
}
```

## Error Responses
```json
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details": any
  }
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "subscription": "free",
      "features": ["ai_tools", "pdf_tools", "email_tools"],
      "usage": {
        "aiRequests": 0,
        "pdfProcessed": 0,
        "emailsSent": 0,
        "monthlyLimit": 100
      },
      "createdAt": "ISO_DATE",
      "lastLoginAt": "ISO_DATE"
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 3600
  }
}
```

### POST /auth/login
Authenticate user and return tokens.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** Same as register

### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

### POST /auth/logout
Invalidate user session.

### GET /auth/verify
Verify token validity.

## User Management Endpoints

### GET /user/profile
Get current user profile.

### PUT /user/profile
Update user profile.

**Request Body:**
```json
{
  "name": "string",
  "avatar": "string"
}
```

### GET /user/usage
Get current usage statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "current": {
      "aiRequests": 45,
      "pdfProcessed": 12,
      "emailsSent": 8,
      "totalUsed": 65
    },
    "limits": {
      "monthlyLimit": 100,
      "remaining": 35
    },
    "history": [
      {
        "date": "2024-01-01",
        "aiRequests": 5,
        "pdfProcessed": 2,
        "emailsSent": 1
      }
    ]
  }
}
```

### GET /user/subscription
Get subscription information.

## AI Processing Endpoints

### POST /ai/chat
Process chat completion requests.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user|assistant|system",
      "content": "string"
    }
  ],
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 1000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "AI response text",
    "model": "gpt-4",
    "tokensUsed": 150
  }
}
```

### POST /ai/generate-text
Generate text based on prompt.

**Request Body:**
```json
{
  "prompt": "string",
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 1000,
  "systemPrompt": "string"
}
```

### POST /ai/summarize
Summarize text content.

**Request Body:**
```json
{
  "text": "string",
  "length": "short|medium|long",
  "bullets": boolean
}
```

### POST /ai/translate
Translate text to target language.

**Request Body:**
```json
{
  "text": "string",
  "targetLanguage": "string",
  "tone": "formal|casual"
}
```

### POST /ai/analyze-sentiment
Analyze text sentiment.

**Request Body:**
```json
{
  "text": "string",
  "analysisType": "basic|detailed|business"
}
```

### POST /ai/generate-code
Generate code based on requirements.

**Request Body:**
```json
{
  "prompt": "string",
  "language": "javascript|python|java|cpp",
  "includeComments": boolean
}
```

### POST /ai/check-grammar
Check and correct grammar.

**Request Body:**
```json
{
  "text": "string",
  "checkType": "grammar|style|full",
  "suggestions": boolean
}
```

### POST /ai/generate-content
Generate marketing/blog content.

**Request Body:**
```json
{
  "brief": "string",
  "contentType": "blog|ad|social|email",
  "tone": "professional|casual|friendly",
  "wordCount": number
}
```

### POST /ai/generate-image
Generate images from text prompts.

**Request Body:**
```json
{
  "prompt": "string",
  "style": "realistic|artistic|cartoon",
  "size": "512x512|1024x1024|1024x768",
  "quality": "standard|hd"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://cdn.example.com/image.jpg",
    "prompt": "original prompt",
    "revisedPrompt": "enhanced prompt used"
  }
}
```

### POST /ai/analyze-image
Analyze uploaded images.

**Request Body:**
```json
{
  "imageData": "base64_encoded_image",
  "prompt": "What do you see in this image?"
}
```

### POST /ai/optimize-resume
Optimize resume content.

**Request Body:**
```json
{
  "resumeText": "string",
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "strengths": ["Clear formatting", "Relevant experience"],
    "improvements": ["Add metrics", "Include keywords"],
    "optimizedVersion": "Enhanced resume text"
  }
}
```

### POST /ai/generate-email
Generate email content.

**Request Body:**
```json
{
  "requirements": "string",
  "emailType": "business|casual|formal",
  "tone": "professional|friendly"
}
```

### POST /ai/rewrite-email
Improve existing email.

**Request Body:**
```json
{
  "emailText": "string",
  "focus": "clarity|professionalism|brevity",
  "keepOriginalTone": boolean
}
```

### POST /ai/text-to-speech
Convert text to speech.

**Request Body:**
```json
{
  "text": "string",
  "voice": "male|female",
  "speed": 1.0,
  "pitch": 1.0
}
```

## PDF Processing Endpoints

### POST /pdf/process
Generic PDF processing endpoint.

**Request:** Multipart form data
- `operation`: string (merge|split|compress|convert|ocr|password|watermark|annotate|metadata)
- `file_0`, `file_1`, etc.: PDF files
- `options`: JSON string with operation-specific options

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://cdn.example.com/processed.pdf",
    "filename": "processed.pdf",
    "size": 1024000,
    "expiresAt": "ISO_DATE"
  }
}
```

### Specific PDF Operations

#### Merge PDFs
**Options:**
```json
{
  "operation": "merge",
  "order": [0, 1, 2]
}
```

#### Split PDF
**Options:**
```json
{
  "operation": "split",
  "pages": "1-5,7,9-12"
}
```

#### Compress PDF
**Options:**
```json
{
  "operation": "compress",
  "quality": "low|medium|high"
}
```

#### Convert PDF
**Options:**
```json
{
  "operation": "convert",
  "format": "docx|pptx|jpg|png"
}
```

#### OCR Processing
**Options:**
```json
{
  "operation": "ocr",
  "language": "eng|spa|fra"
}
```

#### Password Protection
**Options:**
```json
{
  "operation": "password",
  "action": "add|remove",
  "password": "string",
  "currentPassword": "string"
}
```

#### Add Watermark
**Options:**
```json
{
  "operation": "watermark",
  "text": "string",
  "opacity": 0.5,
  "position": "center|top-left|top-right|bottom-left|bottom-right"
}
```

## Email Service Endpoints

### POST /email/send
Send individual email.

**Request Body:**
```json
{
  "to": "email@example.com",
  "subject": "string",
  "body": "string",
  "html": boolean
}
```

### GET /email/templates
Get user's email templates.

### POST /email/templates
Save new email template.

**Request Body:**
```json
{
  "name": "string",
  "subject": "string",
  "body": "string",
  "category": "string"
}
```

### PUT /email/templates/:id
Update email template.

### DELETE /email/templates/:id
Delete email template.

### POST /email/bulk-send
Send bulk personalized emails.

**Request Body:**
```json
{
  "template": "string",
  "recipients": [
    {
      "email": "string",
      "data": {
        "name": "string",
        "company": "string"
      }
    }
  ]
}
```

## Admin Endpoints

### GET /admin/users
Get all users (admin only).

### GET /admin/usage-stats
Get system usage statistics.

### GET /admin/system-health
Get system health metrics.

### PUT /admin/users/:id/features
Update user features.

**Request Body:**
```json
{
  "features": ["ai_tools", "premium_ai", "bulk_operations"]
}
```

### PUT /admin/users/:id/subscription
Update user subscription.

**Request Body:**
```json
{
  "subscription": "free|basic|pro|enterprise",
  "monthlyLimit": number
}
```

## Rate Limiting

- **Free Tier**: 100 requests/month
- **Basic Tier**: 1,000 requests/month  
- **Pro Tier**: 10,000 requests/month
- **Enterprise Tier**: Unlimited

Rate limit headers included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooks

### POST /webhooks/stripe
Handle Stripe payment webhooks.

### POST /webhooks/usage-alerts
Handle usage limit alerts.

## File Storage

Processed files are stored temporarily and accessible via signed URLs that expire after 24 hours.

## Error Codes

- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid or expired token
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `USAGE_LIMIT_EXCEEDED`: Monthly usage limit exceeded
- `INVALID_REQUEST`: Invalid request format
- `PROCESSING_ERROR`: Error during AI/PDF processing
- `FILE_TOO_LARGE`: Uploaded file exceeds size limit
- `UNSUPPORTED_FORMAT`: File format not supported

## SDK Examples

### JavaScript/Node.js
```javascript
const EternalArchive = require('@eternalarchive/sdk');

const client = new EternalArchive({
  apiKey: 'your-api-key',
  baseURL: 'https://api.eternalarchive.com/v1'
});

// Generate text
const response = await client.ai.generateText({
  prompt: 'Write a blog post about AI',
  model: 'gpt-4'
});

// Process PDF
const pdfResult = await client.pdf.merge({
  files: [file1, file2],
  options: { order: [0, 1] }
});
```

### Python
```python
from eternalarchive import EternalArchive

client = EternalArchive(
    api_key='your-api-key',
    base_url='https://api.eternalarchive.com/v1'
)

# Generate text
response = client.ai.generate_text(
    prompt='Write a blog post about AI',
    model='gpt-4'
)

# Process PDF
pdf_result = client.pdf.merge(
    files=[file1, file2],
    options={'order': [0, 1]}
)
```

This API specification provides a complete backend system for EternalArchive with user management, feature control, and comprehensive AI/PDF processing capabilities.