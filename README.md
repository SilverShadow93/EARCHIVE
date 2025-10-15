# EternalArchive - Centralized AI & PDF Toolkit

A comprehensive web application providing powerful AI tools, PDF utilities, and email assistants with centralized user management and feature control.

## 🚀 Features

### 🤖 AI Tools (11 tools)
- **AI Text Summarizer** - Condense long texts with customizable length and format
- **GPT-powered Chatbot** - Interactive AI assistant for any topic
- **Code Assistant** - Programming help with multi-language support
- **Content Generator** - Create blogs, ads, captions, and product descriptions
- **Grammar & Style Checker** - Advanced writing improvement
- **AI Translator** - Multi-language translation with tone awareness
- **Text-to-Speech** - Convert text to natural speech with voice controls
- **Sentiment Analyzer** - Analyze emotional tone and sentiment
- **Resume Optimizer** - AI-powered resume enhancement with scoring
- **Screen/Text Analyzer** - Analyze screenshots or text content
- **Image Generator** - Create images from text descriptions

### 📄 PDF Tools (13 tools)
- **Merge PDFs** - Combine multiple PDF files
- **Split PDFs** - Extract pages or split into separate documents
- **Compress PDF** - Reduce file size while maintaining quality
- **Convert to/from PDF** - Support for DOCX, PPT, JPG, and more
- **OCR Scanner** - Extract text from scanned documents
- **Password Add/Remove** - Secure or unlock PDF documents
- **Page Reordering** - Rearrange, duplicate, or delete pages
- **Rotate Pages** - Fix page orientation
- **Add Watermark** - Brand protection with text/image watermarks
- **PDF Annotator** - Highlight, comment, and annotate
- **Fill & Sign PDFs** - Electronic form completion and signing
- **PDF to Text** - Extract all text content
- **Edit PDF Metadata** - Modify document properties

### 📧 Email Tools (8 tools)
- **Email Generator** - Create professional emails with AI
- **Email Rewriter** - Improve clarity and tone
- **Email Summarizer** - Condense long email threads
- **Cold Email Generator** - Effective outreach emails
- **Smart Reply Suggestions** - AI-powered response options
- **Email Template Manager** - Create and manage reusable templates
- **Bulk Email Personalizer** - Mass customization with CSV data
- **Follow-Up Email Creator** - Timed follow-up sequences

### 👥 User Management System
- **User Authentication** - Secure login and registration
- **Subscription Tiers** - Free, Basic, Pro, and Enterprise plans
- **Feature Access Control** - Role-based feature availability
- **Usage Tracking** - Monitor API usage and limits
- **Centralized API** - All features powered by owner's API

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with dark/light theme support
- **State Management**: React Context API
- **Build Tool**: Vite
- **Backend Integration**: Centralized API system
- **Authentication**: JWT-based user management
- **Animations**: CSS transitions and transforms

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eternal-archive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your central API URL:
   ```env
   VITE_CENTRAL_API_URL=https://api.eternalarchive.com/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Centralized API System
- **Single API Endpoint**: All features route through owner's API
- **User Management**: Authentication, subscriptions, and permissions
- **Feature Control**: Owner controls which features are available
- **Usage Monitoring**: Track and limit user API consumption
- **Scalable Backend**: Supports multiple subscription tiers


## 🎨 Design Features

- **Dark Theme by Default** with elegant gold accents
- **Light/Dark Theme Toggle** with smooth transitions
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Smooth Animations** throughout the interface
- **Card-based Layout** with intuitive navigation
- **Modern Typography** with consistent spacing
- **Accessible Design** with proper contrast ratios

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 💰 Monetization Features

- **Subscription Plans**: Multiple tiers with different features
- **Usage-based Billing**: Pay per API call or monthly limits
- **Feature Upselling**: Premium features drive upgrades
- **Enterprise Sales**: Custom plans for large organizations
- **API Access**: Developers can integrate via paid API

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Configuration

For production deployment, configure:

```env
VITE_CENTRAL_API_URL=https://your-api-domain.com/v1
```

## 📋 Backend API Requirements

The frontend expects a REST API with these endpoints:

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Token verification

### AI Processing Endpoints
- `POST /ai/chat` - Chat completions
- `POST /ai/generate-text` - Text generation
- `POST /ai/summarize` - Text summarization
- `POST /ai/translate` - Language translation
- `POST /ai/generate-image` - Image generation
- `POST /ai/analyze-image` - Image analysis

### PDF Processing Endpoints
- `POST /pdf/merge` - Merge PDF files
- `POST /pdf/split` - Split PDF files
- `POST /pdf/compress` - Compress PDFs
- `POST /pdf/convert` - Convert PDF formats
- `POST /pdf/ocr` - OCR text extraction

### User Management Endpoints
- `GET /user/profile` - User profile data
- `GET /user/usage` - Usage statistics
- `GET /user/subscription` - Subscription info
- `PUT /user/profile` - Update profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Business Model

EternalArchive operates on a SaaS model with:
- **Freemium Approach**: Free tier to attract users
- **Subscription Revenue**: Monthly/annual recurring revenue
- **Usage-based Pricing**: Scale with customer needs
- **Enterprise Licensing**: Custom solutions for large clients
- **API Monetization**: Developer access to platform features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page

## 🙏 Acknowledgments

- OpenAI for providing advanced AI capabilities
- Tailwind CSS for the utility-first CSS framework
- React team for the excellent framework
- All contributors and users of EternalArchive

---

**EternalArchive** - Centralized AI-powered productivity platform for the modern web.