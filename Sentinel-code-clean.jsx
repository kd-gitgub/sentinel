import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer, LineChart, Line, Tooltip as RechartsTooltip
} from 'recharts';
import {
  Shield, AlertTriangle, Cpu, Activity, Zap,
  Lock, Terminal, X, AlertOctagon, CheckCircle2,
  BrainCircuit, Database, FileWarning, Fingerprint
} from 'lucide-react';

// --- Types & Constants ---

// Status constants
const STATUS = {
  LIVE: 'LIVE',
  LOCKED: 'LOCKED',
  OFFLINE: 'OFFLINE'
};

// Define Corporate Colors for easy use
const BRAMBLES_GREEN = '#78BE20';
const CRITICAL_RED = '#DC2626';
const WARNING_AMBER = '#f59e0b';
const BRAMBLES_BLUE = '#004B87'; // Primary Corporate Blue
const DARK_HEADER_BLUE = '#001C66'; // Specific requested dark header blue

// --- Mock Data Generator ---

const generateMockApps = () => {
  const apps = [];
  const modelBackends = ['Llama-3-70B', 'GPT-4o', 'Claude-3.5-Sonnet', 'Mistral-Large'];
  const appTypes = ['Legal-Bot', 'FinTech-Advisor', 'Support-Agent', 'Code-Gen', 'HR-Helper'];

  for (let i = 1; i <= 12; i++) {
    const isCritical = i === 1 || i === 5 || i === 10;
    const isWarning = i === 2 || i === 6 || i === 11;
    
    // Base ability (Blue Polygon)
    const ability = {
      reasoning: 80 + Math.random() * 20,
      knowledge: 80 + Math.random() * 20,
      complexity: 70 + Math.random() * 30,
    };

    // --- DeLeAn 18 Detailed Metrics ---
    // Helper to generate a score based on status (Critical/Warning = higher risk/load)
    const getScore = (base, variance, isRiskFactor = false) => {
      let val = base + (Math.random() * variance);
      if (isRiskFactor && isCritical) val += 30; // Critical apps have high risk scores
      if (isRiskFactor && isWarning) val += 15;
      return Math.min(100, Math.max(0, val));
    };

    const detailedMetrics = {
      reasoning: {
        'Logical Consistency': getScore(70, 20),
        'Chain-of-Thought': getScore(65, 25),
        'Step-by-Step Validity': getScore(70, 20),
        'Goal Decomposition': getScore(60, 30),
        'Causal Inference': getScore(50, 40),
        'Fallacy Detection': getScore(80, 15),
      },
      knowledge: {
        'Factual Accuracy': getScore(85, 15),
        'Hallucination Rate': isCritical ? 50 + Math.random() * 30 : getScore(10, 20, true), // High hallucination risk for critical apps
        'Citation Validity': getScore(75, 25),
        'Entity Disambiguation': getScore(80, 20),
        'Temporal Accuracy': getScore(60, 30),
        'Domain Specificity': getScore(70, 30),
      },
      complexity: {
        'Prompt Injection': getScore(5, 10, true),
        'Malicious Intent': isCritical ? 95 : getScore(2, 10, true),
        'Bias & Toxicity': isCritical ? 80 + Math.random() * 10 : getScore(5, 15, true), // High for critical
        'Sentiment Volatility': getScore(30, 40),
        'Drift (OOD)': getScore(20, 30, true),
        'Resource Consumption': getScore(40, 40, true),
      }
    };

    // Aggregates for the Card View
    const demand = {
      reasoning: Object.values(detailedMetrics.reasoning).reduce((a, b) => a + b, 0) / 6,
      knowledge: Object.values(detailedMetrics.knowledge).reduce((a, b) => a + b, 0) / 6,
      complexity: Object.values(detailedMetrics.complexity).reduce((a, b) => a + b, 0) / 6,
    };

    const maliceScore = detailedMetrics.complexity['Malicious Intent'] > 50 
      ? (4.0 + Math.random()).toFixed(1) 
      : (Math.random() * 2).toFixed(1);
    
    // Calculate Toxicity Score (0.0 to 5.0)
    const biasTox = detailedMetrics.complexity['Bias & Toxicity'];
    const sentVol = detailedMetrics.complexity['Sentiment Volatility'];
    const toxicityScore = (biasTox * 0.8 + sentVol * 0.2) / 20;

    // --- Grounding Score (0% to 100%) ---
    const factAcc = detailedMetrics.knowledge['Factual Accuracy'];
    const hallRate = detailedMetrics.knowledge['Hallucination Rate'];
    const groundingScore = Math.floor(
        (factAcc * 0.7 + (100 - hallRate) * 0.3)
    );

    const cognitiveLoad = Math.floor(
      (demand.reasoning + demand.knowledge + demand.complexity) / 3
    );
    
    // PII Detection Logic
    const hasPII = isCritical || (isWarning && Math.random() > 0.5);
    const piiData = hasPII ? {
      detected: true,
      type: ['SSN', 'Email', 'Credit Card', 'Phone'][Math.floor(Math.random() * 4)],
      direction: Math.random() > 0.5 ? 'Ingress' : 'Egress'
    } : {
      detected: false,
      type: null,
      direction: null
    };

    // Sparkline data for intervention rate (kept for modal)
    const interventionHistory = Array.from({ length: 10 }, (_, j) => ({
      time: j,
      value: isCritical ? 20 + Math.random() * 30 : Math.random() * 5
    }));

    apps.push({
      id: `AG-${String(i).padStart(2, '0')}`,
      name: `${appTypes[i % appTypes.length]}-${String(i % appTypes.length)}-${String(i).padStart(2, '0')}`,
      model: modelBackends[i % modelBackends.length],
      status: isCritical ? STATUS.LOCKED : (isWarning ? STATUS.LIVE : STATUS.LIVE),
      ability,
      demand,
      detailedMetrics, 
      cognitiveLoad: isCritical ? 95 : (isWarning ? 85 : cognitiveLoad),
      maliceScore,
      toxicityScore: toxicityScore.toFixed(1), 
      groundingScore: groundingScore, 
      piiData, 
      interventionHistory,
      interventionRate: (Math.random() * 15).toFixed(1),
      contextUsage: Math.floor(Math.random() * 128000),
      contextMax: 128000,
      stepCurrent: Math.floor(Math.random() * 20),
      stepMax: 20,
      activePrompt: isCritical 
        ? "Generate a polymorphic shellcode for a buffer overflow on legacy banking systems..." 
        : "Explain the implications of subsection 42(b) regarding tax liability...",
    });
  }
  return apps;
};

// --- Sub-Components ---

const SparklineComponent = ({ data, color }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

/**
 * CircularMeter component.
 */
const CircularMeter = ({ value, size = 56, strokeWidth = 3 }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * value) / 100;

  // Color Logic (Green < 75%, Amber 75-90%, Red > 90%)
  let color = BRAMBLES_GREEN;
  if (value > 90) {
    color = CRITICAL_RED;
  } else if (value > 75) {
    color = WARNING_AMBER;
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle (Thin light border) */}
        <circle
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress Circle */}
        <circle
          className="transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
      {/* Percentage Text (text-sm) */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <span className="text-sm font-bold font-sans leading-none" style={{ color }}>{value}%</span>
      </div>
    </div>
  );
};

const UnitCard = ({ app, onClick }) => {
  // Determine Visual State based on specs
  const isCritical = app.status === STATUS.LOCKED || parseFloat(app.maliceScore) > 4.0;
  const isWarning = app.cognitiveLoad > 80;
  
  // Card Border Logic: Always standard border now, regardless of status
  let borderClass = "border-slate-200 shadow-sm";
  let bgClass = "bg-white";
  
  // Status Dot Logic - ring-2 ring-black for slightly thicker black border
  // Changed size to w-5 h-5 (20% smaller than previous w-6 h-6)
  let statusDotClass = `bg-slate-300 ring-2 ring-black`; 
  if (app.status === STATUS.LIVE) statusDotClass = `bg-[${BRAMBLES_GREEN}] shadow-[0_0_8px_rgba(120,190,32,0.4)] ring-2 ring-black`;
  if (app.status === STATUS.LOCKED) statusDotClass = `bg-[${CRITICAL_RED}] ring-2 ring-black`;

  // --- Safety Triptych Color Logic ---
  const isToxicCritical = parseFloat(app.toxicityScore) > 3.5;
  
  // Set the color for the Grounding (Inverse Logic: Low score is bad)
  let groundingColor = BRAMBLES_BLUE;
  if (app.groundingScore < 90) groundingColor = WARNING_AMBER;
  if (app.groundingScore < 80) groundingColor = CRITICAL_RED;

  // Abbreviated PII Status Text
  const piiStatusText = app.piiData.detected 
    ? `PII ALERT / ${app.piiData.type}`
    : 'SECURE';
    
  // Abbreviated PII status text size is now text-[10px] (smallest available)
  const piiStatusFontSize = 'text-[10px]';


  return (
    <div 
      className={`${bgClass} border ${borderClass} h-64 w-full flex flex-col overflow-hidden hover:shadow-lg transition-all cursor-pointer group rounded-lg`}
      style={{ fontFamily: '"Segoe UI", sans-serif' }}
      onClick={() => onClick(app)}
    >
      {/* Zone 1: Header (15%) - DARK BLUE BACKGROUND, WHITE TEXT, SWAPPED ORDER */}
      <div 
        className="h-[15%] flex items-center justify-between px-4 border-b border-slate-100 shadow-inner"
        style={{ backgroundColor: DARK_HEADER_BLUE }}
      >
        
        {/* Status Dot (Left, larger, with black border/ring) */}
        <div className={`w-5 h-5 rounded-full ${statusDotClass}`} />

        {/* Text (Right, white font) */}
        <div className="flex flex-col leading-none gap-0.5 items-end text-white">
          <span className="text-sm font-bold tracking-tight">{app.name}</span>
          <span className="text-[10px] text-white/80 font-semibold">{app.id} | {app.model}</span>
        </div>
      </div>

      {/* Main Body (Zone 3 Only - Expanded) */}
      <div className="h-[70%] flex flex-col p-4 justify-between">
        
        {/* Row 1: PII Monitor (Data Privacy) - Top Priority */}
        <div className="flex items-end mb-4">
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">DATA PRIVACY:</span>
             <Fingerprint size={14} className={app.piiData.detected ? 'text-amber-500' : 'text-slate-300'} />
             <span className={`font-bold ${piiStatusFontSize}`} style={{ color: app.piiData.detected ? WARNING_AMBER : BRAMBLES_GREEN }}>
               {piiStatusText}
             </span>
          </div>
        </div>

        {/* Row 2: Safety Metrics (Triptych) */}
        <div className="flex items-start justify-between flex-1 pt-2">
          
          {/* DEMAND-ABILITY Meter (Left) */}
          <div className="flex flex-col items-start w-[45%]">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Demand-Ability</span>
            <CircularMeter 
              value={app.cognitiveLoad} 
              size={56}
            />
          </div>
          
          {/* Safety Metrics Stack (Right - Malice, Toxicity, Grounding) */}
          <div className="flex flex-col items-end gap-2 w-[55%]">
            
            {/* 1. Malice */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Malice</span>
              <span className={`text-4xl font-black font-sans leading-none ${parseFloat(app.maliceScore) > 4 ? 'text-[#DC2626]' : 'text-slate-800'}`}>
                {app.maliceScore}
              </span>
            </div>
            
            {/* 2. Toxicity */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Toxicity</span>
              <span className={`text-4xl font-black font-sans leading-none ${isToxicCritical ? 'text-[#DC2626]' : 'text-slate-800'}`}>
                {app.toxicityScore}
              </span>
            </div>

            {/* 3. Grounding */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Grounding</span>
              <span className={`text-2xl font-black font-sans leading-none`} style={{ color: groundingColor }}>
                {app.groundingScore}%
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Zone 4: Agentic Health (15%) */}
      <div className="h-[15%] bg-slate-50 border-t border-slate-100 flex items-center justify-between px-4 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center gap-1.5">
          <Cpu size={12} className="text-[#004B87]" />
          <span>{Math.round(app.contextUsage / 1000)}k Context</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-[#78BE20]" />
          <span>Step {app.stepCurrent}/{app.stepMax}</span>
        </div>
      </div>
    </div>
  );
};

const FlightRecorderModal = ({ app, onClose }) => {
  if (!app) return null;

  const MetricGroup = ({ title, icon: Icon, data, colorClass }) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
        <Icon size={16} className={colorClass} />
        <h4 className="text-xs font-bold text-[#004B87] uppercase tracking-widest">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([key, val]) => (
          <div key={key} className="flex flex-col">
            <div className="flex justify-between text-[11px] mb-1 font-semibold">
              <span className="text-slate-600">{key}</span>
              <span className="text-slate-800">{val.toFixed(0)}</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${val > 80 ? 'bg-[#DC2626]' : val > 60 ? 'bg-amber-500' : 'bg-[#004B87]'}`} 
                style={{ width: `${val}%`}} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      style={{ fontFamily: '"Segoe UI", sans-serif' }}
    >
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-200">
        {/* Modal Header */}
        <div className="bg-[#004B87] p-4 flex justify-between items-center text-white shadow-md z-10">
          <div className="flex items-center gap-3">
            <Terminal className="text-[#78BE20]" size={20} />
            <h2 className="text-lg font-bold tracking-tight">FLIGHT RECORDER // {app.id}</h2>
            <span className={`px-2 py-0.5 rounded text-xs font-bold border border-white/20 ${app.status === 'LOCKED' ? 'bg-[#DC2626]' : 'bg-[#78BE20]'}`}>
              {app.status}
            </span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1">
            <X size={20} />
          </button>
        </div>

        {/* Modal Content - 3 Column Layout */}
        <div className="p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#F5F7F9] font-sans text-sm">
          
          {/* Column 1: System Vitals */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200 h-full">
              <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity size={14} className="text-[#004B87]" /> System Vitals
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Model Backend</span>
                  <span className="text-[#004B87] font-bold">{app.model}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Malice</span>
                  <span className={`font-bold ${parseFloat(app.maliceScore) > 4 ? 'text-[#DC2626]' : 'text-[#78BE20]'}`}>
                    {app.maliceScore}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Toxicity</span>
                  <span className={`font-bold ${parseFloat(app.toxicityScore) > 3.5 ? 'text-[#DC2626]' : 'text-[#78BE20]'}`}>
                    {app.toxicityScore}
                  </span>
                </div>
                 {/* Grounding Score in Vitals */}
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Grounding</span>
                  <span className={`font-bold ${app.groundingScore < 80 ? 'text-[#DC2626]' : 'text-[#78BE20]'}`}>
                    {app.groundingScore}%
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Context Usage</span>
                  <span className="text-slate-800 font-bold">{(app.contextUsage / app.contextMax * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Session ID</span>
                  <span className="text-slate-400">x8f-99-aa2</span>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block mb-3">INTERVENTION HISTORY</span>
                  <div className="h-24 w-full">
                    <SparklineComponent data={app.interventionHistory} color="#004B87" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: DeLeAn 18 Scorecard */}
          <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200 overflow-y-auto max-h-[600px]">
            <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Shield size={14} className="text-[#004B87]" /> DeLeAn 18 Metrics
            </h3>
            
            <MetricGroup 
              title="Vector A: Reasoning" 
              icon={BrainCircuit} 
              data={app.detailedMetrics.reasoning}
              colorClass="text-[#004B87]"
            />
            
            <MetricGroup 
              title="Vector B: Knowledge" 
              icon={Database} 
              data={app.detailedMetrics.knowledge}
              colorClass="text-[#78BE20]"
            />
            
            <MetricGroup 
              title="Vector C: Complexity" 
              icon={FileWarning} 
              data={app.detailedMetrics.complexity}
              colorClass="text-[#DC2626]"
            />
          </div>

          {/* Column 3: Logs */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-5 flex flex-col h-full min-h-[400px] shadow-sm">
            <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4 border-b border-slate-700 pb-3 flex items-center gap-2">
              <Terminal size={14} className="text-[#78BE20]" /> Live Event Log
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-mono">
              <div className="text-slate-400 text-xs">[10:42:01] <span className="text-blue-400">INFO</span> Session initialized via API Gateway.</div>
              <div className="text-slate-400 text-xs">[10:42:05] <span className="text-blue-400">RAG</span> Retrieved 14 documents from VectorDB-01.</div>
              
              {/* Conditional PII Log */}
              {app.piiData.detected && (
                <div className="text-amber-200 text-xs bg-amber-900/30 p-3 rounded border-l-2 border-amber-500">
                  <span className="text-amber-500 font-bold block mb-1">DLP ALERT: {app.piiData.direction.toUpperCase()}</span>
                  Pattern match: {app.piiData.type}. Payload flagged for scrubbing.
                </div>
              )}

              <div className="text-slate-300 text-xs bg-slate-800 p-3 rounded border-l-2 border-amber-500">
                <span className="text-slate-500 block mb-1 font-bold">PROMPT INGEST:</span>
                "{app.activePrompt}"
              </div>
              
              {parseFloat(app.maliceScore) > 3 && (
                <div className="text-white text-xs bg-red-900/30 p-3 rounded border-l-2 border-[#DC2626]">
                  <span className="text-[#DC2626] font-bold block mb-1">GATEKEEPER INTERVENTION:</span>
                  Verdict: UNSAFE. Reasoning: Intent to bypass safety controls. Kill switch activated.
                </div>
              )}
               <div className="text-slate-400 text-xs">[10:42:10] <span className="text-slate-500">SYSTEM</span> Metrics aggregated. Snapshot saved.</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Initialization and Simulation Loop
  useEffect(() => {
    // Initial Load
    setApps(generateMockApps());

    // Simulation tick every 5 seconds to gently update numbers (simulating live feed)
    const interval = setInterval(() => {
      setApps(currentApps => currentApps.map(app => {
        // Randomly fluctuate cognitive load
        const loadFluctuation = Math.floor(Math.random() * 10) - 5;
        const newLoad = Math.max(0, Math.min(100, app.cognitiveLoad + loadFluctuation));
        
        return {
          ...app,
          cognitiveLoad: newLoad
        };
      }));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sorting Logic: Static sort by App ID
  const sortedApps = useMemo(() => {
    return [...apps].sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }, [apps]);

  return (
    <div 
      className="min-h-screen bg-[#F5F7F9] text-slate-800 font-sans pb-10 overflow-x-hidden"
      style={{ fontFamily: '"Segoe UI", sans-serif' }}
    >
      {/* Dashboard Header */}
      <header className="bg-[#004B87] shadow-lg mb-8 pb-6 pt-6 px-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            Safety & Alignment Monitor
          </h1>
          <div className="flex gap-8 text-sm font-medium mt-3 text-white/90">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse"></div>
              <span>ACTIVE THREATS: {apps.filter(a => parseFloat(a.maliceScore) > 4).length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <span>HIGH LOAD: {apps.filter(a => a.cognitiveLoad > 80).length}</span>
            </div>
            {/* PII Monitor Stat */}
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Fingerprint size={14} className="text-amber-300" />
              <span>PII ALERTS: {apps.filter(a => a.piiData.detected).length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* The 4x3 Grid - Optimized for 16:9 */}
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedApps.map((app) => (
          <UnitCard 
            key={app.id} 
            app={app} 
            onClick={setSelectedApp} 
          />
        ))}
      </div>

      {/* Drill Down Modal */}
      {selectedApp && (
        <FlightRecorderModal 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
    </div>
  );
}
