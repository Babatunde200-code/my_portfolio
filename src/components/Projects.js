import React from 'react';
import { FaCogs, FaDatabase, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Multi-Zone Chemical Batching Control System",
    type: "PLC PROGRAMMING & HMI",
    hardware: "Siemens S7-1500 (CPU 1515-2 PN)",
    software: "TIA Portal V18 / WinCC Professional SCADA",
    protocols: "PROFINET, Modbus TCP (VFD communication)",
    summary: "Designed and programmed a fully automated chemical mixing process featuring 4 raw material dosing inlets, agitator control, and multi-stage batch recipes following ISA-88 standards.",
    ioDetails: "64 Digital Inputs/Outputs, 12 Analog Channels (Flow, Level, Temp RTDs)",
    outcome: "Implemented dual-stage PID loop control on heating/cooling jacket valves, achieving +0.2°C temperature tolerance and reducing chemical waste by 14% over manual operation.",
    icon: <FaCogs className="text-[#00f2fe]" />,
    tags: ["Siemens TIA", "WinCC SCADA", "PID Tuning", "ISA-88 Batch"]
  },
  {
    title: "High-Speed Sortation Conveyor Automation",
    type: "ELECTRICAL PANEL & VFD INTEGRATION",
    hardware: "Allen-Bradley CompactLogix 5380, PowerFlex 525 VFDs",
    software: "Studio 5000 Logix Designer / FactoryTalk View ME",
    protocols: "EtherNet/IP (Conveyor synchronization & drive control)",
    summary: "Led the control system design and cabinet wiring for a high-speed sorting conveyor system. Integrated optical size sensors and pneumatic actuators to divert boxes on a moving line.",
    ioDetails: "32 Digital I/O, 4 VFDs on EtherNet/IP rings (DLR)",
    outcome: "Configured acceleration/deceleration profiles on drives to prevent box slippage, reaching a throughput of 2,400 sorted units/hour with zero mechanical jam incidents.",
    icon: <FaExchangeAlt className="text-[#00f2fe]" />,
    tags: ["Studio 5000", "EtherNet/IP", "VFD Tuning", "Cabinet Wiring"]
  },
  {
    title: "IIoT Telemetry Gateway & Plant Historian",
    type: "IT/OT CONVERGENCE & DATA ACQUISITION",
    hardware: "Raspberry Pi 4 (CODESYS Control), Modbus Power Meters",
    software: "Ignition SCADA v8.1, Python (Historian Daemon), InfluxDB",
    protocols: "OPC UA, MQTT (Sparkplug B), Modbus RTU (RS-485)",
    summary: "Bridges the IT/OT gap by reading registers from shopfloor machinery, processing telemetry at the edge, and writing records to a centralized database for OEE (Overall Equipment Effectiveness) reporting.",
    ioDetails: "12 Modbus RTU nodes, 1500+ tagged telemetry variables logged",
    outcome: "Developed Python services to structure raw PLC datablocks into clean SQL/InfluxDB timeseries, creating real-time energy usage dashboards that saved the facility 8% in peak demand costs.",
    icon: <FaDatabase className="text-[#00f2fe]" />,
    tags: ["Python", "Ignition SCADA", "InfluxDB", "MQTT / OPC UA"]
  },
  {
    title: "Municipal Water Treatment Plant SCADA Retrofit",
    type: "SYSTEM RETROFIT & SCADA UPGRADE",
    hardware: "Schneider Electric Modicon M241 PLC, Magelis HMI",
    software: "EcoStruxure Machine Expert / AutoCAD Electrical",
    protocols: "Modbus TCP (Pump controls), OPC DA (Legacy SCADA link)",
    summary: "Replaced an outdated, relay-based pump control cabinet with a modern PLC system. Drafted new electrical schematics and implemented alternating lead/lag pump run-hour logic.",
    ioDetails: "48 Digital I/O, 4 Analog Levels, safety circuit loop monitoring",
    outcome: "Eliminated relay wear issues, balanced mechanical runtime across pumps to extend machinery lifespan by 40%, and enabled remote web logging for plant managers.",
    icon: <FaShieldAlt className="text-[#00f2fe]" />,
    tags: ["Schneider Modicon", "EcoStruxure", "AutoCAD Electrical", "Lead/Lag Logic"]
  }
];

const Projects = () => {
  return (
    <section className="py-20 px-6 bg-[#07090e] scada-grid text-white" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-12 text-center flex items-center justify-center gap-3">
          <span className="text-[#00f2fe]">[04]</span>
          <span>SYSTEM_INTEGRATION_PROJECTS</span>
          <span className="w-1/3 h-[1px] bg-gradient-to-r from-gray-800 to-transparent"></span>
        </h2>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="bg-[#0f131a] border border-gray-800 hover:border-[#00f2fe]/40 rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between relative overflow-hidden tech-card"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00f2fe]/5 rounded-bl-full flex items-center justify-center">
                {proj.icon}
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">{proj.type}</span>
                <h3 className="text-xl font-mono font-bold text-white mt-1 mb-4 pr-6 leading-tight">{proj.title}</h3>
                
                {/* Tech specifications table */}
                <div className="space-y-2 border-t border-b border-gray-800/60 py-4 my-4 font-mono text-[11px] text-gray-400">
                  <div className="flex justify-between border-b border-gray-900 pb-1.5">
                    <span className="text-gray-600">CONTROLLER:</span>
                    <span className="text-gray-300 text-right">{proj.hardware}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-900 pb-1.5">
                    <span className="text-gray-600">DEVELOPMENT_IDE:</span>
                    <span className="text-gray-300 text-right">{proj.software}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-900 pb-1.5">
                    <span className="text-gray-600">NETWORKING_PROTO:</span>
                    <span className="text-gray-300 text-right">{proj.protocols}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IO_CAPACITY:</span>
                    <span className="text-gray-300 text-right">{proj.ioDetails}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm font-sans mb-4 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="bg-[#07090e]/80 border-l-2 border-emerald-500 p-3 rounded font-mono text-[10px] text-gray-400">
                  <strong className="text-emerald-400 uppercase font-bold block mb-0.5">&gt; OUTCOME / PERFORMANCE_METRICS:</strong>
                  {proj.outcome}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6">
                {proj.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="bg-[#171d27] border border-gray-800 text-[#00f2fe] px-2 py-0.5 rounded text-[10px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
