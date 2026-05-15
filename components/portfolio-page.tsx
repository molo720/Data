"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  ArrowUp,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  ExternalLink,
  Filter,
  Github,
  Mail,
  Moon,
  Play,
  Search,
  Send,
  Sparkles,
  Sun,
  Video,
  X
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  aboutStats,
  certifications,
  claimsData,
  dashboardKpis,
  dashboardRevenueData,
  heroKpis,
  navItems,
  owner,
  projectCategories,
  projects,
  retentionData,
  skills,
  socialLinks,
  timeline,
  type ProjectCategory
} from "@/data/portfolio";
import { cn, formatCompactNumber } from "@/lib/utils";

type Project = (typeof projects)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const chartColors = ["#6366F1", "#14B8A6", "#F59E0B", "#22D3EE", "#A78BFA"];

const tooltipStyle = {
  borderRadius: "16px",
  border: "1px solid rgba(148, 163, 184, 0.25)",
  background: "rgba(15, 23, 42, 0.92)",
  color: "#F8FAFC",
  boxShadow: "0 18px 44px rgba(0, 0, 0, 0.22)"
};

function Counter({
  value,
  prefix = "",
  suffix = "",
  compact = false
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  const formatted = compact
    ? formatCompactNumber(Math.round(count))
    : Number.isInteger(value)
      ? Math.round(count).toLocaleString()
      : count.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={cn("mb-12 max-w-3xl", centered && "mx-auto text-center")}
    >
      <Badge variant="outline" className="mb-4 bg-background/70">
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="glass-panel flex w-[min(92vw,420px)] flex-col items-center rounded-2xl p-8 text-center">
        <div className="relative mb-6 h-16 w-16">
          <div className="absolute inset-0 rounded-2xl bg-primary/20" />
          <motion.div
            className="absolute inset-2 rounded-2xl bg-gradient-to-br from-primary to-accent"
            animate={{ rotate: [0, 180, 360], scale: [1, 0.92, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="text-sm font-semibold uppercase text-primary">
          Loading analytics portfolio
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Preparing dashboards, KPIs, and project insights.
        </p>
      </div>
    </motion.div>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-indigo-400 to-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Navbar({
  isDark,
  onThemeToggle
}: {
  isDark: boolean;
  onThemeToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
        <a href="#home" className="flex items-center gap-3" aria-label="Go to home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-black text-white">
            MA
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold">{owner.name}</span>
            <span className="text-xs text-muted-foreground">Analytics Portfolio</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onThemeToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href={`mailto:${owner.email}`}>
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel mx-auto mt-3 grid max-w-7xl gap-2 rounded-2xl p-3 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pt-40">
      <div className="analytics-grid absolute inset-0 -z-10 opacity-70" />
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.65 }}
          >
            <h1 className="text-balance text-4xl font-black tracking-normal sm:text-5xl lg:text-6xl">
              Data analyst turning complex datasets into confident business
              decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              I am a Computer Science student at {owner.university}, building
              practical analytics, business intelligence, and machine learning
              projects for teams that need clear answers from messy data.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#projects">
                  <BriefcaseBusiness className="h-5 w-5" />
                  View Projects
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={owner.resumePath} download>
                  <Download className="h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#contact">
                  <Send className="h-5 w-5" />
                  Contact Me
                </a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-2xl p-4">
                  <p className="text-2xl font-black">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -right-3 bottom-4 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />

            <div className="glass-panel relative overflow-hidden rounded-2xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Executive Portfolio Overview
                  </p>
                  <p className="text-2xl font-black">Analytics readiness</p>
                </div>
                <Badge variant="outline" className="bg-background/70">
                  Live KPIs
                </Badge>
              </div>

              <div className="grid gap-4">
                {heroKpis.map((kpi, index) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={kpi.label}
                      className="rounded-2xl border border-border bg-background/72 p-4"
                      animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0] }}
                      transition={{
                        duration: 5 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-bold">{kpi.label}</p>
                            <p className="text-xs text-muted-foreground">{kpi.detail}</p>
                          </div>
                        </div>
                        <p className="text-lg font-black">{kpi.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-slate-950 p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-300">Revenue trend</p>
                  <Sparkles className="h-4 w-4 text-teal-300" />
                </div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardRevenueData.slice(0, 6)}>
                      <defs>
                        <linearGradient id="heroRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.55} />
                          <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#14B8A6"
                        strokeWidth={3}
                        fill="url(#heroRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="glass-panel overflow-hidden rounded-2xl p-5">
              <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-teal-900">
                <div className="absolute inset-0 analytics-grid opacity-50" />
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative grid h-44 w-44 place-items-center rounded-[2rem] border border-white/20 bg-white/10 text-6xl font-black text-white shadow-glow backdrop-blur-xl"
                >
                  MA
                </motion.div>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl">
                  <p className="text-sm font-semibold">{owner.name}</p>
                  <p className="mt-1 text-xs text-slate-200">{owner.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="About"
              title="Computer Science foundation with a business intelligence mindset."
              description="I combine technical curiosity with an analyst's instinct for pattern recognition, stakeholder communication, and decision-focused reporting."
            />
            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                As a Computer Science student at {owner.university}, I am
                building a practical analytics toolkit across SQL, Python, Excel,
                Power BI, dashboard design, and machine learning fundamentals.
              </p>
              <p>
                My work focuses on turning operational data into measurable
                insight: what is growing, what is slowing down, which customers
                need attention, and where teams should act next.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutStats.map((stat) => (
                <Card key={stat.label} className="glass-panel">
                  <CardContent className="p-5">
                    <p className="text-3xl font-black">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-pad bg-secondary/45">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical stack built for reporting, modeling, and stakeholder-ready insight."
          description="The skills are grouped around the way real analyst work happens: cleaning, querying, visualizing, predicting, and communicating outcomes."
          centered
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="glass-panel h-full transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <CardHeader>
                    <div
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white",
                        group.accent
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{group.category}</CardTitle>
                    <CardDescription>
                      Practical tools for dependable analysis workflows.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-semibold">{skill.name}</span>
                          <span className="text-xs font-bold text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectMiniChart({ project }: { project: Project }) {
  return (
    <div className="h-40 rounded-2xl border border-border bg-background/70 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={project.chartData}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="secondary"
            stroke="#14B8A6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProjectCard({
  project,
  onVideo
}: {
  project: Project;
  onVideo: (project: Project) => void;
}) {
  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="glass-panel h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <Image
            src={project.thumbnail}
            alt={`${project.title} analytics dashboard thumbnail`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge variant="accent">{project.category}</Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {project.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-border bg-background/72 p-3"
              >
                <p className="text-base font-black">{kpi.value}</p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
          <ProjectMiniChart project={project} />
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-background/60">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="grid gap-4 text-sm leading-6 text-muted-foreground">
            <div>
              <p className="mb-2 font-bold text-foreground">Key insights</p>
              <ul className="space-y-2">
                {project.keyInsights.slice(0, 2).map((insight) => (
                  <li key={insight} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-bold text-foreground">Challenges solved</p>
              <p>{project.challenges.join(" ")}</p>
            </div>
            <div>
              <p className="mb-2 font-bold text-foreground">Business impact</p>
              <p>{project.businessImpact}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-wrap">
          <Button asChild size="sm" variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              Repository
            </a>
          </Button>
          <Button size="sm" type="button" onClick={() => onVideo(project)}>
            <Video className="h-4 w-4" />
            Video demo
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
}

function VideoModal({
  project,
  onClose
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} video demo`}
          onMouseDown={onClose}
        >
          <motion.div
            className="glass-panel max-h-[92vh] w-full max-w-4xl overflow-auto rounded-2xl p-4"
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <Badge variant="accent" className="mb-3">
                  Video demo
                </Badge>
                <h3 className="text-2xl font-black">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Replace the videoUrl in data/portfolio.ts with a YouTube,
                  Loom, or hosted video embed link when the recorded demo is ready.
                </p>
              </div>
              <Button variant="ghost" size="icon" type="button" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-slate-950">
              {project.videoUrl ? (
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} video demo`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative grid h-full place-items-center overflow-hidden p-6 text-center text-white">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-slate-950/55" />
                  <div className="relative max-w-xl">
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                      <Play className="h-8 w-8 fill-white" />
                    </div>
                    <p className="text-2xl font-black">Demo modal ready</p>
                    <p className="mt-3 text-sm leading-6 text-slate-200">
                      This project already has a video demo entry point. Add a
                      YouTube or Loom embed URL in the project data and the player
                      will render it automatically.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [videoProject, setVideoProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const content = [
        project.title,
        project.description,
        project.category,
        project.businessImpact,
        ...project.technologies,
        ...project.keyInsights
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!search || content.includes(search));
    });
  }, [activeCategory, query]);

  return (
    <section id="projects" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Six analytics case studies designed to speak the language of recruiters and business teams."
          description="Each project includes a business problem, realistic dummy data, KPIs, charts, insights, technical stack, and a video demo entry point that I can replace with my own recording."
          centered
        />

        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects by skill, insight, or business impact"
              className="pl-11"
              aria-label="Search projects"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <Button
                key={category}
                type="button"
                size="sm"
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onVideo={setVideoProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No projects match that search. Try Power BI, churn, SQL, or dashboard.
          </div>
        ) : null}
      </div>
      <VideoModal project={videoProject} onClose={() => setVideoProject(null)} />
    </section>
  );
}

function DashboardShowcase() {
  return (
    <section id="dashboard" className="section-pad bg-secondary/45">
      <div className="container">
        <SectionHeading
          eyebrow="Dashboard Showcase"
          title="Interactive BI widgets that turn portfolio claims into visible analytics skill."
          description="These dashboard panels use Recharts to simulate the kind of executive reporting, customer intelligence, and operational monitoring expected in junior analyst roles."
          centered
        />

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardKpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="glass-panel">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Badge variant="outline" className="bg-background/70">
                        KPI
                      </Badge>
                    </div>
                    <p className="mt-5 text-3xl font-black">
                      <Counter
                        value={kpi.value}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                        compact={kpi.value > 10000}
                      />
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {kpi.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Revenue Trends and KPI Tracking</CardTitle>
              <CardDescription>
                Monthly revenue, target variance, and customer acquisition in one
                executive-ready view.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardRevenueData}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.55} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
                    <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#6366F1"
                      strokeWidth={3}
                      fill="url(#revenueFill)"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target"
                      stroke="#14B8A6"
                      strokeWidth={3}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Customer Retention</CardTitle>
              <CardDescription>
                Cohort-style view of retained versus churned customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
                    <XAxis dataKey="cohort" stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="retained" stackId="a" fill="#14B8A6" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="churned" stackId="a" fill="#F97316" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Claims Analysis Mix</CardTitle>
              <CardDescription>
                Approval, pending, and denial rates across claim types.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={claimsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
                    <XAxis dataKey="type" stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="approved" fill="#14B8A6" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="pending" fill="#F59E0B" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="denied" fill="#EF4444" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Monthly Insights Brief</CardTitle>
              <CardDescription>
                A compact narrative view for recruiters scanning analytical
                reasoning, not just chart design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    label: "Sales growth",
                    value: "+18.6%",
                    body: "Growth is strongest when sales campaigns focus on repeat customers and bundled products."
                  },
                  {
                    label: "Customer retention",
                    value: "86%",
                    body: "Retention improved when medium-risk users received support before renewal dates."
                  },
                  {
                    label: "Claims backlog",
                    value: "-21%",
                    body: "Severity bands and clear queue ownership reduced aging claims across branches."
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-background/70 p-5"
                  >
                    <p className="text-3xl font-black">{item.value}</p>
                    <p className="mt-2 font-bold">{item.label}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-56 rounded-2xl border border-border bg-background/70 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Revenue", value: 42 },
                        { name: "Retention", value: 26 },
                        { name: "Claims", value: 18 },
                        { name: "Forecasting", value: 14 }
                      ]}
                      innerRadius={58}
                      outerRadius={86}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartColors.map((color) => (
                        <Cell key={color} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section id="experience" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="A focused junior analyst timeline with clear growth signals."
          description="The experience story is honest for a student profile while still showing initiative, applied skill, and readiness for internships or junior analyst interviews."
          centered
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-border md:block" />
          <div className="space-y-5">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.role}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative md:pl-14"
                >
                  <span className="absolute left-0 top-6 hidden h-10 w-10 place-items-center rounded-2xl border border-border bg-background text-primary md:grid">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Card className="glass-panel">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xl font-black">{item.role}</p>
                          <p className="text-sm font-semibold text-primary">{item.period}</p>
                        </div>
                        <Badge variant="outline" className="w-fit bg-background/70">
                          Analyst Growth
                        </Badge>
                      </div>
                      <p className="mt-4 leading-7 text-muted-foreground">{item.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.wins.map((win) => (
                          <Badge key={win} variant="secondary">
                            {win}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section className="section-pad bg-secondary/45">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="Learning paths aligned with analytics, BI, SQL, and data science."
          description="These certification cards highlight the professional knowledge areas recruiters expect from a serious junior data analyst profile."
          centered
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="glass-panel h-full transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-xl font-black">{cert.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                    <Badge variant="outline" className="mt-5 bg-background/70">
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "recruiter"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${owner.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Ready for internship, junior analyst, and BI project conversations."
              description="Reach out for data analyst internships, dashboard projects, entry-level analytics roles, and collaborations around data-driven decision making."
            />
            <div className="grid gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="glass-panel flex items-center justify-between rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-bold">{link.label}</span>
                        <span className="text-sm text-muted-foreground">
                          {link.label === "Email" ? owner.email : link.href}
                        </span>
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                The form opens a pre-filled email so recruiters can contact me
                directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required />
                  <Input name="email" type="email" placeholder="Email address" required />
                </div>
                <Textarea
                  name="message"
                  placeholder="Tell me about the role, project, or opportunity"
                  required
                />
                <Button type="submit" size="lg" className="w-full sm:w-fit">
                  <Send className="h-5 w-5" />
                  Send Email
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 py-10">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black">{owner.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{owner.role}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button key={link.label} asChild variant="ghost" size="icon">
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="container mt-8 text-sm text-muted-foreground">
        Copyright {new Date().getFullYear()} {owner.name}. Built for analytics,
        business intelligence, and recruiter discovery.
      </div>
    </footer>
  );
}

function BackToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Button
            type="button"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark || true;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);

    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
      setShowTop(window.scrollY > 650);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <>
      <AnimatePresence>{loading ? <LoadingScreen /> : null}</AnimatePresence>
      <ScrollProgress progress={scrollProgress} />
      <Navbar isDark={isDark} onThemeToggle={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <DashboardShowcase />
        <TimelineSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop visible={showTop} />
    </>
  );
}
