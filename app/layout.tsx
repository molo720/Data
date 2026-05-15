import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mololuwa Ajiteru | Data Analyst Portfolio",
  description:
    "I am Mololuwa Ajiteru, a Computer Science student and Business Intelligence enthusiast focused on SQL, Power BI, Python, visualization, and machine learning.",
  keywords: [
    "Mololuwa Ajiteru",
    "Data Analyst Portfolio",
    "Business Intelligence",
    "Power BI",
    "SQL",
    "Python",
    "Junior Data Analyst",
    "Computer Science Student"
  ],
  authors: [{ name: "Mololuwa Ajiteru" }],
  openGraph: {
    title: "Mololuwa Ajiteru | Data Analyst Portfolio",
    description:
      "My analytics projects, BI dashboards, machine learning practice, and recruiter-ready case studies.",
    type: "website",
    url: "https://mololuwa-ajiteru-portfolio.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mololuwa Ajiteru | Data Analyst Portfolio",
    description:
      "My recruiter-ready data analyst portfolio with dashboards and analytics case studies."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#07111F" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
