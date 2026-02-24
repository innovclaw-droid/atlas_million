import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Bot,
  TrendingUp,
  FileText,
  BarChart3,
  MessageSquare,
  Share2,
  Zap,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    id: 1,
    icon: Bot,
    title: "AI Foundations for Realtors",
    lessons: 5,
    duration: "45 min",
    unlocked: true,
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Lead Generation with AI",
    lessons: 5,
    duration: "50 min",
    unlocked: true,
  },
  {
    id: 3,
    icon: FileText,
    title: "Listing Descriptions That Sell",
    lessons: 5,
    duration: "40 min",
    unlocked: true,
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Market Analysis on Autopilot",
    lessons: 5,
    duration: "55 min",
    unlocked: true,
  },
  {
    id: 5,
    icon: MessageSquare,
    title: "Client Communication Mastery",
    lessons: 5,
    duration: "50 min",
    unlocked: true,
  },
  {
    id: 6,
    icon: Share2,
    title: "Social Media Content Machine",
    lessons: 5,
    duration: "45 min",
    unlocked: true,
  },
  {
    id: 7,
    icon: Zap,
    title: "AI-Powered CRM & Workflows",
    lessons: 5,
    duration: "60 min",
    unlocked: true,
  },
  {
    id: 8,
    icon: Bot,
    title: "Build Your AI Assistant",
    lessons: 5,
    duration: "55 min",
    unlocked: true,
  },
];

export default async function CoursesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Your Course</h1>
      <p className="text-gray-600 mb-8">
        AI for Real Estate Agents — 8 modules, 40 lessons
      </p>

      {/* Progress bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-gray-500">0 / 40 lessons</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* Module list */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/dashboard/courses/module/${mod.id}`}
            className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition group"
          >
            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition">
              <mod.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-blue-600 font-medium mb-0.5">
                Module {mod.id}
              </div>
              <h3 className="font-semibold group-hover:text-blue-600 transition">
                {mod.title}
              </h3>
              <p className="text-sm text-gray-500">
                {mod.lessons} lessons • {mod.duration}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {mod.unlocked ? (
                <span className="text-sm text-gray-400">0 / {mod.lessons}</span>
              ) : (
                <Lock className="w-5 h-5 text-gray-300" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
