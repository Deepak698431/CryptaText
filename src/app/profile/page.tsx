"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-center mt-20 text-zinc-400">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
        
        <h1 className="text-2xl font-semibold mb-6 text-blue-500">
          Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-zinc-400 text-sm">Name</p>
            <p className="text-lg">{session.user?.username}</p> 
          </div>

          <div>
            <p className="text-zinc-400 text-sm">Email</p>
            <p className="text-lg">{session.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}