import React, { useState, useEffect } from "react";
import { FaTerminal, FaPlay, FaArrowRight } from "react-icons/fa";

const logs = [
  "[SYS] PLC Boot sequence initiated...",
  "[SYS] Loading hardware profile: Siemens CPU 1516-3 PN/DP...",
  "[NET] Checking Ethernet/IP and PROFINET interfaces... OK",
  "[NET] OPC UA server listening on port 4840",
  "[COM] Modbus TCP communication established with Node_04 (VFD-1)",
  "[SQL] Industrial Historian logging active (PostgreSQL)",
  "[SYS] OB1 main cyclic block execution active - Scan: 1.2ms",
  "[IIOT] MQTT Broker connection established: Client ID: James_IIOT_01",
  "[SYS] SAFETY LOOP ENERGIZED - All safety gates closed",
  "[SYS] SYSTEM STATUS: RUN MODE (100% NOMINAL)"
];

const Hero = () => {
  const [uptime, setUptime] = useState({ hours: 142, minutes: 18, seconds: 24 });
  const [logIndex, setLogIndex] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState([]);

  // Uptime Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        let hr = prev.hours;
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        if (min >= 60) {
          min = 0;
          hr += 1;
        }
        return { hours: hr, minutes: min, seconds: sec };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scrolling Boot Log
  useEffect(() => {
    if (logIndex < logs.length) {
      const delay = logIndex === 0 ? 500 : 1200;
      const timeout = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[logIndex]]);
        setLogIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Loop logs or keep them static
      const timeout = setTimeout(() => {
        // Clear and restart logs to keep the hero section lively
        setDisplayedLogs([logs[9]]);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  return (
    <section className="relative min-h-[90vh] bg-[#07090e] flex items-center justify-center py-16 px-6 scada-grid overflow-hidden">
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f131a]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f2fe]/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and Details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-[#00f2fe]/5 border border-[#00f2fe]/30 px-3 py-1.5 rounded text-xs font-mono text-[#00f2fe]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping"></span>
            <span>SYSTEM INTEGRATOR & AUTOMATION SPECIALIST</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white leading-tight">
            Engineering the <br />
            <span className="text-[#00f2fe] glow-cyan">Automated Future</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
            I am a **Control Systems & Automation Engineer** specializing in PLC programming, HMI/SCADA design, and Industrial IoT (IIoT). By bridging the gap between factory floor operations (OT) and enterprise software systems (IT), I build resilient, data-driven automation pipelines that optimize industrial processes.
          </p>

          {/* HMI Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            <div className="bg-[#0f131a] border border-gray-800 p-3 rounded font-mono">
              <span className="text-[10px] text-gray-500 block">SYSTEM_UPTIME</span>
              <span className="text-sm font-bold text-white tracking-widest">
                {String(uptime.hours).padStart(3, '0')}:
                {String(uptime.minutes).padStart(2, '0')}:
                {String(uptime.seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="bg-[#0f131a] border border-gray-800 p-3 rounded font-mono">
              <span className="text-[10px] text-gray-500 block">SAFETY_STATUS</span>
              <span className="text-sm font-bold text-emerald-400 glow-green flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow-green"></span>
                SECURE
              </span>
            </div>
            <div className="bg-[#0f131a] border border-gray-800 p-3 rounded font-mono col-span-2 sm:col-span-1">
              <span className="text-[10px] text-gray-500 block">NETWORK_LOAD</span>
              <span className="text-sm font-bold text-[#00f2fe] glow-cyan">
                4.25 MB/S <span className="text-[9px] font-normal text-gray-500">OPC-UA</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#simulator"
              className="flex items-center space-x-2 bg-[#00f2fe] hover:bg-[#00d2de] text-black font-mono font-bold px-6 py-3 rounded shadow-glow-cyan transition"
            >
              <FaPlay className="text-xs" />
              <span>LAUNCH_HMI_SIMULATOR</span>
            </a>
            <a
              href="#projects"
              className="flex items-center space-x-2 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 px-6 py-3 rounded font-mono transition"
            >
              <span>VIEW_PROJECTS</span>
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>

        {/* Right Column: High-tech Terminal Emulator */}
        <div className="lg:col-span-5 relative w-full">
          <div className="absolute inset-0 bg-[#00f2fe]/5 rounded border border-[#00f2fe]/10 transform translate-x-2 translate-y-2 pointer-events-none" />
          <div className="relative bg-[#0b0f16] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-[#0f131a] px-4 py-2.5 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <FaTerminal className="text-[#00f2fe] text-[10px]" />
                plc_monitor.log
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                LIVE_FEED
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 min-h-[260px] max-h-[320px] overflow-y-auto font-mono text-xs text-left text-gray-300 space-y-2.5">
              {displayedLogs.map((log, index) => {
                let colorClass = "text-gray-300";
                if (log.startsWith("[SYS]")) colorClass = "text-[#00f2fe]";
                if (log.startsWith("[NET]")) colorClass = "text-[#38bdf8]";
                if (log.startsWith("[COM]")) colorClass = "text-amber-400";
                if (log.startsWith("[SQL]")) colorClass = "text-purple-400";
                if (log.includes("SAFETY LOOP ENERGIZED") || log.includes("RUN MODE")) colorClass = "text-emerald-400";
                
                return (
                  <div key={index} className={`${colorClass} leading-5 border-l-2 border-transparent hover:border-[#00f2fe]/30 pl-2 transition-all`}>
                    {log}
                  </div>
                );
              })}
              {logIndex < logs.length && (
                <div className="flex items-center text-[#00f2fe]">
                  <span className="w-1.5 h-3 bg-[#00f2fe] animate-pulse"></span>
                </div>
              )}
            </div>
            
            {/* Terminal Footer Info */}
            <div className="bg-[#0f131a] px-4 py-2 border-t border-gray-800 text-[10px] font-mono text-gray-500 flex justify-between">
              <span>BAUD_RATE: 115200</span>
              <span>PARITY: NONE</span>
              <span>NODE_ID: 192.168.1.100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;