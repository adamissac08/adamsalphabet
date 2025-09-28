"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";
import ContentLoader from "../../../components/ContentLoader";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Unit1() {
  // Sidebar: times + anchors (anchors point to top for now)
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'khan-academy': { label: 'Khan Academy', minutes: '6–8 min', anchor: '#khan-academy' },
    'math-antics': { label: 'Math Antics', minutes: '8–10 min', anchor: '#math-antics' },
    'virtual-nerd': { label: 'Virtual Nerd', minutes: '6–8 min', anchor: '#virtual-nerd' },
    'practice-problems': { label: 'Practice Problems', minutes: '5–7 min', anchor: '#practice-problems' },
    'my-worksheets': { label: 'My Worksheets', minutes: '4–6 min', anchor: '#my-worksheets' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };

  // Progress tracking items for Unit 1
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'khan-academy', title: 'Khan Academy Videos', type: 'video' as const },
    { id: 'math-antics', title: 'Math Antics Videos', type: 'video' as const },
    { id: 'virtual-nerd', title: 'Virtual Nerd Videos', type: 'video' as const },
    { id: 'practice-problems', title: 'Practice Problems', type: 'practice' as const },
    { id: 'my-worksheets', title: 'My Worksheets', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 1 Quiz', type: 'quiz' as const }
  ];

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-1');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-1', unitName: 'Unit 1: Number System and Operations', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-1', JSON.stringify(data));
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

  React.useEffect(() => {
    const handler = (e: any) => {
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-1') return;
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
      const raw = localStorage.getItem('progress-unit-1');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-1', JSON.stringify(updated));
      setProgressVersion(v => v + 1);
    } catch {}
  };

  // Quiz questions for Unit 1
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
      type: 'multiple-choice' as const,
      options: ['13 cm²', '40 cm²', '26 cm²', '35 cm²'],
      correctAnswer: '40 cm²',
      explanation: 'Area = length × width = 8 × 5 = 40 cm²',
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'What is the perimeter of a square with side length 6 units?',
      type: 'fill-in' as const,
      correctAnswer: '24 units',
      explanation: 'Perimeter of square = 4 × side = 4 × 6 = 24 units',
      difficulty: 'medium' as const
    },
    {
      id: 'q3',
      question: 'The formula for the area of a triangle is A = (1/2) × base × height',
      type: 'true-false' as const,
      correctAnswer: true,
      explanation: 'Yes, this is the correct formula for the area of a triangle',
      difficulty: 'easy' as const
    },
    {
      id: 'q4',
      question: 'If a circle has radius 7 cm, what is its circumference? (Use π = 3.14)',
      type: 'equation' as const,
      correctAnswer: '43.96 cm',
      explanation: 'Circumference = 2πr = 2 × 3.14 × 7 = 43.96 cm',
      difficulty: 'hard' as const
    }
  ];

  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed: ${score}/${total}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle" style={{top: '8%', left: '8%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '18%', left: '88%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '58%', left: '18%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '78%', left: '78%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '38%', left: '48%', animationDelay: '1s'}}></div>
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
              <Link href="/" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">
                Home
              </Link>
              <Link href="/mathematics" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">
                Mathematics
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">
                About Me
              </Link>
              <Link href="/book" className="text-blue-400 hover:glow-text transition-all duration-300">
                Book a Class
              </Link>
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
                    <a href={sectionTimes[item.id]?.anchor || '#top'} className={`${item.completed ? 'line-through text-gray-400' : 'text-gray-200'} hover:text-blue-400`}>{item.title}</a>
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
              <li className="text-white">Unit 1</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <h1 className="relative text-7xl font-black text-white mb-6 glow-text slide-in-top stagger-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                Unit 1: Number Systems and Operations
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">🔢</span>
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Master the fundamentals of numbers, from basic operations to advanced concepts, building a solid foundation for mathematical success
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-200 rounded-full text-base font-semibold border border-blue-400/50 shadow-lg backdrop-blur-sm">
                📚 7 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-purple-500/30 to-purple-600/30 text-purple-200 rounded-full text-base font-semibold border border-purple-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 45-60 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-pink-500/30 to-pink-600/30 text-pink-200 rounded-full text-base font-semibold border border-pink-400/50 shadow-lg backdrop-blur-sm">
                🎯 Interactive
              </span>
            </div>
          </div>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Understand place value in whole numbers up to millions</li>
              <li>Perform addition and subtraction with multi-digit numbers</li>
              <li>Master multiplication and division facts</li>
              <li>Solve word problems involving basic operations</li>
              <li>Use estimation to check reasonableness of answers</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker 
            key={`unit-1-${progressVersion}`}
            unitId="unit-1" 
            unitName="Unit 1: Number System and Operations" 
            items={progressItems} 
          />

          {/* Video Resources */}
          <div className="space-y-16">
            {/* Khan Academy Section */}
            <section id="khan-academy" className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🎓</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Khan Academy Videos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    Factors and Multiples
                  </h3>
                  <p className="text-gray-300 mb-4">Understanding factors, multiples, and prime numbers</p>
                  <a href="https://www.khanacademy.org/math/pre-algebra/pre-algebra-factors-multiples" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                    Watch Video
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    Dividing Fractions
                  </h3>
                  <p className="text-gray-300 mb-4">Learn how to divide fractions step by step</p>
                  <a href="https://www.khanacademy.org/math/arithmetic-home/arith-review-fractions/dividing-fractions" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                    Watch Video
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    Decimals
                  </h3>
                  <p className="text-gray-300 mb-4">Master decimal operations and place value</p>
                  <a href="https://www.khanacademy.org/math/arithmetic/arith-decimals" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                    Watch Video
                  </a>
                </div>
              </div>
            </section>

            {/* Math Antics Section */}
            <section id="math-antics" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-3">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧮</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Math Antics Videos</h2>
              </div>
              <ContentLoader type="skeleton" loadingText="Loading Math Antics videos..." delay={500}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/XGbOiYhHY2c" title="Math Antics - Prime Factorization" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Prime Factorization</h3>
                  <p className="text-gray-300 mb-4">This video explains how to perform prime factorization, breaking down a number into its prime factors. It uses clear visuals to show how to identify and write prime factors for any number.</p>
                  <a href="https://youtu.be/XGbOiYhHY2c" target="_blank" rel="noopener noreferrer" className="btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/LGqBQrUYua4" title="Math Antics - Long Division" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Long Division</h3>
                  <p className="text-gray-300 mb-4">This video covers long division, showing a fast and simple method to divide large numbers. It breaks down each step, making long division easy to understand and master.</p>
                  <a href="https://youtu.be/LGqBQrUYua4" target="_blank" rel="noopener noreferrer" className="btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/5juto2ze8Lg" title="Math Antics - Adding and Subtracting Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Adding and Subtracting Fractions</h3>
                  <p className="text-gray-300 mb-4">This video teaches how to add and subtract fractions, explaining how to find a common denominator and perform the operations accurately.</p>
                  <a href="https://youtu.be/5juto2ze8Lg" target="_blank" rel="noopener noreferrer" className="btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/qmfXyR7Z6Lk" title="Math Antics - Multiply Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Multiply Fractions</h3>
                  <p className="text-gray-300 mb-4">This video demonstrates how to multiply fractions, showing how to multiply numerators and denominators directly and how to simplify the result.</p>
                  <a href="https://youtu.be/qmfXyR7Z6Lk" target="_blank" rel="noopener noreferrer" className="btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/4lkq3DgvmJo" title="Math Antics - Dividing Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Dividing Fractions</h3>
                  <p className="text-gray-300 mb-4">This video explains how to divide fractions using the concept of reciprocals. It shows a simple, step-by-step process for dividing fractions: flip the second fraction (reciprocal) and multiply. Clear visuals and examples make the method easy to understand.</p>
                  <a href="https://youtu.be/4lkq3DgvmJo" target="_blank" rel="noopener noreferrer" className="btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
              </ContentLoader>
            </section>

            {/* Virtual Nerd Section */}
            <section id="virtual-nerd" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Virtual Nerd Videos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/eQU_uLDoyoQ" title="Virtual Nerd - Subtracting Decimals" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Subtracting Decimals</h3>
                  <p className="text-gray-300 mb-4">This video explains how to subtract decimals by lining up the decimal points and subtracting as you would with whole numbers. It provides clear examples and tips for avoiding common mistakes.</p>
                  <a href="https://youtu.be/eQU_uLDoyoQ" target="_blank" rel="noopener noreferrer" className="btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/REcdCxWTZrw" title="Virtual Nerd - Multiplying Decimals" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Multiplying Decimals</h3>
                  <p className="text-gray-300 mb-4">This video demonstrates how to multiply decimals, focusing on ignoring the decimal points until the final step. It shows how to correctly place the decimal in the final answer.</p>
                  <a href="https://youtu.be/REcdCxWTZrw" target="_blank" rel="noopener noreferrer" className="btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/kaFjcW2EAlM" title="Virtual Nerd - Multiplying Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Multiplying Fractions</h3>
                  <p className="text-gray-300 mb-4">This video covers how to multiply fractions by multiplying the numerators and denominators directly. It also explains how to simplify the resulting fraction.</p>
                  <a href="https://youtu.be/kaFjcW2EAlM" target="_blank" rel="noopener noreferrer" className="btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/ny2AmGQmu2M" title="Virtual Nerd - Adding Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Adding Fractions</h3>
                  <p className="text-gray-300 mb-4">This video teaches how to add fractions with the same denominator, showing how to simply add the numerators. It also covers finding a common denominator for fractions with different denominators.</p>
                  <a href="https://youtu.be/ny2AmGQmu2M" target="_blank" rel="noopener noreferrer" className="btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Worksheets Section */}
            <section id="practice-problems" className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-5">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📝</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Practice Worksheets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    K5 Learning Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Free Grade 6 math worksheets covering all topics</p>
                  <a href="https://www.k5learning.com/free-math-worksheets/sixth-grade-6" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    Factors Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Practice finding factors and prime factorization</p>
                  <a href="https://www.mathworksheets4kids.com/factors.php" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    GCF Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Greatest Common Factor practice problems</p>
                  <a href="https://www.mathworksheets4kids.com/greatest-common-factor.php" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    LCM Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Least Common Multiple practice problems</p>
                  <a href="https://www.mathworksheets4kids.com/least-common-multiple.php" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    Fractions Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Comprehensive fraction practice problems</p>
                  <a href="https://www.mathworksheets4kids.com/fractions.php" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    Decimals Worksheets
                  </h3>
                  <p className="text-gray-300 mb-4">Decimal operations and place value practice</p>
                  <a href="https://www.mathworksheets4kids.com/decimals.php" 
                     target="_blank" rel="noopener noreferrer"
                     className="btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                    Access Worksheets
                  </a>
                </div>
              </div>
            </section>

            {/* My Worksheets (Drive Previews) */}
            <section id="my-worksheets" className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📄</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">My Worksheets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover">
                  <h3 className="text-xl font-semibold text-white mb-4">Worksheet 1</h3>
                  <div className="relative w-full overflow-hidden rounded-lg" style={{paddingTop: '129%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1VZEQx-BOXpIIYYMpvdp-EsYO8Q9fwnfV/preview" allow="autoplay" title="Worksheet 1 Preview"></iframe>
                  </div>
                  <a href="https://drive.google.com/file/d/1VZEQx-BOXpIIYYMpvdp-EsYO8Q9fwnfV/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover">
                  <h3 className="text-xl font-semibold text-white mb-4">Worksheet 2</h3>
                  <div className="relative w-full overflow-hidden rounded-lg" style={{paddingTop: '129%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1RAoa5x7bEpbnBNA1CL68F7pvIaIW19_s/preview" allow="autoplay" title="Worksheet 2 Preview"></iframe>
                  </div>
                  <a href="https://drive.google.com/file/d/1RAoa5x7bEpbnBNA1CL68F7pvIaIW19_s/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
                </div>
              </div>
            </section>
          </div>

          {/* Interactive Quiz */}
          <div id="quiz">
            <InteractiveQuiz 
              questions={quizQuestions}
              title="Unit 1: Number System and Operations Quiz"
              onComplete={handleQuizComplete}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom stagger-6">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/mathematics/unit-2" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 2 →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-white/20 py-12 mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-bottom">
            <div className="fade-in stagger-1">
              <h3 className="text-xl font-semibold mb-4 glow-text">Adam's Alphabet</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Free educational resources for students who need extra help with mathematics.
              </p>
            </div>
            <div className="fade-in stagger-2">
              <h3 className="text-xl font-semibold mb-4 glow-text">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/mathematics" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Me</Link></li>
              </ul>
            </div>
            <div className="fade-in stagger-3">
              <h3 className="text-xl font-semibold mb-4 glow-text">Contact</h3>
              <div className="text-sm text-gray-300 space-y-3">
                <p className="flex items-center">
                  <span className="mr-2">📧</span>
                  adamissac08@gmail.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📺</span>
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                    YouTube Channel
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-400 fade-in stagger-4">
            <p>This website is intended for extra help and is not limited to students in Georgia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
