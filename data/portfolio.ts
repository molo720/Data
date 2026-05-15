import {
  BarChart3,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardCheck,
  Code2,
  Database,
  FileSpreadsheet,
  Github,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Mail,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  UsersRound
} from "lucide-react";

export const owner = {
  name: "Mololuwa Ajiteru",
  role: "Data Analyst | Business Intelligence Enthusiast",
  university: "Federal University Oye-Ekiti",
  email: "ajiterumololuwa@gmail.com",
  linkedIn: "https://www.linkedin.com/in/mololuwa-ajiteru-a574483bb",
  github: "https://github.com/molo720",
  resumePath: "/Mololuwa_Ajiteru_Data_Analyst_CV.docx"
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboards", href: "#dashboard" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export const heroKpis = [
  { label: "SQL", value: "92%", detail: "Querying and data modeling", icon: Database },
  { label: "Power BI", value: "88%", detail: "Executive dashboards", icon: LayoutDashboard },
  { label: "Python", value: "86%", detail: "Analytics automation", icon: Code2 },
  { label: "Machine Learning", value: "78%", detail: "Prediction workflows", icon: BrainCircuit },
  { label: "Data Visualization", value: "90%", detail: "Storytelling with charts", icon: ChartNoAxesCombined }
];

export const aboutStats = [
  { label: "Analytics Projects", value: 18, suffix: "+" },
  { label: "Dashboard Concepts", value: 12, suffix: "+" },
  { label: "Tools Practiced", value: 14, suffix: "+" },
  { label: "Learning Hours", value: 800, suffix: "+" }
];

export const skills = [
  {
    category: "Data Analysis",
    icon: Table2,
    accent: "from-indigo-500 to-sky-500",
    items: [
      { name: "SQL", level: 92 },
      { name: "Excel", level: 90 },
      { name: "Python", level: 86 },
      { name: "Pandas", level: 84 },
      { name: "NumPy", level: 80 }
    ]
  },
  {
    category: "Visualization",
    icon: BarChart3,
    accent: "from-teal-500 to-emerald-500",
    items: [
      { name: "Power BI", level: 88 },
      { name: "Tableau", level: 74 },
      { name: "Matplotlib", level: 82 },
      { name: "Seaborn", level: 80 }
    ]
  },
  {
    category: "Machine Learning",
    icon: BrainCircuit,
    accent: "from-violet-500 to-fuchsia-500",
    items: [
      { name: "Scikit-learn", level: 78 },
      { name: "Data preprocessing", level: 84 },
      { name: "Predictive analytics", level: 76 }
    ]
  },
  {
    category: "Tools",
    icon: NotebookTabs,
    accent: "from-amber-500 to-rose-500",
    items: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 82 },
      { name: "VS Code", level: 88 },
      { name: "Jupyter Notebook", level: 86 }
    ]
  }
];

export type ProjectCategory = "Dashboards" | "Predictive Analytics" | "Business Intelligence" | "Machine Learning";

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Dashboards",
  "Predictive Analytics",
  "Business Intelligence",
  "Machine Learning"
];

export const projects = [
  {
    title: "Sales Dashboard Analysis",
    category: "Dashboards" as ProjectCategory,
    thumbnail: "/projects/sales-dashboard.svg",
    description:
      "A Power BI-style sales command center that tracks product revenue, regional performance, order mix, and monthly growth signals for an executive team.",
    technologies: ["Power BI", "SQL", "Excel", "DAX", "Data Modeling"],
    keyInsights: [
      "South-West region produced 34% of quarterly revenue.",
      "Bundled products improved average order value by 18%.",
      "Low-margin SKUs were concentrated in two product families."
    ],
    challenges: [
      "Unified messy sales exports from multiple branches.",
      "Designed measures for year-to-date revenue and category variance."
    ],
    businessImpact:
      "Helped managers identify high-performing products, reduce underperforming inventory, and prioritize regional sales campaigns.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Revenue", value: "$248K" },
      { label: "Growth", value: "18.6%" },
      { label: "Regions", value: "6" }
    ],
    chartData: [
      { name: "Jan", value: 32, secondary: 21 },
      { name: "Feb", value: 44, secondary: 29 },
      { name: "Mar", value: 51, secondary: 37 },
      { name: "Apr", value: 63, secondary: 48 },
      { name: "May", value: 78, secondary: 59 },
      { name: "Jun", value: 91, secondary: 70 }
    ]
  },
  {
    title: "Insurance Claims Analytics",
    category: "Business Intelligence" as ProjectCategory,
    thumbnail: "/projects/claims-analytics.svg",
    description:
      "An operational claims analytics dashboard for monitoring claim frequency, settlement speed, fraud risk segments, and branch-level performance.",
    technologies: ["SQL", "Power BI", "Excel", "Data Cleaning", "KPI Design"],
    keyInsights: [
      "Claims above $7,500 showed a longer review cycle by 2.4 days.",
      "Auto claims accounted for 41% of high-risk submissions.",
      "Branch triage improved fastest after using severity bands."
    ],
    challenges: [
      "Cleaned duplicate claim IDs and inconsistent settlement categories.",
      "Created aging buckets to expose process bottlenecks."
    ],
    businessImpact:
      "Created visibility into claim backlog, improving triage decisions and making high-risk cases easier to prioritize.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Claims", value: "1,284" },
      { label: "Risk Flag", value: "9.8%" },
      { label: "Cycle Time", value: "4.6d" }
    ],
    chartData: [
      { name: "Health", value: 38, secondary: 12 },
      { name: "Auto", value: 52, secondary: 23 },
      { name: "Home", value: 31, secondary: 10 },
      { name: "Travel", value: 24, secondary: 8 },
      { name: "Life", value: 19, secondary: 6 }
    ]
  },
  {
    title: "Customer Churn Prediction",
    category: "Predictive Analytics" as ProjectCategory,
    thumbnail: "/projects/churn-prediction.svg",
    description:
      "A churn modeling project that scores customers by cancellation likelihood and translates model outputs into practical retention actions.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "Seaborn"],
    keyInsights: [
      "Month-to-month customers were 2.7x more likely to churn.",
      "Low support satisfaction strongly correlated with cancellation.",
      "Retention offers performed best for medium-risk customers."
    ],
    challenges: [
      "Handled class imbalance and encoded categorical customer behavior.",
      "Balanced accuracy with interpretability for business stakeholders."
    ],
    businessImpact:
      "Supported proactive retention campaigns by ranking customers into high, medium, and low churn-risk segments.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Accuracy", value: "84%" },
      { label: "Recall", value: "79%" },
      { label: "Risk Segments", value: "3" }
    ],
    chartData: [
      { name: "Low", value: 64, secondary: 12 },
      { name: "Medium", value: 29, secondary: 31 },
      { name: "High", value: 14, secondary: 57 }
    ]
  },
  {
    title: "Retail Revenue Insights",
    category: "Business Intelligence" as ProjectCategory,
    thumbnail: "/projects/retail-revenue.svg",
    description:
      "A retail analytics study that investigates revenue drivers, basket composition, seasonal demand, and category profitability.",
    technologies: ["SQL", "Python", "Pandas", "Power BI", "Forecasting"],
    keyInsights: [
      "Weekend promotions lifted units sold by 22% but reduced margin by 5%.",
      "Top 20 products contributed 61% of total gross profit.",
      "Repeat customers had 1.8x higher basket value."
    ],
    challenges: [
      "Created product-level profitability views from transaction data.",
      "Separated revenue growth from discount-driven volume spikes."
    ],
    businessImpact:
      "Improved merchandising decisions by highlighting profitable categories, seasonal patterns, and retention opportunities.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Revenue", value: "$412K" },
      { label: "Margin", value: "31%" },
      { label: "Repeat Buyers", value: "44%" }
    ],
    chartData: [
      { name: "Groceries", value: 82, secondary: 31 },
      { name: "Fashion", value: 58, secondary: 27 },
      { name: "Beauty", value: 43, secondary: 22 },
      { name: "Home", value: 39, secondary: 19 },
      { name: "Electronics", value: 64, secondary: 25 }
    ]
  },
  {
    title: "Student Performance Dashboard",
    category: "Dashboards" as ProjectCategory,
    thumbnail: "/projects/student-dashboard.svg",
    description:
      "An academic BI dashboard that tracks attendance, assignment completion, course scores, and intervention needs across student cohorts.",
    technologies: ["Excel", "Power BI", "DAX", "Data Visualization", "Academic Analytics"],
    keyInsights: [
      "Attendance below 70% was associated with a 16-point score drop.",
      "Early assignment completion predicted stronger final performance.",
      "Two courses required targeted academic support."
    ],
    challenges: [
      "Standardized grading scales across courses and departments.",
      "Built intuitive student risk categories for academic advisors."
    ],
    businessImpact:
      "Helped educators spot performance gaps early and prioritize support for students most likely to need intervention.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Students", value: "720" },
      { label: "Avg Score", value: "76%" },
      { label: "At Risk", value: "14%" }
    ],
    chartData: [
      { name: "CS101", value: 78, secondary: 88 },
      { name: "MTH204", value: 69, secondary: 72 },
      { name: "STA202", value: 74, secondary: 79 },
      { name: "CSC214", value: 82, secondary: 86 },
      { name: "GST", value: 71, secondary: 80 }
    ]
  },
  {
    title: "Fraud Detection Analysis",
    category: "Machine Learning" as ProjectCategory,
    thumbnail: "/projects/fraud-detection.svg",
    description:
      "A transaction analytics project that flags suspicious payment behavior using anomaly features, transaction velocity, and supervised modeling.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Matplotlib"],
    keyInsights: [
      "High transaction velocity was the strongest risk indicator.",
      "Late-night card-not-present purchases had elevated fraud scores.",
      "Model thresholds reduced false positives while preserving recall."
    ],
    challenges: [
      "Worked with heavily imbalanced transaction classes.",
      "Translated model scores into analyst-friendly risk bands."
    ],
    businessImpact:
      "Reduced manual review noise by ranking transactions by likelihood of fraud and surfacing the most urgent cases first.",
    githubUrl: "https://github.com/molo720",
    liveUrl: "#dashboard",
    videoUrl: "",
    kpis: [
      { label: "Precision", value: "81%" },
      { label: "Recall", value: "86%" },
      { label: "Risk Bands", value: "4" }
    ],
    chartData: [
      { name: "Mon", value: 11, secondary: 4 },
      { name: "Tue", value: 16, secondary: 7 },
      { name: "Wed", value: 13, secondary: 5 },
      { name: "Thu", value: 21, secondary: 9 },
      { name: "Fri", value: 28, secondary: 12 },
      { name: "Sat", value: 24, secondary: 10 }
    ]
  }
];

export const dashboardRevenueData = [
  { month: "Jan", revenue: 42000, target: 39000, customers: 860 },
  { month: "Feb", revenue: 51000, target: 45000, customers: 940 },
  { month: "Mar", revenue: 56000, target: 52000, customers: 1020 },
  { month: "Apr", revenue: 61000, target: 57000, customers: 1110 },
  { month: "May", revenue: 73000, target: 65000, customers: 1260 },
  { month: "Jun", revenue: 82000, target: 72000, customers: 1380 },
  { month: "Jul", revenue: 88000, target: 78000, customers: 1510 }
];

export const retentionData = [
  { cohort: "Jan", retained: 74, churned: 26 },
  { cohort: "Feb", retained: 78, churned: 22 },
  { cohort: "Mar", retained: 81, churned: 19 },
  { cohort: "Apr", retained: 84, churned: 16 },
  { cohort: "May", retained: 86, churned: 14 }
];

export const claimsData = [
  { type: "Health", approved: 72, pending: 18, denied: 10 },
  { type: "Auto", approved: 64, pending: 24, denied: 12 },
  { type: "Home", approved: 69, pending: 21, denied: 10 },
  { type: "Travel", approved: 78, pending: 14, denied: 8 }
];

export const dashboardKpis = [
  { label: "Tracked Revenue", value: 451000, prefix: "$", suffix: "", icon: CircleDollarSign },
  { label: "Retention Lift", value: 12.8, prefix: "", suffix: "%", icon: UsersRound },
  { label: "Claims Reviewed", value: 1284, prefix: "", suffix: "", icon: ClipboardCheck },
  { label: "Forecast Accuracy", value: 87.4, prefix: "", suffix: "%", icon: Target }
];

export const timeline = [
  {
    role: "Data Analyst Intern",
    period: "2026",
    icon: BriefcaseBusiness,
    summary:
      "Built reporting workflows, cleaned spreadsheet data, and translated raw records into weekly KPI summaries for team decision-making.",
    wins: ["Improved data refresh speed", "Created executive KPI snapshots"]
  },
  {
    role: "Freelance Analytics Projects",
    period: "2025 - Present",
    icon: LineChart,
    summary:
      "Designed practical dashboards and analysis reports for sales, academic, and customer behavior scenarios using realistic business cases.",
    wins: ["Built reusable dashboards", "Delivered insight-first reports"]
  },
  {
    role: "Academic BI Projects",
    period: "Federal University Oye-Ekiti",
    icon: GraduationCap,
    summary:
      "Applied computer science fundamentals to data modeling, database queries, visualization, and analytical problem solving.",
    wins: ["SQL and database practice", "Strong analytical foundations"]
  },
  {
    role: "Machine Learning Practice",
    period: "Ongoing",
    icon: Binary,
    summary:
      "Practiced supervised learning workflows, preprocessing, model evaluation, and business-friendly interpretation of predictions.",
    wins: ["Scikit-learn projects", "Prediction-focused analytics"]
  }
];

export const certifications = [
  {
    title: "Google Data Analytics",
    issuer: "Google Career Certificates",
    status: "Professional track",
    icon: Sparkles
  },
  {
    title: "IBM Data Science",
    issuer: "IBM Skills Network",
    status: "Data science foundations",
    icon: BrainCircuit
  },
  {
    title: "Power BI Certification",
    issuer: "Microsoft learning path",
    status: "BI reporting focus",
    icon: LayoutDashboard
  },
  {
    title: "SQL Certification",
    issuer: "Database analytics track",
    status: "Querying and modeling",
    icon: ShieldCheck
  }
];

export const socialLinks = [
  { label: "LinkedIn", href: owner.linkedIn, icon: BriefcaseBusiness },
  { label: "GitHub", href: owner.github, icon: Github },
  { label: "Email", href: `mailto:${owner.email}`, icon: Mail }
];
