import Link from "next/link";
import Image from "next/image";

export default function About() {
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
              <Link href="/about" className="hover:text-blue-400 transition-all duration-300 hover:glow-text text-blue-400">
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 glow-text slide-in-top stagger-1">
              About Adam
            </h1>
            <p className="text-xl text-gray-300 slide-in-bottom stagger-2">
              The creator behind Adam's Alphabet and a passionate educator
            </p>
          </div>

          {/* Adam's Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 slide-in-bottom stagger-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 glow-border card-hover group">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <img
                  src="/snow.png"
                  alt="Adam's dedication to education"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Dedicated to Education</h3>
                  <p className="text-gray-200 text-sm">Adam's commitment to helping students learn</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-center">
                Adam's commitment to helping students learn goes beyond traditional teaching methods. 
                He believes every student can succeed with the right support and resources.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 glow-border card-hover group">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <img
                  src="/mountains.png"
                  alt="Adam's teaching excellence"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Teaching Excellence</h3>
                  <p className="text-gray-200 text-sm">Adam's innovative teaching methods</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-center">
                Adam's innovative teaching methods focus on making mathematics accessible and engaging. 
                He creates resources that help students understand concepts clearly.
              </p>
            </div>
          </div>

          {/* Founder Section */}
          <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden glow-border">
                  <Image
                    src="/adampic.jpg"
                    alt="Adam Issac - Founder"
                    fill
                    className="object-cover object-center"
                    style={{objectPosition: 'center top'}}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-semibold text-white mb-4 glow-text">Founder: Adam Issac</h2>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <img
                    src="/danelogo.png"
                    alt="Denmark High School Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <p className="text-xl text-gray-300">Senior at Denmark High School</p>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A passionate student and math tutor dedicated to making education accessible to all students, 
                  regardless of their financial background or learning challenges.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="space-y-16">
            {/* Personal Story */}
            <section className="bg-black/40 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-1">
              <h2 className="text-4xl font-semibold text-white mb-8 glow-text">My Story</h2>
              <div className="prose prose-lg text-gray-300 leading-relaxed">
                <p className="mb-6 text-lg">
                  My name is Adam Issac, and I am a boy who is a senior at Denmark High School. Indeed, it is over the years, 
                  into my second year in high school, that I have come to realize the actual weight of the importance of assisted 
                  private learning. Most students have trouble following the lectures delivered by teachers, including me. And then, 
                  most times, we don't feel like studying, and the material available is so complex that it becomes impossible for 
                  us to understand, and we keep on being in that loop of confusion.
                </p>
                <p className="mb-6 text-lg">
                  I have always loved and enjoyed the subject of math since it was a subject that made sense to me and could be 
                  easily explained by others when I was confused about a certain topic. It is me who created Adam's Alphabet, 
                  for I am the one with the problem in school. Throughout my education, I was always caring, which means that 
                  I was there to aid anyone who couldn't or struggled with learning new topics. I am very adaptive, so I can 
                  work with anyone if need be, and you can be at peace with yourself that the work will be done well before the 
                  submission date.
                </p>
                <p className="mb-6 text-lg">
                  Most accurate information on me: I always have a flair for math when it comes to studies, which boosted my 
                  confidence to develop the program since my friends would always come to me when having math questions. They 
                  would call me their "math tutor." Instead of suppressing my love/enjoyment for math and teaching it, I decided 
                  to help others who struggle with math. So, I started tutoring two of my family friend's kids who were in 6th 
                  and 8th grade. As I taught them, I found out how interesting and enjoyable I found this position.
                </p>
                <p className="mb-6 text-lg">
                  The students I was teaching were always very thankful for the experience since they understood my simplified 
                  version. The students soon started to do better in school, and they gave credit to my classes. It then dawned 
                  on me how valuable teaching is, and I strove to help more students on a larger scale. As I started to research, 
                  I realized most students who are below average in school are often in financial distress at home, which I could 
                  understand since the two students I taught before came from a low-income background. That is why I made this 
                  program accessible—to tutor students with the types of challenges that I had.
                </p>
                <p className="text-lg">
                  Even though the website is not complete yet, I am making humongous efforts toward its completion. Decoding Adam's 
                  Alphabet is my initiative to make sure that every single student has learning resources they can understand and 
                  reach complete success with. By providing the services free of charge, I hope it will try to take out some of 
                  the financial pressures from families and afford every learner a very conducive environment accessible from any 
                  threat so that at the end of it all, students can acquire the knowledge and confidence needed for the take-off 
                  of their studies.
                </p>
              </div>
            </section>

            {/* Mission */}
            <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-2">
              <h2 className="text-4xl font-semibold text-white mb-8 glow-text">My Mission</h2>
              <div className="prose prose-lg text-gray-300 leading-relaxed">
                <p className="mb-6 text-lg">
                  My mission is simple: to provide free, high-quality educational resources that help students 
                  who may struggle with traditional learning methods. I believe that with the right support and 
                  resources, every student can succeed in mathematics.
                </p>
                <p className="mb-6 text-lg">
                  Through Adam's Alphabet, I aim to:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-6 text-lg">
                  <li>Create clear, step-by-step explanations of mathematical concepts</li>
                  <li>Provide multiple ways to approach and understand problems</li>
                  <li>Offer resources that are completely free and accessible to all</li>
                  <li>Support students who need extra help beyond the classroom</li>
                  <li>Build confidence in students who may feel discouraged by mathematics</li>
                </ul>
              </div>
            </section>

            {/* Background */}
            <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-3">
              <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Educational Background</h2>
              <div className="prose prose-lg text-gray-300 leading-relaxed">
                <p className="mb-6 text-lg">
                  My educational journey has been shaped by both personal challenges and a deep commitment to 
                  helping others overcome similar obstacles. I've dedicated myself to understanding how students 
                  learn and what barriers they face in mathematics education.
                </p>
                <p className="text-lg">
                  This background has given me unique insights into creating resources that truly help students 
                  who need extra support, whether they're struggling with basic concepts or need alternative 
                  approaches to understanding mathematical principles.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-10 glow-border card-hover slide-in-bottom stagger-4">
              <h2 className="text-4xl font-semibold text-white mb-8 glow-text">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-lg flex items-center">
                      <span className="mr-3 text-2xl">📧</span>
                      <span className="font-semibold">Email:</span> adamissac08@gmail.com
                    </p>
                    <p className="text-gray-300 text-lg flex items-center">
                      <span className="mr-3 text-2xl">📺</span>
                      <span className="font-semibold">YouTube:</span> 
                      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" 
                         className="text-blue-400 hover:text-blue-300 ml-2 transition-colors duration-300">
                        Adam's Alphabet Channel
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-400 mb-6">How I Can Help</h3>
                  <ul className="text-gray-300 space-y-3 text-lg">
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Answer questions about mathematics concepts
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Provide additional resources for specific topics
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Offer guidance on study strategies
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Share tips for overcoming math anxiety
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-12 glow-border card-hover slide-in-bottom stagger-5">
              <h2 className="text-4xl font-semibold mb-6 glow-text">Ready to Start Learning?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Explore our free mathematics resources and begin your journey to mathematical confidence.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
                  View Mathematics Units
                </Link>
                <Link href="/" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
                  Back to Home
                </Link>
              </div>
            </section>
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
