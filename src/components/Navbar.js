import React, { useState, useEffect } from "react";
import { FaCogs, FaDownload } from "react-icons/fa";

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  return (
    <nav className="bg-[#0f131a] border-b border-gray-800 sticky top-0 z-50 scada-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Brand & System Status */}
        <div className="flex items-center space-x-3">
          <FaCogs className="text-[#00f2fe] text-2xl animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-xl font-mono font-bold tracking-wider text-white flex items-center">
              J.OGUNLEYE <span className="ml-2 text-xs text-[#00f2fe] bg-[rgba(0,242,254,0.1)] px-2 py-0.5 rounded border border-[#00f2fe]/30 font-mono">IIoT-NODE_01</span>
            </span>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 led-blink-green"></span>
              <span className="text-emerald-400 glow-green">PLC: RUN</span>
              <span className="text-gray-600">|</span>
              <span>SCAN: 1.24 ms</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-1 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-mono text-gray-300">
          <li>
            <a href="#about" className="px-2 py-1.5 rounded hover:text-white hover:bg-gray-800 transition">
              [ABOUT]
            </a>
          </li>
          <li>
            <a href="#simulator" className="px-2 py-1.5 rounded text-[#00f2fe] hover:bg-[#00f2fe]/10 transition border border-dashed border-[#00f2fe]/30">
              [HMI_SIM]
            </a>
          </li>
          <li>
            <a href="#skills" className="px-2 py-1.5 rounded hover:text-white hover:bg-gray-800 transition">
              [SKILLS]
            </a>
          </li>
          <li>
            <a href="#projects" className="px-2 py-1.5 rounded hover:text-white hover:bg-gray-800 transition">
              [PROJECTS]
            </a>
          </li>
          <li>
            <a href="#contact" className="px-2 py-1.5 rounded hover:text-white hover:bg-gray-800 transition">
              [CONTACT]
            </a>
          </li>
        </ul>

        {/* System Time & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col text-right font-mono text-xs">
            <span className="text-gray-400">SYS_TIME</span>
            <span className="text-[#00f2fe] glow-cyan font-bold tracking-widest">{formatTime(time)}</span>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center space-x-2 bg-[#00f2fe]/10 hover:bg-[#00f2fe] text-[#00f2fe] hover:text-black border border-[#00f2fe]/50 px-3 py-1.5 rounded text-xs font-mono transition"
          >
            <FaDownload className="text-xs" />
            <span className="hidden sm:inline">DOWNLOAD_CV</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
