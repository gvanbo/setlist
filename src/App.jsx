import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Music, 
  Clock, 
  Layers, 
  Maximize2, 
  Minimize2, 
  LayoutList 
} from 'lucide-react';

const songs = [
  {
    title: "It Really Is (Amazing Grace)",
    key: "E",
    originalKey: "Bb",
    bpm: 128,
    time: "4/4",
    sections: [
      { label: "Intro", chords: "1 1 | 4 4 | 1 1 4 4 | 6m | 1 4 | 4" },
      { label: "Verse 1", chords: "1 — 1/3 — 4 — 1 | 6m — 1 — 5 | 1 — 1/3 4 — 1 | 6m 5 — 1" },
      { label: "Chorus", chords: "4 — 1 — 6m — 5sus | 4 — 1 — 5 — 4 | 1 — 4 — 5" },
      { label: "Bridge", chords: "1 — 5 — 6m — 5 | 4 — 5/7 — 4" }
    ]
  },
  {
    title: "Yes I Will",
    key: "E",
    originalKey: "C",
    bpm: 75,
    time: "4/4",
    sections: [
      { label: "Intro/Turn", chords: "| 4² 1 | 5(4) 6m7 | 4² 1 | 5(4) 6m7 |" },
      { label: "Verse", chords: "4² — 1 — 5(4) — 6m7 | 4² — 5(4) — 1" },
      { label: "Chorus", chords: "4² 1 — 5(4) — 6m7 | 4² 1 — 5sus 5 — 6m7" },
      { label: "Bridge", chords: "4² — 1 — 5sus — 6m7 | 4² — 5 — 1" }
    ]
  },
  {
    title: "Name Above All Names",
    key: "E",
    originalKey: "Eb",
    bpm: 75,
    time: "4/4",
    sections: [
      { label: "Intro", chords: "||: 4 1 | 5 | 4 1 | 5 :||" },
      { label: "Verse 1", chords: "4 — 4 — 5 | 1/3 — 1/3 — 5 | 4 — 4 — 1/3 — 5 | 6m — 5" },
      { label: "Chorus", chords: "1 — 4 — 1 — 6m — 5 | 1/3 — 4 — 6m — 5" },
      { label: "Bridge", chords: "6m — 4 — 1 — 3m | 6m — 4 — 1/5 — 5" }
    ]
  },
  {
    title: "Covered By The Blood",
    key: "D",
    originalKey: "B",
    bpm: 76,
    time: "4/4",
    sections: [
      { label: "Intro", chords: "6m 5/7 1 1/3 | 4 | 4 1/3 2m 1 | 5" },
      { label: "Verse 1", chords: "6m 5/7 1 | 4 | 1/3 4 | 1/3 2m 1 5" },
      { label: "Chorus", chords: "1 — 5 — 6m — 4 | 1/3 — 1 — 1/3 2m — 1 — 5" },
      { label: "Bridge", chords: "6m — 4 — 1 — 5 | 6m — 4 — 1 — 5" }
    ]
  },
  {
    title: "Love Of God",
    key: "E",
    originalKey: "F#",
    bpm: 74,
    time: "4/4",
    sections: [
      { label: "Intro", chords: "1 1/3 4 | 1/3 4" },
      { label: "Verse 1", chords: "1 — 4² — 6m7 — 5sus | 1/3 — 4² — 1 — 5sus 5" },
      { label: "Pre-Chorus", chords: "4 — 5 — 6m7 — 1 | 1/3 — 4 — 5 | 1 — 5/7 — 6m7 5" },
      { label: "Chorus", chords: "4 — 1 — 5 — 6m7 | 5sus 5 1/3 — 4 — 1" },
      { label: "Bridge", chords: "1/3 — 4 — 5 — 1 | 1/3 — 4 — 5(4) — 6m7" }
    ]
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fontSize, setFontSize] = useState(4); // 1-5 scale

  const song = songs[currentIdx];

  const handleNext = () => {
    if (currentIdx < songs.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  return (
    <div className="flex h-screen bg-black text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside 
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col relative z-20 overflow-hidden shadow-2xl`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
            <LayoutList className="text-blue-500" /> SETLIST
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {songs.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-full text-left p-4 rounded-xl transition-all group border ${
                currentIdx === i 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg translate-x-1' 
                  : 'bg-slate-800/50 border-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${currentIdx === i ? 'text-blue-200' : 'text-slate-500'}`}>
                Song {i + 1}
              </div>
              <div className="font-bold text-lg truncate leading-tight">{s.title}</div>
              <div className="flex gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentIdx === i ? 'bg-blue-500' : 'bg-slate-900 text-slate-500'}`}>
                  {s.key}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentIdx === i ? 'bg-blue-500' : 'bg-slate-900 text-slate-500'}`}>
                  {s.bpm} BPM
                </span>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <span>Stage Mode Active</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* Main Performance Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Toggle Sidebar Button (Floating) */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-30 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:scale-110 transition md:block hidden border-2 border-black"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Top Header Bar */}
        <header className="p-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex-1">
            <h1 className="text-4xl font-black text-white tracking-tight">{song.title}</h1>
            <div className="flex items-center gap-6 mt-3">
              <div className="flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-lg text-white font-black text-xl shadow-inner">
                <span className="text-xs text-blue-200 font-bold uppercase">Key</span>
                {song.key}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={18} className="text-slate-500" />
                <span className="font-mono text-xl">{song.bpm}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">BPM</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-400">
                <Layers size={18} className="text-slate-500" />
                <span className="font-mono text-xl">{song.time}</span>
              </div>
              <div className="text-[10px] text-slate-600 bg-slate-800 px-2 py-1 rounded border border-slate-700 font-mono">
                ORIGINAL: {song.originalKey}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-800 rounded-lg p-1 mr-4">
              <button 
                onClick={() => setFontSize(Math.max(1, fontSize - 1))}
                className="p-2 hover:bg-slate-700 rounded text-slate-400"
              >
                <Minimize2 size={18} />
              </button>
              <button 
                onClick={() => setFontSize(Math.min(5, fontSize + 1))}
                className="p-2 hover:bg-slate-700 rounded text-slate-400"
              >
                <Maximize2 size={18} />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                disabled={currentIdx === 0}
                onClick={handlePrev}
                className="w-16 h-16 flex items-center justify-center bg-slate-800 text-white rounded-2xl hover:bg-slate-700 disabled:opacity-20 active:scale-95 transition-all shadow-lg border border-slate-700"
              >
                <ChevronLeft size={36} />
              </button>
              <button 
                disabled={currentIdx === songs.length - 1}
                onClick={handleNext}
                className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-2xl hover:bg-blue-500 disabled:opacity-20 active:scale-95 transition-all shadow-lg shadow-blue-900/40 border border-blue-400"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Charts */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6 pb-24">
            {song.sections.map((section, idx) => (
              <section 
                key={idx} 
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="bg-slate-800/80 px-6 py-2 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-blue-400 font-black uppercase tracking-[0.25em] text-sm">
                    {section.label}
                  </h3>
                </div>
                <div className="p-8 md:p-12">
                  <p 
                    className="font-mono font-black tracking-[0.1em] text-blue-50 leading-relaxed"
                    style={{ fontSize: `${1.5 + fontSize * 0.75}rem` }}
                  >
                    {section.chords}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer Navigation (Mobile Only) */}
        <footer className="md:hidden p-4 bg-slate-900 border-t border-slate-800 flex justify-around">
           {/* Add simpler icons for mobile if needed */}
        </footer>
      </main>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-4 right-4 text-[10px] text-slate-700 font-mono hidden lg:block uppercase tracking-widest pointer-events-none">
        Arrows to navigate
      </div>
    </div>
  );
}
