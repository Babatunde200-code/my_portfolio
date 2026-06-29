import React from "react";
import { FaServer, FaCogs, FaDatabase, FaExchangeAlt, FaArrowDown } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white scada-grid text-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-12 text-center flex items-center justify-center gap-3">
          <span className="text-[#0284c7]">[01]</span>
          <span>ABOUT_ME</span>
          <span className="w-1/3 h-[1px] bg-gradient-to-r from-slate-200 to-transparent"></span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-mono font-semibold text-[#0284c7] glow-cyan">
              Bridging the IT/OT Divide
            </h3>
            
            <p className="text-slate-600 leading-relaxed">
              I am <strong>James Babatunde Ogunleye</strong>, a passionate Systems Integrator and Control Engineer. 
              My expertise lies in a rare, high-value sweet spot: the intersection of **Operational Technology (OT)** 
              on the factory floor and **Information Technology (IT)** in the cloud.
            </p>

            <p className="text-slate-600 leading-relaxed">
              With a strong background in both **Software Development & Data Science** and **PLC/Industrial Automation**, 
              I don't just program machines to move; I engineer systems that communicate. I specialize in designing control panel 
              layouts, writing PLC logic (Siemens, Allen-Bradley), and setting up SCADA systems (Ignition, WinCC). 
              Simultaneously, I write Python data-logging agents, manage SQL database historians, and configure OPC UA/MQTT servers 
              to route raw shopfloor telemetry into actionable business intelligence.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Whether retrofitting legacy manufacturing lines with modern edge-gateways, tuning complex PID heat loops, 
              or building custom web dashboards for remote plant monitoring, my goal is to deliver safe, efficient, and highly transparent 
              automation solutions compliant with international safety codes.
            </p>

            <div className="border border-dashed border-slate-200 p-4 bg-slate-50 rounded-md font-mono text-xs text-slate-500">
              <span className="text-emerald-600 font-bold block mb-1">{"// ENGINEERING PHILOSOPHY"}</span>
              "A system is only as automated as its data pipeline is integrated. High reliability, absolute electrical safety, and clean code are non-negotiable."
            </div>
          </div>

          {/* Right Column: IT/OT Architecture Flowchart */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0284c7]/5 rounded-bl-full pointer-events-none" />
              
              <h4 className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider text-center">
                System Integration Architecture (IT/OT)
              </h4>

              {/* Architecture Stack */}
              <div className="space-y-4 font-mono text-xs">
                {/* Level 4: IT */}
                <div className="bg-white border border-slate-200 p-3 rounded flex items-center justify-between hover:border-[#0284c7]/50 shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <FaServer className="text-[#0284c7]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">LEVEL 4 - ENTERPRISE (IT)</span>
                      <span className="font-bold text-slate-800">Cloud Dashboards & BI</span>
                    </div>
                  </div>
                  <span className="text-[#0284c7] text-[9px] bg-[#0284c7]/5 px-1.5 py-0.5 rounded border border-[#0284c7]/20">React / API</span>
                </div>

                <div className="flex justify-center text-slate-400 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 3: Database & Logic Middleware */}
                <div className="bg-white border border-slate-200 p-3 rounded flex items-center justify-between hover:border-[#0284c7]/50 shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <FaDatabase className="text-[#0284c7]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">LEVEL 3 - HISTORIAN / GATEWAY</span>
                      <span className="font-bold text-slate-800">Python, MQTT & SQL Historian</span>
                    </div>
                  </div>
                  <span className="text-[#0284c7] text-[9px] bg-[#0284c7]/5 px-1.5 py-0.5 rounded border border-[#0284c7]/20">Postgres / Influx</span>
                </div>

                <div className="flex justify-center text-slate-400 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 2: OT Control */}
                <div className="bg-white border border-slate-200 p-3 rounded flex items-center justify-between hover:border-[#0284c7]/50 shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <FaExchangeAlt className="text-[#0284c7]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">LEVEL 2 - CONTROL LAYER (OT)</span>
                      <span className="font-bold text-slate-800">PLCs (Siemens, Allen-Bradley)</span>
                    </div>
                  </div>
                  <span className="text-[#0284c7] text-[9px] bg-[#0284c7]/5 px-1.5 py-0.5 rounded border border-[#0284c7]/20">CODESYS / TIA Portal</span>
                </div>

                <div className="flex justify-center text-slate-400 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 1: Field Devices */}
                <div className="bg-white border border-slate-200 p-3 rounded flex items-center justify-between hover:border-[#0284c7]/50 shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <FaCogs className="text-[#0284c7]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">LEVEL 1 - FIELD LAYER</span>
                      <span className="font-bold text-slate-800">Sensors, Actuators & VFDs</span>
                    </div>
                  </div>
                  <span className="text-[#0284c7] text-[9px] bg-[#0284c7]/5 px-1.5 py-0.5 rounded border border-[#0284c7]/20">Modbus / Profinet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
