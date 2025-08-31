# AI Content Curator

A modern web application that uses AI to curate and summarize news content from various topics. Built with Next.js, TypeScript, and OpenAI's GPT models.

## Features

- 🎯 **Topic-based Content Curation**: Choose from 8 different news categories
- 🤖 **AI-Powered Summarization**: Get concise summaries of news articles using OpenAI
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- ⚡ **Real-time Updates**: Latest news from NewsAPI
- 🎨 **Modern UI/UX**: Built with Tailwind CSS and Lucide React icons

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **AI**: OpenAI GPT-3.5-turbo
- **News API**: NewsAPI.org

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- NewsAPI key ([Get one here](https://newsapi.org/))
- OpenAI API key ([Get one here](https://platform.openai.com/))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-content-curator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Edit `.env.local` and add your API keys:
```env
NEWS_API_KEY=your_news_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-content-curator/
├─ pages/
│  ├─ index.tsx            # Landing / Topic selection page
│  ├─ feed.tsx             # News feed page
│  ├─ api/
│  │  ├─ news.ts           # Fetch news from API
│  │  └─ summarize.ts      # Call AI summarization API
├─ components/
│  ├─ TopicSelector.tsx    # Topic selection buttons
│  ├─ NewsCard.tsx         # News article card with summarize button
│  └─ Layout.tsx           # Page layout (header/footer)
├─ types/
│  └─ index.ts             # TypeScript interfaces
├─ utils/
│  └─ api.ts               # Axios API helper
├─ styles/
│  └─ globals.css          # Tailwind + custom colors
├─ .env.local              # API keys (NewsAPI, OpenAI)
├─ tailwind.config.js
├─ tsconfig.json
└─ package.json
```

## Usage

1. **Select a Topic**: Choose from 8 different news categories on the home page
2. **Browse News**: View the latest articles related to your selected topic
3. **AI Summarization**: Click the "Summarize" button on any article to get an AI-generated summary
4. **Read Full Articles**: Click "Read Full" to open the complete article in a new tab

## Available Topics

- 💻 Technology
- 💼 Business
- 🔬 Science
- 🏥 Health
- ⚽ Sports
- 🎬 Entertainment
- 🏛️ Politics
- 🌱 Environment

## API Endpoints

### GET `/api/news?topic={topic}`
Fetches news articles for a specific topic from NewsAPI.

### POST `/api/summarize`
Generates AI summaries of news articles using OpenAI.

**Request Body:**
```json
{
  "title": "Article Title",
  "content": "Article content or description"
}
```

**Response:**
```json
{
  "summary": "AI-generated summary of the article"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEWS_API_KEY` | Your NewsAPI.org API key | Yes |
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Customization

### Adding New Topics
Edit `components/TopicSelector.tsx` and add new topics to the `topics` array.

### Changing AI Model
Modify the model in `pages/api/summarize.ts` (default: `gpt-3.5-turbo`).

### Styling
Customize colors and styles in `tailwind.config.js` and `app/globals.css`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing news data
- [OpenAI](https://openai.com/) for AI summarization capabilities
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
