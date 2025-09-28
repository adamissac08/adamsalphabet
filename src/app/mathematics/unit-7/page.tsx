"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit7() {
  // Sidebar: estimated times per section (in minutes)
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'area-triangles': { label: 'Area of Triangles & Polygons', minutes: '8–10 min', anchor: '#area-triangles' },
    'composite-figures': { label: 'Area of Composite Figures', minutes: '7–9 min', anchor: '#composite-figures' },
    'surface-area-nets': { label: 'Surface Area Using Nets', minutes: '8–10 min', anchor: '#surface-area-nets' },
    'volume-prisms': { label: 'Volume of Rectangular Prisms', minutes: '7–9 min', anchor: '#volume-prisms' },
    'real-world-geometry': { label: 'Real-World Geometry Problems', minutes: '6–8 min', anchor: '#real-world-geometry' },
    'practice-problems': { label: 'My Practice Problems', minutes: '4–6 min', anchor: '#practice' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-7');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        // Seed from progressItems defined below
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-7', unitName: 'Unit 7: Geometry - Area, Surface Area & Volume', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-7', JSON.stringify(data));
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
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-6') return;
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
      const raw = localStorage.getItem('progress-unit-7');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-7', JSON.stringify(updated));
      setProgressVersion(v => v + 1); // force ProgressTracker remount via key
    } catch {}
  };
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'area-triangles', title: 'Area of Triangles, Quadrilaterals, and Polygons', type: 'video' as const },
    { id: 'composite-figures', title: 'Area of Composite Figures', type: 'video' as const },
    { id: 'surface-area-nets', title: 'Surface Area of 3D Figures (Nets)', type: 'video' as const },
    { id: 'volume-prisms', title: 'Volume of Right Rectangular Prisms', type: 'video' as const },
    { id: 'real-world-geometry', title: 'Real-World Geometry Problems', type: 'video' as const },
    { id: 'practice-problems', title: 'My Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 7 Quiz', type: 'quiz' as const }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the formula for the area of a triangle?',
      type: 'multiple-choice' as const,
      options: ['A = b × h', 'A = (b × h) / 2', 'A = 2b + 2h', 'A = πr²'],
      correctAnswer: 'A = (b × h) / 2',
      explanation: 'The area of a triangle is half the product of its base and height.'
    },
    {
      id: 'q2',
      question: 'How do you find the area of a composite figure?',
      type: 'multiple-choice' as const,
      options: ['Use one formula', 'Break it into simple shapes and add areas', 'Multiply length by width', 'Use the perimeter'],
      correctAnswer: 'Break it into simple shapes and add areas',
      explanation: 'Composite figures are broken down into familiar shapes, then their individual areas are calculated and added together.'
    },
    {
      id: 'q3',
      question: 'What is surface area?',
      type: 'multiple-choice' as const,
      options: ['The space inside a 3D shape', 'The total area of all faces of a 3D shape', 'The length around a shape', 'The height of a shape'],
      correctAnswer: 'The total area of all faces of a 3D shape',
      explanation: 'Surface area is the total area of all the faces (surfaces) of a 3D object.'
    },
    {
      id: 'q4',
      question: 'What is the volume formula for a rectangular prism?',
      type: 'multiple-choice' as const,
      options: ['V = l + w + h', 'V = l × w × h', 'V = 2l + 2w', 'V = l × w'],
      correctAnswer: 'V = l × w × h',
      explanation: 'The volume of a rectangular prism is found by multiplying length × width × height.'
    },
    {
      id: 'q5',
      question: 'What is a net?',
      type: 'multiple-choice' as const,
      options: ['A 3D shape', 'A 2D representation of a 3D shape', 'A type of graph', 'A measurement tool'],
      correctAnswer: 'A 2D representation of a 3D shape',
      explanation: 'A net is a 2D pattern that can be folded to create a 3D shape, showing all the faces laid out flat.'
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
                Unit 7: Geometry - Area, Surface Area & Volume
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
              Master geometry by solving real-world problems involving area, surface area, and volume of 2D and 3D shapes
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-200 rounded-full text-base font-semibold border border-emerald-400/50 shadow-lg backdrop-blur-sm">
                📐 8 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-teal-500/30 to-teal-600/30 text-teal-200 rounded-full text-base font-semibold border border-teal-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 50-65 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-200 rounded-full text-base font-semibold border border-cyan-400/50 shadow-lg backdrop-blur-sm">
                🔢 Geometry
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 7 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                Unit 7 focuses on geometry, specifically solving real-world and mathematical problems involving area, surface area, and volume. Students extend their understanding of area from rectangles to more complex figures like triangles, quadrilaterals, and polygons, and apply area, surface area, and volume formulas to solve practical problems.
              </p>
              <p className="mb-6 text-lg">
                You'll learn to calculate areas of triangles, quadrilaterals, and polygons, find areas of composite figures, understand surface area using nets, calculate volumes of rectangular prisms, and apply these concepts to real-world problems. This unit helps build a foundation for high school geometry by improving spatial reasoning and formula fluency.
              </p>
              <p className="text-lg">Get ready to become a geometry master!</p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Calculate the area of triangles, quadrilaterals, and polygons using appropriate formulas</li>
              <li>Find the area of composite figures by decomposing them into familiar shapes</li>
              <li>Use nets to understand and calculate surface area of 3D figures</li>
              <li>Calculate volume of right rectangular prisms using the formula V = l × w × h</li>
              <li>Apply area, surface area, and volume concepts to solve real-world problems</li>
              <li>Develop spatial reasoning skills and formula fluency for geometry</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker key={`unit-7-${progressVersion}`} unitId="unit-7" unitName="Unit 7: Geometry - Area, Surface Area & Volume" items={progressItems} />

          {/* Sections */}
          <div className="space-y-16">
            {/* Area of Triangles, Quadrilaterals, and Polygons */}
            <section id="area-triangles" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🔺</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Area of Triangles, Quadrilaterals, and Polygons</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Students learn to find the area of two-dimensional figures by decomposing them into familiar shapes (like triangles and rectangles) and using known formulas. They explore how area applies to real-world tasks, such as designing spaces or estimating coverage.</p>
                <p>This section covers triangles, quadrilaterals, and polygons, teaching students to break down complex shapes into simpler components and apply the appropriate area formulas.</p>
                
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-green-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Calculate area of triangles using A = (base × height) / 2</li>
                    <li>Find area of quadrilaterals (rectangles, squares, parallelograms, trapezoids)</li>
                    <li>Decompose polygons into familiar shapes to find area</li>
                    <li>Apply area concepts to real-world design and estimation problems</li>
                  </ul>
                </div>
                
                <p className="text-gray-200 font-semibold">Key Formulas:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Triangle: A = (base × height) / 2</li>
                  <li>Rectangle/Square: A = length × width</li>
                  <li>Parallelogram: A = base × height</li>
                  <li>Trapezoid: A = (base1 + base2) / 2 × height</li>
                </ul>
                <p>Why it matters: essential for designing spaces, calculating materials needed, and solving real-world geometry problems.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/xCdxURXMdFY" title="Math Antics – Area of Triangles" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Math Antics – Area of Triangles</h3>
                  <p className="text-gray-300 text-sm">Explains the triangle area formula with clear visuals and step-by-step examples to help you master triangle area calculations.</p>
                  <a href="https://youtu.be/xCdxURXMdFY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/IaoZhhx_I9s" title="Math Antics – Area of Polygons" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Math Antics – Area of Polygons</h3>
                  <p className="text-gray-300 text-sm">Shows how to break complex shapes into simpler parts and calculate their areas using the appropriate formulas.</p>
                  <a href="https://youtu.be/IaoZhhx_I9s" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Area of Composite Figures */}
            <section id="composite-figures" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧩</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Area of Composite Figures</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Composite figures are made up of multiple simple shapes. Students learn to divide these shapes, calculate individual areas, and add or subtract them to find the total.</p>
                <p>This section teaches students to break down complex shapes into familiar components like rectangles, triangles, and other polygons, then calculate the total area by adding or subtracting individual areas.</p>
                
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-purple-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Identify simple shapes within composite figures</li>
                    <li>Calculate the area of each component shape</li>
                    <li>Add or subtract areas to find the total area</li>
                    <li>Apply this method to real-world composite shapes</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/z4Lat1uOQI4" title="Finding Area of Composite Figures (Math with Mr. J)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Finding Area of Composite Figures (Math with Mr. J)</h3>
                  <p className="text-gray-300 text-sm">Step-by-step breakdown with examples showing how to find the area of composite figures by breaking them into simple shapes.</p>
                  <a href="https://youtu.be/z4Lat1uOQI4" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/loAA3TCNAvU" title="Khan Academy – Area of Composite Shapes" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Khan Academy – Area of Composite Shapes</h3>
                  <p className="text-gray-300 text-sm">Demonstrates splitting complex figures into simple shapes, calculating each area, then adding to get the total.</p>
                  <a href="https://youtu.be/loAA3TCNAvU" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Surface Area of 3D Figures (Nets) */}
            <section id="surface-area-nets" className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Surface Area of 3D Figures (Nets)</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Students use nets (unfolded 3D shapes) to understand and calculate surface area. They focus on rectangular prisms, triangular prisms, and pyramids, applying formulas or adding up the areas of each face.</p>
                <p>This section teaches students to visualize 3D shapes as 2D nets, calculate the area of each face, and find the total surface area by adding all face areas together.</p>
                
                <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-teal-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Understand what nets are and how they represent 3D shapes</li>
                    <li>Calculate the area of each face in a net</li>
                    <li>Add all face areas to find total surface area</li>
                    <li>Apply this method to prisms, pyramids, and other 3D shapes</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/mtMNvnm71Z0" title="Khan Academy – Surface Area" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Khan Academy – Surface Area</h3>
                  <p className="text-gray-300 text-sm">Learn how to calculate surface area using nets with clear explanations and step-by-step examples.</p>
                  <a href="https://youtu.be/mtMNvnm71Z0" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/dCD02kuobnY" title="Finding Surface Area Using Nets (Mr. J)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Finding Surface Area Using Nets (Mr. J)</h3>
                  <p className="text-gray-300 text-sm">Shows how to label and add all face areas to find the total surface area of 3D shapes using nets.</p>
                  <a href="https://youtu.be/dCD02kuobnY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Volume of Right Rectangular Prisms */}
            <section id="volume-prisms" className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📦</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Volume of Right Rectangular Prisms</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Volume is the amount of space inside a 3D object. Students learn to apply the formula V = l × w × h and also understand volume through counting unit cubes.</p>
                <p>This section focuses on rectangular prisms, teaching students to calculate volume using the length × width × height formula and understand volume as the space occupied by a 3D shape.</p>
                
                <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-indigo-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Apply the volume formula V = l × w × h for rectangular prisms</li>
                    <li>Understand volume through counting unit cubes</li>
                    <li>Calculate volume with fractional dimensions</li>
                    <li>Apply volume concepts to real-world problems</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/EJTPGyWqhqc" title="Khan Academy – Volume of Rectangular Prisms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy – Volume of Rectangular Prisms</h3>
                  <p className="text-gray-300 text-sm">Introduces volume with visual models and explains how to calculate volume of rectangular prisms with clear examples.</p>
                  <a href="https://youtu.be/EJTPGyWqhqc" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/By7sVb2IhFs" title="Math with Mr. J – Volume" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Math with Mr. J – Volume</h3>
                  <p className="text-gray-300 text-sm">Explains the volume formula and provides step-by-step examples to help you master volume calculations.</p>
                  <a href="https://youtu.be/By7sVb2IhFs" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Real-World Geometry Problems */}
            <section id="real-world-geometry" className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🌍</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Real-World Geometry Problems</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Students apply their understanding of area, surface area, and volume to solve real-world problems—like designing a garden, wrapping a gift, or building a box. This brings meaning and application to the abstract math skills they've learned.</p>
                <p>This section connects geometry concepts to practical situations, helping students see how mathematical formulas apply to everyday problems and real-world scenarios.</p>
                
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-orange-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Apply area formulas to real-world design problems</li>
                    <li>Use surface area calculations for wrapping and covering</li>
                    <li>Apply volume concepts to capacity and space problems</li>
                    <li>Solve multi-step geometry problems with real-world context</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/OanPzjf2EYY" title="Volume Word Problems (Khan Academy)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Volume Word Problems (Khan Academy)</h3>
                  <p className="text-gray-300 text-sm">Real-world applications of volume with practical examples showing how to solve volume problems in context.</p>
                  <a href="https://youtu.be/OanPzjf2EYY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/gNqmI0f16QI" title="Area & Perimeter Word Problems (MashUp Math)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Area & Perimeter Word Problems (MashUp Math)</h3>
                  <p className="text-gray-300 text-sm">Applies area concepts to real-life situations with practical examples and step-by-step solutions.</p>
                  <a href="https://youtu.be/gNqmI0f16QI" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Summarizing & Comparing Data Sets */}
            <section id="summarizing-comparing" className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📋</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Summarizing & Comparing Data Sets</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Summarizing data involves reporting the number of observations, describing the attribute and its units, and giving quantitative measures of center (mean or median) and variability (range or IQR).</p>
                <p>Students learn to choose appropriate graphs (dot plots, histograms, box plots) and decide whether the mean or median better describes a distribution based on its shape. The essential questions encourage students to compare data sets, decide which graphs best represent data and draw conclusions.</p>
                
                <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-emerald-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Summarize data sets using appropriate measures</li>
                    <li>Choose the best graph type for different data</li>
                    <li>Compare multiple data sets effectively</li>
                    <li>Draw meaningful conclusions from data analysis</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/s_w3EJ2Jzw0" title="Khan Academy – Comparing Dot Plots, Histograms & Box Plots" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">Khan Academy – Comparing Dot Plots, Histograms & Box Plots</h3>
                  <p className="text-gray-300 text-sm">Learn how to compare different data displays and choose the most appropriate graph for your data.</p>
                  <a href="https://youtu.be/s_w3EJ2Jzw0" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/-2OOBEBq9-4" title="Khan Academy – Impact on Mean & Median When Removing Data" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">Khan Academy – Impact on Mean & Median When Removing Data</h3>
                  <p className="text-gray-300 text-sm">Understand how removing data points affects the mean and median, and learn to choose the best measure of center.</p>
                  <a href="https://youtu.be/-2OOBEBq9-4" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
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
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Unit 7 Practice Problems</h3>
              <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1ctTOKapYtWPf0B_IyX6nlaOS8K0vXaOI/preview" allow="autoplay" title="Unit 7 Practice Problems Preview"></iframe>
              </div>
              <a href="https://drive.google.com/file/d/1ctTOKapYtWPf0B_IyX6nlaOS8K0vXaOI/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105">Open Worksheet</a>
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
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Salamanders: Surface Area Worksheet</h3>
                <a href="https://www.math-salamanders.com/surface-area-worksheet-6th-grade.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Education.com: Surface Area Worksheets</h3>
                <a href="https://www.education.com/resources/grade-6/worksheets/math/geometry/surface-area/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">K5 Learning: Volume & Surface Area</h3>
                <a href="https://www.k5learning.com/free-math-worksheets/sixth-grade-6/geometry/rectangular-prism-volume-surface-area-decimals" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Aids: Volume Worksheets</h3>
                <a href="https://www.math-aids.com/Geometry/Volume/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Volume Word Problems Pack</h3>
                <a href="https://bmsadams.weebly.com/uploads/1/3/2/2/13229243/volume_word_problem_ws_pack.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
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
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Back to Mathematics →
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

 