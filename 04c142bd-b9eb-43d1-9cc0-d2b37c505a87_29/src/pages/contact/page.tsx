
export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center py-6 px-6 relative z-10">
        <a 
          href="/" 
          className="flex items-center justify-center w-12 h-12 bg-white hover:bg-red-600 rounded-full transition-all duration-300 cursor-pointer group"
        >
          <i className="ri-arrow-left-line text-black group-hover:text-white text-xl group-hover:scale-110 transition-all duration-300"></i>
        </a>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Let's work together</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always interested in new projects and creative collaborations. 
            Whether you need software development, digital art, or graphic design, 
            let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-red-600">Get in touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                    <i className="ri-mail-line text-white"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Personal:</span>
                    <span className="text-white font-medium">waseemziadzeid@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                    <i className="ri-mail-line text-white"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">School:</span>
                    <span className="text-white font-medium">wzeid@calpoly.edu</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                    <i className="ri-phone-line text-white"></i>
                  </div>
                  <span className="text-white font-medium">925-525-4652</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                    <i className="ri-map-pin-line text-white"></i>
                  </div>
                  <span className="text-white font-medium">Livermore, CA</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-red-600">Socials:</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-red-600 transition-all duration-300 cursor-pointer hover:scale-110 transform group">
                  <i className="ri-instagram-line text-black group-hover:text-white group-hover:rotate-12 transition-all duration-300"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-red-600 transition-all duration-300 cursor-pointer hover:scale-110 transform group">
                  <i className="ri-linkedin-line text-black group-hover:text-white group-hover:rotate-12 transition-all duration-300"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-red-600 transition-all duration-300 cursor-pointer hover:scale-110 transform group">
                  <i className="ri-github-line text-black group-hover:text-white group-hover:rotate-12 transition-all duration-300"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Services & Skills</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-600 pl-6 hover:pl-8 transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-white">Software Development</h3>
                <p className="text-gray-300 text-sm">
                  Full-stack development, web applications, and computer science solutions
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-6 hover:pl-8 transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-white">Graphic Design</h3>
                <p className="text-gray-300 text-sm">
                  Brand identity, 3D visualization, digital art, and visual communication solutions
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-6 hover:pl-8 transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-white">Digital Art</h3>
                <p className="text-gray-300 text-sm">
                  Custom digital illustrations, creative compositions, and artistic design
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-6 hover:pl-8 transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-white">Creative Consultation</h3>
                <p className="text-gray-300 text-sm">
                  Project planning, creative direction, and technical implementation guidance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="text-center mt-16 pb-16">
          <p className="text-gray-400 text-sm">
            I typically respond to inquiries within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
