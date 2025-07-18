import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-lg leading-7 text-gray-700">
          I'm <strong>James Babatunde Ogunleye</strong>, a passionate Software Developer and Data Scientist with a strong interest in building impactful digital products and intelligent data solutions. I specialize in developing robust backend systems using Python and Django, as well as creating interactive user interfaces with React.js.
        </p>
        <p className="text-lg leading-7 text-gray-700 mt-4">
          With a background in both software engineering and data science, I bring a unique blend of analytical thinking and technical skill to every project. Whether I’m visualizing insights from complex datasets or developing scalable web applications, I enjoy solving real-world problems with clean, efficient code.
        </p>
        <p className="text-lg leading-7 text-gray-700 mt-4">
          I’m continuously exploring new technologies to stay ahead and deliver modern, innovative solutions.
        </p>
      </div>
    </section>
  );
};

export default About;
