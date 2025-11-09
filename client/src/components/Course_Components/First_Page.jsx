// SelectStream.jsx
// React component built with Vite + React + Tailwind CSS
// How to use:
// 1. Create a Vite React project: `npm create vite@latest my-app -- --template react`
// 2. Install Tailwind CSS (follow Tailwind docs) or run:
//    npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
// 3. Configure tailwind.config.js content to include ./src/**/*.{js,jsx,ts,tsx}
// 4. Add Tailwind directives to ./src/index.css: @tailwind base; @tailwind components; @tailwind utilities;
// 5. Put this file in src/components/SelectStream.jsx and import it in App.jsx
// 6. Add your images to src/assets and update import paths below.

import React from "react";
// import techIllustration from "../assets/tech-illustration.png"; // replace with your image path
// import nonTechIllustration from "../assets/nontech-illustration.png"; // replace with your image path

export default function SelectStream() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-12 px-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Select your Stream</h1>
        <p className="mt-3 text-slate-600">Select your background to get the best courses for you</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          {/* Card - Technical */}
          <div className="relative w-full max-w-md">
            {/* blue offset shadow */}
            <div className="absolute -right-4 bottom-4 h-full w-full bg-sky-300 rounded-2xl transform translate-x-2 translate-y-2 shadow-lg" aria-hidden="true"></div>

            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 pt-10 shadow-sm z-10">
              <div className="flex justify-center">
                <div className="h-40 w-40 flex items-center justify-center">
                  {/* <img src={techIllustration} alt="technical" className="object-contain h-full" /> */}
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-slate-900">Technical</h2>
              <p className="mt-4 text-slate-600">I am from B-Tech/BCA and want to learn programming</p>
            </div>
          </div>

          {/* Card - Non Technical */}
          <div className="relative w-full max-w-md">
            <div className="absolute -right-4 bottom-4 h-full w-full bg-sky-300 rounded-2xl transform translate-x-2 translate-y-2 shadow-lg" aria-hidden="true"></div>

            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 pt-10 shadow-sm z-10">
              <div className="flex justify-center">
                <div className="h-40 w-40 flex items-center justify-center">
                  {/* <img src={nonTechIllustration} alt="non-technical" className="object-contain h-full" /> */}
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-slate-900">Non-Technical</h2>
              <p className="mt-4 text-slate-600">I am from BA/BBA/BCom and want to learn programming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// End of SelectStream.jsx