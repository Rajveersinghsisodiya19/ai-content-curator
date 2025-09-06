# AI Content Curator

A modern web application that uses **AI (Llama 3.2 via Ollama)** to curate and summarize news content from various topics.  
Built with **Next.js**, **TypeScript**, and **Ollama**.

---

## ✨ Features

- 🎯 **Topic-based Content Curation** – Choose from 8 different news categories  
- 🤖 **AI-Powered Summarization** – Get concise summaries of news articles using Llama 3.2 (via Ollama)  
- 📱 **Responsive Design** – Beautiful, modern UI that works on all devices  
- ⚡ **Real-time Updates** – Latest news from NewsAPI  
- 🎨 **Modern UI/UX** – Built with Tailwind CSS and Lucide React icons  

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript  
- **Styling**: Tailwind CSS 4  
- **Icons**: Lucide React  
- **HTTP Client**: Axios  
- **AI**: [Ollama](https://ollama.ai) (Llama 3.2:latest)  
- **News API**: [NewsAPI.org](https://newsapi.org/)  

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js 18+  
- npm or yarn  
- [NewsAPI key](https://newsapi.org/)  
- [Ollama](https://ollama.ai) installed locally  

---

### 🔧 Installation

1. **Clone the repository**  
```bash
git clone https://github.com/Rajveersinghsisodiya19/ai-content-curator.git
cd ai-content-curator

2. **Install dependencies**  

npm install


3. **Set up environment variables**

cp .env.example .env.local


4. **Edit .env.local and add your API keys**

NEWS_API_KEY=your_news_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

5. Install and run Ollama
  Download and install Ollama from here.
  Then pull the Llama 3.2:latest model:

ollama pull llama3.2:latest

6. **Run the development server**

npm run dev
Now open 👉 http://localhost:3000

### 📌 Usage

1. Select a Topic – Choose from 8 different news categories on the home page

2. Browse News – View the latest articles related to your selected topic

3. AI Summarization – Click the "Summarize" button on any article to get an AI-generated summary

4. Read Full Articles – Click "Read Full" to open the complete article in a new tab

### 📑 Available Topics

💻 Technology
<br>
💼 Business
<br>
🔬 Science
<br>
🏥 Health
<br>
⚽ Sports
<br>
🎬 Entertainment
<br>
🏛️ Politics
<br>
🌱 Environment
