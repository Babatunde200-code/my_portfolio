import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', company: '', email: '', projectType: 'plc_programming', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending telemetry
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', company: '', email: '', projectType: 'plc_programming', message: '' });
    }, 4000);
  };

  return (
    <section className="py-20 px-6 bg-[#0f131a] scada-grid text-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-12 text-center flex items-center justify-center gap-3">
          <span className="text-[#00f2fe]">[05]</span>
          <span>DISPATCH_COMMS_LINK</span>
          <span className="w-1/3 h-[1px] bg-gradient-to-r from-gray-800 to-transparent"></span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Column: Terminal info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-mono font-semibold text-[#00f2fe] glow-cyan">
              Initiate System Integration
            </h3>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              If you have a manufacturing line that needs automated PLC logic, an outdated relay cabinet that needs a retrofit, or an OEE data logging pipeline you want built, let's establish a connection.
            </p>

            {/* Comm Channels list */}
            <div className="bg-[#07090e] border border-gray-800 rounded-lg p-5 font-mono text-xs space-y-4">
              <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-widest">{"// COMM_CHANNELS_STATUS"}</span>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/james-babatunde-63b2591ba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-2 bg-[#0f131a] border border-gray-800 hover:border-[#00f2fe]/40 rounded group transition"
              >
                <div className="flex items-center space-x-2">
                  <FaLinkedin className="text-blue-500 text-sm group-hover:scale-110 transition" />
                  <span className="text-white">LINKEDIN</span>
                </div>
                <span className="text-[#00f2fe] glow-cyan text-[10px]">CONNECTED &gt;</span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Babatunde200-code" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-2 bg-[#0f131a] border border-gray-800 hover:border-[#00f2fe]/40 rounded group transition"
              >
                <div className="flex items-center space-x-2">
                  <FaGithub className="text-white text-sm group-hover:scale-110 transition" />
                  <span className="text-white">GITHUB</span>
                </div>
                <span className="text-emerald-400 glow-green text-[10px]">REPOS_ACTIVE &gt;</span>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/2348127470107" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-2 bg-[#0f131a] border border-gray-800 hover:border-[#00f2fe]/40 rounded group transition"
              >
                <div className="flex items-center space-x-2">
                  <FaWhatsapp className="text-green-500 text-sm group-hover:scale-110 transition" />
                  <span className="text-white">WHATSAPP</span>
                </div>
                <span className="text-emerald-400 glow-green text-[10px]">DIRECT_LINK &gt;</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:tunde200.james@gmail.com" 
                className="flex items-center justify-between p-2 bg-[#0f131a] border border-gray-800 hover:border-[#00f2fe]/40 rounded group transition"
              >
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-amber-500 text-sm group-hover:scale-110 transition" />
                  <span className="text-white">EMAIL_DIRECT</span>
                </div>
                <span className="text-amber-400 glow-amber text-[10px]">tunde200.james@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-tech Form */}
          <div className="lg:col-span-7 bg-[#07090e] border border-gray-800 rounded-lg p-6 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-[9px] font-mono text-gray-500">[TELEMETRY_OUTBOX]</span>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col font-mono text-xs">
                  <label className="text-gray-500 mb-1.5 uppercase font-bold">Sender_Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-[#0f131a] border border-gray-800 focus:border-[#00f2fe] rounded px-3 py-2 text-white outline-none focus:shadow-[0_0_10px_var(--color-cyan-glow)] transition"
                  />
                </div>
                
                <div className="flex flex-col font-mono text-xs">
                  <label className="text-gray-500 mb-1.5 uppercase font-bold">Company / Org</label>
                  <input
                    type="text"
                    placeholder="Optional company"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="bg-[#0f131a] border border-gray-800 focus:border-[#00f2fe] rounded px-3 py-2 text-white outline-none focus:shadow-[0_0_10px_var(--color-cyan-glow)] transition"
                  />
                </div>
              </div>

              <div className="flex flex-col font-mono text-xs">
                <label className="text-gray-500 mb-1.5 uppercase font-bold">Email_Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="bg-[#0f131a] border border-gray-800 focus:border-[#00f2fe] rounded px-3 py-2 text-white outline-none focus:shadow-[0_0_10px_var(--color-cyan-glow)] transition"
                />
              </div>

              <div className="flex flex-col font-mono text-xs">
                <label className="text-gray-500 mb-1.5 uppercase font-bold">Project_Category</label>
                <select
                  value={formState.projectType}
                  onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  className="bg-[#0f131a] border border-gray-800 focus:border-[#00f2fe] rounded px-3 py-2 text-white outline-none focus:shadow-[0_0_10px_var(--color-cyan-glow)] transition font-mono"
                >
                  <option value="plc_programming">PLC logic design (Siemens/AB)</option>
                  <option value="scada_hmi">SCADA / HMI mimic panels</option>
                  <option value="iiot_gateway">IT/OT integration & edge gateways</option>
                  <option value="panel_wiring">Cabinet design & instrumentation</option>
                  <option value="consulting">General automation consulting</option>
                </select>
              </div>

              <div className="flex flex-col font-mono text-xs">
                <label className="text-gray-500 mb-1.5 uppercase font-bold">Data_Payload (Message)</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Detail your control engineering requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="bg-[#0f131a] border border-gray-800 focus:border-[#00f2fe] rounded px-3 py-2 text-white outline-none focus:shadow-[0_0_10px_var(--color-cyan-glow)] transition font-sans text-sm leading-relaxed"
                />
              </div>

              {submitted ? (
                <div className="flex items-center justify-center space-x-2 py-3 bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono text-xs font-bold rounded shadow-glow-green animate-pulse">
                  <FaPaperPlane className="animate-ping" />
                  <span>TRANSMISSION_SUCCESSFUL_ACK_RCVD</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-[#00f2fe] hover:bg-[#00d2de] text-black font-mono font-bold py-3 rounded shadow-glow-cyan transition cursor-pointer"
                >
                  <span>SEND_TELEMETRY_DISPATCH</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
