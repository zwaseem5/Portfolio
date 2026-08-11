import { useState } from 'react';
import TetrisDemo from './components/TetrisDemo';
import TravelVistaDemo from './components/TravelVistaDemo';

const categories = [
  'All',
  'Digital Art',
  'Software Projects',
  'Software Live Demos'
];

const liveDemos = [
  {
    id: 'tetris-game',
    title: 'Classic Tetris',
    language: 'JavaScript',
    description: 'Everyone needs to build Tetris at least once, right? Kept it simple but made sure the game feel was just right. Surprisingly tricky to get the rotation logic perfect.',
    image: 'https://readdy.ai/api/search-image?query=Simple%20tetris%20game%20interface%20student%20programming%20project%20classic%20block%20puzzle%20game%20basic%20colorful%20design&width=800&height=600&seq=tetris002&orientation=landscape',
    gradient: 'from-cyan-500 to-blue-500',
    bgPattern: 'bg-blue-900/30',
    features: ['Classic Gameplay', 'Score Tracking', 'Level System', 'Smooth Controls'],
    tech: ['JavaScript', 'Canvas', 'Game Logic', 'CSS'],
    component: TetrisDemo,
    story: 'Built this for my highschool CS create task'
  },
  {
    id: 'travel-vista',
    title: 'Travel Vista Site',
    language: 'React',
    description: 'Travel booking website with destination packages and booking system. Clean design focused on showcasing beautiful travel destinations and making booking simple.',
    image: 'https://readdy.ai/api/search-image?query=Simple%20travel%20website%20interface%20with%20destination%20packages%20booking%20system%20clean%20professional%20design%20travel%20agency&width=800&height=600&seq=travel002&orientation=landscape',
    gradient: 'from-blue-500 to-teal-500',
    bgPattern: 'bg-blue-900/30',
    features: ['Destination Packages', 'Booking System', 'Testimonials', 'Responsive Design'],
    tech: ['React', 'TypeScript', 'CSS', 'UI/UX'],
    component: TravelVistaDemo,
    story: 'A small project for a family friend, just a demo'
  }
];

// Existing code: projects array and rest of component
const projects = [
  {
    id: 6,
    title: 'Cartoon Sunset Animation',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/baAdnoBPkDI/maxresdefault.jpg',
    description: 'An animated cartoon sunset scene showcasing animation and visual design skills',
    videoUrl: 'https://youtu.be/baAdnoBPkDI',
    videoId: 'baAdnoBPkDI',
    isVideo: true
  },
  {
    id: 7,
    title: 'Interactive Web Animation',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/19rYkOXLmKI/maxresdefault.jpg',
    description: 'Dynamic web animation demonstrating interactive design and programming skills',
    videoUrl: 'https://youtu.be/19rYkOXLmKI',
    videoId: '19rYkOXLmKI',
    isVideo: true
  },
  {
    id: 8,
    title: 'Creative Coding Project',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/Ar_kQg-WH0A/maxresdefault.jpg',
    description: 'Innovative coding project showcasing creative programming and visual effects',
    videoUrl: 'https://youtu.be/Ar_kQg-WH0A',
    videoId: 'Ar_kQg-WH0A',
    isVideo: true
  },
  {
    id: 9,
    title: 'Digital Art Animation',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/UguiM7STpBI/maxresdefault.jpg',
    description: 'Animated digital artwork combining artistic vision with technical execution',
    videoUrl: 'https://youtu.be/UguiM7STpBI',
    videoId: 'UguiM7STpBI',
    isVideo: true
  },
  {
    id: 10,
    title: 'Motion Graphics Design',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/eNiCugcoJis/maxresdefault.jpg',
    description: 'Professional motion graphics showcasing animation and design expertise',
    videoUrl: 'https://youtu.be/eNiCugcoJis',
    videoId: 'eNiCugcoJis',
    isVideo: true
  },
  {
    id: 11,
    title: 'Visual Effects Animation',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/Fl6Lu_SWleE/maxresdefault.jpg',
    description: 'Advanced visual effects and animation demonstrating technical and creative skills',
    videoUrl: 'https://youtu.be/Fl6Lu_SWleE',
    videoId: 'Fl6Lu_SWleE',
    isVideo: true
  },
  {
    id: 13,
    title: 'Dynamic Programming Animation',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/-D2ysLNSD4Q/maxresdefault.jpg',
    description: 'Educational programming animation demonstrating complex algorithms and data structures',
    videoUrl: 'https://youtu.be/-D2ysLNSD4Q',
    videoId: '-D2ysLNSD4Q',
    isVideo: true
  },
  {
    id: 14,
    title: 'Interactive Code Visualization',
    category: 'Digital Art',
    image: 'https://img.youtube.com/vi/woWl4DO1lRQ/hqdefault.jpg',
    description: 'Interactive visualization showcasing programming concepts and code execution flow',
    videoUrl: 'https://youtu.be/woWl4DO1lRQ',
    videoId: 'woWl4DO1lRQ',
    isVideo: true
  },
  {
    id: 30,
    title: 'Artistic Expression Study',
    category: 'Digital Art',
    image: 'https://lh3.googleusercontent.com/d/1_H_lVTPWoP9XA4VGpEfpvIBIZxOjpOdD',
    description: 'Artistic expression study exploring emotion and visual storytelling'
  },
  {
    id: 34,
    title: 'Conceptual Digital Art',
    category: 'Digital Art',
    image: 'https://lh3.googleusercontent.com/d/1vF1dr_DYjCBKMTM2dUxafHRtzXg7gZzA',
    description: 'Conceptual digital artwork exploring abstract ideas and visual concepts'
  },
  {
    id: 12,
    title: '3D Architectural Render',
    category: 'Digital Art',
    image: 'https://static.readdy.ai/image/c26c58cf585cdf583dbecd6bbd7d68e5/90ecfd4c33e0f08cfa577877895d7162.png',
    description: 'Professional 3D architectural visualization with modern design elements and realistic lighting'
  },
  {
    id: 35,
    title: 'Interactive Dashboard Application',
    category: 'Software Projects',
    image: 'https://readdy.ai/api/search-image?query=Modern%20interactive%20dashboard%20application%20interface%20with%20dark%20theme%20showing%20data%20visualization%20charts%20graphs%20and%20user%20interface%20elements%20sleek%20professional%20software%20development%20project%20clean%20minimalist%20design%20with%20blue%20and%20white%20accent%20colors&width=800&height=600&seq=sw001&orientation=landscape',
    description: 'Interactive dashboard application featuring real-time data visualization and user interface components built with modern web technologies',
    demoUrl: 'https://calpoly-dxhub.slack.com/files/U091CQ69LKA/F09B8RUBA21/screen_recording_2025-08-20_at_1.33.48___pm.mov'
  },
];

const softwareProjects = [
  {
    id: 'unreal-engine',
    title: 'Unreal Engine Experiments',
    category: 'Software Projects',
    language: 'C++/Blueprint',
    description: "Learning Unreal Engine 5 by just building stuff in it — figuring out the engine architecture, blueprint scripting, and how to put together a scene that's actually interactive instead of just a static level.",
    image: 'https://img.youtube.com/vi/K4imcxkQPXI/maxresdefault.jpg',
    gradient: 'from-blue-500 to-purple-500',
    bgPattern: 'bg-blue-900/30',
    features: ['3D Environment Design', 'Blueprint Scripting', 'Physics Systems', 'Interactive Objects'],
    tech: ['Unreal Engine 5', 'C++', 'Blueprints', '3D Modeling'],
    videoUrl: 'https://youtube.com/shorts/K4imcxkQPXI',
    videoId: 'K4imcxkQPXI',
    isVideo: true,
    story: 'Always wanted to make games - finally taking the plunge'
  },
  {
    id: 'cci-unity',
    title: 'CCI - Unity Development',
    category: 'Software Projects',
    language: 'C#/Unity',
    description: 'Building Unity simulations at the California Cybersecurity Institute at Cal Poly — interactive tools used for actual cybersecurity training, not just a class project. First time working as part of a real dev team instead of solo.',
    image: 'https://img.youtube.com/vi/_bNoLPlwsYo/maxresdefault.jpg',
    gradient: 'from-purple-500 to-indigo-500',
    bgPattern: 'bg-purple-900/30',
    features: ['Interactive Simulations', 'Educational Tools', 'UI/UX Design', 'Team Collaboration'],
    tech: ['Unity', 'C#', 'Game Design', 'Cybersecurity'],
    videoUrl: 'https://youtu.be/_bNoLPlwsYo',
    videoId: '_bNoLPlwsYo',
    isVideo: true,
    story: 'Current work at Cal Poly - learning a ton from the team'
  },
  {
    id: 'audio-plugin-tool',
    title: 'Audio Plugin Tool',
    category: 'Software Projects',
    language: 'C++/JUCE',
    description: "A VST3 and standalone audio effects plugin built with JUCE — gain, filtering, tremolo, and a 16-band vocoder that tracks pitch in real time and can snap it to a musical key. There's also a tanh-based clipper so the output physically can't exceed 0 dBFS. Backed it with a full test suite that renders real audio through the plugin and checks the DSP math with FFT analysis, not just that the code runs.",
    image: '/images/audio-plugin-tool.png',
    gradient: 'from-teal-500 to-cyan-600',
    bgPattern: 'bg-teal-900/30',
    features: ['Real-Time Vocoder', 'Pitch Tracking', 'VST3 + Standalone', 'C++ & Python Test Suite'],
    tech: ['C++20', 'JUCE', 'CMake', 'Python'],
    githubUrl: 'https://github.com/zwaseem5/AudioPluginTool',
    isVideo: false,
    story: "Wanted to actually understand DSP instead of just using someone else's plugin"
  }
];

// Existing code: component implementation continues
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSoftwareProject, setSelectedSoftwareProject] = useState(null);
  const [showDemo, setShowDemo] = useState(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const openSoftwareModal = (project) => {
    setSelectedSoftwareProject(project);
  };

  const closeSoftwareModal = () => {
    setSelectedSoftwareProject(null);
  };

  const openDemo = (projectId) => {
    setShowDemo(projectId);
  };

  const closeDemo = () => {
    setShowDemo(null);
  };

  // If showing a demo, render the demo component
  if (showDemo) {
    const project = liveDemos.find(p => p.id === showDemo);
    if (project && project.component) {
      const DemoComponent = project.component;
      return (
        <div className="relative">
          <button
            onClick={closeDemo}
            className="fixed top-6 left-6 z-50 w-12 h-12 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20"
          >
            <i className="ri-close-line text-white text-xl"></i>
          </button>
          <DemoComponent />
        </div>
      );
    }
  }

  const renderLiveDemos = () => {
    if (selectedCategory !== 'Software Live Demos' && selectedCategory !== 'All') return null;
    
    return (
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Software Live Demos
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Interactive demos of projects I've built during my studies. Click to try them out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {liveDemos.map((project) => (
            <div 
              key={project.id} 
              className={`group cursor-pointer relative overflow-hidden rounded-2xl ${project.bgPattern} border border-gray-600/50 hover:border-gray-400/50 transition-all duration-300 hover:scale-[1.02] transform bg-gradient-to-br from-gray-800/50 to-gray-900/50`}
              onClick={() => openDemo(project.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-sm font-medium rounded-full`}>
                    {project.language}
                  </span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                    <i className="ri-play-line text-white text-sm"></i>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400 italic">
                    "{project.story}"
                  </div>
                  <button className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 transform whitespace-nowrap`}>
                    Try Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSoftwareProjects = () => {
    if (selectedCategory !== 'Software Projects' && selectedCategory !== 'All') return null;
    
    return (
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Software Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ongoing projects and experiments I'm working on
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {softwareProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => openSoftwareModal(project)}>
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-900 border-2 border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-contain object-center transition-opacity duration-500 ${project.isVideo ? 'group-hover:opacity-0' : ''}`}
                  />
                  {project.isVideo && (
                    <iframe
                      src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}`}
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs rounded-full font-medium">
                    {project.category}
                  </span>
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-block px-3 py-1 bg-white text-black text-xs rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ri-play-line mr-1"></i>
                      Watch Full Video
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-block px-3 py-1 bg-white text-black text-xs rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ri-github-line mr-1"></i>
                      View on GitHub
                    </a>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.isVideo ? (
                    <>
                      <i className="ri-play-circle-line mr-1"></i>
                      Hover to Preview
                    </>
                  ) : (
                    <>
                      <i className="ri-code-line mr-1"></i>
                      View Details
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-2">
                <h3 className="text-xl font-bold text-white group-hover:text-red-600 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                <div className="text-xs text-gray-400 italic">
                  "{project.story}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            My Portfolio
          </h1>
          <p className="text-gray-300 text-lg">
            A collection of my creative work and technical projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-8 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105 transform overflow-hidden ${
                selectedCategory === category
                  ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/25'
                  : 'bg-black text-white border-white hover:border-red-600 hover:text-red-600'
              }`}
            >
              <span className="relative z-10 font-medium">
                {category}
              </span>
              {selectedCategory !== category && (
                <div className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              )}
              {selectedCategory !== category && (
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {category}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Live Demos Section */}
        {renderLiveDemos()}

        {/* Software Projects Section */}
        {renderSoftwareProjects()}

        {/* Regular Projects Grid */}
        {(selectedCategory === 'All' || (selectedCategory !== 'Software Projects' && selectedCategory !== 'Software Live Demos')) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {filteredProjects.filter(p => p.category !== 'Software Projects' && p.category !== 'Live Demos').map((project) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => openProjectModal(project)}>
                <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-900 border-2 border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {project.isVideo ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full object-contain object-center group-hover:opacity-0 transition-opacity duration-500 ${project.rotation || ''}`}
                        />
                        <iframe
                          src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}`}
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-500 ${project.rotation || ''}`}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs rounded-full font-medium">
                      {project.category}
                    </span>
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-block px-3 py-1 bg-white text-black text-xs rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="ri-external-link-line mr-1"></i>
                        Open in YouTube
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-block px-3 py-1 bg-white text-black text-xs rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="ri-external-link-line mr-1"></i>
                        View Demo
                      </a>
                    )}
                  </div>
                  {project.isVideo && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="ri-play-circle-line mr-1"></i>
                      Hover to Preview
                    </div>
                  )}
                  {project.demoUrl && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="ri-code-line mr-1"></i>
                      Interactive Demo
                    </div>
                  )}
                </div>
                <div className="space-y-2 px-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-600 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Software Project Modal */}
      {selectedSoftwareProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeSoftwareModal}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-red-600 rounded-full transition-all duration-300 cursor-pointer"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>
              
              <div className="relative h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedSoftwareProject.image}
                  alt={selectedSoftwareProject.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedSoftwareProject.gradient} opacity-30`}></div>
                <div className="absolute bottom-6 left-6">
                  <span className={`px-4 py-2 bg-gradient-to-r ${selectedSoftwareProject.gradient} text-white text-lg font-bold rounded-full shadow-lg`}>
                    {selectedSoftwareProject.language}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-4xl font-bold text-white mb-6">
                  {selectedSoftwareProject.title}
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedSoftwareProject.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <i className="ri-star-line mr-2 text-yellow-400"></i>
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {selectedSoftwareProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-2 h-2 bg-gradient-to-r ${selectedSoftwareProject.gradient} rounded-full mr-3`}></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <i className="ri-code-line mr-2 text-blue-400"></i>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedSoftwareProject.tech.map((tech, index) => (
                        <span key={index} className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={closeSoftwareModal}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap"
                  >
                    Close
                  </button>
                  {selectedSoftwareProject.videoUrl && selectedSoftwareProject.videoUrl !== 'PLACEHOLDER_FOR_VIDEO_URL' && (
                    <a
                      href={selectedSoftwareProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 bg-gradient-to-r ${selectedSoftwareProject.gradient} text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap hover:scale-105 transform`}
                    >
                      <i className="ri-video-line mr-2"></i>
                      Watch Video
                    </a>
                  )}
                  {selectedSoftwareProject.githubUrl && (
                    <a
                      href={selectedSoftwareProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 bg-gradient-to-r ${selectedSoftwareProject.gradient} text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap hover:scale-105 transform`}
                    >
                      <i className="ri-github-line mr-2"></i>
                      View on GitHub
                    </a>
                  )}
                  <a
                    href="/contact"
                    className={`px-6 py-3 bg-gradient-to-r ${selectedSoftwareProject.gradient} text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap hover:scale-105 transform`}
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Discuss Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-red-600 rounded-full transition-all duration-300 cursor-pointer"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>
              
              <div className="aspect-[16/9] overflow-hidden rounded-t-2xl relative">
                {selectedProject.isVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&controls=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className={`w-full h-full object-contain object-center ${selectedProject.rotation || ''}`}
                  />
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-2 bg-red-600 text-white text-sm rounded-full font-medium">
                    {selectedProject.category}
                  </span>
                  {selectedProject.videoUrl && (
                    <a
                      href={selectedProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer font-medium whitespace-nowrap"
                    >
                      <i className="ri-external-link-line mr-2"></i>
                      Open in YouTube
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer font-medium whitespace-nowrap"
                    >
                      <i className="ri-external-link-line mr-2"></i>
                      View Demo
                    </a>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={closeProjectModal}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-6 text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap"
                  >
                    Close
                  </button>
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 cursor-pointer font-medium whitespace-nowrap"
                  >
                    <i className="ri-mail- line mr-2"></i>
                    Discuss Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
