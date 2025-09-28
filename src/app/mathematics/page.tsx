import Link from "next/link";
import ScrollAnimation from "../../components/ScrollAnimation";
import Badge from "../../components/Badge";

export default function Mathematics() {
  const units = [
    { id: 1, title: "Unit 1: Number Systems and Operations", description: "Introduction to whole numbers, place value, and basic operations", icon: "🔢" },
    { id: 2, title: "Unit 2: Fractions and Decimals", description: "Understanding fractions, decimals, and their relationships", icon: "📊" },
    { id: 3, title: "Unit 3: Geometry and Measurement", description: "Shapes, angles, area, perimeter, and volume", icon: "📐" },
    { id: 4, title: "Unit 4: Data Analysis and Probability", description: "Collecting, organizing, and interpreting data", icon: "📈" },
    { id: 5, title: "Unit 5: Algebraic Thinking", description: "Patterns, variables, and simple equations", icon: "🧮" },
    { id: 6, title: "Unit 6: Ratios and Proportions", description: "Understanding ratios, rates, and proportional relationships", icon: "⚖️" },
    { id: 7, title: "Unit 7: Problem Solving and Applications", description: "Applying mathematical concepts to real-world situations", icon: "🎯" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle" style={{top: '15%', left: '15%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '25%', left: '85%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '65%', left: '25%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '85%', left: '75%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '45%', left: '55%', animationDelay: '1s'}}></div>
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
              <Link href="/mathematics" className="hover:text-blue-400 transition-all duration-300 hover:glow-text text-blue-400">
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
        <ScrollAnimation animation="scale-in" delay={200}>
          <div className="text-center mb-16">
            <h1 className="heading-xl text-white mb-6 glow-text">
              Grade 6 Mathematics
            </h1>
            <p className="body-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive mathematics curriculum designed to help students master essential mathematical concepts. 
              Each unit builds upon previous knowledge to create a solid foundation for future learning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="new" className="text-sm">7 Units Available</Badge>
              <Badge variant="featured" className="text-sm">Interactive Content</Badge>
              <Badge variant="popular" className="text-sm">Free Resources</Badge>
            </div>
          </div>
        </ScrollAnimation>

        {/* Units Grid */}
        <ScrollAnimation animation="fade-in" delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {units.map((unit, index) => (
              <Link 
                key={unit.id}
                href={`/mathematics/unit-${unit.id}`}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 card-hover card-shadow group relative overflow-hidden h-full"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300 card-shadow">
                      {unit.icon}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Badge variant="new" className="text-xs">Unit {unit.id}</Badge>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="heading-md text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {unit.title}
                    </h3>
                    <p className="body-md text-gray-300 leading-relaxed mb-4">
                      {unit.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    Start Learning →
                  </div>
                </div>
              </Link>
            ))}
            
            {/* GADOE Curriculum Frameworks Card */}
            <Link 
              href="/mathematics/curriculum-frameworks"
              className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 card-hover card-shadow group relative overflow-hidden h-full"
              style={{animationDelay: '0.7s'}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300 card-shadow">
                    📋
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="featured" className="text-xs">Official</Badge>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="heading-md text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    GADOE Curriculum Unit Frameworks
                  </h3>
                  <p className="body-md text-gray-300 leading-relaxed mb-4">
                    Official Georgia Department of Education curriculum frameworks for all units
                  </p>
                </div>
                <div className="flex items-center justify-center text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors">
                  View Frameworks →
                </div>
              </div>
            </Link>
          </div>
        </ScrollAnimation>

        {/* Additional Resources */}
        <ScrollAnimation animation="fade-in" delay={1000}>
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover card-shadow">
            <h2 className="heading-lg text-white mb-8 glow-text text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-4 card-shadow">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="heading-md text-white group-hover:text-green-400 transition-colors duration-300">
                    Practice Problems
                  </h3>
                </div>
                <p className="body-md text-gray-300 leading-relaxed">
                  Extra practice problems for each unit to reinforce learning and build confidence.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 card-shadow">
                    <span className="text-2xl">📺</span>
                  </div>
                  <h3 className="heading-md text-white group-hover:text-red-400 transition-colors duration-300">
                    Video Tutorials
                  </h3>
                </div>
                <p className="body-md text-gray-300 leading-relaxed">
                  Step-by-step video explanations available on our YouTube channel.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center mr-4 card-shadow">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="heading-md text-white group-hover:text-purple-400 transition-colors duration-300">
                    Study Guides
                  </h3>
                </div>
                <p className="body-md text-gray-300 leading-relaxed">
                  Comprehensive study guides to help prepare for tests and assessments.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-4 card-shadow">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <h3 className="heading-md text-white group-hover:text-yellow-400 transition-colors duration-300">
                    Interactive Activities
                  </h3>
                </div>
                <p className="body-md text-gray-300 leading-relaxed">
                  Hands-on activities to make learning mathematics engaging and fun.
                </p>
              </div>
            </div>
          </div>
          </div>
        </ScrollAnimation>

        {/* Back to Home */}
        <ScrollAnimation animation="fade-in" delay={1200}>
          <div className="text-center mt-12">
            <Link href="/" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 card-shadow">
              ← Back to Home
            </Link>
          </div>
        </ScrollAnimation>
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
