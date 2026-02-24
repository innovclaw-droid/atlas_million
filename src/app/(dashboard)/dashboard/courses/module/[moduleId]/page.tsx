import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft, Play, CheckCircle, Circle, Clock, FileDown } from "lucide-react";
import Link from "next/link";

// Static lesson data (will be DB-driven later)
const moduleData: Record<string, { title: string; lessons: { id: string; title: string; duration: string; free: boolean }[] }> = {
  "1": {
    title: "AI Foundations for Realtors",
    lessons: [
      { id: "1-1", title: "What AI Actually Is (and Isn't)", duration: "8 min", free: true },
      { id: "1-2", title: "The AI Tools Landscape", duration: "10 min", free: true },
      { id: "1-3", title: "Your First AI Conversation", duration: "12 min", free: false },
      { id: "1-4", title: "The R.E.A.L. Prompt Formula", duration: "10 min", free: false },
      { id: "1-5", title: "AI Ethics & Boundaries", duration: "8 min", free: false },
    ],
  },
  "2": {
    title: "Lead Generation with AI",
    lessons: [
      { id: "2-1", title: "AI-Powered Prospecting Basics", duration: "10 min", free: false },
      { id: "2-2", title: "Finding Motivated Sellers with AI", duration: "12 min", free: false },
      { id: "2-3", title: "Buyer Lead Magnets That Convert", duration: "10 min", free: false },
      { id: "2-4", title: "AI for Open House Follow-Up", duration: "8 min", free: false },
      { id: "2-5", title: "Building Your AI Lead Machine", duration: "15 min", free: false },
    ],
  },
  "3": {
    title: "Listing Descriptions That Sell",
    lessons: [
      { id: "3-1", title: "Anatomy of a High-Converting Listing", duration: "10 min", free: false },
      { id: "3-2", title: "AI Listing Generator: Step by Step", duration: "12 min", free: false },
      { id: "3-3", title: "Luxury vs. Starter Home Copy", duration: "8 min", free: false },
      { id: "3-4", title: "MLS Optimization with AI", duration: "10 min", free: false },
      { id: "3-5", title: "Batch Listing Creation", duration: "8 min", free: false },
    ],
  },
  "4": {
    title: "Market Analysis on Autopilot",
    lessons: [
      { id: "4-1", title: "AI for Comparative Market Analysis", duration: "12 min", free: false },
      { id: "4-2", title: "Neighborhood Trend Reports", duration: "10 min", free: false },
      { id: "4-3", title: "Pricing Strategy with AI", duration: "12 min", free: false },
      { id: "4-4", title: "Investment Property Analysis", duration: "15 min", free: false },
      { id: "4-5", title: "Client-Ready Market Reports", duration: "10 min", free: false },
    ],
  },
  "5": {
    title: "Client Communication Mastery",
    lessons: [
      { id: "5-1", title: "AI Email Templates That Convert", duration: "10 min", free: false },
      { id: "5-2", title: "Follow-Up Sequences on Autopilot", duration: "12 min", free: false },
      { id: "5-3", title: "Handling Objections with AI Scripts", duration: "10 min", free: false },
      { id: "5-4", title: "Client Update Templates", duration: "8 min", free: false },
      { id: "5-5", title: "Review & Referral Requests", duration: "8 min", free: false },
    ],
  },
  "6": {
    title: "Social Media Content Machine",
    lessons: [
      { id: "6-1", title: "AI Content Calendar Generator", duration: "10 min", free: false },
      { id: "6-2", title: "Instagram & Facebook Post Formulas", duration: "10 min", free: false },
      { id: "6-3", title: "Video Scripts & Reel Ideas", duration: "12 min", free: false },
      { id: "6-4", title: "LinkedIn for Real Estate Pros", duration: "8 min", free: false },
      { id: "6-5", title: "Batch Content Creation Workflow", duration: "10 min", free: false },
    ],
  },
  "7": {
    title: "AI-Powered CRM & Workflows",
    lessons: [
      { id: "7-1", title: "CRM + AI Integration Overview", duration: "10 min", free: false },
      { id: "7-2", title: "Automated Lead Scoring", duration: "12 min", free: false },
      { id: "7-3", title: "Transaction Timeline Automation", duration: "12 min", free: false },
      { id: "7-4", title: "Zapier & Make for Realtors", duration: "15 min", free: false },
      { id: "7-5", title: "Your Automated Pipeline", duration: "12 min", free: false },
    ],
  },
  "8": {
    title: "Build Your AI Assistant",
    lessons: [
      { id: "8-1", title: "Custom GPTs for Real Estate", duration: "12 min", free: false },
      { id: "8-2", title: "Training Your AI on Your Market", duration: "15 min", free: false },
      { id: "8-3", title: "Multi-Tool AI Workflows", duration: "12 min", free: false },
      { id: "8-4", title: "AI for Your Team", duration: "10 min", free: false },
      { id: "8-5", title: "Your AI-Powered Future", duration: "8 min", free: false },
    ],
  },
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { moduleId } = await params;
  const mod = moduleData[moduleId];

  if (!mod) redirect("/dashboard/courses");

  const totalDuration = mod.lessons.reduce((acc, l) => {
    return acc + parseInt(l.duration);
  }, 0);

  return (
    <div>
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="mb-8">
        <div className="text-sm text-blue-600 font-medium mb-1">
          Module {moduleId}
        </div>
        <h1 className="text-3xl font-bold mb-2">{mod.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Play className="w-4 h-4" /> {mod.lessons.length} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {totalDuration} min total
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/dashboard/courses/lesson/${lesson.id}`}
            className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
              <Circle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium group-hover:text-blue-600 transition">
                {lesson.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                <span>{lesson.duration}</span>
                {lesson.free && (
                  <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    Free Preview
                  </span>
                )}
              </div>
            </div>
            <Play className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
