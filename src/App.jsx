import React, { useState, useEffect } from 'react';

const songs = [
    {
        title: "It Really Is (Amazing Grace)",
        key: "E", bpm: 128,
        sections: [
            { label: "Intro", chords: "1 1 | 4 4 | 1 1 4 4 | 6m | 1 4 | 4", lyrics: "" },
            { label: "Verse 1", chords: "1 — 1/3 — 4 — 1 | 6m — 1 — 5", lyrics: "Amazing grace how sweet the sound that saved a wretch like me" },
            { label: "Verse 1b", chords: "1 — 1/3 4 — 1 | 6m 5 — 1", lyrics: "I once was lost but now I'm found, was blind but now I see" },
            { label: "Chorus", chords: "4 — 1 — 6m — 5sus | 4 — 1 — 5", lyrics: "Singing Hallelujah there's no chains on me, Hallelujah You have set me free" },
            { label: "Bridge", chords: "1 — 5 — 6m — 5 | 4 — 5/7 — 4", lyrics: "I'll testify of what He did, He gave me life I'm born again" }
        ]
    },
    {
        title: "Yes I Will",
        key: "E", bpm: 75,
        sections: [
            { label: "Verse", chords: "4² — 1 — 5(4) — 6m7 | 4² — 5(4) — 1", lyrics: "I count on one thing, the same God that never fails. Will not fail me now." },
            { label: "Chorus", chords: "4² 1 — 5(4) — 6m7 | 4² 1 — 5sus 5", lyrics: "I choose to praise, to glorify glorify Your name. Name above all names." },
            { label: "Bridge", chords: "4² — 1 — 5sus — 6m7 | 4² — 5 — 1", lyrics: "For all my days yes I will, for all my days yes I will." }
        ]
    },
    {
        title: "Name Above All Names",
        key: "E", bpm: 75,
        sections: [
            { label: "Verse 1", chords: "4 — 4 — 5 | 1/3 — 1/3 — 5", lyrics: "The sun was darkened and the heavens thundered. For a moment death thought it conquered." },
            { label: "Chorus", chords: "1 — 4 — 1 — 6m — 5", lyrics: "And You're still high and lifted up, all praise to the name above all names." },
            { label: "Bridge", chords: "6m — 4 — 1 — 3m", lyrics: "The cross still stands, the blood still flows. The work is finished and hell still knows." }
        ]
    },
    {
        title: "Covered By The Blood",
        key: "D", bpm: 76,
        sections: [
            { label: "Verse 1", chords: "6m 5/7 1 | 4 | 1/3 4 | 1/3 2m 1 5", lyrics: "The hill I could not climb, though the cross to bear was mine. A sinner's death You chose." },
            { label: "Chorus", chords: "1 — 5 — 6m — 4", lyrics: "I'm covered by the blood of Jesus, it's all under the blood of Jesus." },
            { label: "Bridge", chords: "6m — 4 — 1 — 5", lyrics: "Let all the saints proclaim His glory, sing worthy is the Lamb, sing worthy." }
        ]
    },
    {
        title: "Love Of God",
        key: "E", bpm: 74,
        sections: [
            { label: "Verse 1", chords: "1 — 4² — 6m7 — 5sus | 1/3 — 4² — 1 — 5sus 5", lyrics: "It's so good I almost can't believe it. Far beyond what hearts could ever dream." },
            { label: "Chorus", chords: "4 — 1 — 5 — 6m7 | 5sus 5 1/3 — 4 — 1", lyrics: "Singing oh how great is the love of God. He paid our debt on that rugged cross." },
            { label: "Bridge", chords: "1/3 — 4 — 5 — 1 | 1/3 — 4 — 5(4) — 6m7", lyrics: "Hallelujah it cleared my guilty sentence. For I was bound but now I stand redeemed." }
        ]
    }
];

export default function App() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showLyrics, setShowLyrics] = useState(true);
    const song = songs[currentIdx];

    const next = () => currentIdx < songs.length - 1 && setCurrentIdx(currentIdx + 1);
    const prev = () => currentIdx > 0 && setCurrentIdx(currentIdx - 1);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
            if (e.key.toLowerCase() === 'l') setShowLyrics((prev) => !prev);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [currentIdx]);

    return (
        <div className="flex h-screen bg-black">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-slate-950 border-r border-white/5 transition-all duration-300 flex flex-col overflow-hidden`}>
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <span className="font-black text-xl tracking-tighter text-blue-500">SETLIST</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {songs.map((s, i) => (
                        <button key={i} onClick={() => setCurrentIdx(i)} 
                            className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border ${currentIdx === i ? 'bg-blue-600 border-blue-400 text-white active-glow scale-[1.02]' : 'bg-slate-900/40 border-transparent text-slate-500 hover:border-slate-700'}`}>
                            <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Song {i+1}</div>
                            <div className="font-black text-lg leading-tight truncate">{s.title}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${currentIdx === i ? 'bg-blue-500' : 'bg-slate-800'}`}>{s.key}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${currentIdx === i ? 'bg-blue-500' : 'bg-slate-800'}`}>{s.bpm} BPM</span>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Performance Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-900/20 to-black">
                {/* Header */}
                <header className="px-8 py-6 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-10">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-4xl font-black text-white tracking-tight truncate">{song.title}</h1>
                        <div className="flex items-center gap-6 mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Target Key</span>
                                <span className="text-2xl font-black text-white">{song.key}</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tempo</span>
                                <span className="text-2xl font-black text-white font-mono">{song.bpm}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Toggle Lyrics Button */}
                        <button 
                            onClick={() => setShowLyrics(!showLyrics)}
                            className={`p-4 rounded-2xl transition-all border-2 ${showLyrics ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}
                            title="Toggle Lyrics (L)"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </button>

                        <div className="flex gap-2">
                            <button onClick={prev} disabled={currentIdx === 0} className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center disabled:opacity-20 border border-white/5 hover:bg-slate-800 transition">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button onClick={next} disabled={currentIdx === songs.length - 1} className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center disabled:opacity-20 shadow-xl shadow-blue-900/40 border border-blue-400 active:scale-95 transition">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 pb-40">
                    {song.sections.map((section, idx) => (
                        <div key={idx} className="max-w-6xl mx-auto group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-black uppercase tracking-[0.3em] rounded border border-blue-900/50">
                                    {section.label}
                                </div>
                                <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-white/10 transition"></div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="font-mono text-5xl md:text-6xl font-black text-blue-50 chord-line">
                                    {section.chords}
                                </div>
                                {showLyrics && section.lyrics && (
                                    <div className="text-2xl md:text-3xl font-semibold lyrics-line tracking-tight max-w-4xl italic opacity-80 border-l-4 border-blue-600/30 pl-6">
                                        {section.lyrics}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Navigation Controls */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                     <button onClick={() => setSidebarOpen(!sidebarOpen)} className="px-8 py-4 bg-slate-900/80 backdrop-blur shadow-2xl rounded-full text-xs font-black border border-white/10 uppercase tracking-widest text-slate-400 hover:text-white transition-all active:scale-95">
                        {sidebarOpen ? 'Collapse' : 'Expand Menu'}
                     </button>
                </div>
            </main>
        </div>
    );
}
