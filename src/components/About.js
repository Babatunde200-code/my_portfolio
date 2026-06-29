import React from "react";
import { FaServer, FaCogs, FaDatabase, FaExchangeAlt, FaArrowDown } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-[#0f131a] scada-grid text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-12 text-center flex items-center justify-center gap-3">
          <span className="text-[#00f2fe]">[01]</span>
          <span>ABOUT_ME</span>
          <span className="w-1/3 h-[1px] bg-gradient-to-r from-gray-800 to-transparent"></span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-mono font-semibold text-[#00f2fe] glow-cyan">
              Bridging the IT/OT Divide
            </h3>
            
            <p className="text-gray-300 leading-relaxed">
              I am <strong>James Babatunde Ogunleye</strong>, a passionate Systems Integrator and Control Engineer. 
              My expertise lies in a rare, high-value sweet spot: the intersection of **Operational Technology (OT)** 
              on the factory floor and **Information Technology (IT)** in the cloud.
            </p>

            <p className="text-gray-300 leading-relaxed">
              With a strong background in both **Software Development & Data Science** and **PLC/Industrial Automation**, 
              I don't just program machines to move; I engineer systems that communicate. I specialize in designing control panel 
              layouts, writing PLC logic (Siemens, Allen-Bradley), and setting up SCADA systems (Ignition, WinCC). 
              Simultaneously, I write Python data-logging agents, manage SQL database historians, and configure OPC UA/MQTT servers 
              to route raw shopfloor telemetry into actionable business intelligence.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Whether retrofitting legacy manufacturing lines with modern edge-gateways, tuning complex PID heat loops, 
              or building custom web dashboards for remote plant monitoring, my goal is to deliver safe, efficient, and highly transparent 
              automation solutions compliant with international safety codes.
            </p>

            <div className="border border-dashed border-gray-800 p-4 bg-[#07090e]/60 rounded-md font-mono text-xs text-gray-400">
              <span className="text-emerald-400 font-bold block mb-1">{"// ENGINEERING PHILOSOPHY"}</span>
              "A system is only as automated as its data pipeline is integrated. High reliability, absolute electrical safety, and clean code are non-negotiable."
            </div>
          </div>

          {/* Right Column: IT/OT Architecture Flowchart */}
          <div className="lg:col-span-5">
            <div className="bg-[#07090e] border border-gray-800 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f2fe]/5 rounded-bl-full pointer-events-none" />
              
              <h4 className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-wider text-center">
                System Integration Architecture (IT/OT)
              </h4>

              {/* Architecture Stack */}
              <div className="space-y-4 font-mono text-xs">
                {/* Level 4: IT */}
                <div className="bg-[#171d27] border border-gray-800 p-3 rounded flex items-center justify-between hover:border-[#00f2fe]/50 transition">
                  <div className="flex items-center gap-3">
                    <FaServer className="text-[#00f2fe]" />
                    <div>
                      <span className="text-[10px] text-gray-500 block">LEVEL 4 - ENTERPRISE (IT)</span>
                      <span className="font-bold text-white">Cloud Dashboards & BI</span>
                    </div>
                  </div>
                  <span className="text-[#00f2fe] text-[9px] bg-[#00f2fe]/10 px-1.5 py-0.5 rounded">React / API</span>
                </div>

                <div className="flex justify-center text-gray-600 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 3: Database & Logic Middleware */}
                <div className="bg-[#171d27] border border-gray-800 p-3 rounded flex items-center justify-between hover:border-[#00f2fe]/50 transition">
                  <div className="flex items-center gap-3">
                    <FaDatabase className="text-[#00f2fe]" />
                    <div>
                      <span className="text-[10px] text-gray-500 block">LEVEL 3 - HISTORIAN / GATEWAY</span>
                      <span className="font-bold text-white">Python, MQTT & SQL Historian</span>
                    </div>
                  </div>
                  <span className="text-[#00f2fe] text-[9px] bg-[#00f2fe]/10 px-1.5 py-0.5 rounded">Postgres / Influx</span>
                </div>

                <div className="flex justify-center text-gray-600 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 2: OT Control */}
                <div className="bg-[#171d27] border border-gray-800 p-3 rounded flex items-center justify-between hover:border-[#00f2fe]/50 transition">
                  <div className="flex items-center gap-3">
                    <FaExchangeAlt className="text-[#00f2fe]" />
                    <div>
                      <span className="text-[10px] text-gray-500 block">LEVEL 2 - CONTROL LAYER (OT)</span>
                      <span className="font-bold text-white">PLCs (Siemens, Allen-Bradley)</span>
                    </div>
                  </div>
                  <span className="text-[#00f2fe] text-[9px] bg-[#00f2fe]/10 px-1.5 py-0.5 rounded">CODESYS / TIA Portal</span>
                </div>

                <div className="flex justify-center text-gray-600 my-1 animate-bounce">
                  <FaArrowDown />
                </div>

                {/* Level 1: Field Devices */}
                <div className="bg-[#171d27] border border-gray-800 p-3 rounded flex items-center justify-between hover:border-[#00f2fe]/50 transition">
                  <div className="flex items-center gap-3">
                    <FaCogs className="text-[#00f2fe]" />
                    <div>
                      <span className="text-[10px] text-gray-500 block">LEVEL 1 - FIELD LAYER</span>
                      <span className="font-bold text-white">Sensors, Actuators & VFDs</span>
                    </div>
                  </div>
                  <span className="text-[#00f2fe] text-[9px] bg-[#00f2fe]/10 px-1.5 py-0.5 rounded">Modbus / Profinet</span>
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
