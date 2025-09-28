"use client";

import React from "react";
import Link from "next/link";
import ProgressTracker from "../../../components/ProgressTracker";
import InteractiveQuiz from "../../../components/InteractiveQuiz";

export default function Unit6() {
  // Sidebar: estimated times per section (in minutes)
  const sectionTimes: Record<string, { label: string; minutes: string; anchor: string }> = {
    overview: { label: 'Overview', minutes: '3–4 min', anchor: '#top' },
    'statistical-questions': { label: 'Statistical Questions', minutes: '6–8 min', anchor: '#statistical-questions' },
    'measures-center': { label: 'Measures of Center', minutes: '7–9 min', anchor: '#measures-center' },
    'measures-variation': { label: 'Measures of Variation', minutes: '6–8 min', anchor: '#measures-variation' },
    'data-displays': { label: 'Data Displays', minutes: '6–8 min', anchor: '#data-displays' },
    'box-plots': { label: 'Box Plots', minutes: '5–7 min', anchor: '#box-plots' },
    'summarizing-comparing': { label: 'Summarizing & Comparing', minutes: '5–7 min', anchor: '#summarizing-comparing' },
    'practice-problems': { label: 'My Practice Problems', minutes: '4–6 min', anchor: '#practice' },
    quiz: { label: 'Quiz', minutes: '6–10 min', anchor: '#quiz' },
  };

  const [snapshot, setSnapshot] = React.useState<{ percent: number; itemsLeft: number; nextId: string | null; completed: Record<string, boolean> }>({ percent: 0, itemsLeft: 0, nextId: null, completed: {} });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [sidebarItems, setSidebarItems] = React.useState<{ id: string; title: string; completed: boolean; type: 'video' | 'practice' | 'quiz' }[]>([]);
  const [progressVersion, setProgressVersion] = React.useState(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('progress-unit-6');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) {
        // Seed from progressItems defined below
        const itemsSeed = progressItems.map(it => ({ ...it, completed: false }));
        data = { unitId: 'unit-6', unitName: 'Unit 6: Statistics & Data Analysis', items: itemsSeed, overallProgress: 0 };
        localStorage.setItem('progress-unit-6', JSON.stringify(data));
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
      const raw = localStorage.getItem('progress-unit-6');
      let data = raw ? JSON.parse(raw) : null;
      if (!data) return;
      const updatedItems = (data.items || []).map((it: any) => it.id === id ? { ...it, completed: !it.completed, timestamp: !it.completed ? Date.now() : undefined } : it);
      const completedCount = updatedItems.filter((it: any) => it.completed).length;
      const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
      const updated = { ...data, items: updatedItems, overallProgress };
      localStorage.setItem('progress-unit-6', JSON.stringify(updated));
      setProgressVersion(v => v + 1); // force ProgressTracker remount via key
    } catch {}
  };
  const progressItems = [
    { id: 'overview', title: 'Unit Overview', type: 'video' as const },
    { id: 'statistical-questions', title: 'Statistical Questions & Data Sets', type: 'video' as const },
    { id: 'measures-center', title: 'Measures of Center', type: 'video' as const },
    { id: 'measures-variation', title: 'Measures of Variation', type: 'video' as const },
    { id: 'data-displays', title: 'Data Displays: Dot Plots & Histograms', type: 'video' as const },
    { id: 'box-plots', title: 'Box Plots & Five-Number Summary', type: 'video' as const },
    { id: 'summarizing-comparing', title: 'Summarizing & Comparing Data Sets', type: 'video' as const },
    { id: 'practice-problems', title: 'My Practice Problems', type: 'practice' as const },
    { id: 'quiz', title: 'Unit 6 Quiz', type: 'quiz' as const }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is a statistical question?',
      type: 'multiple-choice' as const,
      options: ['A question with one answer', 'A question that anticipates variability', 'A question about numbers only', 'A question with yes/no answer'],
      correctAnswer: 'A question that anticipates variability',
      explanation: 'A statistical question anticipates variability and asks about a population.'
    },
    {
      id: 'q2',
      question: 'What are the three measures of center?',
      type: 'multiple-choice' as const,
      options: ['Mean, median, mode', 'Range, mean, median', 'Mode, range, mean', 'Median, range, mode'],
      correctAnswer: 'Mean, median, mode',
      explanation: 'The three measures of center are mean (average), median (middle value), and mode (most frequent value).'
    },
    {
      id: 'q3',
      question: 'What does IQR stand for?',
      type: 'multiple-choice' as const,
      options: ['Interquartile Range', 'Internal Quality Range', 'Individual Question Range', 'Interval Question Range'],
      correctAnswer: 'Interquartile Range',
      explanation: 'IQR stands for Interquartile Range, which is the middle 50% of data (Q3 - Q1).'
    },
    {
      id: 'q4',
      question: 'Which display shows the five-number summary?',
      type: 'multiple-choice' as const,
      options: ['Dot plot', 'Histogram', 'Box plot', 'Bar graph'],
      correctAnswer: 'Box plot',
      explanation: 'Box plots display the five-number summary: minimum, Q1, median, Q3, and maximum.'
    },
    {
      id: 'q5',
      question: 'What is the range of the data set: 2, 5, 8, 12, 15?',
      type: 'fill-in' as const,
      correctAnswer: '13',
      explanation: 'Range = maximum - minimum = 15 - 2 = 13'
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
                Unit 6: Statistics & Data Analysis
              </h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
              <div className="relative">
                <span className="text-4xl animate-bounce">📊</span>
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md"></div>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-2xl text-gray-200 slide-in-bottom stagger-2 max-w-4xl mx-auto leading-relaxed font-medium">
              Master the art of statistics and data analysis, learning to collect, organize, and interpret data through various displays and measures
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-200 rounded-full text-base font-semibold border border-emerald-400/50 shadow-lg backdrop-blur-sm">
                📊 9 Sections
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-teal-500/30 to-teal-600/30 text-teal-200 rounded-full text-base font-semibold border border-teal-400/50 shadow-lg backdrop-blur-sm">
                ⏱️ 60-75 min
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-200 rounded-full text-base font-semibold border border-cyan-400/50 shadow-lg backdrop-blur-sm">
                📈 Data Analysis
              </span>
            </div>
          </div>

          {/* Unit Overview */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Unit 6 Overview</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6 text-lg">
                Unit 6 focuses on understanding and analyzing data through statistical questions. Students learn how to find measures of center (mean, median, mode) and variation (range, IQR), and represent data using dot plots, histograms, and box plots. These skills help students make sense of real-world information and compare different data sets.
              </p>
              <p className="mb-6 text-lg">
                You'll learn to identify statistical questions that anticipate variability, calculate measures of center and spread, and create various data displays. You'll also learn to interpret and compare data sets using appropriate statistical measures and visual representations.
              </p>
              <p className="text-lg">Get ready to become a data detective!</p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2 mb-16">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
              <li>Identify statistical questions that anticipate variability</li>
              <li>Calculate measures of center (mean, median, mode) and variation (range, IQR)</li>
              <li>Create and interpret dot plots, histograms, and box plots</li>
              <li>Understand the five-number summary and its relationship to box plots</li>
              <li>Compare and summarize data sets using appropriate statistical measures</li>
            </ul>
          </section>

          {/* Progress Tracker */}
          <ProgressTracker key={`unit-6-${progressVersion}`} unitId="unit-6" unitName="Unit 6: Statistics & Data Analysis" items={progressItems} />

          {/* Sections */}
          <div className="space-y-16">
            {/* Statistical Questions & Data Sets */}
            <section id="statistical-questions" className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">❓</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Statistical Questions & Data Sets</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>A statistical question anticipates variability and asks about a population. The Georgia Standards explain that a statistical question "anticipates variability" and that data collected to answer such questions have a distribution described by its center, spread, and overall shape.</p>
                <p>For example, "How old am I?" is not a statistical question, but "How old are the students in my school?" is a statistical question.</p>
                
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-green-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Identify statistical questions that anticipate variability</li>
                    <li>Distinguish between statistical and non-statistical questions</li>
                    <li>Understand how data collection relates to statistical questions</li>
                    <li>Recognize the characteristics of good statistical questions</li>
                  </ul>
                </div>
                
                <p className="text-gray-200 font-semibold">Key Characteristics:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Anticipates variability in responses</li>
                  <li>Asks about a population or group</li>
                  <li>Has multiple possible answers</li>
                  <li>Requires data collection to answer</li>
                </ul>
                <p>Why it matters: helps us understand patterns and make informed decisions based on data.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/qyYSQDcSNlY" title="Khan Academy – Statistical & Non‑Statistical Questions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Khan Academy – Statistical & Non‑Statistical Questions</h3>
                  <p className="text-gray-300 text-sm">Learn to identify statistical questions that anticipate variability versus non-statistical questions with clear examples and explanations.</p>
                  <a href="https://youtu.be/qyYSQDcSNlY" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/9IJ_NgP00FU" title="Statistical Questions vs. Non-Statistical Questions" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Statistical Questions vs. Non-Statistical Questions</h3>
                  <p className="text-gray-300 text-sm">Compare statistical and non-statistical questions with practical examples to understand the key differences and characteristics.</p>
                  <a href="https://youtu.be/9IJ_NgP00FU" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Measures of Center */}
            <section id="measures-center" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Measures of Center</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Measures of center summarize a set of numerical data with a single number. The framework notes that a measure of center (mean or median) summarizes all values, while a measure of variation describes how the values vary.</p>
                <p>Students learn to compute the mean (average), median (middle value) and mode (most frequent value) and to decide which is appropriate depending on the data's distribution.</p>
                
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-purple-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Calculate the mean (average) of a data set</li>
                    <li>Find the median (middle value) of a data set</li>
                    <li>Identify the mode (most frequent value)</li>
                    <li>Choose the appropriate measure of center for different data distributions</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/B1HEzNTGeZ4" title="Math Antics – Mean, Median & Mode" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Math Antics – Mean, Median & Mode</h3>
                  <p className="text-gray-300 text-sm">Learn the three main measures of center: mean, median, and mode, with clear explanations and examples.</p>
                  <a href="https://youtu.be/B1HEzNTGeZ4" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/oatwXlZBPw0" title="Math with Mr. J – Finding Mean, Median & Mode" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Math with Mr. J – Finding Mean, Median & Mode</h3>
                  <p className="text-gray-300 text-sm">Step-by-step guide to calculating mean, median, and mode with practical examples and clear explanations.</p>
                  <a href="https://youtu.be/oatwXlZBPw0" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Measures of Variation */}
            <section id="measures-variation" className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📈</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Measures of Variation</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Variation describes how spread out data are. The unit framework teaches that students should determine quantitative measures of variability such as range and interquartile range (IQR).</p>
                <p>The range is the difference between the maximum and minimum values, while the IQR (Q3 – Q1) is the "middle 50%" of data in a box plot.</p>
                
                <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-teal-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Calculate the range of a data set</li>
                    <li>Find the interquartile range (IQR)</li>
                    <li>Understand how variation describes data spread</li>
                    <li>Use range and IQR to compare data sets</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/VABsJBw1JqA" title="Math with Mr. J – Interquartile Range (IQR)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Math with Mr. J – Interquartile Range (IQR)</h3>
                  <p className="text-gray-300 text-sm">Learn how to calculate the interquartile range (IQR) and understand what it tells us about data spread.</p>
                  <a href="https://youtu.be/VABsJBw1JqA" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/qLYYHWYr8xI" title="Khan Academy – Range and Interquartile Range" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Khan Academy – Range and Interquartile Range</h3>
                  <p className="text-gray-300 text-sm">Comprehensive explanation of range and IQR with examples showing how to calculate and interpret these measures of variation.</p>
                  <a href="https://youtu.be/qLYYHWYr8xI" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Data Displays: Dot Plots & Histograms */}
            <section id="data-displays" className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Data Displays: Dot Plots & Histograms</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Numerical data can be displayed on a number line using dot plots, where each dot represents a data point. Histograms display continuous data using bars (bins) and show frequency distributions.</p>
                <p>The unit framework encourages students to create frequency tables leading to histograms and to relate the shape of a histogram to the corresponding dot plot. Students should mark mean and median on histograms and describe shapes as symmetric or skewed.</p>
                
                <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-indigo-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Create and interpret dot plots for numerical data</li>
                    <li>Build frequency tables and histograms</li>
                    <li>Identify symmetric and skewed distributions</li>
                    <li>Mark mean and median on data displays</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/gdE46YSedvE" title="Khan Academy – Dot Plots & Frequency Tables" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy – Dot Plots & Frequency Tables</h3>
                  <p className="text-gray-300 text-sm">Learn how to create and interpret dot plots and frequency tables to display numerical data effectively.</p>
                  <a href="https://youtu.be/gdE46YSedvE" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/gSEYtAjuZ-Y" title="Khan Academy – Histograms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Khan Academy – Histograms</h3>
                  <p className="text-gray-300 text-sm">Learn how to create and interpret histograms to display continuous data and frequency distributions.</p>
                  <a href="https://youtu.be/gSEYtAjuZ-Y" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
              </div>
            </section>

            {/* Box Plots & Five-Number Summary */}
            <section id="box-plots" className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">📦</span>
                </div>
                <h2 className="text-4xl font-semibold text-white glow-text">Box Plots & Five-Number Summary</h2>
              </div>
              <div className="mb-6 text-gray-300 text-lg space-y-3">
                <p>Box plots (also called box‑and‑whisker plots) display the five‑number summary: minimum, lower quartile (Q1), median, upper quartile (Q3) and maximum.</p>
                <p>The unit explains that the "box" represents the middle 50% of data and that the length of the box corresponds to the IQR. Students use box plots to compare distributions and discuss outliers and skewness.</p>
                
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4 mt-4">
                  <h4 className="text-orange-300 font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Identify the five-number summary of a data set</li>
                    <li>Create and interpret box plots</li>
                    <li>Understand how the box represents the middle 50% of data</li>
                    <li>Compare distributions using box plots</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/nV8jR8M8C74" title="Math Antics – Box and Whisker Plots" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Math Antics – Box and Whisker Plots</h3>
                  <p className="text-gray-300 text-sm">Learn how to create and interpret box plots, including the five-number summary and identifying outliers.</p>
                  <a href="https://youtu.be/nV8jR8M8C74" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                  <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '56.25%'}}>
                    <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://www.youtube.com/embed/09Cx7xuIXig" title="Khan Academy – Constructing a Box and Whisker Plot" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Khan Academy – Constructing a Box and Whisker Plot</h3>
                  <p className="text-gray-300 text-sm">Step-by-step guide to creating box plots from data, including finding quartiles and identifying outliers.</p>
                  <a href="https://youtu.be/09Cx7xuIXig" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block btn-glow bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">Watch on YouTube</a>
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
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Unit 6 Practice Problems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                  <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://drive.google.com/file/d/1GD8IoL1vAQ5gB-SrgNLIkxKhUfrhL12C/preview" allow="autoplay" title="Unit 6 Practice Problems Preview"></iframe>
                </div>
                <div className="relative w-full overflow-hidden rounded-lg mb-4" style={{paddingTop: '129%'}}>
                  <iframe className="absolute inset-0 w-full h-full rounded-lg" src="https://docs.google.com/document/d/1j9S52DfTDHYUI7fAUlgrhjDFshQW8qaTMPCKbVuef94/preview" allow="autoplay" title="Unit 6 Additional Practice Preview"></iframe>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://drive.google.com/file/d/1GD8IoL1vAQ5gB-SrgNLIkxKhUfrhL12C/view" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105">Open Worksheet 1</a>
                <a href="https://docs.google.com/document/d/1j9S52DfTDHYUI7fAUlgrhjDFshQW8qaTMPCKbVuef94/edit" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-glow bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105">Open Worksheet 2</a>
              </div>
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
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Common Core Sheets: Statistical Questions</h3>
                <a href="https://www.commoncoresheets.com/finding-statistical-questions/860/download" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Drills: Mean, Median, Mode, Range</h3>
                <a href="https://math-drills.com/statistics/mean_median_mode_range_010099range_05inset_001.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Salamanders: Median Worksheets</h3>
                <a href="https://www.math-salamanders.com/median-worksheets.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Common Core Sheets: Histograms</h3>
                <a href="https://www.commoncoresheets.com/bar-graph-worksheets/sbh/histograms" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Salamanders: Box Plot Worksheets</h3>
                <a href="https://www.math-salamanders.com/box-plot-worksheets.html" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover group">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">Math Drills: Statistics</h3>
                <a href="https://math-drills.com/statistics.php" target="_blank" rel="noopener noreferrer" className="btn-glow bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">Open</a>
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
            <Link href="/mathematics/unit-7" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Next: Unit 7 →
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

 