import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MessageSquare, Plus, ThumbsUp, Clock } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "General",
  "Introductions",
  "Course Q&A",
  "Wins & Results",
  "Tips & Tricks",
  "Prompt Sharing",
];

// Placeholder posts
const posts = [
  {
    id: "1",
    title: "Welcome to the RealAI Community! 👋",
    author: "RealAI Team",
    category: "General",
    replies: 12,
    likes: 34,
    time: "2 days ago",
    pinned: true,
  },
  {
    id: "2",
    title: "Share your best AI-generated listing description here",
    author: "Sarah M.",
    category: "Prompt Sharing",
    replies: 8,
    likes: 21,
    time: "5 hours ago",
    pinned: false,
  },
  {
    id: "3",
    title: "Just closed a deal using the Module 2 lead gen strategy!",
    author: "Marcus J.",
    category: "Wins & Results",
    replies: 15,
    likes: 45,
    time: "1 day ago",
    pinned: false,
  },
];

export default async function CommunityPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-gray-600">
            Connect with fellow agents, share wins, and learn together.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-white border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0">
                {post.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {post.pinned && (
                    <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      📌 Pinned
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {post.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> {post.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
