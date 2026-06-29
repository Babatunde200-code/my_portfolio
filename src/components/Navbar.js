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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 scada-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Brand & System Status */}
        <div className="flex items-center space-x-3">
          <FaCogs className="text-[#0284c7] text-2xl animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-xl font-mono font-bold tracking-wider text-slate-800 flex items-center">
              J.OGUNLEYE <span className="ml-2 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">IIoT-NODE_01</span>
            </span>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 led-blink-green"></span>
              <span className="text-emerald-600 font-bold">PLC: RUN</span>
              <span className="text-slate-300">|</span>
              <span>SCAN: 1.24 ms</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-1 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-mono text-slate-600">
          <li>
            <a href="#about" className="px-2 py-1.5 rounded hover:text-slate-900 hover:bg-slate-100 transition">
              [ABOUT]
            </a>
          </li>
          <li>
            <a href="#simulator" className="px-2 py-1.5 rounded text-[#0284c7] hover:bg-[#0284c7]/5 transition border border-dashed border-[#0284c7]/40">
              [HMI_SIM]
            </a>
          </li>
          <li>
            <a href="#skills" className="px-2 py-1.5 rounded hover:text-slate-900 hover:bg-slate-100 transition">
              [SKILLS]
            </a>
          </li>
          <li>
            <a href="#projects" className="px-2 py-1.5 rounded hover:text-slate-900 hover:bg-slate-100 transition">
              [PROJECTS]
            </a>
          </li>
          <li>
            <a href="#contact" className="px-2 py-1.5 rounded hover:text-slate-900 hover:bg-slate-100 transition">
              [CONTACT]
            </a>
          </li>
        </ul>

        {/* System Time & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col text-right font-mono text-xs">
            <span className="text-slate-400">SYS_TIME</span>
            <span className="text-[#0284c7] font-bold tracking-widest">{formatTime(time)}</span>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center space-x-2 bg-[#0284c7]/5 hover:bg-[#0284c7] text-[#0284c7] hover:text-white border border-[#0284c7]/30 px-3 py-1.5 rounded text-xs font-mono transition"
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
