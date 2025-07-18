import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white text-center py-20 px-6">
      <h1 className="text-5xl font-bold mb-4">James Babatunde Ogunleye</h1>
      <h2 className="text-2xl text-blue-300 mb-6">Software Developer & Data Scientist</h2>
      <p className="max-w-2xl mx-auto text-gray-300">
        Building powerful digital solutions and intelligent data-driven systems.
      </p>
      <a href="#projects" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-medium">
        View My Work
      </a>
      <a
  href="/resume.pdf"
  download
  className="mt-6 inline-block bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition"
>
  Download CV
</a>

    </section>
  );
};

export default Hero;