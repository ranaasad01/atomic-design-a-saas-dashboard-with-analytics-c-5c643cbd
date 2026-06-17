"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail } from 'lucide-react';

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Overview",   href: "#overview"  },
      { label: "Features",   href: "#features"  },
      { label: "Charts",     href: "#charts"    },
      { label: "Pricing",    href: "#pricing"   },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",      href: "#about"     },
      { label: "Blog",       href: "#about"     },
      { label: "Careers",    href: "#about"     },
      { label: "Contact",    href: "#contact"   },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",    href: "#" },
      { label: "Terms of Service",  href: "#" },
      { label: "Cookie Policy",     href: "#" },
      { label: "Security",          href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github,   href: "#", label: "GitHub"   },
  { icon: Twitter,  href: "#", label: "Twitter"  },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail,     href: "#", label: "Email"    },
];

export default function Footer() {
  const shouldReduce = useReducedMotion();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0A0A14] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top grid */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12"
        >
          {/* Brand column */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            className="lg:col-span-2"
          >
            <a href="#" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">{APP_NAME}</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200"
                  whileHover={shouldReduce ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduce ? {} : { scale: 0.93 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={shouldReduce ? {} : fadeInUp}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with Next.js · Recharts · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}