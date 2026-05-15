# Mololuwa Ajiteru Data Analyst Portfolio

A modern, recruiter-focused Data Analyst portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Shadcn-style UI components, Lucide Icons, and Recharts.

## Features

- Premium corporate analytics interface with dark and light mode
- Responsive dashboard-inspired layout
- Sticky navigation, scroll progress indicator, smooth scrolling, and back-to-top control
- Hero KPI cards for SQL, Power BI, Python, Machine Learning, and Data Visualization
- About section with animated counters and professional profile placeholder
- Categorized skills with animated progress bars
- Six realistic analytics projects with thumbnails, KPIs, charts, insights, challenges, business impact, repository buttons, and video demo modals
- Recharts dashboard showcase with revenue, retention, claims, and KPI widgets
- Experience timeline, certification cards, contact form, and footer
- Resume download from `public/Mololuwa_Ajiteru_Data_Analyst_CV.docx`

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn-style component architecture
- Lucide Icons
- Recharts

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  portfolio-page.tsx
  ui/
data/
  portfolio.ts
lib/
  utils.ts
public/
  Mololuwa_Ajiteru_Data_Analyst_CV.docx
  favicon.svg
  projects/
styles/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Customizing Content

Most portfolio content is stored in `data/portfolio.ts`.

- Update owner details in the `owner` object.
- Replace project descriptions, metrics, links, and chart data in the `projects` array.
- Add YouTube, Loom, or hosted embed URLs to each project's `videoUrl` field.
- Replace project thumbnails in `public/projects/`.
- Replace the resume file in `public/` while keeping the same filename, or update `owner.resumePath`.

## Production Build

```bash
npm run build
npm run start
```


No environment variables are required for the current version.
