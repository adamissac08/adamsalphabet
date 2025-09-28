import Link from "next/link";

export default function CurriculumFrameworks() {
  const frameworks = [
    {
      id: 1,
      title: "Unit 1: Number Systems and Operations",
      description: "GADOE Curriculum Framework for Number Systems and Operations",
      url: "https://drive.google.com/file/u/0/d/1GH3oj67h-27Nrr0h-XdQNavn-MpJnTHJ/view"
    },
    {
      id: 2,
      title: "Unit 2: Fractions and Decimals",
      description: "GADOE Curriculum Framework for Fractions and Decimals",
      url: "https://drive.google.com/file/d/1MCf6Jf9Wnre7WY6MR4gmrLgLYWJgFLmF/view"
    },
    {
      id: 3,
      title: "Unit 3: Geometry and Measurement",
      description: "GADOE Curriculum Framework for Geometry and Measurement",
      url: "https://drive.google.com/file/d/1gErsfpHBR0vh54AEtpx9ZGxCWR50F7Ki/view"
    },
    {
      id: 4,
      title: "Unit 4: Data Analysis and Probability",
      description: "GADOE Curriculum Framework for Data Analysis and Probability",
      url: "https://drive.google.com/file/d/1yXQGCJk60vDCNnLTIcd-4oRmbl4LGllQ/view"
    },
    {
      id: 5,
      title: "Unit 5: Algebraic Thinking",
      description: "GADOE Curriculum Framework for Algebraic Thinking",
      url: "https://drive.google.com/file/d/1VQ164yBRTVIgTD-NCh2IjW_r3uTaPosC/view"
    },
    {
      id: 6,
      title: "Unit 6: Ratios and Proportions",
      description: "GADOE Curriculum Framework for Ratios and Proportions",
      url: "https://drive.google.com/file/d/10aEjuN33SjjyTmCDSpBAj3Oc6WlUqnXB/view"
    },
    {
      id: 7,
      title: "Unit 7: Problem Solving and Applications",
      description: "GADOE Curriculum Framework for Problem Solving and Applications",
      url: "https://drive.google.com/file/d/1YgLlErTGZ1Fbga1Elh11l8_Io0ik9Zz3/view"
    }
  ];

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
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 slide-in-top">
            <ol className="flex space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link></li>
              <li>/</li>
              <li><Link href="/mathematics" className="hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
              <li>/</li>
              <li className="text-white">Curriculum Frameworks</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 glow-text slide-in-top stagger-1">
              GADOE Curriculum Unit Frameworks
            </h1>
            <p className="text-xl text-gray-300 slide-in-bottom stagger-2">
              Official Georgia Department of Education curriculum frameworks for Grade 6 Mathematics
            </p>
          </div>

          {/* Frameworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {frameworks.map((framework, index) => (
              <div
                key={framework.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 card-hover group slide-in-bottom"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                    📋
                  </div>
                  <div className="bg-green-500/20 text-green-400 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {framework.id}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    {framework.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    {framework.description}
                  </p>
                  <a
                    href={framework.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-green-500 hover:to-green-700 transition-all duration-300 hover:scale-105"
                  >
                    View Framework
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-8">
            <h2 className="text-4xl font-semibold text-white mb-8 glow-text text-center">About GADOE Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-400 mb-4">What are Curriculum Frameworks?</h3>
                <p className="text-gray-300 leading-relaxed">
                  The Georgia Department of Education (GADOE) curriculum frameworks provide detailed guidance 
                  for teachers and students on what should be taught and learned in each mathematics unit. 
                  These frameworks align with state standards and help ensure consistent, high-quality education.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">How to Use These Resources</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-center">
                    <span className="mr-3 text-green-400">✓</span>
                    Review learning objectives for each unit
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-400">✓</span>
                    Understand assessment expectations
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-400">✓</span>
                    Access additional teaching resources
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-400">✓</span>
                    Align with state standards
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20 slide-in-bottom stagger-9">
            <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              ← Back to Mathematics
            </Link>
            <Link href="/" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              Back to Home
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
