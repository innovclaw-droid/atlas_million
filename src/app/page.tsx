"use client";

import { useState } from "react";
import {
  Bot,
  TrendingUp,
  FileText,
  MessageSquare,
  BarChart3,
  Share2,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

const modules = [
  {
    icon: Bot,
    title: "AI Foundations for Realtors",
    desc: "What AI can and can't do — and the exact tools you need",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation with AI",
    desc: "Find motivated buyers and sellers using AI-powered prospecting",
  },
  {
    icon: FileText,
    title: "Listing Descriptions That Sell",
    desc: "AI-crafted property copy that gets clicks and showings",
  },
  {
    icon: BarChart3,
    title: "Market Analysis on Autopilot",
    desc: "Instant comps, pricing strategy, and trend reports",
  },
  {
    icon: MessageSquare,
    title: "Client Communication Mastery",
    desc: "AI email templates, follow-up sequences, and scripts",
  },
  {
    icon: Share2,
    title: "Social Media Content Machine",
    desc: "AI-generated posts, reels, and video scripts that attract clients",
  },
  {
    icon: Zap,
    title: "AI-Powered CRM & Workflows",
    desc: "Automate your entire pipeline from lead to close",
  },
  {
    icon: Bot,
    title: "Build Your AI Assistant",
    desc: "Create custom GPTs and automations tailored to your market",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Residential Agent, Austin TX",
    text: "I went from spending 3 hours on listings to 15 minutes. My clients can't believe the quality.",
    stars: 5,
  },
  {
    name: "Marcus J.",
    role: "Broker, Chicago IL",
    text: "The lead gen module alone paid for the course 10x over. I'm getting 40% more qualified leads.",
    stars: 5,
  },
  {
    name: "Lisa K.",
    role: "Commercial Agent, Miami FL",
    text: "I was skeptical about AI but this course made it so practical. Now I can't imagine working without it.",
    stars: 5,
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (ConvertKit/Resend)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">
              Real<span className="text-blue-600">AI</span> Mastery
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#modules" className="hover:text-gray-900 transition">
              Curriculum
            </a>
            <a href="#pricing" className="hover:text-gray-900 transition">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-gray-900 transition">
              Reviews
            </a>
          </div>
          <a
            href="#waitlist"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            The #1 AI Course for Real Estate Professionals
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Close More Deals
            <br />
            <span className="text-blue-600">With AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Master the AI tools that top-producing agents are using to generate
            leads, write killer listings, and automate their entire business —
            in just 8 weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/25"
            >
              Join the Waitlist <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#modules"
              className="text-gray-600 px-8 py-4 rounded-xl text-lg font-medium hover:text-gray-900 transition"
            >
              See Curriculum →
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Join 500+ agents already on the waitlist
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Sound Familiar?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Most agents know AI is changing the game — but don&apos;t know where
            to start.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Spending hours writing listing descriptions that still sound generic",
              "Losing leads because your follow-up isn't fast enough",
              "Watching tech-savvy competitors steal your market share",
              "Paying thousands for marketing that doesn't convert",
              "Drowning in admin work instead of closing deals",
              "Knowing AI could help but overwhelmed by the options",
            ].map((pain, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white p-5 rounded-xl border border-gray-100"
              >
                <span className="text-red-500 text-lg mt-0.5">✗</span>
                <span className="text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            After RealAI Mastery, You&apos;ll...
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                metric: "10x",
                label: "Faster Listings",
                desc: "Write compelling property descriptions in minutes, not hours",
              },
              {
                metric: "40%",
                label: "More Leads",
                desc: "AI-powered prospecting finds buyers and sellers you're missing",
              },
              {
                metric: "5hrs",
                label: "Saved Per Week",
                desc: "Automate follow-ups, social media, and admin tasks",
              },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.metric}
                </div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            8 Modules. 8 Weeks. Total Transformation.
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Each module includes video lessons, AI templates, action worksheets,
            and community support.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <mod.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      Module {i + 1}
                    </div>
                    <h3 className="font-semibold mb-1">{mod.title}</h3>
                    <p className="text-gray-600 text-sm">{mod.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Agents Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Invest in Your AI Edge
          </h2>
          <p className="text-gray-600 text-center mb-12">
            One deal closed with AI pays for this course 100x over.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Course Only */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">Course Only</h3>
              <div className="text-4xl font-bold mb-1">$497</div>
              <div className="text-gray-500 text-sm mb-6">one-time</div>
              <ul className="space-y-3 mb-8">
                {[
                  "All 8 modules",
                  "40+ video lessons",
                  "Templates & prompts",
                  "Lifetime access",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="block text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Join Waitlist
              </a>
            </div>

            {/* Course + Community */}
            <div className="bg-white p-8 rounded-xl border-2 border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Course + Community
              </h3>
              <div className="text-4xl font-bold mb-1">$497</div>
              <div className="text-gray-500 text-sm mb-6">
                + $49/mo community
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Course Only",
                  "Private community access",
                  "Weekly AI office hours",
                  "Member networking",
                  "New templates monthly",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="block text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Join Waitlist
              </a>
            </div>

            {/* Premium */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">Premium Bundle</h3>
              <div className="text-4xl font-bold mb-1">$697</div>
              <div className="text-gray-500 text-sm mb-6">
                + $49/mo community
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Course + Community",
                  "Full prompt marketplace access",
                  "1-on-1 AI setup call",
                  "Custom GPT built for you",
                  "Priority support",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="block text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Early Access + Launch Discount
          </h2>
          <p className="text-gray-600 mb-8">
            Join the waitlist and get 40% off when we launch, plus a free AI
            prompt pack for real estate.
          </p>
          {submitted ? (
            <div className="bg-green-50 text-green-700 p-6 rounded-xl">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold">You&apos;re on the list!</p>
              <p className="text-sm mt-1">
                We&apos;ll email you when doors open.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
              >
                Join
              </button>
            </form>
          )}
          <p className="text-xs text-gray-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="font-bold">
              Real<span className="text-blue-600">AI</span> Mastery
            </span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} RealAI Mastery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
