import { UserButton } from "@clerk/nextjs";
import { Bot, BookOpen, MessageSquare, Store, Home } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/community", label: "Community", icon: MessageSquare },
  { href: "/dashboard/marketplace", label: "Prompts", icon: Store },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Bot className="w-7 h-7 text-blue-600" />
            <span className="text-lg font-bold">
              Real<span className="text-blue-600">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
