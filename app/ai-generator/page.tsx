import React from "react";
import AiGeneratorForm from "../ui/forms/AiGeneratorForm";

function AiGeneratorPage() {
    
  return (
    <main className="min-h-screen">
      <div className="flex justify-center px-4 py-12">
        <div className="bg-white text-center p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200">
          <h1 className="text-4xl font-extrabold text-center text-primary mb-8">
            AI Recipe Generator
          </h1>
          <p className="text-gray-500 font-light">
            Generate your recipe instantly with AI
          </p>
          <AiGeneratorForm />
        </div>
      </div>
    </main>
  );
}

export default AiGeneratorPage;
