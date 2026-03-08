# ReadyMe — The On-Demand Resume

ReadyMe is a live resume builder that automatically tailors your resume to specific job descriptions. It features an AI-powered chatbox for editing your resume through natural language, and a GitHub-style diff viewer to review changes before applying them.

## Features

- **Live Resume Preview** — View a formatted, ATS-optimized resume that updates in real time
- **Job-Specific Tailoring** — Pin job descriptions and get automatically tailored resume variants with match scores
- **AI Chat Editor** — Open the chat panel and describe changes in plain English (e.g. "Emphasize leadership experience")
- **GitHub-Style Diff Viewer** — Review AI-generated changes line-by-line with green (added) and red (removed) highlighting before accepting or rejecting
- **Resume Library** — Browse and manage all your resume versions in one place
- **Activity Tracker** — Monitor LinkedIn posts, skill endorsements, and job applications that feed into your resume
- **Platform Integrations** — Connect LinkedIn, Indeed, Handshake, and GitHub to keep your resume synced
- **Export Options** — Download as PDF or DOCX, or share via a public link

## Getting Started

```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## How to Use the AI Chat

1. Click the **💬 AI Chat** button in the bottom action bar
2. Type a prompt describing what you want changed
3. Review the diff that appears above the resume
4. Click **✓ Accept Changes** or **✕ Reject Changes**

### Example Prompts

| Prompt | What It Does |
|--------|-------------|
| "Emphasize leadership" | Reframes title, summary, and bullets around leadership |
| "Make it concise" | Trims bullet points and removes extra projects |
| "Add technical keywords" | Adds languages and infrastructure skills for ATS |
| "Quantify achievements" | Enriches bullets with dollar amounts and percentages |

## Tech Stack

- **React** with TypeScript
- **Tailwind CSS** (via CDN)
- Mock AI logic for demonstration (no API key required)

## License

MIT
