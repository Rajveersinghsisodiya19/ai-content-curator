AI Content Curator

AI Content Curator is a modern web application that helps you generate, summarize, and organize content using AI.
Built with Next.js, TypeScript, and Tailwind CSS, it integrates the OpenAI API to deliver high-quality AI-powered content for blogs, articles, or personal projects.

✨ Features

🤖 AI-Powered Content Generation – Create new content with the help of OpenAI.

📑 Content Summarization – Turn long text into concise summaries.

🎨 Clean UI – Responsive and modern design powered by Tailwind CSS.

⚡ Fast & Scalable – Built with Next.js for optimized performance.

🔒 Environment-Based Config – Secure API key management via .env.

🛠️ Tech Stack

Framework: Next.js
 (React)

Language: TypeScript

Styling: Tailwind CSS

AI API: OpenAI

HTTP Client: Axios

Linting/Formatting: ESLint

Package Manager: npm

⚙️ Setup & Installation

Follow these steps to run the project locally:

Clone the repository

git clone https://github.com/your-username/ai-content-curator.git
cd ai-content-curator


Install dependencies

npm install


Setup environment variables
Create a .env.local file in the root directory and add your keys (check .env.example for reference):

OPENAI_API_KEY=your_openai_api_key


Run the development server

npm run dev


Open http://localhost:3000
 in your browser 🎉

📂 Project Structure
ai-content-curator/
├── app/               # Next.js App Router pages & components
├── types/             # TypeScript types
├── public/            # Static assets
├── tailwind.config.js # Tailwind CSS config
├── package.json       # Dependencies & scripts
└── .env.example       # Example environment variables

🚀 Deployment

The project can be easily deployed to Vercel (recommended for Next.js apps) or any Node.js hosting service:

npm run build
npm start
