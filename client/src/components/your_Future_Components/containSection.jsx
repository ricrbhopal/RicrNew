import React from "react";

const Section2 = () => {
  return (
    <section className="w-[90%] mx-auto mt-14 sm:mt-16 md:mt-20">

      {/* HEADING */}
      <div className="max-w-4xl mb-8">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
          Getting a job is one thing.
          <br />
          Keeping it and growing in it is another.
        </h2>
      </div>

      {/*  SUBTEXT */}
      <div className="max-w-2xl">
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          Many students get placed. <br />
          But once they enter the job, they struggle.
        </p>
      </div>

      {/*  PROBLEM POINTS */}
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div className="bg-[#f5f5f7] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            They’ve never worked on real systems
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#f5f5f7] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            They don’t understand how teams operate
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#f5f5f7] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            They haven’t built enough to feel confident
          </p>
        </div>

      </div>

    </section>
  );
};

export default Section2;