// ─── Brand Constants ──────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Business intelligence that moves at the speed of your ambition.";
export const APP_DESCRIPTION =
  "Real-time KPIs, revenue charts, user growth metrics, and actionable insights — all in one beautiful dark-mode dashboard.";

// ─── Navigation (single source of truth) ─────────────────────────────────────
// All hrefs point to on-page section anchors on the homepage.
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Overview",  href: "#overview"  },
  { label: "Features",  href: "#features"  },
  { label: "Charts",    href: "#charts"    },
  { label: "Pricing",   href: "#pricing"   },
  { label: "About",     href: "#about"     },
];

export const navCTA = {
  label: "Get Started Free",
  href: "#get-started",
};

// ─── Shared TypeScript Types ──────────────────────────────────────────────────
export interface KPICard {
  id: string;
  label: string;
  value: string;
  delta: number;       // percentage change, positive = up
  deltaLabel: string;
  icon: string;        // lucide icon name
  color: string;       // tailwind text color class
  bgColor: string;     // tailwind bg color class
}

export interface ChartDataPoint {
  period: string;
  revenue?: number;
  mrr?: number;
  users?: number;
  activeUsers?: number;
  churn?: number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

// ─── Brand Palette ────────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  indigo:  "#6366F1",
  purple:  "#8B5CF6",
  cyan:    "#22D3EE",
  dark:    "#1E1E2E",
  surface: "#16162A",
  light:   "#F8FAFC",
} as const;

export const CHART_COLORS = {
  primary:   "#6366F1",
  secondary: "#8B5CF6",
  accent:    "#22D3EE",
  success:   "#34D399",
  warning:   "#FBBF24",
  danger:    "#F87171",
} as const;