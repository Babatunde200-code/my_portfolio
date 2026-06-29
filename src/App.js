import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HmiSimulator from './components/HmiSimulator';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-[#07090e] text-white min-h-screen selection:bg-[#00f2fe]/30 selection:text-[#00f2fe]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HmiSimulator />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Industrial Console Footer */}
      <footer className="bg-[#0b0f16] border-t border-gray-800 py-6 text-center font-mono text-[10px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; {new Date().getFullYear()} JAMES OGUNLEYE. ALL PROCESSES RUNNING.</span>
          <span className="flex items-center gap-1.5">
            <span>FIRMWARE_VER: 4.1.28</span>
            <span className="text-gray-700">|</span>
            <span className="text-emerald-500 led-blink-green w-1.5 h-1.5 rounded-full inline-block"></span>
            <span>PLC_HEARTBEAT: OK</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
