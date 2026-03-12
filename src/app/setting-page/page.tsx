"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await res.json();

    if (res.ok) {
      alert("Profile updated successfully!");
    setName("");
    setPassword("");
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">

        <h1 className="text-2xl font-semibold mb-6 text-blue-500">
          Account Settings
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div>
            <label className="text-zinc-400 text-sm">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new username"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-sm">New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}