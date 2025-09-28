"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit5() {
  // Sidebar: estimated times per section (in minutes)
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'area-polygons': { label: 'Area of Polygons', minutes: '6–8 min', anchor: '#area-polygons' },
    'composite-area': { label: 'Composite Shapes', minutes: '7–9 min', anchor: '#composite-area' },
    'surface-area-nets': { label: 'Surface Area (Nets)', minutes: '6–8 min', anchor: '#surface-area-nets' },
    'rectangular-prism-volume': { label: 'Volume (Prisms)', minutes: '6–8 min', anchor: '#rectangular-prism-volume' },
    'compare-sa-vol': { label: 'Compare SA vs Volume', minutes: '5–7 min', anchor: '#compare-sa-vol' },
    'real-world': { label: 'Real-World Problems', minutes: '5–7 min', anchor: '#real-world' },
    'practice-problems': { label: 'My Practice Problems', minutes: '4–6 min', anchor: '#practice' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-5');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        // Seed from progressItems defined below
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-5', unitName: 'Unit 5: Geometry — Area & Volume', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-5', JSON.stringify(data));
      }
      const completedMap: Record<string, boolean> = {};
      let nextId: string | null = null;
      let left = 0;
      const side: { id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[] = [];
      for (const it of data.items || []) {
        completedMap[it.id] = !!it.completed;
        if (!it.completed && !nextId) nextId = it.id;
        if (!it.completed) left += 1;
        side.push({ id: it.id, title: it.title, completed: !!it.completed, type: it.type });
      }
      setSidebarItems(side);
      setSnapshot({ percent: Number(data.overallProgress || 0), itemsLeft: left, nextId, completed: completedMap });
    } catch {}
  }, [progressVersion]);

  // Listen for updates from the top ProgressTracker so sidebar stays in sync
  React.useEffect(() => {
    const handler = (e: any) => {
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-5') return;
      setProgressVersion(v => v + 1);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('unit-progress-changed' as any, handler);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('unit-progress-changed' as any, handler);
      }
    };
  }, []);

  const toggleSidebarItem = (id: string) => {
    try {
      const raw = localStorage.getItem('progress-unit-5');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-5', JSON.stringify(updated));
      setProgressVersion(v => v + 1); // force ProgressTracker remount via key
    } catch {}
  };
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'area-polygons', title: 'Understanding Area of Polygons', type: 'video' as const },
    { id: 'composite-area', title: 'Calculating Area of Composite Shapes', type: 'video' as const },
    { id: 'surface-area-nets', title: 'Surface Area Using Nets', type: 'video' as const },
    { id: 'rectangular-prism-volume', title: 'Volume of Rectangular Prisms', type: 'video' as const },
    { id: 'compare-sa-vol', title: 'Comparing Surface Area and Volume', type: 'video' as const },
    { id: 'real-world', title: 'Real-World Application Problems', type: 'video' as const },
    { id: 'practice-problems', title: 'My Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 5 Quiz', type: 'quiz' as const }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the area formula for a triangle?',
      type: 'multiple-choice' as const,
      options: ['A = b × h', 'A = (b × h) / 2', 'A = 2b + 2h', 'A = πr²'],
      correctAnswer: 'A = (b × h) / 2',
      explanation: 'Triangle area equals one-half base times height.'
    },
    {
      id: 'q2',
      question: 'A rectangular prism has dimensions 3 cm × 4 cm × 5 cm. What is its volume?',
      type: 'fill-in' as const,
      correctAnswer: '60',
      explanation: 'V = l × w × h = 3 × 4 × 5 = 60 cubic centimeters.'
    },
    {
      id: 'q3',
      question: 'Surface area measures ____ while volume measures ____.',
      type: 'multiple-choice' as const,
      options: ['inside; outside', 'covering; filling', 'length; width', 'weight; density'],
      correctAnswer: 'covering; filling',
      explanation: 'Surface area is the covering of a 3D shape; volume is the space it fills.'
    },
    {
      id: 'q4',
      question: 'To find the area of a composite shape, you should…',
      type: 'multiple-choice' as const,
      options: ['Estimate visually', 'Break into simple shapes and add areas', 'Only measure the perimeter', 'Multiply length by width'],
      correctAnswer: 'Break into simple shapes and add areas',
      explanation: 'Decompose into known shapes, compute each area, then add.'
    },
    {
      id: 'q5',
      question: 'Which units are appropriate for surface area and volume?',
      type: 'multiple-choice' as const,
      options: ['Square units for SA; cubic units for volume', 'Cubic units for SA; square units for volume', 'Meters for both', 'No units needed'],
      correctAnswer: 'Square units for SA; cubic units for volume',
      explanation: 'Surface area uses square units; volume uses cubic units.'
    }
  ];

  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed: ${score}/${total}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle" style={{top: '12%', left: '14%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '26%', left: '82%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '62%', left: '22%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '86%', left: '72%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '42%', left: '54%', animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-white/20 py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold glow-text slide-in-left">
              <Link href="/" className="hover:text-blue-400 transition-colors duration-300">
                Adam's Alphabet
              </Link>
            </div>
            <div className="space-x-8 slide-in-right">
              <Link href="/" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">Home</Link>
              <Link href="/mathematics" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">Mathematics</Link>
              <Link href="/about" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">About Me</Link>
              <Link href="/book" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">Book a Class</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10" id="top">
        {/* Sidebar Toggle Button */}
        <button
          type="button"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(v => !v)}
          className="hidden lg:flex fixed right-4 bottom-6 z-30 items-center gap-3 px-5 py-3 rounded-full shadow-xl transition-all bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border border-white/20 backdrop-blur-sm"
        >
          <span className={`inline-block w-2 h-2 rounded-full ${isSidebarOpen ? 'bg-white' : 'bg-white/80'} animate-pulse`}></span>
          <span className="font-semibold tracking-wide">{isSidebarOpen ? 'Close Progress' : 'Open Progress'}</span>
          <svg className={`w-4 h-4 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        {/* Slide-in Sidebar (desktop) */}
        <aside className={`hidden lg:block fixed right-0 top-24 w-96 max-w-full z-20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="m-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 glow-border card-shadow">
            <h3 className="text-xl font-semibold text-white mb-3">Progress snapshot</h3>
            <p className="text-sm text-gray-300 mb-3">
              <span className="text-green-400 font-semibold">{snapshot.percent}%</span> complete · {snapshot.itemsLeft} items left
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${snapshot.percent}%` }}></div>
            </div>
            {snapshot.nextId && (
              <a href={sectionTimes[snapshot.nextId]?.anchor || '#top'} className="btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg text-sm inline-block">
                Resume where you left off →
              </a>
            )}
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-gray-200 mb-2">Checklist</h4>
              <ul className="space-y-2 text-sm">
                {sidebarItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between">
                    <a href={sectionTimes[item.id]?.anchor || '#top'} className={`hover:text-blue-400 ${item.completed ? 'line-through text-gray-400' : 'text-gray-200'}`}>{item.title}</a>
                    <button onClick={() => toggleSidebarItem(item.id)} className={`px-2 py-1 rounded text-xs ${item.completed ? 'bg-green-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'}`}>{item.completed ? '✓ Done' : 'Mark'}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 slide-in-top">
            <ol className="flex space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link></li>
              <li>/</li>
              <li><Link href="/mathematics" className="hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
              <li>/</li>
              <li className="text-white">Unit 5</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/15 via-teal-600/15 to-cyan-600/15 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <h1 className="relative text-7xl font-black text-white mb-6 glow-text slide-in-top stagger-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                Unit 5: Geometry — Area & Volume
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">📐</span>
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Explore the fascinating world of geometry, mastering area, surface area, and volume calculations while solving real-world problems with visual models
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-200 rounded-full text-base font-semibold border border-emerald-400/50 shadow-lg backdrop-blur-sm">
                📏 9 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-teal-500/30 to-teal-600/30 text-teal-200 rounded-full text-base font-semibold border border-teal-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 60-75 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-200 rounded-full text-base font-semibold border border-cyan-400/50 shadow-lg backdrop-blur-sm">
                🎨 Visual
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 5 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                This is another math-packed unit on the concept of area and volume and how using them, we can help measure spaces and objects. We will find ways of determining the area of certain specific shapes, such as a triangle and polygons, either by breaking them down into simpler shapes or by finding new ways of measuring them.
              </p>
              <p className="mb-6 text-lg">
                Volume measurements tell us how much space an object takes up. You're going to use cool tools and strategies to solve real-world problems involving area problems of things such as the area of a room or volume of boxes. Plus, you'll be using drawings and models to help us see the solutions.
              </p>
              <p className="text-lg">Get ready to see your space in a new way!</p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Calculate area of rectangles, squares, triangles, parallelograms, and trapezoids</li>
              <li>Decompose composite shapes and compute total area</li>
              <li>Use nets to find surface area of prisms and pyramids</li>
              <li>Compute volume of rectangular prisms, including fractional edges</li>
              <li>Compare and choose between surface area and volume in real contexts</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker key={`unit-5-${progressVersion}`} unitId="unit-5" unitName="Unit 5: Geometry — Area & Volume" items={progressItems} />

          {/* Sections */}
          <div className="space-y-16">
            {/* Understanding Area of Polygons */}
            <section id="area-polygons" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🟩</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Understanding Area of Polygons</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Area is the amount of space inside a two-dimensional shape. It is measured in square units.</p>
                <p>Polygons covered: rectangles, squares, triangles, parallelograms, trapezoids.</p>
                
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-green-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Calculate area of rectangles, squares, triangles, parallelograms, and trapezoids</li>
                    <li>Apply the correct formula for each polygon type</li>
                    <li>Understand the relationship between base, height, and area</li>
                    <li>Solve real-world problems involving area calculations</li>
                  </ul>
                </div>
                
                <p className="text-gray-200 font-semibold">Formulas:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Rectangles and Squares: A = length × width</li>
                  <li>Triangles: A = (base × height) / 2</li>
                  <li>Parallelograms: A = base × height</li>
                  <li>Trapezoids: A = (base1 + base2) / 2 × height</li>
                </ul>
                <p>Why it matters: planning flooring, painting, or designing spaces.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/xCdxURXMdFY" title="Math Antics – Introduction to Area" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Math Antics – Introduction to Area</h3>
                  <p className="text-gray-300 text-sm">Introduces the concept of area and demonstrates formulas for common polygons like rectangles, triangles, and parallelograms with clear visuals.</p>
                  <a href="https://youtu.be/xCdxURXMdFY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/hm17lVaor0Q" title="Khan Academy – Area of a Parallelogram" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Khan Academy – Area of a Parallelogram</h3>
                  <p className="text-gray-300 text-sm">Shows how the area of a parallelogram relates to a rectangle and how to use base and height to compute area.</p>
                  <a href="https://youtu.be/hm17lVaor0Q" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Composite Shapes */}
            <section id="composite-area" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧩</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Calculating Area of Composite Shapes</h2>
              </div>
              <p className="text-gray-300 text-lg mb-4">Break the shape into simpler shapes, find each area, and add them together.</p>
              
              <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 mb-6">
                <h4 className="text-purple-300 font-semibold mb-2">What You'll Learn:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Decompose composite shapes into simpler geometric shapes</li>
                  <li>Calculate the area of each component shape</li>
                  <li>Add individual areas to find the total area</li>
                  <li>Apply this method to real-world composite figures</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/loAA3TCNAvU" title="Khan Academy – Area of Composite Shapes" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Khan Academy – Area of Composite Shapes</h3>
                  <p className="text-gray-300 text-sm">Demonstrates splitting complex figures into simple shapes, calculating each area, then adding to get the total.</p>
                  <a href="https://youtu.be/loAA3TCNAvU" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/z4Lat1uOQI4" title="Finding the Area of a Composite Figure – Mr. J" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Finding the Area of a Composite Figure – Mr. J</h3>
                  <p className="text-gray-300 text-sm">Explains breaking down composite figures (rectangles, triangles) and adding areas with step-by-step examples.</p>
                  <a href="https://youtu.be/z4Lat1uOQI4" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Surface Area Using Nets */}
            <section id="surface-area-nets" className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Surface Area Using Nets</h2>
              </div>
              
              <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4 mb-6">
                <h4 className="text-teal-300 font-semibold mb-2">What You'll Learn:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Understand what nets are and how they represent 3D shapes</li>
                  <li>Calculate the area of each face in a net</li>
                  <li>Add all face areas to find total surface area</li>
                  <li>Apply this method to cubes, prisms, and pyramids</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/mtMNvnm71Z0" title="Finding Surface Area Using Nets – Math Mammoth" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Finding Surface Area Using Nets – Math Mammoth</h3>
                  <p className="text-gray-300 text-sm">Unfolds 3D shapes into nets, computes each face’s area, and adds to find total surface area (cubes, prisms).</p>
                  <a href="https://youtu.be/mtMNvnm71Z0" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/ny5DVYNpqM8" title="Khan Academy – Surface Area Using Nets" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Khan Academy – Surface Area Using Nets</h3>
                  <p className="text-gray-300 text-sm">Determines the surface area of prisms and pyramids using their nets with clear visuals and examples.</p>
                  <a href="https://youtu.be/ny5DVYNpqM8" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Volume of Rectangular Prisms */}
            <section id="rectangular-prism-volume" className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📦</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Volume of Rectangular Prisms</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/qJwecTgce6c" title="Math Antics – Volume" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Math Antics – Volume</h3>
                  <p className="text-gray-300 text-sm">Introduces volume as the space inside a 3D object and applies V = l × w × h to rectangular prisms.</p>
                  <a href="https://youtu.be/qJwecTgce6c" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/EJTPGyWqhqc" title="Khan Academy – Volume of a Rectangular Prism" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy – Volume of a Rectangular Prism</h3>
                  <p className="text-gray-300 text-sm">Computes volume of rectangular prisms, including examples with fractional side lengths.</p>
                  <a href="https://youtu.be/EJTPGyWqhqc" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Comparing Surface Area and Volume */}
            <section id="compare-sa-vol" className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Comparing Surface Area and Volume</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/ThY_RCxC4gc" title="Khan Academy – Volume and Surface Area Word Problems" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Khan Academy – Volume and Surface Area Word Problems</h3>
                  <p className="text-gray-300 text-sm">Tackles word problems requiring both surface area and volume, emphasizing when to use each measurement.</p>
                  <a href="https://youtu.be/ThY_RCxC4gc" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/eBAq_caikJ4" title="Surface Area and Volume Review – Mario's Math Tutoring" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Surface Area and Volume Review – Mario's Math Tutoring</h3>
                  <p className="text-gray-300 text-sm">Quickly reviews differences between surface area and volume and how to calculate both with examples.</p>
                  <a href="https://youtu.be/eBAq_caikJ4" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Real-World Application Problems */}
            <section id="real-world" className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🌍</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Real-World Application Problems</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/ThY_RCxC4gc" title="Khan Academy – Volume and Surface Area Word Problems" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">Khan Academy – Volume and Surface Area Word Problems</h3>
                  <p className="text-gray-300 text-sm">Applies area, surface area, and volume to real scenarios, modeling and solving step-by-step.</p>
                  <a href="https://youtu.be/ThY_RCxC4gc" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/OanPzjf2EYY" title="Khan Academy – Volume Word Problem: Water Tank" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">Khan Academy – Volume Word Problem: Water Tank</h3>
                  <p className="text-gray-300 text-sm">Calculates the volume of a water tank from dimensions, applying the prism volume formula to a practical case.</p>
                  <a href="https://youtu.be/OanPzjf2EYY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>
          </div>

          {/* My Practice Problems */}
          <section className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mr-6">
                <span className="text-3xl">✍️</span>
              </div>
              <h2 className="text-4xl font-semibold text-white glow-text">My Practice Problems</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Unit 5 Practice Problems</h3>
              <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1vWT_exmaDi6YkbiMXVmwztS0nDPKyfyU/preview" allow="autoplay" title="Unit 5 Practice Problems Preview"></iframe>
              </div>
              <a href="https://drive.google.com/file/d/1vWT_exmaDi6YkbiMXVmwztS0nDPKyfyU/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
            </div>
          </section>

          {/* Review: Worksheets + Practice */}
          <section className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                <span className="text-3xl">📚</span>
              </div>
              <h2 className="text-4xl font-semibold text-white glow-text">Review: Worksheets + Practice</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">K5 Learning: Rectangular Prism — Volume & Surface Area</h3>
                <a href="https://www.k5learning.com/free-math-worksheets/sixth-grade-6/geometry/rectangular-prism-volume-surface-area" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">MathWorksheets4Kids: Volume</h3>
                <a href="https://www.mathworksheets4kids.com/volume.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">MathWorksheets4Kids: Surface Area</h3>
                <a href="https://www.mathworksheets4kids.com/surface-area.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Cuemath: Area & Volume Worksheets</h3>
                <a href="https://www.cuemath.com/worksheets/area-and-volume-worksheets/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Aids: Geometry — Volume</h3>
                <a href="https://www.math-aids.com/Geometry/Volume/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Salamanders: Surface Area (6th Grade)</h3>
                <a href="https://www.math-salamanders.com/surface-area-worksheet-6th-grade.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
            </div>
          </section>

          {/* Interactive Quiz */}
          <InteractiveQuiz 
            questions={quizQuestions}
            title="Unit 5: Area & Volume Quiz"
            onComplete={handleQuizComplete}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/mathematics/unit-6" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 6 →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-white/20 py-12 mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-bottom">
            <div className="fade-in">
              <h3 className="text-xl font-semibold mb-4 glow-text">Adam's Alphabet</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Free educational resources for students who need extra help with mathematics.</p>
            </div>
            <div className="fade-in">
              <h3 className="text-xl font-semibold mb-4 glow-text">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/mathematics" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Me</Link></li>
              </ul>
            </div>
            <div className="fade-in">
              <h3 className="text-xl font-semibold mb-4 glow-text">Contact</h3>
              <div className="text-sm text-gray-300 space-y-3">
                <p className="flex items-center"><span className="mr-2">📧</span>adamissac08@gmail.com</p>
                <p className="flex items-center"><span className="mr-2">📺</span><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">YouTube Channel</a></p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>This website is intended for extra help and is not limited to students in Georgia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

 