import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaStop, FaBell, FaExclamationTriangle } from "react-icons/fa";

const HmiSimulator = () => {
  // State variables for Simulation
  const [systemActive, setSystemActive] = useState(false);
  const [mode, setMode] = useState("auto"); // "auto" or "manual"
  
  const [level, setLevel] = useState(45.0); // PV: 0 to 100
  const [setpoint, setSetpoint] = useState(50.0); // SP: 0 to 100
  const [pumpSpeed, setPumpSpeed] = useState(0.0); // CV: 0 to 100 (inflow)
  const [manualPumpSetting, setManualPumpSetting] = useState(30.0);
  
  const [drainOpen, setDrainOpen] = useState(false); // Disturbance
  const [temperature, setTemperature] = useState(25.0); // 20 to 100 °C
  const [heaterOn, setHeaterOn] = useState(false);
  
  const [safetyTrip, setSafetyTrip] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [logs, setLogs] = useState([
    { id: 1, time: "08:00:00", type: "SYS", message: "PLC CPU Started. Cycle time: 1.2ms" },
    { id: 2, time: "08:00:01", type: "SYS", message: "All safety relays energized. System OK." }
  ]);
  
  const [viewType, setViewType] = useState("ladder"); // "ladder", "st"
  
  // Ref for canvas & PID integral term
  const canvasRef = useRef(null);
  const pidIntegral = useRef(0);
  const trendData = useRef(Array.from({ length: 40 }, (_, i) => ({ pv: 45.0, sp: 50.0 })));

  // Add Log Message Helper
  const addLog = useCallback((type, message) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setLogs(prev => [
      { id: Date.now() + Math.random(), time: timeStr, type, message },
      ...prev.slice(0, 19) // Limit to 20 logs
    ]);
  }, []);

  // Trigger Safety Trip
  const triggerTrip = useCallback((reason) => {
    setSafetyTrip(true);
    setSystemActive(false);
    setPumpSpeed(0);
    setHeaterOn(false);
    addLog("ALM", `TRIP: ${reason}`);
    setAlarms(prev => [...prev, reason]);
  }, [addLog]);

  // Reset Safety Trip
  const resetSafetyTrip = () => {
    setSafetyTrip(false);
    setAlarms([]);
    addLog("SYS", "Safety interlocks reset. System OK.");
  };

  // Start / Stop Handlers
  const handleStart = () => {
    if (safetyTrip) {
      addLog("WARN", "Cannot start. Clear and reset safety trip first.");
      return;
    }
    setSystemActive(true);
    pidIntegral.current = 0; // reset PID accumulator
    addLog("SYS", "Operator command: START system.");
  };

  const handleStop = () => {
    setSystemActive(false);
    setPumpSpeed(0);
    setHeaterOn(false);
    addLog("SYS", "Operator command: STOP system.");
  };

  // Main Simulation Math Loop (runs every 100ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const dt = 0.1; // 100ms step

      setLevel(currentLevel => {
        let nextLevel = currentLevel;

        // 1. Calculate Pump Inflow Speed
        let activePumpSpeed = 0;
        if (systemActive && !safetyTrip) {
          if (mode === "auto") {
            // PI Controller Calculations
            const error = setpoint - currentLevel;
            pidIntegral.current += error * dt;
            // Anti-windup clamping
            pidIntegral.current = Math.max(-50, Math.min(50, pidIntegral.current));
            
            const Kp = 3.0;
            const Ki = 0.15;
            let output = Kp * error + Ki * pidIntegral.current;
            output = Math.max(0, Math.min(100, output));
            activePumpSpeed = Math.round(output * 10) / 10;
          } else {
            activePumpSpeed = manualPumpSetting;
          }
        }
        setPumpSpeed(activePumpSpeed);

        // 2. Calculate flow dynamics
        const inflow = activePumpSpeed * 0.15 * dt; // Inflow coefficient
        const normalOutflow = systemActive ? 0.3 * dt : 0.1 * dt; // Normal system draw/leak
        const disturbanceOutflow = drainOpen ? 2.5 * dt : 0.0; // Disturbance drain valve
        const totalOutflow = normalOutflow + disturbanceOutflow;
        
        nextLevel = nextLevel + inflow - totalOutflow;
        nextLevel = Math.max(0.0, Math.min(100.0, nextLevel));

        // 3. Safety checks
        if (nextLevel >= 85.0 && !safetyTrip) {
          setTimeout(() => triggerTrip("HIGH LEVEL ALARM (>85%)"), 0);
        }

        // Round level for display
        return Math.round(nextLevel * 100) / 100;
      });

      // 4. Temperature simulation
      setTemperature(currTemp => {
        let nextTemp = currTemp;
        if (systemActive && heaterOn && !safetyTrip) {
          nextTemp += 0.6 * dt; // Heating rate
        } else {
          nextTemp -= 0.15 * dt; // Cooling towards ambient
        }
        nextTemp = Math.max(21.5, Math.min(98.0, nextTemp)); // Clamp ambient/max
        return Math.round(nextTemp * 10) / 10;
      });

    }, 100);

    return () => clearInterval(interval);
  }, [systemActive, mode, setpoint, manualPumpSetting, drainOpen, heaterOn, safetyTrip, triggerTrip]);

  // Update Trend Data history & Redraw Canvas (runs every 500ms)
  useEffect(() => {
    const trendInterval = setInterval(() => {
      trendData.current.push({ pv: level, sp: setpoint });
      if (trendData.current.length > 40) {
        trendData.current.shift();
      }
      drawTrend();
    }, 500);

    return () => clearInterval(trendInterval);
  }, [level, setpoint]);

  // Draw trend graph in canvas
  const drawTrend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas - Pure White for light mode HMI
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw Grid Lines (light gray for light mode)
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let x = 30; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Convert Level (0-100) to Canvas Y coordinate (inverted)
    const getCanvasY = (val) => {
      const margin = 10;
      const range = height - margin * 2;
      return height - margin - (val / 100) * range;
    };

    // Draw Setpoint (SP) Line - Dashed Steel Blue
    ctx.strokeStyle = "#0284c7";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    trendData.current.forEach((pt, idx) => {
      const x = (idx / 39) * width;
      const y = getCanvasY(pt.sp);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Process Variable (PV) Line - Solid Emerald Green
    ctx.strokeStyle = "#10b981";
    ctx.setLineDash([]);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    
    // Fill Area under PV (light gradient)
    const areaPoints = [];
    trendData.current.forEach((pt, idx) => {
      const x = (idx / 39) * width;
      const y = getCanvasY(pt.pv);
      areaPoints.push({ x, y });
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under line
    if (areaPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(areaPoints[0].x, height);
      areaPoints.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.lineTo(areaPoints[areaPoints.length - 1].x, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = grad;
      ctx.fill();
    }
  };

  // Initial draw
  useEffect(() => {
    drawTrend();
  }, []);

  return (
    <section id="simulator" className="py-20 px-6 bg-[#f8fafc] border-t border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-3 text-center flex items-center justify-center gap-3 text-slate-800">
          <span className="text-[#0284c7]">[02]</span>
          <span>HMI_CONTROL_CONSOLE</span>
          <span className="w-1/4 h-[1px] bg-gradient-to-r from-slate-200 to-transparent"></span>
        </h2>
        <p className="text-slate-500 text-sm font-sans text-center mb-10 max-w-2xl mx-auto">
          An interactive, physics-based simulator of an industrial Tank Level Controller. Toggle inputs, tune settings, activate alarms, and observe the live PLC program execution.
        </p>

        {/* HMI Main Board Grid */}
        <div className="grid lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-md relative overflow-hidden scada-grid">
          {/* Status Bar */}
          <div className="col-span-12 border-b border-slate-200 pb-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">HMI PROCESS Mimic:</span>
              <div className="flex items-center space-x-2">
                <span className={`w-3.5 h-3.5 rounded-full ${systemActive ? "bg-emerald-500 led-blink-green" : "bg-red-400/30 border border-red-400"}`}></span>
                <span className={`text-xs font-mono font-bold ${systemActive ? "text-emerald-600" : "text-red-500"}`}>
                  {systemActive ? "PROCESS_ACTIVE" : "PROCESS_STOPPED"}
                </span>
              </div>
              {safetyTrip && (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 px-3 py-1 rounded">
                  <FaExclamationTriangle className="text-red-500 text-xs animate-pulse" />
                  <span className="text-[10px] font-mono text-red-600 font-bold uppercase">SAFETY TRIP: {alarms[0] || "SYSTEM HALT"}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-600">
              <span>TANK_01 LEVEL: <strong className="text-slate-800 font-bold">{level.toFixed(1)}%</strong></span>
              <span>TEMP: <strong className="text-slate-800 font-bold">{temperature.toFixed(1)}°C</strong></span>
            </div>
          </div>

          {/* Panel 1: Physical Mimic (SVG Graphic) (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded p-4 flex flex-col items-center relative min-h-[360px] shadow-sm">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-400">[PROCESS_MIMIC]</span>
            
            {/* Tank Animation Wrapper */}
            <div className="w-full flex-grow flex items-center justify-center pt-6">
              <svg width="220" height="280" viewBox="0 0 220 280" className="overflow-visible">
                {/* 1. Pipe Incoming (top) */}
                <path d="M 30,30 L 110,30 L 110,60" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="square" />
                {systemActive && pumpSpeed > 0 && (
                  <path d="M 30,30 L 110,30 L 110,60" fill="none" stroke="#0284c7" strokeWidth="6" className="pipe-flow-active" />
                )}
                
                {/* Inflow Valve Box */}
                <rect x="94" y="20" width="32" height="20" rx="2" fill={pumpSpeed > 0 ? "#10b981" : "#ef4444"} stroke="#94a3b8" strokeWidth="2" />
                <text x="110" y="33" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {pumpSpeed > 0 ? "ON" : "OFF"}
                </text>

                {/* 2. Tank Body Outline */}
                <rect x="50" y="60" width="120" height="160" rx="8" fill="none" stroke="#64748b" strokeWidth="4" />
                {/* Dotted Grid lines inside tank */}
                <line x1="50" y1="100" x2="170" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50" y1="140" x2="170" y2="140" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50" y1="180" x2="170" y2="180" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Tank Liquid Fill */}
                <rect 
                  x="52" 
                  y={60 + (160 - (level / 100) * 160)} 
                  width="116" 
                  height={(level / 100) * 160} 
                  rx="6" 
                  fill="url(#liquidGradient)"
                  className="transition-all duration-300 ease-out" 
                />

                {/* 3. Heater Element (bottom of tank) */}
                <path d="M 65,210 L 155,210" stroke={heaterOn && systemActive ? "#ef4444" : "#64748b"} strokeWidth="6" strokeLinecap="round" className={heaterOn && systemActive ? "glow-red animate-pulse" : ""} />
                
                {/* 4. Pipe Outgoing (bottom right) */}
                <path d="M 170,200 L 210,200 L 210,250" fill="none" stroke="#cbd5e1" strokeWidth="12" />
                {drainOpen && (
                  <path d="M 170,200 L 210,200 L 210,250" fill="none" stroke="#0284c7" strokeWidth="6" className="pipe-flow-active" />
                )}
                
                {/* Drain Valve Box */}
                <rect x="180" y="190" width="30" height="20" rx="2" fill={drainOpen ? "#10b981" : "#ef4444"} stroke="#94a3b8" strokeWidth="2" />
                <text x="195" y="203" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {drainOpen ? "OPEN" : "CLSD"}
                </text>

                {/* Sensors overlay */}
                {/* Level sensor top */}
                <circle cx="110" cy="60" r="5" fill="#d97706" />
                <line x1="110" y1="60" x2="110" y2={60 + (160 - (level / 100) * 160)} stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Gradients Definition */}
                <defs>
                  <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Process variables display */}
            <div className="w-full grid grid-cols-2 gap-2 text-center font-mono text-[10px] border-t border-slate-200 pt-3 mt-2">
              <div className="bg-white border border-slate-200 p-1.5 rounded shadow-sm">
                <span className="text-slate-400 block font-bold">LEVEL PV</span>
                <span className="text-emerald-600 font-bold text-xs">{level.toFixed(1)}%</span>
              </div>
              <div className="bg-white border border-slate-200 p-1.5 rounded shadow-sm">
                <span className="text-slate-400 block font-bold">SETPOINT SP</span>
                <span className="text-[#0284c7] font-bold text-xs">{setpoint.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Operator HMI Controls (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded p-4 flex flex-col justify-between min-h-[360px] relative shadow-sm">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-400">[OPERATOR_HMI_CONSOLE]</span>

            <div className="space-y-5 pt-6 flex-grow">
              {/* Start/Stop Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleStart}
                  className={`flex items-center justify-center space-x-2 py-3 rounded font-mono text-xs font-bold transition duration-200 border cursor-pointer ${
                    systemActive 
                      ? "bg-emerald-500 border-emerald-600 text-white shadow-sm" 
                      : "bg-white border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 shadow-sm"
                  }`}
                >
                  <FaPlay className="text-[10px]" />
                  <span>START_RUN</span>
                </button>
                
                <button
                  onClick={handleStop}
                  className={`flex items-center justify-center space-x-2 py-3 rounded font-mono text-xs font-bold transition duration-200 border cursor-pointer ${
                    !systemActive && !safetyTrip
                      ? "bg-red-500 border-red-600 text-white shadow-sm"
                      : "bg-white border-slate-200 hover:border-red-500 text-slate-700 hover:text-red-600 shadow-sm"
                  }`}
                >
                  <FaStop className="text-[10px]" />
                  <span>STOP_HALT</span>
                </button>
              </div>

              {/* Mode Selector */}
              <div className="bg-white p-3 border border-slate-200 rounded shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-2 font-bold">CONTROL_MODE</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded border border-slate-200 font-mono text-xs">
                  <button
                    onClick={() => { setMode("auto"); addLog("SYS", "Control mode switched to AUTO."); }}
                    className={`py-1.5 rounded transition cursor-pointer ${mode === "auto" ? "bg-[#0284c7] text-white font-bold" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    AUTO (PID)
                  </button>
                  <button
                    onClick={() => { setMode("manual"); addLog("SYS", "Control mode switched to MANUAL."); }}
                    className={`py-1.5 rounded transition cursor-pointer ${mode === "manual" ? "bg-[#0284c7] text-white font-bold" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    MANUAL
                  </button>
                </div>
              </div>

              {/* Setpoint (Auto) / Speed (Manual) Slider */}
              <div className="bg-white p-3 border border-slate-200 rounded shadow-sm font-mono text-xs space-y-2">
                {mode === "auto" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">LEVEL SETPOINT (SP)</span>
                      <span className="text-[#0284c7] font-bold">{setpoint}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="80"
                      value={setpoint}
                      onChange={(e) => setSetpoint(parseFloat(e.target.value))}
                      disabled={!systemActive}
                      className="w-full accent-[#0284c7] bg-slate-200 h-1.5 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">MANUAL PUMP SPEED</span>
                      <span className="text-[#0284c7] font-bold">{manualPumpSetting}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={manualPumpSetting}
                      onChange={(e) => setManualPumpSetting(parseFloat(e.target.value))}
                      disabled={!systemActive}
                      className="w-full accent-[#0284c7] bg-slate-200 h-1.5 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                  </>
                )}
              </div>

              {/* Disturbance / Aux Toggle Switches */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Drain Valve Switch */}
                <button
                  onClick={() => {
                    const nextVal = !drainOpen;
                    setDrainOpen(nextVal);
                    addLog("SYS", nextVal ? "Disturbance: Drain Valve OPENED." : "Disturbance: Drain Valve CLOSED.");
                  }}
                  className={`p-2.5 rounded border transition text-left flex flex-col justify-between cursor-pointer ${
                    drainOpen
                      ? "bg-amber-500 border-amber-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 shadow-sm"
                  }`}
                >
                  <span className="text-[9px] text-slate-400 font-bold">DISTURBANCE</span>
                  <span className="font-bold mt-1">DRAIN_VALVE</span>
                  <span className="text-[9px] text-right mt-1 self-end bg-slate-100/50 text-slate-600 px-1 rounded">
                    {drainOpen ? "OPEN (DRAIN)" : "CLOSED"}
                  </span>
                </button>

                {/* Heater Toggle */}
                <button
                  onClick={() => {
                    const nextVal = !heaterOn;
                    setHeaterOn(nextVal);
                    addLog("SYS", nextVal ? "Process: HEATER ENERGIZED." : "Process: HEATER DE-ENERGIZED.");
                  }}
                  disabled={!systemActive}
                  className={`p-2.5 rounded border transition text-left flex flex-col justify-between cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                    heaterOn && systemActive
                      ? "bg-red-500 border-red-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 shadow-sm"
                  }`}
                >
                  <span className="text-[9px] text-slate-400 font-bold">HEATING_ELEMENT</span>
                  <span className="font-bold mt-1">TANK_HEATER</span>
                  <span className="text-[9px] text-right mt-1 self-end bg-slate-100/50 text-slate-600 px-1 rounded">
                    {heaterOn && systemActive ? "HEATING" : "OFF"}
                  </span>
                </button>
              </div>
            </div>

            {/* Safety Interlock Reset */}
            {safetyTrip && (
              <button
                onClick={resetSafetyTrip}
                className="mt-4 flex items-center justify-center space-x-2 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded font-mono text-xs font-bold transition cursor-pointer"
              >
                <FaBell className="text-red-500" />
                <span>ACK_ALARM_RESET</span>
              </button>
            )}
          </div>

          {/* Panel 3: Live Trend & Alarm Historian (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 min-h-[360px]">
            {/* Live Trend Graph */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 flex-grow flex flex-col justify-between relative shadow-sm">
              <span className="text-[9px] font-mono text-slate-400 mb-1 block font-bold">[REAL_TIME_HISTORIAN_TREND]</span>
              
              {/* Canvas container */}
              <div className="w-full flex-grow relative bg-white rounded border border-slate-200 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  width="360" 
                  height="160" 
                  className="w-full h-full block" 
                />
              </div>

              {/* Trend Legend */}
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#10b981] inline-block"></span>
                  <span>PV (LEVEL: {level.toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#0284c7] inline-block"></span>
                  <span>SP (TARGET: {setpoint.toFixed(0)}%)</span>
                </div>
                <div>
                  <span>SPEED: {pumpSpeed}%</span>
                </div>
              </div>
            </div>

            {/* Alarm & Audit Logs */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 h-[150px] flex flex-col justify-between relative overflow-hidden shadow-sm">
              <span className="text-[9px] font-mono text-slate-400 mb-1.5 block font-bold">[SCADA_ALARM_EVENT_LOGGER]</span>
              
              <div className="flex-grow overflow-y-auto font-mono text-[10px] space-y-1.5 text-left pr-1 scrollbar-thin">
                {logs.map((log) => {
                  let badgeColor = "text-slate-400";
                  let textColor = "text-slate-600";
                  if (log.type === "ALM") {
                    badgeColor = "text-red-600 font-bold animate-pulse";
                    textColor = "text-red-600 bg-red-50 border border-red-100 px-1 rounded";
                  } else if (log.type === "WARN") {
                    badgeColor = "text-amber-600 font-bold";
                    textColor = "text-amber-700 bg-amber-50 border border-amber-100 px-1 rounded";
                  } else if (log.type === "SYS") {
                    badgeColor = "text-[#0284c7]";
                  }

                  return (
                    <div key={log.id} className="flex items-start gap-1.5 leading-4">
                      <span className="text-slate-400">[{log.time}]</span>
                      <span className={`${badgeColor}`}>[{log.type}]</span>
                      <span className={`${textColor} flex-grow`}>{log.message}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Panel: PLC Code View (Ladder Logic vs Structured Text) (col-span-12) */}
          <div className="col-span-12 bg-slate-50 border border-slate-200 rounded p-4 relative overflow-hidden shadow-sm">
            {/* Header controls for Code View */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">PLC Code Visualizer:</span>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">ONLINE_DEBUG</span>
              </div>
              
              <div className="flex space-x-2 font-mono text-[10px]">
                <button
                  onClick={() => setViewType("ladder")}
                  className={`px-3 py-1 rounded transition border cursor-pointer ${
                    viewType === "ladder" 
                      ? "bg-[#0284c7]/10 border-[#0284c7] text-[#0284c7] font-bold" 
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  LADDER_LOGIC (LD)
                </button>
                <button
                  onClick={() => setViewType("st")}
                  className={`px-3 py-1 rounded transition border cursor-pointer ${
                    viewType === "st" 
                      ? "bg-[#0284c7]/10 border-[#0284c7] text-[#0284c7] font-bold" 
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  STRUCTURED_TEXT (ST)
                </button>
              </div>
            </div>

            {/* LADDER VIEW */}
            {viewType === "ladder" && (
              <div className="p-4 bg-[#0b0f16] rounded border border-slate-800 font-mono text-xs overflow-x-auto space-y-6 text-left">
                {/* RUNG 1: System Run Coil */}
                <div className="flex items-center min-w-[500px]">
                  {/* Left Rail */}
                  <div className="w-1.5 h-12 bg-gray-500" />
                  
                  {/* Rung Path */}
                  <div className="flex-grow flex items-center relative">
                    <span className="absolute top-[-15px] left-2 text-[9px] text-gray-500">Rung 001: Master Start/Stop Latch</span>
                    
                    {/* Horizontal Connector */}
                    <div className={`h-0.5 w-6 ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />
                    
                    {/* Parallel Logic (Start & Seal-In) */}
                    <div className="flex items-center relative py-5">
                      {/* Top Branch: Start Push Button */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="text-[10px] text-gray-400 font-semibold px-1">START_PB</span>
                          <span className={`font-mono text-sm px-1.5 border-l-2 border-r-2 ${systemActive ? "border-gray-500 text-gray-500" : "border-emerald-500 text-emerald-400 font-bold"}`}>
                            {systemActive ? " | | " : " | | "}
                          </span>
                        </div>
                      </div>
                      
                      {/* Vertical links for latch */}
                      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />
                      <div className={`absolute right-0 top-0 bottom-0 w-0.5 ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />
                      
                      {/* Bottom Branch: Seal-In Coil */}
                      <div className="absolute top-10 left-3 flex items-center">
                        <span className="text-[9px] text-gray-400 pr-1">SYS_ACTIVE_COIL</span>
                        <span className={`font-mono text-xs border-l-2 border-r-2 px-1.5 ${systemActive ? "border-emerald-500 text-emerald-400 font-bold" : "border-gray-600 text-gray-600"}`}>
                          | |
                        </span>
                      </div>
                    </div>
                    
                    {/* Post-latch connector */}
                    <div className={`h-0.5 w-12 ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />

                    {/* NC Contact: Stop Push Button */}
                    <div className="flex items-center">
                      <span className="text-[10px] text-gray-400 px-1">STOP_PB (NC)</span>
                      <span className={`font-mono text-sm px-1.5 border-l-2 border-r-2 relative ${systemActive ? "border-emerald-500 text-emerald-400 font-bold" : "border-gray-600 text-gray-600"}`}>
                        | / |
                      </span>
                    </div>

                    {/* Safety Interlock Check */}
                    <div className={`h-0.5 w-10 ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />
                    <div className="flex items-center">
                      <span className="text-[10px] text-gray-400 px-1">HIGH_LIMIT_TRIP (NC)</span>
                      <span className={`font-mono text-sm px-1.5 border-l-2 border-r-2 ${!safetyTrip ? "border-emerald-500 text-emerald-400 font-bold" : "border-red-500 text-red-500 font-bold animate-pulse"}`}>
                        | / |
                      </span>
                    </div>

                    {/* Final segment to Output coil */}
                    <div className={`h-0.5 flex-grow ${systemActive ? "bg-emerald-500" : "bg-gray-700"}`} />
                    
                    {/* Output Coil */}
                    <div className="flex items-center pr-4">
                      <span className="text-[10px] text-gray-400 px-1">SYS_ACTIVE_COIL</span>
                      <span className={`font-mono text-sm ${systemActive ? "text-emerald-400 font-bold" : "text-gray-500"}`}>
                        ( {systemActive ? "RUN" : "   "} )
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Rail */}
                  <div className="w-1.5 h-12 bg-gray-500" />
                </div>

                {/* RUNG 2: High safety alarm trip */}
                <div className="flex items-center min-w-[500px]">
                  {/* Left Rail */}
                  <div className="w-1.5 h-12 bg-gray-500" />
                  
                  {/* Rung Path */}
                  <div className="flex-grow flex items-center relative">
                    <span className="absolute top-[-15px] left-2 text-[9px] text-gray-500">Rung 002: High Limit Level Alarm Coil</span>
                    
                    {/* Horizontal Connector */}
                    <div className={`h-0.5 w-16 ${level >= 85.0 ? "bg-red-500" : "bg-gray-700"}`} />
                    
                    {/* Contact: Level > 85% */}
                    <div className="flex items-center">
                      <span className="text-[10px] text-gray-400 px-1">TANK_LEVEL &ge; 85%</span>
                      <span className={`font-mono text-sm px-1.5 border-l-2 border-r-2 ${level >= 85.0 ? "border-red-500 text-red-500 font-bold animate-pulse" : "border-gray-600 text-gray-600"}`}>
                        | |
                      </span>
                    </div>
                    
                    {/* Final segment to Output coil */}
                    <div className={`h-0.5 flex-grow ${level >= 85.0 ? "bg-red-500" : "bg-gray-700"}`} />
                    
                    {/* Output Coil */}
                    <div className="flex items-center pr-4">
                      <span className="text-[10px] text-gray-400 px-1">HI_LEVEL_ALARM</span>
                      <span className={`font-mono text-sm ${level >= 85.0 ? "text-red-500 font-bold animate-pulse" : "text-gray-500"}`}>
                        ( {level >= 85.0 ? "TRIP" : "    "} )
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Rail */}
                  <div className="w-1.5 h-12 bg-gray-500" />
                </div>
              </div>
            )}

            {/* STRUCTURED TEXT VIEW */}
            {viewType === "st" && (
              <div className="p-4 bg-[#0b0f16] rounded border border-slate-800 font-mono text-[11px] overflow-x-auto text-left space-y-1 select-none">
                <span className="text-[9px] text-slate-500 block mb-2 font-mono">{"// IEC 61131-3 Structured Text - Main Program Cyclic execution"}</span>
                
                <div><span className="text-purple-400">PROGRAM</span> MainControl</div>
                <div><span className="text-purple-400">VAR</span></div>
                <div className="pl-4 text-gray-400">Start_PB, Stop_PB : <span className="text-[#38bdf8]">BOOL</span>; <span className="text-gray-600">{"// Pushbuttons"}</span></div>
                <div className="pl-4 text-gray-400">Sys_Active_Coil : <span className="text-[#38bdf8]">BOOL</span>; <span className="text-gray-600">{"// Run contact"}</span></div>
                <div className="pl-4 text-gray-400">Level_PV, Setpoint_SP : <span className="text-[#38bdf8]">REAL</span>; <span className="text-gray-600">{"// Process parameters"}</span></div>
                <div className="pl-4 text-gray-400">Pump_CV : <span className="text-[#38bdf8]">REAL</span>; <span className="text-gray-600">{"// Controlled Variable speed"}</span></div>
                <div className="pl-4 text-gray-400">Safety_Trip : <span className="text-[#38bdf8]">BOOL</span>; <span className="text-gray-600">{"// Trip coil"}</span></div>
                <div><span className="text-purple-400">END_VAR</span></div>
                
                <div className="pt-2 text-gray-500">{"// 1. Master Start/Stop Latch with Safety Interlock"}</div>
                <div className="pl-2">
                  <span className="text-purple-400">IF</span> Start_PB <span className="text-purple-400">AND NOT</span> Stop_PB <span className="text-purple-400">AND NOT</span> Safety_Trip <span className="text-purple-400">THEN</span>
                </div>
                <div className="pl-6 text-emerald-400 font-semibold">
                  Sys_Active_Coil := <span className="text-blue-400">TRUE</span>;
                </div>
                <div className="pl-2"><span className="text-purple-400">ELSIF</span> Stop_PB <span className="text-purple-400">OR</span> Safety_Trip <span className="text-purple-400">THEN</span></div>
                <div className="pl-6 text-gray-400">
                  Sys_Active_Coil := <span className="text-blue-400">FALSE</span>;
                </div>
                <div className="pl-2"><span className="text-purple-400">END_IF</span>;</div>
 
                <div className="pt-2 text-gray-500">{"// 2. High Level Safety Interlock Check"}</div>
                <div className="pl-2">
                  Safety_Trip := Level_PV &gt;= <span className="text-amber-400">85.0</span>;
                </div>
 
                <div className="pt-2 text-gray-500">{"// 3. Inflow Valve PID Control / Manual setting"}</div>
                <div className="pl-2">
                  <span className="text-purple-400">IF</span> Sys_Active_Coil <span className="text-purple-400">THEN</span>
                </div>
                <div className="pl-6">
                  <span className="text-purple-400">IF</span> Mode_Auto <span className="text-purple-400">THEN</span>
                </div>
                <div className="pl-10 text-emerald-400">
                  Pump_CV := PID_Compute(PV:=Level_PV, SP:=Setpoint_SP); <span className="text-gray-600">{"// Auto flow tuning"}</span>
                </div>
                <div className="pl-6"><span className="text-purple-400">ELSE</span></div>
                <div className="pl-10 text-gray-400">
                  Pump_CV := Manual_Setting;
                </div>
                <div className="pl-6"><span className="text-purple-400">END_IF</span>;</div>
                <div className="pl-2"><span className="text-purple-400">ELSE</span></div>
                <div className="pl-6 text-gray-400">
                  Pump_CV := <span className="text-amber-400">0.0</span>; <span className="text-gray-600">{"// Valve shut when system inactive"}</span>
                </div>
                <div className="pl-2"><span className="text-purple-400">END_IF</span>;</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HmiSimulator;
