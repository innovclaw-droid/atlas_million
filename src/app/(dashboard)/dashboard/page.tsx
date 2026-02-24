import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, MessageSquare, Store, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
      <p className="text-gray-600 mb-8">
        Pick up where you left off or explore something new.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            label: "Course Progress",
            value: "0%",
            icon: TrendingUp,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Lessons Completed",
            value: "0 / 40",
            icon: BookOpen,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Community Posts",
            value: "0",
            icon: MessageSquare,
            color: "text-purple-600 bg-purple-50",
          },
          {
            label: "Prompts Saved",
            value: "0",
            icon: Store,
            color: "text-amber-600 bg-amber-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-gray-100"
          >
            <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/courses"
          className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition group"
        >
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition">
            AI for Real Estate Agents
          </h3>
          <p className="text-gray-600 text-sm">
            8 modules • 40+ lessons • Start from the beginning
          </p>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </Link>
        <Link
          href="/dashboard/marketplace"
          className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition group"
        >
          <Store className="w-8 h-8 text-amber-600 mb-3" />
          <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition">
            Prompt Marketplace
          </h3>
          <p className="text-gray-600 text-sm">
            Ready-to-use AI prompts for listings, emails, social media & more
          </p>
        </Link>
      </div>
    </div>
  );
}
