"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { APP_NAME, navLinks, navCTA } from "@/lib/data";
import { Activity, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={shouldReduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F1A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {APP_NAME}
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.06] group"
                  whileHover={shouldReduce ? {} : { y: -1 }}
                  whileTap={shouldReduce ? {} : { scale: 0.96 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <motion.a
                href={navCTA.href}
                onClick={(e) => { e.preventDefault(); handleAnchorClick(navCTA.href); }}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-200"
                whileHover={shouldReduce ? {} : { scale: 1.04, y: -1 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
              >
                {navCTA.label}
              </motion.a>

              <motion.button
                className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                whileTap={shouldReduce ? {} : { scale: 0.92 }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0F0F1A]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.07] transition-colors"
                  initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={navCTA.href}
                onClick={(e) => { e.preventDefault(); handleAnchorClick(navCTA.href); }}
                className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 text-center shadow-lg shadow-indigo-500/20"
                initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
              >
                {navCTA.label}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}