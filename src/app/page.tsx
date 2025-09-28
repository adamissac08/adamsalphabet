import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "../components/ScrollAnimation";
import LoadingSpinner from "../components/LoadingSpinner";
import ContentLoader from "../components/ContentLoader";
import Tooltip from "../components/Tooltip";
import Badge from "../components/Badge";

export default function Home() {
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
        <div className="text-center mb-16">
          <div className="mb-8 slide-in-top stagger-1">
            <Image
              src="/logo.png"
              alt="Adam's Alphabet Logo"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <ScrollAnimation animation="scale-in" delay={200}>
            <h1 className="heading-xl text-white mb-6 glow-text">
              Welcome to Adam's Alphabet
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" delay={400}>
            <p className="body-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Free educational resources designed to help students who may struggle with traditional learning methods. 
              Our focus is on providing clear, accessible mathematics materials for Grade 6 students.
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" delay={600}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Tooltip text="Students helped through in-person tutoring sessions" position="top">
                <span className="px-6 py-4 rounded-full bg-white/10 text-blue-300 glow-border text-lg card-shadow hover:card-shadow-lg transition-all duration-300">
                  <Badge variant="new" className="mr-2">New</Badge>
                  <span className="font-bold text-xl">30+ students</span> served in-person
                </span>
              </Tooltip>
              <Tooltip text="Wide geographical reach through online learning platform" position="top">
                <span className="px-6 py-4 rounded-full bg-white/10 text-purple-300 glow-border text-lg card-shadow hover:card-shadow-lg transition-all duration-300">
                  <Badge variant="featured" className="mr-2">Featured</Badge>
                  Accessible across <span className="font-bold text-xl">10+ counties</span> and <span className="font-bold text-xl">150+ schools</span> online
                </span>
              </Tooltip>
            </div>
          </ScrollAnimation>
        </div>

        {/* Featured Section */}
        <ScrollAnimation animation="fade-in" delay={200}>
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 mb-12 glow-border card-hover card-shadow-lg gradient-overlay">
            <ScrollAnimation animation="scale-in" delay={400}>
              <h2 className="heading-lg text-white mb-6 glow-text text-center">Mathematics Resources</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" delay={600}>
              <p className="body-lg text-gray-300 mb-8 text-center">
                Explore our comprehensive Grade 6 mathematics curriculum with units covering essential mathematical concepts.
              </p>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContentLoader type="skeleton" loadingText="Loading mathematics content..." delay={500}>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 card-shadow">
          <Image
                      src="/mathIMAGE2.jpg"
                      alt="Mathematics Preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge variant="featured" className="mb-2">Popular</Badge>
                  <h3 className="text-xl font-semibold text-white mb-2">Grade 6 Mathematics</h3>
                  <p className="text-gray-300 mb-4">Complete curriculum with 7 units</p>
                  <Link 
                    href="/mathematics" 
                    className="btn-primary btn-glow text-white px-4 py-2 rounded-lg text-sm font-medium inline-block"
                  >
                    View Units →
                  </Link>
                </div>
              </div>
              </ContentLoader>
              
              <ContentLoader type="skeleton" loadingText="Loading tutoring content..." delay={800}>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors card-shadow">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <Badge variant="new" className="mb-2">New</Badge>
                  <h3 className="text-xl font-semibold text-white mb-2">About Adam</h3>
                  <p className="text-gray-300 mb-4">Learn about the creator's mission</p>
                  <Link 
                    href="/about" 
                    className="btn-secondary btn-glow text-white px-4 py-2 rounded-lg text-sm font-medium inline-block"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
              </ContentLoader>
              
              <ContentLoader type="skeleton" loadingText="Loading booking content..." delay={1100}>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors card-shadow">
                    <span className="text-2xl">🆓</span>
                  </div>
                  <Badge variant="popular" className="mb-2">Free</Badge>
                  <h3 className="text-xl font-semibold text-white mb-2">Free Resources</h3>
                  <p className="text-gray-300 mb-4">All materials are completely free</p>
                  <div className="text-sm text-green-400 font-medium">
                    ✓ No cost to access
                  </div>
                </div>
              </div>
              </ContentLoader>
            </div>
          </div>
        </ScrollAnimation>

        {/* Testimonials Section */}
        <ScrollAnimation animation="fade-in" delay={200}>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 mb-12 glow-border card-hover card-shadow-lg gradient-overlay">
            <ScrollAnimation animation="scale-in" delay={400}>
              <h2 className="heading-lg text-white mb-8 glow-text text-center">What Students Say</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={200}>
              <ContentLoader type="wave" loadingText="Loading testimonials..." delay={1400}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl card-shadow">
                      👩‍🎓
                    </div>
                    <Badge variant="new" className="mb-3">Student</Badge>
                    <blockquote className="body-lg text-gray-300 italic mb-4 leading-relaxed">
                      "Adam really helped me understand fractions. I feel so much more confident now."
                    </blockquote>
                    <cite className="text-blue-400 font-semibold body-md">Alana Jose</cite>
                  </div>
                </div>
                <ScrollAnimation animation="fade-in" delay={400}>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl card-shadow">
                        👨‍🎓
                      </div>
                      <Badge variant="popular" className="mb-3">Student</Badge>
                      <blockquote className="body-lg text-gray-300 italic mb-4 leading-relaxed">
                        "The practice Adam gave me in person made a huge difference when it came time for my tests."
                      </blockquote>
                      <cite className="text-green-400 font-semibold body-md">Alan Jose</cite>
                    </div>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation animation="slide-right" delay={600}>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl glow-border card-hover card-shadow group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl card-shadow">
                        👨‍🎓
                      </div>
                      <Badge variant="featured" className="mb-3">Student</Badge>
                      <blockquote className="body-lg text-gray-300 italic mb-4 leading-relaxed">
                        "Adam's guidance helped me a lot—he's always patient and explains things clearly."
                      </blockquote>
                      <cite className="text-purple-400 font-semibold body-md">Akshar Kothari</cite>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              </ContentLoader>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        {/* Quick Links */}
        <ScrollAnimation animation="scale-in" delay={200}>
          <div className="text-center">
            <h2 className="heading-md text-white mb-8 glow-text">Quick Access</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Tooltip text="Explore all mathematics units and resources" position="top">
                <Link href="/mathematics" className="btn-primary btn-glow text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2">
                  View Mathematics Units
                  <Badge variant="new" className="ml-2">New</Badge>
                </Link>
              </Tooltip>
              <Tooltip text="Learn about Adam's educational mission" position="top">
                <Link href="/about" className="btn-secondary btn-glow text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2">
                  Learn About Adam
                </Link>
              </Tooltip>
            </div>
          </div>
        </ScrollAnimation>

      </main>

      {/* Footer */}
      <ScrollAnimation animation="fade-in" delay={200}>
        <footer className="bg-black/80 backdrop-blur-sm border-t border-white/20 py-12 mt-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation animation="slide-left" delay={400}>
                <div>
                  <h3 className="heading-md mb-4 glow-text">Adam's Alphabet</h3>
                  <p className="body-md text-gray-300 leading-relaxed">
                    Free educational resources for students who need extra help with mathematics.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-in" delay={600}>
                <div>
                  <h3 className="heading-md mb-4 glow-text">Quick Links</h3>
                  <ul className="space-y-3 body-md">
                    <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
                    <li><Link href="/mathematics" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
                    <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Me</Link></li>
                  </ul>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-right" delay={800}>
                <div>
                  <h3 className="heading-md mb-4 glow-text">Contact</h3>
                  <div className="body-md text-gray-300 space-y-3">
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
              </ScrollAnimation>
            </div>
            <ScrollAnimation animation="fade-in" delay={1000}>
              <div className="border-t border-white/20 mt-8 pt-6 text-center body-md text-gray-400">
                <p>This website is intended for extra help and is not limited to students in Georgia.</p>
              </div>
            </ScrollAnimation>
          </div>
      </footer>
      </ScrollAnimation>
    </div>
  );
}
