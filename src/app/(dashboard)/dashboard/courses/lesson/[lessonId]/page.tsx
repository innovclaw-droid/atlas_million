"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  FileDown,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Course
      </Link>

      {/* Video Player Placeholder */}
      <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-8">
        <div className="text-center text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3" />
          <p className="text-lg font-medium">Video Player</p>
          <p className="text-sm">Video content will appear here</p>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-8 mb-6">
        <h1 className="text-2xl font-bold mb-4">Lesson Content</h1>
        <p className="text-gray-600 leading-relaxed">
          Lesson content will be loaded from the database. This includes the
          full written transcript, action items, and downloadable resources.
        </p>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold mb-3">Resources</h2>
        <div className="space-y-2">
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition">
            <FileDown className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium">Action Worksheet</div>
              <div className="text-xs text-gray-500">PDF • 2 pages</div>
            </div>
          </button>
          <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition">
            <FileDown className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium">Prompt Templates</div>
              <div className="text-xs text-gray-500">PDF • 5 pages</div>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation & Complete */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/courses"
          className="text-sm text-gray-500 hover:text-gray-900 transition"
        >
          ← Previous Lesson
        </Link>
        <button
          onClick={() => setCompleted(!completed)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
            completed
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle className="w-5 h-5" /> Completed
            </>
          ) : (
            <>
              <Circle className="w-5 h-5" /> Mark Complete
            </>
          )}
        </button>
        <Link
          href="/dashboard/courses"
          className="text-sm text-gray-500 hover:text-gray-900 transition"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}
