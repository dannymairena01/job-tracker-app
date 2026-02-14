# 🚀 AI Job Application Tracker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748)

An intelligent, AI-powered companion designed to streamline your job search. Track applications, analyze job descriptions, and generate tailored cover letters and resumes automatically.

## ✨ Key Features

- **🤖 Smart Job Parsing**: Simply paste a raw job description, and our AI (GPT-4o) extracts:
  - Company Name & Role
  - Key Skills & Technologies
  - Job Summary & Salary Info
- **📝 AI Cover Letter Generator**: Generates professional, persuasive cover letters tailored to your profile and the specific job requirements.
- **📄 Resume Tailoring**: Automatically rewrites your resume to highlight the experiences most relevant to the role you're applying for.
- **📊 Application Tracking**: Manage your pipeline with statuses (Saved, Applied, Interviewing, Offer, Rejected).
- **🎨 Glassmorphism UI**: A stunning, modern dark-mode interface designed for focus and clarity.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **AI Integration**: [OpenAI API](https://openai.com/) (GPT-4o)
- **Deployment**: Vercel (Recommended)

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/dannymairena01/job-tracker-app.git
cd job-tracker-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-your-openai-api-key"
```

### 4. Initialize Database
Push the schema to your local SQLite database:
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing Utilities
The app includes a built-in testing page to help you demo or test features quickly.

- Navigate to: `http://localhost:3000/test`
- **Seed Profile**: Populates a sample "Senior Product Designer" profile.
- **Seed Job**: Adds a sample "Airbnb" job application.
- **Reset Data**: ⚠️ Wipes all data for a fresh start (Ideal for demo videos).

## 📂 Project Structure

```bash
├── app/
│   ├── actions/       # Server Actions (Jobs, Profile, Test)
│   ├── jobs/[id]/     # Job Detail Page
│   ├── profile/       # Profile Management
│   ├── test/          # Testing Utilities
│   ├── globals.css    # Global Styles & Glassmorphism
│   ├── layout.tsx     # Root Layout
│   └── page.tsx       # Dashboard (Main Page)
├── components/        # Reusable UI Components
├── lib/
│   ├── ai.ts          # OpenAI Integration Logic
│   └── prisma.ts      # Database Client
└── prisma/
    └── schema.prisma  # Database Schema
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.
