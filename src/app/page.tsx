"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden px-6">
      {/* 🌀 Inline keyframe styles */}
      <style>
        {`
          @keyframes blobX {
            0% { transform: translateX(0px); }
            50% { transform: translateX(100px); }
            100% { transform: translateX(0px); }
          }

          @keyframes blobXAlt {
            0% { transform: translateX(0px) translateY(0px); }
            50% { transform: translateX(-80px) translateY(40px); }
            100% { transform: translateX(0px) translateY(0px); }
          }

          @keyframes blobXSlow {
            0% { transform: translateX(0px); }
            50% { transform: translateX(60px); }
            100% { transform: translateX(0px); }
          }

          .animate-blob-x {
            animation: blobX 20s ease-in-out infinite;
          }

          .animate-blob-x-alt {
            animation: blobXAlt 25s ease-in-out infinite;
          }

          .animate-blob-x-slow {
            animation: blobXSlow 30s ease-in-out infinite;
          }
        `}
      </style>

      {/* 🌀 Animated background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 rounded-full blur-3xl opacity-60 animate-pulse duration-500" />
      <div className="absolute top-[40%] right-[-150px] w-[280px] h-[280px] bg-purple-400 rounded-full blur-3xl opacity-50 animate-pulse duration-500" />
      <div className="absolute bottom-[-100px] left-[60%] w-[250px] h-[250px] bg-pink-400 rounded-full blur-3xl opacity-40 animate-pulse duration-500" />

      {/* 🔤 Main content */}
      <div className="relative text-center max-w-xl space-y-6 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Practice Conversations. Learn Faster.
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Chat with an AI-powered language partner that corrects you,
          tracks your mistakes, and helps you improve.
        </p>
        <Link href="/chat">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base sm:text-lg transition duration-200 shadow-md">
            Start Chatting
          </button>
        </Link>
      </div>
    </div>
  );
}
