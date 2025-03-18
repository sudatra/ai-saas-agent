import React from "react";
import HeaderPulse from "./components/HeaderPulse";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 items-center text-center mb-12">
            <HeaderPulse 
              size="large"
              color="blue"
            />

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text bg-transparent">
                AI Agent
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tranform your content with AI-Powered Analysis,
              transcription and insights. Get started in seconds.
            </p>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful features for Content Creators!
            </h2>
          </div>
        </section>
      </section>
    </div>
  );
}
