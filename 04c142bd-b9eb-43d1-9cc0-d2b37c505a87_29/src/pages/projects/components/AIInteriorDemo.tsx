
import { useState } from 'react';

export default function AIInteriorDemo() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoom, setGeneratedRoom] = useState(null);
  const [roomHistory, setRoomHistory] = useState([]);

  const samplePrompts = [
    "Modern minimalist living room with white walls and natural lighting",
    "Cozy bedroom with warm colors and reading nook",
    "Industrial style kitchen with exposed brick and steel appliances",
    "Scandinavian dining room with wooden furniture and plants",
    "Bohemian home office with colorful textiles and vintage decor"
  ];

  const generateRoom = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newRoom = {
        id: Date.now(),
        prompt: prompt,
        image: `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28prompt%20%20%20%20interior%20design%20room%20layout%20professional%20photography%29%7D&width=600&height=400&seq=${Date.now()}&orientation=landscape`,
        style: extractStyle(prompt),
        colors: extractColors(prompt),
        furniture: extractFurniture(prompt),
        timestamp: new Date()
      };
      
      setGeneratedRoom(newRoom);
      setRoomHistory(prev => [newRoom, ...prev.slice(0, 4)]);
      setIsGenerating(false);
    }, 2500);
  };

  const extractStyle = (prompt) => {
    const styles = ['modern', 'minimalist', 'industrial', 'scandinavian', 'bohemian', 'traditional', 'contemporary'];
    const found = styles.find(style => prompt.toLowerCase().includes(style));
    return found || 'contemporary';
  };

  const extractColors = (prompt) => {
    const colors = ['white', 'black', 'gray', 'blue', 'green', 'red', 'yellow', 'brown', 'beige'];
    return colors.filter(color => prompt.toLowerCase().includes(color));
  };

  const extractFurniture = (prompt) => {
    const furniture = ['sofa', 'chair', 'table', 'bed', 'desk', 'bookshelf', 'cabinet', 'lamp'];
    return furniture.filter(item => prompt.toLowerCase().includes(item));
  };

  const useSamplePrompt = (sample) => {
    setPrompt(sample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            AI Room Designer
          </h1>
          <p className="text-gray-300">Describe your dream room and watch AI bring it to life</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-teal-300">Describe Your Room</h3>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the room you want to create... (e.g., 'Modern living room with large windows, comfortable seating, and plants')"
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white resize-none focus:border-teal-400 focus:outline-none"
                />
                
                <button
                  onClick={generateRoom}
                  disabled={!prompt.trim() || isGenerating}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Generating Room...
                    </>
                  ) : (
                    <>
                      <i className="ri-magic-line mr-2"></i>
                      Generate Room Design
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Room */}
            {generatedRoom && (
              <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={generatedRoom.image}
                    alt="Generated Room"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Generated Design</h3>
                    <p className="text-gray-300 text-sm">{generatedRoom.prompt}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-teal-300 mb-2">Style</h4>
                      <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm capitalize">
                        {generatedRoom.style}
                      </span>
                    </div>
                    
                    {generatedRoom.colors.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-teal-300 mb-2">Colors</h4>
                        <div className="flex flex-wrap gap-1">
                          {generatedRoom.colors.map((color, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs capitalize">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {generatedRoom.furniture.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-teal-300 mb-2">Furniture</h4>
                        <div className="flex flex-wrap gap-1">
                          {generatedRoom.furniture.map((item, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs capitalize">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sample Prompts */}
            <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-teal-300">Sample Prompts</h3>
              <div className="space-y-2">
                {samplePrompts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => useSamplePrompt(sample)}
                    className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 text-sm text-gray-300 hover:text-white"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Generations */}
            {roomHistory.length > 0 && (
              <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-teal-300">Recent Designs</h3>
                <div className="space-y-3">
                  {roomHistory.map((room) => (
                    <div
                      key={room.id}
                      className="bg-gray-800/50 rounded-lg p-3 cursor-pointer hover:bg-gray-700/50 transition-all duration-300"
                      onClick={() => setGeneratedRoom(room)}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={room.image}
                          alt="Room thumbnail"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{room.prompt}</p>
                          <p className="text-xs text-gray-400">
                            {room.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-teal-300">Tips for Better Results</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Be specific about colors, materials, and furniture</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Mention lighting preferences (natural, warm, bright)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Include room size or layout details</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Specify the room's primary function</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-sm border border-teal-500/50 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <i className="ri-brain-line text-teal-400 text-xl animate-pulse"></i>
              <div>
                <div className="text-sm font-medium text-white">AI is designing your room</div>
                <div className="text-xs text-gray-400">Analyzing prompt and generating layout...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
