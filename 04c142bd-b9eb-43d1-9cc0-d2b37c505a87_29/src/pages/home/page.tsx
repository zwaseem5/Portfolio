
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-center items-center py-8 relative z-10">
        <div className="flex space-x-12">
          <a href="/" className="text-white hover:text-red-600 transition-all duration-300 cursor-pointer border-b-2 border-red-600 font-bold">
            Waseem Zeid
          </a>
          <a href="/projects" className="text-white hover:text-red-600 transition-all duration-300 cursor-pointer font-medium">
            Projects
          </a>
          <a href="/contact" className="text-white hover:text-red-600 transition-all duration-300 cursor-pointer font-medium">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight text-white">
            Waseem Zeid
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Student computer scientist, digital artist, and designer specializing in software and creative art.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="/projects" 
              className="group relative px-8 py-4 bg-red-600 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transform overflow-hidden font-bold"
            >
              <span className="relative z-10">View My Portfolio</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </a>
            <a 
              href="/contact" 
              className="group relative px-8 py-4 border-2 border-white text-white rounded-full hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105 transform hover:shadow-lg overflow-hidden font-medium"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="text-center py-8 relative z-10">
        <p className="text-gray-400 text-sm">
          © 2024 Waseem Zeid. All rights reserved. | 
          <a href="https://readdy.ai/?origin=logo" className="hover:text-red-600 transition-all duration-300 cursor-pointer ml-1">
            Powered by Readdy
          </a>
        </p>
      </footer>
    </div>
  );
}
