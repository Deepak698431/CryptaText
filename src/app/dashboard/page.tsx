"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/get-Messages");
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch("/api/suggest-messges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Body is optional if your backend uses a static prompt like yours
        body: JSON.stringify({content : message}),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Response is here")
        setReply(data.reply);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/send-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
      console.error("Error:", data);
      return;
    }

    setMessage("");

    await fetchMessages();
    } catch (error) {
      console.error("Error sending message", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8">
        <div className="flex justify-between"> 
          <h1 className="text-4xl font-bold">
            Welcome,{" "}
            <span className="text-indigo-400">
              {session?.user?.name}
            </span>{" "}
            👋
          </h1>
          
        </div>
          <p className="text-gray-400 mt-2">
            Share your thoughts in your private dashboard.
          </p>
        </div>

        {/* Message Input */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Add New Message
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something cool..."
              className="flex-1 bg-black/40 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-indigo-900/50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          <button
            onClick={handleGenerateQuestions}
            disabled={loading}
            className="px-4 py-2 mt-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            {loading ? "Generating..." : "Suggest Messages ✨"}
          </button>

          {reply && (
          <div className="mt-4 p-4   rounded-2xl bg-black/70 text-white neon-glow">
            <h3 className="font-semibold mb-2">Generated Questions:</h3>
            <ul className="list-disc list-inside">
              {reply.split("||").map((q, idx) => {
                const trimmed = q.trim();
                return (
                  <li
                    key={idx}
                    className="cursor-pointer text-blue-600 "
                    onClick={() => setMessage(trimmed)}
                  >
                    {trimmed}
                  </li>
                );
              })}
            </ul>
            <p className="text-gray-500 mt-2 text-sm">
              Click a suggestion to add it to the input box
            </p>
          </div>
)}

          {error && <p className="text-red-600 font-medium">{error}</p>}
        </div>

        {/* Messages */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-300">
            Your Messages
          </h2>

          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">
              No messages yet. Start writing!
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-gray-800/60 border border-gray-700 p-4 rounded-xl hover:bg-gray-800 transition"
                >
                  <p className="text-gray-200">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
