import React from 'react';

const Projects = () => {
  return (
    <section className="py-16 px-6 bg-gray-100" id="projects">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Cross-Border Goods Delivery App</h3>
          <p className="text-gray-600 text-sm">
            A full-stack Django + React app that connects travelers with people who need goods delivered internationally.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Cross-border Travel platform</h3>
          <p className="text-gray-600 text-sm">
            A full-stack Django + React app that connects travelers with driver traveling locally in Nigeria.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Predictive Healthcare Alerts</h3>
          <p className="text-gray-600 text-sm">
            Data science project that uses historical health data to predict potential medical alerts before critical events.
          </p>
        </div>
        {/* Add more project cards as needed */}
      </div>
    </section>
  );
};

export default Projects;
