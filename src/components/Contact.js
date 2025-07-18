import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-16 px-6 bg-gray-100" id="contact">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <div className="max-w-xl mx-auto text-center text-gray-700">
        <p className="mb-4">
          I'm open to freelance, contract, or full-time opportunities. Let’s connect!
        </p>

        <div className="flex justify-center gap-6 text-2xl mt-6">
          <a
            href="https://github.com/Babatunde200-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/james-babatunde-63b2591ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/2348127470107"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
          >
            <FaWhatsapp />
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">Or email me directly: <a href="mailto:tunde200.james@gmail.com" className="text-blue-600 hover:underline">tunde200.james@gmail.com</a></p>
      </div>
    </section>
  );
};

export default Contact;
