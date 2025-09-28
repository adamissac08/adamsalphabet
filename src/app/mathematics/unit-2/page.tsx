"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit2() {
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'intro-ratios': { label: 'Intro to Ratios', minutes: '6–8 min', anchor: '#intro-ratios' },
    'unit-rates': { label: 'Unit Rates', minutes: '6–8 min', anchor: '#unit-rates' },
    proportional: { label: 'Proportional Reasoning', minutes: '7–9 min', anchor: '#proportional' },
    'equivalent-fractions': { label: 'Equivalent Fractions', minutes: '6–8 min', anchor: '#equivalent-fractions' },
    'practice-problems': { label: 'My Practice Problems', minutes: '4–6 min', anchor: '#practice-problems' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };
  // Progress tracking items for Unit 2
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'intro-ratios', title: 'Introduction to Ratios', type: 'video' as const },
    { id: 'unit-rates', title: 'Understanding Unit Rates and Ratios', type: 'video' as const },
    { id: 'proportional', title: 'Proportional Reasoning', type: 'video' as const },
    { id: 'equivalent-fractions', title: 'Using Equivalent Fractions in Ratios', type: 'video' as const },
    { id: 'practice-problems', title: 'Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 2 Quiz', type: 'quiz' as const }
  ];

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-2');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-2', unitName: 'Unit 2: Ratios and Proportional Relationships', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-2', JSON.stringify(data));
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
      if (!e?.detail?.unitId || e.detail.unitId !== 'unit-2') return;
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
      const raw = localStorage.getItem('progress-unit-2');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-2', JSON.stringify(updated));
      setProgressVersion(v => v + 1);
    } catch {}
  };

  // Quiz questions for Unit 2
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the ratio of 12 to 18 in simplest form?',
      type: 'multiple-choice' as const,
      options: ['12:18', '2:3', '6:9', '4:6'],
      correctAnswer: '2:3',
      explanation: '12:18 = 12/18 = 2/3, so the ratio is 2:3',
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'If a car travels 240 miles in 4 hours, what is the unit rate?',
      type: 'fill-in' as const,
      correctAnswer: '60 miles per hour',
      explanation: 'Unit rate = 240 miles ÷ 4 hours = 60 miles per hour',
      difficulty: 'medium' as const
    },
    {
      id: 'q3',
      question: 'Are the ratios 3:4 and 9:12 equivalent?',
      type: 'true-false' as const,
      correctAnswer: true,
      explanation: 'Yes, 9:12 = 3:4 (divide both by 3)',
      difficulty: 'medium' as const
    },
    {
      id: 'q4',
      question: 'If 2 pizzas cost $24, how much do 5 pizzas cost?',
      type: 'equation' as const,
      correctAnswer: '$60',
      explanation: 'Cost per pizza = $24 ÷ 2 = $12. 5 pizzas = 5 × $12 = $60',
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
        <div className="particle" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '20%', left: '80%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '60%', left: '20%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '80%', left: '70%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '40%', left: '50%', animationDelay: '1s'}}></div>
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
              <li className="text-white">Unit 2</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600/15 via-blue-600/15 to-cyan-600/15 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <h1 className="relative text-7xl font-black text-white mb-6 glow-text slide-in-top stagger-1 bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                Unit 2: Ratios and Proportions
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">📊</span>
                <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Explore the fascinating world of ratios and proportions, mastering real-world applications and mathematical relationships
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-green-500/30 to-green-600/30 text-green-200 rounded-full text-base font-semibold border border-green-400/50 shadow-lg backdrop-blur-sm">
                📈 7 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-200 rounded-full text-base font-semibold border border-blue-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 50-65 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-200 rounded-full text-base font-semibold border border-cyan-400/50 shadow-lg backdrop-blur-sm">
                🌍 Real-World
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 2 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                In this unit, you will explore the thrilling world of rates, ratios, and proportions! You will learn how to compare quantities with a ratio, such as the ratio of cats to dogs that can be found in a pet store. You will also learn that rates compare two different things, such as the speed of the car in miles per hour.
              </p>
              <p className="mb-6 text-lg">
                You'll be learning about proportional reasoning to help you solve problems in which the quantities either increase or decrease in a fixed way, e.g., scaling a recipe up from a cookbook. Additionally, you are going to use tables, graphs, and diagrams to picture these relations and make many real-life math problems—for example, buying goods in a store or how fast one has to move to keep the appointment.
              </p>
              <p className="text-lg">
                Get ready to really nail down these important skills to apply them in practical life.
              </p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Understand what a ratio is and how it compares two quantities</li>
              <li>Write ratios in different forms: as fractions, with a colon, or using the word "to"</li>
              <li>Calculate unit rates in various contexts (e.g., miles per hour, price per item)</li>
              <li>Set up and solve proportions using cross-multiplication</li>
              <li>Apply proportional reasoning to real-world problems</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker 
            key={`unit-2-${progressVersion}`}
            unitId="unit-2" 
            unitName="Unit 2: Ratios and Proportional Relationships" 
            items={progressItems} 
          />

          {/* Video Resources */}
          <div className="space-y-16">
            {/* Introduction to Ratios */}
            <section id="intro-ratios" className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-3">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Introduction to Ratios</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding what a ratio is and how it compares two quantities</li>
                  <li>Writing ratios in different forms: as fractions, with a colon, or using the word "to"</li>
                  <li>Identifying real-world examples of ratios (e.g., comparing boys to girls in a class)</li>
                  <li>Simplifying ratios by dividing both terms by their greatest common factor</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/bIKmw0aTmYc" title="Khan Academy: Introduction to Ratios" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Khan Academy: Introduction to Ratios</h3>
                  <p className="text-gray-300 text-sm">This video introduces the concept of ratios, explaining how they compare two quantities and can be written in different forms. It provides clear examples to help you understand how to read, write, and solve ratio problems.</p>
                  <a href="https://youtu.be/bIKmw0aTmYc" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/RQ2nYUBVvqI" title="Math Antics: Ratios and Rates" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Math Antics: Ratios and Rates</h3>
                  <p className="text-gray-300 text-sm">This video explores both ratios and rates, showing how they are used to compare quantities. It uses fun and simple examples, making it easy to understand the difference between a ratio and a rate.</p>
                  <a href="https://youtu.be/RQ2nYUBVvqI" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Understanding Unit Rates and Ratios */}
            <section id="unit-rates" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Understanding Unit Rates and Ratios</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-green-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Defining a unit rate as a ratio where the second term is 1</li>
                  <li>Calculating unit rates in various contexts (e.g., miles per hour, price per item)</li>
                  <li>Using unit rates to compare different situations (e.g., which product is a better buy)</li>
                  <li>Applying unit rates to real-life problems involving speed, density, and cost</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/qGTYSAeLTOE" title="Rates and Unit Rates" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Rates and Unit Rates</h3>
                  <p className="text-gray-300 text-sm">This video introduces rates, explaining how they compare two different quantities with different units. It shows how to calculate rates and use them to solve real-world problems.</p>
                  <a href="https://youtu.be/qGTYSAeLTOE" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/jC1K7fM91sE" title="Rates and Unit Rates" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Rates and Unit Rates</h3>
                  <p className="text-gray-300 text-sm">This video explains the difference between rates and unit rates. It shows how to calculate unit rates by dividing two quantities, making it easy to understand and solve problems.</p>
                  <a href="https://youtu.be/jC1K7fM91sE" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Proportional Reasoning */}
            <section id="proportional" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-5">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🧮</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Proportional Reasoning</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Understanding proportional relationships between quantities</li>
                  <li>Setting up and solving proportions (equations that state two ratios are equal)</li>
                  <li>Using cross-multiplication to find unknown values in proportions</li>
                  <li>Applying proportional reasoning to solve problems involving scale drawings, maps, and real-life comparisons</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/l-HtxhClZ-0" title="Khan Academy: Proportional Relationships" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Khan Academy: Proportional Relationships</h3>
                  <p className="text-gray-300 text-sm">This video introduces proportional relationships, explaining how two quantities increase or decrease together at the same rate. It shows how to identify and represent proportional relationships using tables and graphs.</p>
                  <a href="https://youtu.be/l-HtxhClZ-0" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/USmit5zUGas" title="Math Antics - Proportions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Math Antics - Proportions</h3>
                  <p className="text-gray-300 text-sm">This video explains what proportions are and how to solve proportional problems using cross-multiplication. It provides simple, clear examples that make understanding proportions easy.</p>
                  <a href="https://youtu.be/USmit5zUGas" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Using Equivalent Fractions in Ratios */}
            <section id="equivalent-fractions" className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-6">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">🔄</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Using Equivalent Fractions in Ratios</h2>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-orange-400 mb-4">What You'll Learn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                  <li>Identifying equivalent fractions and how they relate to ratios</li>
                  <li>Creating equivalent ratios by multiplying or dividing both terms by the same number</li>
                  <li>Using equivalent fractions to simplify complex ratios</li>
                  <li>Applying equivalent fractions in solving ratio problems and real-world situations</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/AtBUQH8Tkqc" title="Math Antics: Simplifying Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Math Antics: Simplifying Fractions</h3>
                  <p className="text-gray-300 text-sm">This video explains how to simplify fractions by dividing both the numerator and denominator by their greatest common factor (GCF). It uses clear visuals to show how fractions can be reduced to their simplest form.</p>
                  <a href="https://youtu.be/AtBUQH8Tkqc" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/N1X0vf5PUz4" title="Khan Academy: Equivalent Fractions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Khan Academy: Equivalent Fractions</h3>
                  <p className="text-gray-300 text-sm">This video introduces equivalent fractions, explaining how fractions that look different can represent the same value. It shows how to create equivalent fractions by multiplying or dividing both the numerator and denominator by the same number.</p>
                  <a href="https://youtu.be/N1X0vf5PUz4" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* My Practice Problems */}
            <section id="practice-problems" className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-7">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">✍️</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">My Practice Problems</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">Unit 2 Practice Problems</h3>
                <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                  <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1W-fu-btydoCDyL6PbW8lAEcrDA--EYhk/preview" allow="autoplay" title="Unit 2 Practice Problems Preview"></iframe>
                </div>
                <a href="https://drive.google.com/file/d/1W-fu-btydoCDyL6PbW8lAEcrDA--EYhk/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300 hover:scale-105">Open in Drive</a>
              </div>
            </section>

            {/* Review: Worksheets + Practice */}
            <section className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-8">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📚</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Review: Worksheets + Practice</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Khan Academy: Ratios and Proportions</h3>
                  <p className="text-gray-300 mb-4">Comprehensive practice with ratios and proportions</p>
                  <a href="https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Practice Now</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Purplemath: Ratios</h3>
                  <p className="text-gray-300 mb-4">Detailed explanations and examples for ratios</p>
                  <a href="https://www.purplemath.com/modules/ratio2.htm" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Learn More</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Math is Fun: Ratios</h3>
                  <p className="text-gray-300 mb-4">Interactive lessons and practice problems</p>
                  <a href="https://www.mathsisfun.com/numbers/ratio.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Explore</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Math-Aids: Ratios</h3>
                  <p className="text-gray-300 mb-4">Printable worksheets for ratio practice</p>
                  <a href="https://www.math-aids.com/Ratios/" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Get Worksheets</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Math is Fun: Proportions</h3>
                  <p className="text-gray-300 mb-4">Learn about proportions and how to solve them</p>
                  <a href="https://www.mathsisfun.com/algebra/proportions.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Study Proportions</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">K5 Learning: Proportions</h3>
                  <p className="text-gray-300 mb-4">Free worksheets for proportion practice</p>
                  <a href="https://www.k5learning.com/free-math-worksheets/sixth-grade-6/proportions" target="_blank" rel="noopener noreferrer" className="btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Download</a>
                </div>
              </div>
            </section>
          </div>


          {/* Interactive Quiz */}
          <div id="quiz">
            <InteractiveQuiz 
              questions={quizQuestions}
              title="Unit 2: Ratios and Proportional Relationships Quiz"
              onComplete={handleQuizComplete}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom stagger-9">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/mathematics/unit-3" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 3 →
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
