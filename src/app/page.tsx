"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Welcome to ChatSphere
        </h1>

        <p className="mt-6 max-w-2xl text-zinc-400 text-lg">
          ChatSphere is a modern AI-powered messaging platform where users can
          send, receive, and manage smart conversations securely and seamlessly.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 border border-zinc-700 hover:border-blue-500 rounded-lg transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-500">
            About The Website
          </h2>

          <p className="mt-6 text-zinc-400 leading-relaxed">
            This platform allows users to securely manage messages, update
            profiles, verify accounts, and interact with AI-based suggestions.
            Built using Next.js App Router, MongoDB, and NextAuth for secure
            authentication, the system ensures fast performance and clean user
            experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
            <p className="text-zinc-400">
              Login and signup powered by NextAuth with encrypted passwords and session management.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">Message Management</h3>
            <p className="text-zinc-400">
              Create, edit, delete and organize messages efficiently with real-time updates.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">AI Suggestions</h3>
            <p className="text-zinc-400">
              Get smart message suggestions using AI integration to enhance productivity.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500">
        © {new Date().getFullYear()} ChatSphere. All rights reserved.
      </footer>

    </div>
  );
}