import React from 'react';
import { FaCogs, FaMicrochip, FaDesktop, FaCloudUploadAlt } from 'react-icons/fa';

const skillTiers = [
  {
    level: "LEVEL 4",
    title: "IIoT & ENTERPRISE INTEGRATION (IT)",
    icon: <FaCloudUploadAlt className="text-purple-400 text-2xl" />,
    skills: ["Python", "Django", "PostgreSQL", "InfluxDB / Historians", "MQTT / Node-RED", "OPC UA Python Client", "REST APIs", "Data Analytics (Pandas/NumPy)"],
    bgClass: "border-purple-500/20 hover:border-purple-500/50"
  },
  {
    level: "LEVEL 3",
    title: "SCADA & SUPERVISORY CONTROL",
    icon: <FaDesktop className="text-cyan-400 text-2xl" />,
    skills: ["Ignition (Inductive Automation)", "Siemens WinCC", "FactoryTalk View", "CODESYS WebHMI", "Alarm Management", "SQL Logging / Historical Trends"],
    bgClass: "border-cyan-500/20 hover:border-[#00f2fe]/50"
  },
  {
    level: "LEVEL 2",
    title: "PLC PROGRAMMING & CONTROL LOGIC",
    icon: <FaMicrochip className="text-emerald-400 text-2xl" />,
    skills: ["Siemens TIA Portal", "Allen-Bradley Studio 5000", "CODESYS Development System", "Ladder Logic (LD)", "Structured Text (ST)", "Function Block Diagram (FBD)", "PID Loop Tuning", "Safety Interlocks"],
    bgClass: "border-emerald-500/20 hover:border-emerald-500/50"
  },
  {
    level: "LEVEL 1",
    title: "FIELD DEVICES & INSTRUMENTATION",
    icon: <FaCogs className="text-amber-400 text-2xl" />,
    skills: ["Sensors & Actuators (RTDs, Photoelectric)", "VFD & Servo Drive Tuning", "AutoCAD Electrical / Drafting", "Cabinet Layout & Panel Design", "Modbus TCP/RTU", "PROFINET / EtherNet/IP", "EtherCAT", "Safety Relays & Circuit Wiring"],
    bgClass: "border-amber-500/20 hover:border-amber-500/50"
  }
];

const Skills = () => {
  return (
    <section className="py-20 px-6 bg-[#0f131a] scada-grid text-white" id="skills">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-12 text-center flex items-center justify-center gap-3">
          <span className="text-[#00f2fe]">[03]</span>
          <span>SKILLS_&_CAPABILITIES</span>
          <span className="w-1/3 h-[1px] bg-gradient-to-r from-gray-800 to-transparent"></span>
        </h2>

        {/* Pyramid/Stack Layout */}
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
          {skillTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-[#07090e] border p-6 rounded-lg shadow-lg transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 tech-card ${tier.bgClass}`}
            >
              {/* Left Side: Tier Level, Title & Icon */}
              <div className="flex items-center space-x-4 min-w-[280px]">
                <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                  {tier.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block font-bold tracking-widest">{tier.level}</span>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">{tier.title}</h3>
                </div>
              </div>

              {/* Right Side: Skill Tags Grid */}
              <div className="flex-grow flex flex-wrap gap-2">
                {tier.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-[#171d27] border border-gray-800 hover:border-[#00f2fe]/30 hover:text-white text-gray-400 px-3 py-1 rounded text-xs font-mono transition duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Industry standard statement */}
        <div className="mt-12 text-center text-xs font-mono text-gray-500 max-w-2xl mx-auto border border-dashed border-gray-800 p-4 rounded bg-[#07090e]/40">
          <span className="text-amber-500 font-bold block mb-1">COMPLIANCE & STANDARDS</span>
          All programming complies with **IEC 61131-3** standards for PLC software and HMI/SCADA layouts are optimized following **ISA-101** HMI design guidelines for situational awareness.
        </div>
      </div>
    </section>
  );
};

export default Skills;
