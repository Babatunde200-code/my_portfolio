import React from 'react';

const skills = [
  "Python", "Django", "React", "JavaScript",
  "PostgreSQL", "Tailwind CSS", "Git", "REST APIs",
  "Pandas", "NumPy", "Scikit-learn", "TensorFlow",
];

const Skills = () => {
  return (
    <section className="py-16 px-6" id="skills">
      <h2 className="text-3xl font-bold text-center mb-8">Skills & Tools</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map(skill => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
