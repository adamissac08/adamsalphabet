"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit4() {
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'one-step-equations': { label: 'One-Step Equations', minutes: '6–8 min', anchor: '#one-step-equations' },
    inequalities: { label: 'Inequalities', minutes: '6–8 min', anchor: '#inequalities' },
    graphing: { label: 'Graphing Inequalities', minutes: '6–8 min', anchor: '#graphing' },
    variables: { label: 'Dependent vs Independent', minutes: '6–8 min', anchor: '#variables' },
    'word-problems': { label: 'Translate to Equations', minutes: '6–8 min', anchor: '#word-problems' },
    'practice-problems': { label: 'My Practice Problems', minutes: '4–6 min', anchor: '#practice-problems' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };
  // Progress tracking items for Unit 4
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'one-step-equations', title: 'Solving One-Step Equations', type: 'video' as const },
    { id: 'inequalities', title: 'Understanding Inequalities', type: 'video' as const },
    { id: 'graphing', title: 'Graphing Inequalities', type: 'video' as const },
    { id: 'variables', title: 'Dependent and Independent Variables', type: 'video' as const },
    { id: 'word-problems', title: 'Translating Words to Equations', type: 'video' as const },
    { id: 'practice-problems', title: 'Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 4 Quiz', type: 'quiz' as const }
  ];

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-4');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-4', unitName: 'Unit 4: Equations and Inequalities', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-4', JSON.stringify(data));
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
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-4') return;
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
      const raw = localStorage.getItem('progress-unit-4');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-4', JSON.stringify(updated));
      setProgressVersion(v => v + 1);
    } catch {}
  };

  // Quiz questions for Unit 4
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the solution to the equation x + 7 = 15?',
      type: 'multiple-choice' as const,
      options: ['x = 8', 'x = 22', 'x = 12', 'x = 9'],
      correctAnswer: 'x = 8',
      explanation: 'To solve x + 7 = 15, subtract 7 from both sides: x = 15 - 7 = 8',
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'Which symbol represents "greater than or equal to"?',
      type: 'multiple-choice' as const,
      options: ['>', '<', '≥', '≤'],
      correctAnswer: '≥',
      explanation: 'The symbol ≥ means "greater than or equal to"',
      difficulty: 'easy' as const
    },
    {
      id: 'q3',
      question: 'Solve the inequality: 3x > 12',
      type: 'fill-in' as const,
      correctAnswer: 'x > 4',
      explanation: 'Divide both sides by 3: x > 12/3, so x > 4',
      difficulty: 'medium' as const
    },
    {
      id: 'q4',
      question: 'In the relationship "distance = speed × time", which is the independent variable?',
      type: 'multiple-choice' as const,
      options: ['distance', 'speed', 'time', 'all of the above'],
      correctAnswer: 'time',
      explanation: 'Time is the independent variable because it changes independently, and distance depends on it',
      difficulty: 'medium' as const
    },
    {
      id: 'q5',
      question: 'Translate to an equation: "Five more than a number is 20"',
      type: 'equation' as const,
      correctAnswer: 'x + 5 = 20',
      explanation: '"Five more than a number" means x + 5, and "is" means equals, so x + 5 = 20',
      difficulty: 'hard' as const
    }
  ];

  const handleQuizComplete = (score: number, total: number) => {
    // This could trigger progress updates or other actions
    console.log(`Quiz completed: ${score}/${total}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle" style={{top: '14%', left: '14%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '24%', left: '84%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '64%', left: '24%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '84%', left: '74%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '44%', left: '54%', animationDelay: '1s'}}></div>
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
              <Link href="/book" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">
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
              <li className="text-white">Unit 4</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-600/15 via-cyan-600/15 to-blue-600/15 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <h1 className="relative text-7xl font-black text-white mb-6 glow-text slide-in-top stagger-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                Unit 4: Equations and Inequalities
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">⚖️</span>
                <div className="absolute -inset-2 bg-teal-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Master the art of solving equations and inequalities, graphing solutions, and understanding mathematical relationships
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-teal-500/30 to-teal-600/30 text-teal-200 rounded-full text-base font-semibold border border-teal-400/50 shadow-lg backdrop-blur-sm">
                🎯 7 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-200 rounded-full text-base font-semibold border border-cyan-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 50-65 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-200 rounded-full text-base font-semibold border border-blue-400/50 shadow-lg backdrop-blur-sm">
                📈 Graphing
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 4 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                In this unit, you're going to learn a whole lot about equations and inequalities and how to solve them. You'll be able to figure out when an equation or inequality is describing a situation, and you'll be able to tell when an equation or inequality just doesn't cut it.
              </p>
              <p className="mb-6 text-lg">
                You will also learn to graph the solution for inequalities on the number line and know how the values work to give the result. Let's think about the ways equations and inequalities can help us describe relationships between things that depend on other things, such as time and distance, or cost and quantity.
              </p>
              <p className="text-lg">
                We shall also use tables, graphs, and simple models to illustrate such relations and derive solutions that follow from particular models. Dive into the world of equations and inequalities. There are lots of helpful tips and practice problems in this section to help you become a problem-solving champ!
              </p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Solve one-step equations using addition, subtraction, multiplication, and division</li>
              <li>Understand inequalities and how they differ from equations</li>
              <li>Graph inequalities on a number line with proper symbols</li>
              <li>Identify dependent and independent variables in relationships</li>
              <li>Translate word problems into algebraic equations and solve them</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker 
            key={`unit-4-${progressVersion}`}
            unitId="unit-4" 
            unitName="Unit 4: Equations and Inequalities" 
            items={progressItems} 
          />

          {/* Video Resources */}
          <div className="space-y-16">
            {/* Solving One-Step Equations */}
            <section id="one-step-equations" className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-3">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Solving One-Step Equations</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding what an equation is and what it means to solve an equation</li>
                  <li>Using addition, subtraction, multiplication, and division to isolate the variable</li>
                  <li>Solving one-step equations with positive and negative numbers</li>
                  <li>Checking solutions to ensure they are correct</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/jWpiMu5LNdg" title="Khan Academy - One-Step Equations" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Khan Academy - One-Step Equations</h3>
                  <p className="text-gray-300 text-sm">This video from Khan Academy introduces how to solve one-step equations using addition, subtraction, multiplication, and division. Clear examples make it easy to follow along.</p>
                  <a href="https://youtu.be/jWpiMu5LNdg" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/l3XzepN03KQ" title="Math Antics - Solving Basic Algebraic Equations Part 1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Math Antics - Solving Basic Algebraic Equations Part 1</h3>
                  <p className="text-gray-300 text-sm">This video from Khan Academy introduces how to solve one-step equations using addition, subtraction, multiplication, and division. Clear examples make it easy to follow along.</p>
                  <a href="https://youtu.be/l3XzepN03KQ" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/Qyd_v3DGzTM" title="Math Antics - Solving Basic Algebraic Equations Part 2" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Math Antics - Solving Basic Algebraic Equations Part 2</h3>
                  <p className="text-gray-300 text-sm">Part 2 of this series focuses on solving one-step equations using multiplication and division. It helps students understand how to isolate the variable.</p>
                  <a href="https://youtu.be/Qyd_v3DGzTM" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Understanding Inequalities */}
            <section id="inequalities" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Understanding Inequalities</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-green-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>What are inequalities and how they differ from equations</li>
                  <li>Symbols of inequalities: &gt;, &lt;, ≥, ≤</li>
                  <li>Writing inequalities to describe situations</li>
                  <li>Solving one-step inequalities using addition, subtraction, multiplication, and division</li>
                  <li>Interpreting solutions of inequalities</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/VgDe_D8ojxw" title="Khan Academy - Intro to Inequalities" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Khan Academy - Intro to Inequalities</h3>
                  <p className="text-gray-300 text-sm">This video introduces the concept of inequalities, showing how to solve and graph inequalities on a number line. It provides a strong foundation with clear examples.</p>
                  <a href="https://youtu.be/VgDe_D8ojxw" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/mgHO-bsCDrA" title="Math Antics - Solving Inequalities" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Math Antics - Solving Inequalities</h3>
                  <p className="text-gray-300 text-sm">This video from Math Antics explains what inequalities are and how they are used in real life. It covers basic inequalities, explaining how to solve and graph them with simple examples.</p>
                  <a href="https://youtu.be/mgHO-bsCDrA" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Graphing Inequalities */}
            <section id="graphing" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-5">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📈</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Graphing Inequalities</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Representing inequalities on a number line</li>
                  <li>Understanding open and closed circles for less than/greater than vs. less than or equal to/greater than or equal to</li>
                  <li>Graphing solutions of one-step inequalities</li>
                  <li>Solving and graphing combined inequalities (AND/OR)</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/unSBFwK881s" title="Khan Academy - Graphing Linear Inequalities" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Khan Academy - Graphing Linear Inequalities</h3>
                  <p className="text-gray-300 text-sm">This video introduces how to graph linear inequalities on a coordinate plane, explaining the concepts of shaded regions and boundary lines. It covers both solid and dashed lines for inequalities.</p>
                  <a href="https://youtu.be/unSBFwK881s" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/Hzxc4HASygU" title="Mathispower4u - Graphing Linear Inequalities" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Mathispower4u - Graphing Linear Inequalities</h3>
                  <p className="text-gray-300 text-sm">This video provides step-by-step instructions on how to graph linear inequalities. It covers how to identify the inequality type, graph the boundary line, and shade the correct region.</p>
                  <a href="https://youtu.be/Hzxc4HASygU" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Dependent and Independent Variables */}
            <section id="variables" className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-6">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🔗</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Dependent and Independent Variables</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-orange-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding the difference between dependent and independent variables</li>
                  <li>Identifying dependent and independent variables in word problems</li>
                  <li>Analyzing relationships between the two using tables, graphs, and equations</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/SGC_d7O7_Eg" title="Khan Academy - Dependent and Independent Variables" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Khan Academy - Dependent and Independent Variables</h3>
                  <p className="text-gray-300 text-sm">This video explains the difference between dependent and independent variables using simple examples. It helps students understand how one variable affects the other in a mathematical relationship.</p>
                  <a href="https://youtu.be/SGC_d7O7_Eg" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/vJclTPm3ofM" title="Mathispower4u - Independent and Dependent Variables" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Mathispower4u - Independent and Dependent Variables</h3>
                  <p className="text-gray-300 text-sm">This video provides a detailed explanation of dependent and independent variables, using clear, step-by-step examples. It is useful for students who want to understand how to identify these variables in various problems.</p>
                  <a href="https://youtu.be/vJclTPm3ofM" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Translating Words to Equations */}
            <section id="word-problems" className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-7">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📝</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Translating Words to Equations</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding keywords that indicate mathematical operations (e.g., "sum" means addition, "product" means multiplication)</li>
                  <li>Converting word problems into algebraic equations</li>
                  <li>Identifying what each variable represents in a word problem</li>
                  <li>Solving the resulting equations</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/C_KffdI34ZU" title="Khan Academy - Translating Word Problems" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Khan Academy - Translating Word Problems</h3>
                  <p className="text-gray-300 text-sm">This video explains how to translate word problems into algebraic expressions, showing students how to identify keywords and set up equations correctly.</p>
                  <a href="https://youtu.be/C_KffdI34ZU" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/QEnFIgN8UBw" title="The Organic Chemistry Tutor - Translating Word Problems" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">The Organic Chemistry Tutor - Translating Word Problems</h3>
                  <p className="text-gray-300 text-sm">This video provides clear examples of how to turn word problems into algebraic expressions. It breaks down each problem step-by-step, making it easy to understand.</p>
                  <a href="https://youtu.be/QEnFIgN8UBw" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>
          </div>

          {/* My Practice Problems */}
          <section id="practice-problems" className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-8">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mr-6">
                <span className="text-3xl">✍️</span>
              </div>
              <h2 className="text-4xl font-semibold text-white glow-text">My Practice Problems</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Unit 4 Practice Problems</h3>
              <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1gWPLzo75q2usvfROnIeGmCYWT4Xf0mjU/preview" allow="autoplay" title="Unit 4 Practice Problems Preview"></iframe>
              </div>
              <a href="https://drive.google.com/file/d/1gWPLzo75q2usvfROnIeGmCYWT4Xf0mjU/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
            </div>
          </section>

          {/* Review: Worksheets + Practice */}
          <section className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-9">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                <span className="text-3xl">📚</span>
              </div>
              <h2 className="text-4xl font-semibold text-white glow-text">Review: Worksheets + Practice</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Kuta Software: Free Worksheets</h3>
                <p className="text-gray-300 mb-4">Access free printable math worksheets for Pre-Algebra including one-step equations</p>
                <a href="https://www.kutasoftware.com/freeipa.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Access Worksheets</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">One-Step Equations Worksheets</h3>
                <p className="text-gray-300 mb-4">Printable worksheets for solving one-step equations with answers</p>
                <a href="https://cdn.kutasoftware.com/Worksheets/Alg1/One-Step%20Equations.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Download PDF</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">One-Step Equations With Integers</h3>
                <p className="text-gray-300 mb-4">Practice solving one-step equations involving positive and negative integers</p>
                <a href="https://kutasoftware.com/FreeWorksheets/PreAlgWorksheets/One-Step%20Equations%20With%20Integers.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Get Worksheets</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Graphing Inequalities Worksheets</h3>
                <p className="text-gray-300 mb-4">Practice graphing inequalities on number lines with various inequality symbols</p>
                <a href="https://www.kutasoftware.com/FreeWorksheets/Alg1Worksheets/Graphing%20Inequalities.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Download</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Solving Inequalities Worksheets</h3>
                <p className="text-gray-300 mb-4">Algebra 2 level worksheets for solving various types of inequalities</p>
                <a href="https://www.kutasoftware.com/FreeWorksheets/Alg2Worksheets/Solving%20Inequalities.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Practice</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Graphing Linear Inequalities</h3>
                <p className="text-gray-300 mb-4">Advanced worksheets for graphing linear inequalities on coordinate planes</p>
                <a href="https://cdn.kutasoftware.com/Worksheets/Alg1/Graphing%20Linear%20Inequalities.pdf" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Access</a>
              </div>
            </div>
          </section>

          {/* Interactive Quiz */}
          <div id="quiz">
            <InteractiveQuiz 
              questions={quizQuestions}
              title="Unit 4: Equations and Inequalities Quiz"
              onComplete={handleQuizComplete}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom stagger-10">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/mathematics/unit-5" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 5 →
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