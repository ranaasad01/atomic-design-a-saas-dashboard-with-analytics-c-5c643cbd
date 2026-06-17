"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight, Check, Star, Zap, Shield, BarChart2, Globe, Bell, ChevronDown, Sparkles, Eye, RefreshCw, Download } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS, CHART_COLORS } from "@/lib/data";

// ─── Inline Mock Data ─────────────────────────────────────────────────────────

const revenueData = [
  { period: "Jan", revenue: 42000, mrr: 38000 },
  { period: "Feb", revenue: 48500, mrr: 41000 },
  { period: "Mar", revenue: 53200, mrr: 45500 },
  { period: "Apr", revenue: 49800, mrr: 43000 },
  { period: "May", revenue: 61400, mrr: 52000 },
  { period: "Jun", revenue: 67900, mrr: 58000 },
  { period: "Jul", revenue: 72300, mrr: 63000 },
  { period: "Aug", revenue: 78100, mrr: 68500 },
  { period: "Sep", revenue: 84600, mrr: 74000 },
  { period: "Oct", revenue: 91200, mrr: 80000 },
  { period: "Nov", revenue: 98700, mrr: 86500 },
  { period: "Dec", revenue: 107400, mrr: 94000 },
];

const userGrowthData = [
  { period: "Jan", users: 1200, activeUsers: 980 },
  { period: "Feb", users: 1850, activeUsers: 1420 },
  { period: "Mar", users: 2400, activeUsers: 1900 },
  { period: "Apr", users: 3100, activeUsers: 2500 },
  { period: "May", users: 4200, activeUsers: 3400 },
  { period: "Jun", users: 5800, activeUsers: 4700 },
  { period: "Jul", users: 7300, activeUsers: 5900 },
  { period: "Aug", users: 9100, activeUsers: 7400 },
  { period: "Sep", users: 11400, activeUsers: 9200 },
  { period: "Oct", users: 14200, activeUsers: 11500 },
  { period: "Nov", users: 17800, activeUsers: 14300 },
  { period: "Dec", users: 22100, activeUsers: 17900 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: CHART_COLORS.primary },
  { name: "Direct", value: 24, color: CHART_COLORS.secondary },
  { name: "Referral", value: 18, color: CHART_COLORS.accent },
  { name: "Social Media", value: 12, color: CHART_COLORS.success },
  { name: "Email", value: 8, color: CHART_COLORS.warning },
];

const conversionData = [
  { period: "Mon", rate: 3.2 },
  { period: "Tue", rate: 4.1 },
  { period: "Wed", rate: 3.8 },
  { period: "Thu", rate: 5.2 },
  { period: "Fri", rate: 4.7 },
  { period: "Sat", rate: 3.1 },
  { period: "Sun", rate: 2.8 },
];

const kpiCards = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$107,400",
    delta: 18.4,
    deltaLabel: "vs last month",
    icon: DollarSign,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    glowColor: "shadow-indigo-500/10",
  },
  {
    id: "users",
    label: "Active Users",
    value: "22,100",
    delta: 24.1,
    deltaLabel: "vs last month",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    glowColor: "shadow-purple-500/10",
  },
  {
    id: "mrr",
    label: "Monthly MRR",
    value: "$94,000",
    delta: 8.7,
    deltaLabel: "vs last month",
    icon: TrendingUp,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    glowColor: "shadow-cyan-500/10",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    delta: -0.4,
    deltaLabel: "vs last month",
    icon: Activity,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    glowColor: "shadow-emerald-500/10",
  },
];

const transactions = [
  { id: "tx001", customer: "Acme Corp", email: "billing@acme.com", plan: "Enterprise", amount: 2400, status: "paid" as const, date: "Dec 28" },
  { id: "tx002", customer: "Bright Labs", email: "finance@brightlabs.io", plan: "Pro", amount: 490, status: "paid" as const, date: "Dec 27" },
  { id: "tx003", customer: "Nova Systems", email: "accounts@novasys.com", plan: "Enterprise", amount: 2400, status: "pending" as const, date: "Dec 27" },
  { id: "tx004", customer: "Pixel Studio", email: "hello@pixelstudio.co", plan: "Starter", amount: 99, status: "paid" as const, date: "Dec 26" },
  { id: "tx005", customer: "Drift Agency", email: "ops@driftagency.com", plan: "Pro", amount: 490, status: "failed" as const, date: "Dec 26" },
  { id: "tx006", customer: "Zenith Cloud", email: "billing@zenithcloud.io", plan: "Enterprise", amount: 2400, status: "paid" as const, date: "Dec 25" },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description: "Monitor revenue, user growth, and engagement metrics as they happen. Sub-second data refresh keeps your team always in sync.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Source Tracking",
    description: "Unify data from Stripe, Segment, Mixpanel, and 40+ integrations into a single source of truth for your entire business.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Set custom thresholds and get notified via Slack, email, or SMS the moment a KPI drifts outside your target range.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. End-to-end encryption, SSO, role-based access control, and audit logs included on every plan.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Eye,
    title: "Custom Dashboards",
    description: "Drag-and-drop widgets, saved views, and shareable public links let every team build the exact view they need.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Download,
    title: "One-Click Reports",
    description: "Export polished PDF or CSV reports on any date range. Schedule automated weekly digests straight to your inbox.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Head of Growth, Vercel",
    avatar: "/images/sarah-chen-growth-lead.jpg",
    quote: "Pulse replaced four separate tools for us. Our Monday morning reviews went from 90-minute data wrangling sessions to a 10-minute glance at the dashboard.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "CTO, Linear",
    avatar: "/images/marcus-webb-cto-tech.jpg",
    quote: "The real-time alerting alone saved us from a billing integration bug that would have cost us $40k in missed renewals. ROI was immediate.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "VP Finance, Loom",
    avatar: "/images/priya-nair-vp-finance.jpg",
    quote: "Finally a dashboard that finance and engineering can both love. The MRR cohort charts are exactly what our board wanted to see.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    period: "mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: [
      "Up to 5 team members",
      "10 connected data sources",
      "30-day data history",
      "Standard charts & KPIs",
      "Email reports",
      "Community support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 490,
    period: "mo",
    description: "For growing teams that need deeper insights and automation.",
    features: [
      "Up to 25 team members",
      "Unlimited data sources",
      "1-year data history",
      "Custom dashboards & alerts",
      "Scheduled PDF reports",
      "Slack & webhook integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 2400,
    period: "mo",
    description: "Mission-critical analytics with enterprise-grade security.",
    features: [
      "Unlimited team members",
      "Unlimited data sources",
      "Unlimited data history",
      "SSO & RBAC",
      "SOC 2 compliance reports",
      "Dedicated success manager",
      "SLA & uptime guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const map = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-rose-500/15 text-rose-400 border-rose-500/25",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-4">
      <Sparkles className="w-3 h-3" />
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E1E2E] border border-white/10 rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" && entry.value > 1000 ? `$${(entry.value / 1000).toFixed(1)}k` : entry.value}
        </p>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeChart, setActiveChart] = useState<"revenue" | "users">("revenue");
  const [emailInput, setEmailInput] = useState("");

  const mv = (variants: object) => (shouldReduce ? {} : variants);

  return (
    <main className="bg-[#0A0A14] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/12 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-600/8 blur-[100px] rounded-full" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            variants={mv(fadeIn)}
            initial="hidden"
            animate="visible"
          >
            <SectionLabel>Introducing Pulse Analytics 2.0</SectionLabel>
          </motion.div>

          <motion.h1
            variants={mv(fadeInUp)}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            <span className="text-white">Business intelligence</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              at the speed of ambition.
            </span>
          </motion.h1>

          <motion.p
            variants={mv(fadeInUp)}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_DESCRIPTION}
          </motion.p>

          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              variants={mv(fadeInUp)}
              id="get-started"
              href="#pricing"
              onClick={(e) => { e.preventDefault(); document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
              whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              Start Free 14-Day Trial
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              variants={mv(fadeInUp)}
              href="#charts"
              onClick={(e) => { e.preventDefault(); document.querySelector("#charts")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-base hover:bg-white/[0.1] transition-colors duration-200"
              whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              <Eye className="w-4 h-4 text-slate-400" />
              See Live Demo
            </motion.a>
          </motion.div>

          {/* Hero KPI strip */}
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {kpiCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={mv(scaleIn)}
                  whileHover={shouldReduce ? {} : { y: -4, scale: 1.02 }}
                  className={`relative p-4 rounded-2xl bg-white/[0.04] border ${card.borderColor} backdrop-blur-sm shadow-lg ${card.glowColor} text-left`}
                >
                  <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{card.label}</p>
                  <p className="text-xl font-bold text-white">{card.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {card.delta >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-rose-400" />
                    )}
                    <span className={`text-xs font-medium ${card.delta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {card.delta >= 0 ? "+" : ""}{card.delta}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Everything your team needs to
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                make faster decisions.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From real-time revenue tracking to automated board reports, Pulse gives every stakeholder the exact data they need — without the spreadsheet chaos.
            </p>
          </motion.div>

          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={mv(fadeInUp)}
                  whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
                  className={`p-6 rounded-2xl bg-white/[0.03] border ${feat.border} hover:bg-white/[0.06] transition-colors duration-300 group`}
                >
                  <div className={`w-11 h-11 rounded-xl ${feat.bg} border ${feat.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${feat.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTS / LIVE DEMO ───────────────────────────────────────────── */}
      <section id="charts" className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <SectionLabel>Live Charts</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Your data, beautifully visualized.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Interactive charts that update in real time. Drill into any metric, compare periods, and share insights with one click.
            </p>
          </motion.div>

          {/* Main chart toggle */}
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {activeChart === "revenue" ? "Revenue & MRR" : "User Growth"}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  {activeChart === "revenue" ? "Monthly revenue vs recurring revenue — last 12 months" : "Total vs active users — last 12 months"}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.05] rounded-xl p-1">
                <button
                  onClick={() => setActiveChart("revenue")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeChart === "revenue" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-white"}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveChart("users")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeChart === "users" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-white"}`}
                >
                  Users
                </button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "revenue" ? (
                  <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradMrr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.primary} strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} />
                    <Area type="monotone" dataKey="mrr" name="MRR" stroke={CHART_COLORS.secondary} strokeWidth={2.5} fill="url(#gradMrr)" dot={false} />
                  </AreaChart>
                ) : (
                  <AreaChart data={userGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.accent} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.accent} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="users" name="Total Users" stroke={CHART_COLORS.accent} strokeWidth={2.5} fill="url(#gradUsers)" dot={false} />
                    <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke={CHART_COLORS.success} strokeWidth={2.5} fill="url(#gradActive)" dot={false} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bottom charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Conversion bar chart */}
            <motion.div
              variants={mv(slideInLeft)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-1">Weekly Conversion Rate</h3>
              <p className="text-sm text-slate-400 mb-5">Trial-to-paid conversion by day of week</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rate" name="Conv. Rate" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Traffic pie chart */}
            <motion.div
              variants={mv(slideInRight)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-1">Traffic Sources</h3>
              <p className="text-sm text-slate-400 mb-4">Where your visitors come from</p>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} contentStyle={{ background: "#1E1E2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {trafficSources.map((src) => (
                  <div key={src.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                      <span className="text-xs text-slate-400">{src.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{src.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Transactions table */}
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                <p className="text-sm text-slate-400 mt-0.5">Latest subscription payments across all plans</p>
              </div>
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.05 }}
                whileTap={shouldReduce ? {} : { scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.1] text-sm text-slate-300 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {["Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(transactions ?? []).map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{tx.customer}</p>
                          <p className="text-xs text-slate-500">{tx.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">{tx.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">${(tx.amount ?? 0).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-400">{tx.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-purple-600/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Trusted by teams at the
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                world's fastest-growing companies.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={mv(fadeInUp)}
                whileHover={shouldReduce ? {} : { y: -6 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-indigo-500/20"
                    onError={(e) => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).className = "w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center"; }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
          >
            {[
              { value: "4,200+", label: "Companies using Pulse" },
              { value: "$2.1B", label: "Revenue tracked monthly" },
              { value: "99.98%", label: "Uptime SLA" },
              { value: "< 1s", label: "Average data refresh" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={mv(scaleIn)}
                className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Simple, transparent pricing.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              No hidden fees. No per-seat surprises. Start free for 14 days — no credit card required.
            </p>
          </motion.div>

          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={mv(fadeInUp)}
                whileHover={shouldReduce ? {} : { y: -6 }}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-indigo-500/15 to-purple-500/10 border-indigo-500/40 shadow-2xl shadow-indigo-500/20"
                    : "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/40">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-5xl font-extrabold text-white">${(plan.price ?? 0).toLocaleString()}</span>
                  <span className="text-slate-400 mb-2">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(plan.features ?? []).map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-indigo-500/20" : "bg-white/[0.06]"}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? "text-indigo-400" : "text-slate-400"}`} />
                      </div>
                      <span className="text-sm text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#get-started"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" }); }}
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                      : "bg-white/[0.07] border border-white/[0.1] text-white hover:bg-white/[0.12]"
                  }`}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-600/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={mv(slideInLeft)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <SectionLabel>About Pulse</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Built by operators,
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  for operators.
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                We started Pulse after spending years stitching together Looker, Metabase, and custom Retool dashboards — only to still miss the metric that mattered most on a Friday afternoon. We knew there had to be a better way.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Today, Pulse serves over 4,200 companies — from seed-stage startups to publicly traded SaaS businesses — giving every team a single, beautiful, always-accurate view of their business health.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2021" },
                  { label: "Team size", value: "48 people" },
                  { label: "HQ", value: "San Francisco" },
                  { label: "Funding", value: "Series B · $42M" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                    <p className="text-base font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={mv(slideInRight)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              {/* Mini dashboard preview */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Live · Updated just now</span>
                  </div>
                </div>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="mrr" name="MRR" stroke={CHART_COLORS.accent} strokeWidth={2} dot={false} strokeDasharray="4 2" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "ARR", value: "$1.29M", up: true },
                    { label: "NPS", value: "72", up: true },
                    { label: "CAC", value: "$184", up: false },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                      <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                      <p className="text-sm font-bold text-white">{m.value}</p>
                      <div className="flex items-center justify-center gap-0.5 mt-1">
                        {m.up ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-rose-400" />}
                        <span className={`text-xs ${m.up ? "text-emerald-400" : "text-rose-400"}`}>{m.up ? "↑" : "↓"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-3 shadow-xl shadow-indigo-500/40"
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA / GET STARTED ────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Ready to see your business
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                in a whole new light?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Join 4,200+ companies already using Pulse. Set up in under 5 minutes. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-8">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your work email"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all duration-200"
              />
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 whitespace-nowrap"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              {["14-day free trial", "No credit card needed", "Cancel anytime", "SOC 2 certified"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}