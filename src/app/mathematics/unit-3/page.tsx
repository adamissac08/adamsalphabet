"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit3() {
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    exponents: { label: 'Exponents', minutes: '6–8 min', anchor: '#exponents' },
    evaluating: { label: 'Evaluating', minutes: '6–8 min', anchor: '#evaluating' },
    translating: { label: 'Translating', minutes: '6–8 min', anchor: '#translating' },
    identifying: { label: 'Identifying Parts', minutes: '6–8 min', anchor: '#identifying' },
    equivalent: { label: 'Identify Equivalent', minutes: '6–8 min', anchor: '#equivalent' },
    generating: { label: 'Generate Equivalent', minutes: '6–8 min', anchor: '#generating' },
    'practice-problems': { label: 'Practice', minutes: '4–6 min', anchor: '#practice-problems' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };
  // Progress tracking items for Unit 3
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'exponents', title: 'Representing Repeated Multiplication with Exponents', type: 'video' as const },
    { id: 'evaluating', title: 'Evaluating Expressions Containing Exponents', type: 'video' as const },
    { id: 'translating', title: 'Translating Verbal Phrases into Algebraic Expressions', type: 'video' as const },
    { id: 'identifying', title: 'Identifying Parts of a Given Expression', type: 'video' as const },
    { id: 'equivalent', title: 'Using Properties to Identify Equivalent Expressions', type: 'video' as const },
    { id: 'generating', title: 'Using Properties to Generate Equivalent Expressions', type: 'video' as const },
    { id: 'practice-problems', title: 'Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 3 Quiz', type: 'quiz' as const }
  ];

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-3');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-3', unitName: 'Unit 3: Expressions and Equations', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-3', JSON.stringify(data));
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
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-3') return;
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
      const raw = localStorage.getItem('progress-unit-3');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-3', JSON.stringify(updated));
      setProgressVersion(v => v + 1);
    } catch {}
  };

  // Quiz questions for Unit 3
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is 2³ equal to?',
      type: 'multiple-choice' as const,
      options: ['6', '8', '9', '12'],
      correctAnswer: '8',
      explanation: '2³ = 2 × 2 × 2 = 8',
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'Evaluate: 3² + 4 × 2',
      type: 'fill-in' as const,
      correctAnswer: '17',
      explanation: 'Following order of operations: 3² + 4 × 2 = 9 + 8 = 17',
      difficulty: 'medium' as const
    },
    {
      id: 'q3',
      question: 'Translate to an algebraic expression: "The product of 5 and a number x"',
      type: 'equation' as const,
      correctAnswer: '5x',
      explanation: '"Product" means multiplication, so "5 times x" is written as 5x',
      difficulty: 'easy' as const
    },
    {
      id: 'q4',
      question: 'In the expression 3x + 7, what is the coefficient of x?',
      type: 'multiple-choice' as const,
      options: ['3', '7', 'x', '3x'],
      correctAnswer: '3',
      explanation: 'The coefficient is the number that multiplies the variable, which is 3',
      difficulty: 'medium' as const
    },
    {
      id: 'q5',
      question: 'Are 2(x + 3) and 2x + 6 equivalent expressions?',
      type: 'true-false' as const,
      correctAnswer: true,
      explanation: 'Yes, using the distributive property: 2(x + 3) = 2x + 6',
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
        <div className="particle" style={{top: '12%', left: '12%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '22%', left: '82%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '62%', left: '22%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '82%', left: '72%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '42%', left: '52%', animationDelay: '1s'}}></div>
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
              <li className="text-white">Unit 3</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/15 via-pink-600/15 to-orange-600/15 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <h1 className="relative text-7xl font-black text-white mb-6 glow-text slide-in-top stagger-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                Unit 3: Expressions and Equations
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">🧮</span>
                <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Dive deep into algebraic expressions and equations, mastering exponents and mathematical modeling
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-purple-500/30 to-purple-600/30 text-purple-200 rounded-full text-base font-semibold border border-purple-400/50 shadow-lg backdrop-blur-sm">
                ⚡ 8 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-pink-500/30 to-pink-600/30 text-pink-200 rounded-full text-base font-semibold border border-pink-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 55-70 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-orange-500/30 to-orange-600/30 text-orange-200 rounded-full text-base font-semibold border border-orange-400/50 shadow-lg backdrop-blur-sm">
                🧠 Advanced
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 3 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                In this unit of study, you will learn about expressions and how they bring numbers and operations together. You will, therefore, be able to use exponents to tell in repeated multiplication how fast numbers grow and use this to express the multiplication in the base.
              </p>
              <p className="mb-6 text-lg">
                You will also see how to write algebraic expressions using words and decompose an expression into parts so that you understand what it means. We will use properties of operations to rewrite expressions into equivalent forms, which might seem to make problems simpler or more complex than they do in their original state but don't change their answers.
              </p>
              <p className="text-lg">
                We will then proceed to apply real-world problems into this new mathematics skill and observe how solutions are viewed, first using models and diagrams.
              </p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Understand what exponents are and how they represent repeated multiplication</li>
              <li>Evaluate expressions containing exponents using order of operations</li>
              <li>Translate verbal phrases into algebraic expressions</li>
              <li>Identify parts of algebraic expressions (terms, coefficients, constants)</li>
              <li>Use properties to identify and generate equivalent expressions</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker 
            key={`unit-3-${progressVersion}`}
            unitId="unit-3" 
            unitName="Unit 3: Expressions and Equations" 
            items={progressItems} 
          />

          {/* Video Resources */}
          <div className="space-y-16">
            {/* Representing Repeated Multiplication with Exponents */}
            <section id="exponents" className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-3">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🔢</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Representing Repeated Multiplication with Exponents</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding what exponents are and how they represent repeated multiplication</li>
                  <li>Writing expressions using exponents (2 x 2 x 2 = 2³)</li>
                  <li>Identifying base and exponent in an exponential expression</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/XZRQhkii0h0" title="Khan Academy - Intro to Exponents" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Khan Academy - Intro to Exponents</h3>
                  <p className="text-gray-300 text-sm">This video introduces the concept of exponents, explaining what they are and how they work. It covers basic exponent notation and provides clear examples to help you understand the concept.</p>
                  <a href="https://youtu.be/XZRQhkii0h0" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/LkhPRz7Hocg" title="Math Antics - Exponents" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Math Antics - Exponents</h3>
                  <p className="text-gray-300 text-sm">This video explains the laws of exponents, including multiplication, division, zero exponents, and negative exponents. It provides a step-by-step guide to solving problems using these rules.</p>
                  <a href="https://youtu.be/LkhPRz7Hocg" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Evaluating Expressions Containing Exponents */}
            <section id="evaluating" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Evaluating Expressions Containing Exponents</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-green-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Substituting values for variables in expressions with exponents</li>
                  <li>Applying the order of operations (PEMDAS) to solve expressions with exponents</li>
                  <li>Evaluating expressions with positive, negative, and fractional exponents</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/9K54G5yeR74" title="Khan Academy - Evaluating Expressions with Exponents" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Khan Academy - Evaluating Expressions with Exponents</h3>
                  <p className="text-gray-300 text-sm">This video explains how to evaluate algebraic expressions that include exponents, showing how to substitute values for variables and follow the correct order of operations.</p>
                  <a href="https://youtu.be/9K54G5yeR74" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/dAgfnK528RA" title="Math Antics - Order of Operations" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Math Antics - Order of Operations</h3>
                  <p className="text-gray-300 text-sm">This video covers the order of operations (PEMDAS), including how to correctly handle exponents when evaluating expressions. It uses clear examples to show each step.</p>
                  <a href="https://youtu.be/dAgfnK528RA" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Translating Verbal Phrases into Algebraic Expressions */}
            <section id="translating" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-5">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📝</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Translating Verbal Phrases into Algebraic Expressions</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Identifying keywords that indicate mathematical operations (e.g., "sum" means addition, "product" means multiplication)</li>
                  <li>Converting word problems into algebraic expressions</li>
                  <li>Recognizing how to write expressions that model real-world situations</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/Q1vMNyIP4Us" title="Khan Academy - Writing Expressions with Variables" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Khan Academy - Writing Expressions with Variables</h3>
                  <p className="text-gray-300 text-sm">This video explains how to create and write algebraic expressions using variables, showing how to translate phrases and word problems into mathematical expressions.</p>
                  <a href="https://youtu.be/Q1vMNyIP4Us" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/NybHckSEQBI" title="Math Antics - Algebra Basics: What Are Variables?" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Math Antics - Algebra Basics: What Are Variables?</h3>
                  <p className="text-gray-300 text-sm">This video introduces variables, explaining what they are and how they are used in algebra. It covers basic examples to help students understand how variables represent unknown values.</p>
                  <a href="https://youtu.be/NybHckSEQBI" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Identifying Parts of a Given Expression */}
            <section id="identifying" className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-6">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Identifying Parts of a Given Expression</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-orange-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding and identifying terms, coefficients, constants, factors, and variables in an algebraic expression</li>
                  <li>Breaking down complex expressions into their basic parts</li>
                  <li>Recognizing and defining the role of each part of an expression</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/9_VCk9tWT0Y" title="Khan Academy - Parts of Algebraic Expressions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Khan Academy - Parts of Algebraic Expressions</h3>
                  <p className="text-gray-300 text-sm">This video explains the key components of algebraic expressions, including terms, factors, coefficients, and constants. It helps students identify these parts in various examples.</p>
                  <a href="https://youtu.be/9_VCk9tWT0Y" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/RyesLifeUBw" title="Math Antics - Expressions, Equations, and Inequalities" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Math Antics - Expressions, Equations, and Inequalities</h3>
                  <p className="text-gray-300 text-sm">This video introduces the basics of expressions, equations, and inequalities, explaining how they are different and how to solve each type. It uses simple examples for clarity.</p>
                  <a href="https://youtu.be/RyesLifeUBw" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Using Properties to Identify Equivalent Expressions */}
            <section id="equivalent" className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-7">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Using Properties to Identify Equivalent Expressions</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Applying the distributive property, commutative property, and associative property to simplify expressions</li>
                  <li>Identifying when two expressions are equivalent</li>
                  <li>Understanding how to combine like terms to generate equivalent expressions</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/rHNY01R2VSQ" title="Khan Academy - Equivalent Expressions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Khan Academy - Equivalent Expressions</h3>
                  <p className="text-gray-300 text-sm">This video explains how to identify and create equivalent expressions by using properties like the distributive property. It helps students understand how different expressions can represent the same value.</p>
                  <a href="https://youtu.be/rHNY01R2VSQ" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/DKC74YKJpNY" title="Math Antics - Combining Like Terms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Math Antics - Combining Like Terms</h3>
                  <p className="text-gray-300 text-sm">This video teaches how to simplify algebraic expressions by combining like terms. It shows how to identify like terms and add or subtract them to create a simplified expression.</p>
                  <a href="https://youtu.be/DKC74YKJpNY" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Using Properties and Mathematical Models to Generate Equivalent Expressions */}
            <section id="generating" className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-8">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧮</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Using Properties and Mathematical Models to Generate Equivalent Expressions</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Using the distributive property to expand and factor expressions</li>
                  <li>Combining like terms to simplify expressions</li>
                  <li>Modeling real-world situations with equivalent algebraic expressions</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/3NHSwiv_pSE" title="Khan Academy - Distributive Property" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">Khan Academy - Distributive Property</h3>
                  <p className="text-gray-300 text-sm">This video explains how to use the distributive property to simplify algebraic expressions, including examples of distributing a number across terms inside parentheses.</p>
                  <a href="https://youtu.be/3NHSwiv_pSE" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/v-6MShC82ow" title="Math Antics - The Distributive Property" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">Math Antics - The Distributive Property</h3>
                  <p className="text-gray-300 text-sm">This video demonstrates the distributive property, using clear visuals and examples to show how multiplying a value across parentheses works. It covers both positive and negative values.</p>
                  <a href="https://youtu.be/v-6MShC82ow" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* My Practice Problems */}
            <section id="practice-problems" className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-9">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">✍️</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">My Practice Problems</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Unit 3 Practice Problems</h3>
                <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                  <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/u/0/d/1kDGUj1x1kentajYJRK2UrZPLV7Y_4QDS/preview" allow="autoplay" title="Unit 3 Practice Problems Preview"></iframe>
                </div>
                <a href="https://drive.google.com/file/u/0/d/1kDGUj1x1kentajYJRK2UrZPLV7Y_4QDS/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
              </div>
            </section>

            {/* Review: Worksheets + Practice */}
            <section className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-10">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📚</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Review: Worksheets + Practice</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy: Expressions and Variables</h3>
                  <p className="text-gray-300 mb-4">Comprehensive practice with expressions and variables for 6th grade</p>
                  <a href="https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Practice Now</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy: Exponents and Radicals</h3>
                  <p className="text-gray-300 mb-4">Pre-algebra level practice with exponents and radicals</p>
                  <a href="https://www.khanacademy.org/math/pre-algebra/pre-algebra-exponents-radicals" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Learn More</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Aids: Algebraic Expressions</h3>
                  <p className="text-gray-300 mb-4">Printable worksheets for algebraic expressions practice</p>
                  <a href="https://www.math-aids.com/Algebra/Algebraic_Expressions/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Get Worksheets</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Aids: Evaluating Expressions</h3>
                  <p className="text-gray-300 mb-4">Worksheets for evaluating expressions with one variable</p>
                  <a href="https://www.math-aids.com/Algebra/Evaluating_Expressions/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Download</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Drills: Exponents Worksheets</h3>
                  <p className="text-gray-300 mb-4">Free printable exponents worksheets</p>
                  <a href="https://www.math-drills.com/algebra/exponents.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Get Worksheets</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math-Drills: Evaluating Algebraic Expressions</h3>
                  <p className="text-gray-300 mb-4">Worksheets for evaluating algebraic expressions</p>
                  <a href="https://www.math-drills.com/algebra/evaluating_algebraic_expressions.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Practice</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Common Core Sheets: Expressions</h3>
                  <p className="text-gray-300 mb-4">Common Core aligned expressions worksheets</p>
                  <a href="https://www.commoncoresheets.com/Math/Algebra/Expressions/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Access</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Common Core Sheets: Exponents</h3>
                  <p className="text-gray-300 mb-4">Common Core aligned exponents worksheets</p>
                  <a href="https://www.commoncoresheets.com/Math/Algebra/Exponents/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Download</a>
                </div>
              </div>
          </section>

          {/* Interactive Quiz */}
          <div id="quiz">
            <InteractiveQuiz 
              questions={quizQuestions}
              title="Unit 3: Expressions and Equations Quiz"
              onComplete={handleQuizComplete}
            />
          </div>
        </div>

        {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom stagger-11">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/mathematics/unit-4" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 4 →
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