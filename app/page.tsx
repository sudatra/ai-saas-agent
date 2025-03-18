import React from "react";
import HeaderPulse from "./components/HeaderPulse";
import { featuresArray, stepsArray } from "@/lib/helper-data";

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

      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful features for Content Creators!
          </h2>

          <div className="grid md: grid-cols-2 lg:grid-cols-3 gap-8">
            {
              featuresArray.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
                  >
                    <div className={`size-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}>
                      <Icon className={`size-6 ${feature.iconColor}`} />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {
              stepsArray.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div 
                    key={index}
                    className="bg-white text-center p-6 rounded-xl border shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="size-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full
                    flex items-center justify-center mx-auto mb-4">
                      <Icon className="size-8 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to meet your Agent?
          </h2>

          <p className="text-xl text-blue-50">Join Creators in leveraging AI to unlock insights</p>
        </div>
      </section>
    </div>
  );
}
