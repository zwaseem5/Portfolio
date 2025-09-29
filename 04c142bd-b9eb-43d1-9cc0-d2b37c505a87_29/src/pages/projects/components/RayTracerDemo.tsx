
import { useState, useEffect, useRef } from 'react';

interface RayTracingSettings {
  sphereCount: number;
  lightIntensity: number;
  reflectionDepth: number;
  antiAliasing: boolean;
  shadows: boolean;
  reflections: boolean;
}

export default function RayTracerDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [settings, setSettings] = useState<RayTracingSettings>({
    sphereCount: 3,
    lightIntensity: 0.8,
    reflectionDepth: 3,
    antiAliasing: true,
    shadows: true,
    reflections: true
  });
  const [renderTime, setRenderTime] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('metal');

  const materials = {
    metal: { color: '#C0C0C0', reflectivity: 0.9, roughness: 0.1 },
    glass: { color: '#E6F3FF', reflectivity: 0.95, roughness: 0.0 },
    plastic: { color: '#FF6B6B', reflectivity: 0.3, roughness: 0.7 },
    marble: { color: '#F8F8FF', reflectivity: 0.6, roughness: 0.3 },
    gold: { color: '#FFD700', reflectivity: 0.8, roughness: 0.2 }
  };

  const generateSpheres = (count: number) => {
    const spheres = [];
    const materialKeys = Object.keys(materials);
    
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      const radius = 150 + i * 30;
      const centerX = 400;
      const centerY = 300;
      
      spheres.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius: 40 + (i * 10),
        material: materialKeys[i % materialKeys.length],
        id: i
      });
    }
    
    return spheres;
  };

  const drawScene = (ctx: CanvasRenderingContext2D, progress: number = 100) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Generate spheres based on current count
    const spheres = generateSpheres(settings.sphereCount);
    
    // Draw spheres with ray tracing effect
    spheres.forEach((sphere, index) => {
      const material = materials[sphere.material as keyof typeof materials];
      
      // Main sphere with enhanced rendering
      const sphereGradient = ctx.createRadialGradient(
        sphere.x - sphere.radius * 0.3, 
        sphere.y - sphere.radius * 0.3, 
        0,
        sphere.x, 
        sphere.y, 
        sphere.radius
      );
      
      if (settings.reflections) {
        sphereGradient.addColorStop(0, `${material.color}FF`);
        sphereGradient.addColorStop(0.4, `${material.color}DD`);
        sphereGradient.addColorStop(0.8, `${material.color}88`);
        sphereGradient.addColorStop(1, `${material.color}33`);
      } else {
        sphereGradient.addColorStop(0, material.color);
        sphereGradient.addColorStop(0.7, '#666');
        sphereGradient.addColorStop(1, '#333');
      }
      
      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Enhanced reflection highlight
      if (settings.reflections) {
        const highlightIntensity = material.reflectivity * settings.lightIntensity;
        ctx.fillStyle = `rgba(255, 255, 255, ${highlightIntensity * 0.8})`;
        ctx.beginPath();
        ctx.arc(
          sphere.x - sphere.radius * 0.4, 
          sphere.y - sphere.radius * 0.4, 
          sphere.radius * 0.25, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Secondary highlight for glass-like materials
        if (material.reflectivity > 0.9) {
          ctx.fillStyle = `rgba(255, 255, 255, ${highlightIntensity * 0.4})`;
          ctx.beginPath();
          ctx.arc(
            sphere.x + sphere.radius * 0.2, 
            sphere.y - sphere.radius * 0.2, 
            sphere.radius * 0.15, 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      
      // Enhanced shadow system
      if (settings.shadows) {
        const shadowDistance = 40 + (index * 10);
        const shadowOpacity = 0.4 * settings.lightIntensity;
        
        const shadowGradient = ctx.createRadialGradient(
          sphere.x + shadowDistance, 
          sphere.y + sphere.radius + shadowDistance, 
          0,
          sphere.x + shadowDistance, 
          sphere.y + sphere.radius + shadowDistance, 
          sphere.radius * 1.8
        );
        
        shadowGradient.addColorStop(0, `rgba(0, 0, 0, ${shadowOpacity})`);
        shadowGradient.addColorStop(0.5, `rgba(0, 0, 0, ${shadowOpacity * 0.5})`);
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.ellipse(
          sphere.x + shadowDistance, 
          sphere.y + sphere.radius + shadowDistance, 
          sphere.radius * 1.2, 
          sphere.radius * 0.4, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
      
      // Inter-reflections between spheres
      if (settings.reflections && settings.reflectionDepth > 1) {
        spheres.forEach((otherSphere, otherIndex) => {
          if (otherIndex !== index) {
            const dx = otherSphere.x - sphere.x;
            const dy = otherSphere.y - sphere.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < sphere.radius + otherSphere.radius + 100) {
              const reflectionStrength = (1 - distance / 300) * material.reflectivity * 0.3;
              const otherMaterial = materials[otherSphere.material as keyof typeof materials];
              
              ctx.fillStyle = `${otherMaterial.color}${Math.floor(reflectionStrength * 255).toString(16).padStart(2, '0')}`;
              ctx.beginPath();
              ctx.arc(
                sphere.x + dx * 0.1, 
                sphere.y + dy * 0.1, 
                sphere.radius * 0.8, 
                0, 
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        });
      }
    });
    
    // Enhanced light source
    const lightX = width * 0.2;
    const lightY = height * 0.2;
    const lightRadius = 20 * settings.lightIntensity;
    
    const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius * 2);
    lightGradient.addColorStop(0, `rgba(255, 255, 200, ${settings.lightIntensity})`);
    lightGradient.addColorStop(0.5, `rgba(255, 255, 200, ${settings.lightIntensity * 0.5})`);
    lightGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
    
    ctx.fillStyle = lightGradient;
    ctx.beginPath();
    ctx.arc(lightX, lightY, lightRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced light rays
    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI * 2) / rayCount;
      const rayLength = 60 * settings.lightIntensity;
      const x1 = lightX + Math.cos(angle) * lightRadius;
      const y1 = lightY + Math.sin(angle) * lightRadius;
      const x2 = lightX + Math.cos(angle) * rayLength;
      const y2 = lightY + Math.sin(angle) * rayLength;
      
      const rayGradient = ctx.createLinearGradient(x1, y1, x2, y2);
      rayGradient.addColorStop(0, `rgba(255, 255, 200, ${settings.lightIntensity * 0.8})`);
      rayGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      
      ctx.strokeStyle = rayGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // Anti-aliasing effect
    if (settings.antiAliasing && progress === 100) {
      ctx.filter = 'blur(0.5px)';
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(ctx.canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Render progress overlay
    if (progress < 100) {
      const scanlineY = (height * progress) / 100;
      
      // Scanning line
      const scanGradient = ctx.createLinearGradient(0, scanlineY - 2, 0, scanlineY + 2);
      scanGradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
      scanGradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.8)');
      scanGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanlineY - 2, width, 4);
      
      // Noise effect for unrendered area
      if (progress < 100) {
        const imageData = ctx.getImageData(0, scanlineY, width, height - scanlineY);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() > 0.85) {
            const noise = Math.random() * 100;
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = 30;    // Alpha
          }
        }
        
        ctx.putImageData(imageData, 0, scanlineY);
      }
    }
  };

  const startRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    const startTime = Date.now();
    
    const renderInterval = setInterval(() => {
      setRenderProgress(prev => {
        const increment = Math.max(1, 100 / (settings.sphereCount * 10 + settings.reflectionDepth * 5));
        const newProgress = Math.min(prev + increment, 100);
        
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            drawScene(ctx, newProgress);
          }
        }
        
        if (newProgress >= 100) {
          clearInterval(renderInterval);
          setIsRendering(false);
          setRenderTime(Date.now() - startTime);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawScene(ctx, 100);
      }
    }
  }, [settings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-yellow-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            RayTrace Engine
          </h1>
          <p className="text-gray-300">High-performance ray tracing with realistic lighting and materials</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Render Viewport */}
          <div className="lg:col-span-3 bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-300">Render Viewport</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  {renderTime > 0 && `Render time: ${renderTime}ms`}
                </span>
                <span className="text-sm text-gray-400">
                  Spheres: {settings.sphereCount}
                </span>
                <button
                  onClick={startRender}
                  disabled={isRendering}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    isRendering
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500'
                  }`}
                >
                  {isRendering ? 'Rendering...' : 'Start Render'}
                </button>
              </div>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto border border-gray-700"
              />
              
              {isRendering && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">Rendering Progress</span>
                      <span className="text-sm text-white">{Math.round(renderProgress)}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-yellow-500 h-full transition-all duration-300"
                        style={{ width: `${renderProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Render Settings */}
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-red-300">Render Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sphere Count</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={settings.sphereCount}
                    onChange={(e) => setSettings(prev => ({...prev, sphereCount: parseInt(e.target.value)}))}
                    className="w-full"
                  />
                  <span className="text-sm text-white">{settings.sphereCount}</span>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Light Intensity</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={settings.lightIntensity}
                    onChange={(e) => setSettings(prev => ({...prev, lightIntensity: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                  <span className="text-sm text-white">{settings.lightIntensity}</span>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Reflection Depth</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={settings.reflectionDepth}
                    onChange={(e) => setSettings(prev => ({...prev, reflectionDepth: parseInt(e.target.value)}))}
                    className="w-full"
                  />
                  <span className="text-sm text-white">{settings.reflectionDepth}</span>
                </div>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-red-300">Features</h3>
              
              <div className="space-y-3">
                {[
                  { key: 'antiAliasing', label: 'Anti-aliasing' },
                  { key: 'shadows', label: 'Shadows' },
                  { key: 'reflections', label: 'Reflections' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[key as keyof RayTracingSettings] as boolean}
                      onChange={(e) => setSettings(prev => ({...prev, [key]: e.target.checked}))}
                      className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-white">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Library */}
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-red-300">Materials</h3>
              
              <div className="space-y-2">
                {Object.entries(materials).map(([name, material]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedMaterial(name)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedMaterial === name
                        ? 'bg-red-500/30 border border-red-500/50'
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-600"
                        style={{ backgroundColor: material.color }}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-white capitalize">{name}</div>
                        <div className="text-xs text-gray-400">
                          Reflectivity: {material.reflectivity}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-red-300">Performance</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white">800x600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Samples/Pixel:</span>
                  <span className="text-white">{settings.antiAliasing ? '4x' : '1x'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ray Bounces:</span>
                  <span className="text-white">{settings.reflectionDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Objects:</span>
                  <span className="text-white">{settings.sphereCount} spheres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Render:</span>
                  <span className="text-white">{renderTime}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
