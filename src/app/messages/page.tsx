"use client";

import { Content } from "next/font/google";
import { useEffect, useState } from "react";

interface Message {
  _id: string;
  content: string;
  createdAt: Date;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
const [createdAt, setCreatedAt] = useState<Date | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/get-Messages");
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        setError(data.error || "Failed to fetch messages");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (msg: Message) => {
    setEditingId(msg._id)
    setEditContent(msg.content)
    setCreatedAt(new Date())
  };

  const handleSave = async (id: string) => {
    if (!editContent.trim()) return;

    try {
        console.log(id);
        console.log(editContent)
      const res = await fetch("/api/update-message", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // way to send data to the backend
        body: JSON.stringify({ messageId: editingId, content: editContent ,createdAt : createdAt}),
      });
      
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to update message");
      } else {
        setEditingId(null);
        setEditContent("");
        await fetchMessages();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: editingId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete message");
      } else {
        if (editingId === id) setEditingId(null);
        await fetchMessages();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-indigo-400 neon-glow">Your Messages</h1>

      {loading && <p className="text-gray-400">Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {messages.length === 0 && !loading && <p className="text-gray-400">No messages yet.</p>}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`bg-black/70 border border-purple-600 p-4 rounded-xl neon-glow transition hover:bg-black/80`}
          >
            {editingId === msg._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(msg._id)}
                    className="px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => handleEditClick(msg)}
                className="cursor-pointer select-none"
              >
                <p>{msg.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}