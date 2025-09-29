
import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
}

export default function WeatherAppDemo() {
  const [selectedCity, setSelectedCity] = useState('San Francisco');
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'San Francisco, CA',
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    pressure: 30.15,
    icon: 'ri-cloudy-line',
    forecast: [
      { day: 'Today', high: 75, low: 62, condition: 'Partly Cloudy', icon: 'ri-cloudy-line' },
      { day: 'Tomorrow', high: 78, low: 64, condition: 'Sunny', icon: 'ri-sun-line' },
      { day: 'Wednesday', high: 73, low: 59, condition: 'Rainy', icon: 'ri-rainy-line' },
      { day: 'Thursday', high: 69, low: 56, condition: 'Cloudy', icon: 'ri-cloudy-2-line' },
      { day: 'Friday', high: 76, low: 61, condition: 'Sunny', icon: 'ri-sun-line' },
      { day: 'Saturday', high: 80, low: 65, condition: 'Sunny', icon: 'ri-sun-line' },
      { day: 'Sunday', high: 77, low: 63, condition: 'Partly Cloudy', icon: 'ri-cloudy-line' }
    ]
  });

  const cities = {
    'San Francisco': {
      location: 'San Francisco, CA',
      temperature: 72,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      pressure: 30.15,
      icon: 'ri-cloudy-line'
    },
    'New York': {
      location: 'New York, NY',
      temperature: 68,
      condition: 'Rainy',
      humidity: 78,
      windSpeed: 8,
      pressure: 29.92,
      icon: 'ri-rainy-line'
    },
    'Los Angeles': {
      location: 'Los Angeles, CA',
      temperature: 85,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 6,
      pressure: 30.25,
      icon: 'ri-sun-line'
    },
    'Chicago': {
      location: 'Chicago, IL',
      temperature: 58,
      condition: 'Cloudy',
      humidity: 72,
      windSpeed: 15,
      pressure: 29.85,
      icon: 'ri-cloudy-2-line'
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cityData = cities[selectedCity as keyof typeof cities];
    if (cityData) {
      setWeatherData(prev => ({
        ...prev,
        ...cityData
      }));
    }
  }, [selectedCity]);

  const getBackgroundGradient = () => {
    switch (weatherData.condition) {
      case 'Sunny':
        return 'from-yellow-400 via-orange-500 to-pink-500';
      case 'Rainy':
        return 'from-gray-600 via-blue-700 to-purple-800';
      case 'Cloudy':
        return 'from-gray-500 via-gray-600 to-gray-700';
      default:
        return 'from-purple-500 via-pink-500 to-rose-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} text-white p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            WeatherFlow Dashboard
          </h1>
          <p className="text-white/80">Beautiful weather with real-time updates</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Weather Card */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{weatherData.location}</h2>
                <p className="text-white/70">{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className="text-white/70">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold mb-2">{weatherData.temperature}°</div>
                <div className="text-xl text-white/80">{weatherData.condition}</div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <i className={`${weatherData.icon} text-8xl text-white/80`}></i>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <i className="ri-drop-line text-2xl text-blue-300 mb-2"></i>
                <div className="text-sm text-white/70">Humidity</div>
                <div className="text-xl font-bold">{weatherData.humidity}%</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <i className="ri-windy-line text-2xl text-green-300 mb-2"></i>
                <div className="text-sm text-white/70">Wind Speed</div>
                <div className="text-xl font-bold">{weatherData.windSpeed} mph</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <i className="ri-dashboard-line text-2xl text-purple-300 mb-2"></i>
                <div className="text-sm text-white/70">Pressure</div>
                <div className="text-xl font-bold">{weatherData.pressure}"</div>
              </div>
            </div>
          </div>

          {/* City Selector & Controls */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">Select Location</h3>
              <div className="space-y-2">
                {Object.keys(cities).map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedCity === city
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{city}</span>
                      <span className="text-sm">{cities[city as keyof typeof cities].temperature}°</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">Weather Map</h3>
              <div className="bg-white/5 rounded-2xl p-4 h-48 flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-map-2-line text-4xl text-white/50 mb-2"></i>
                  <p className="text-white/70 text-sm">Interactive weather map</p>
                  <p className="text-white/50 text-xs">Radar & satellite view</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-6">7-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-sm font-medium text-white/80 mb-2">{day.day}</div>
                <i className={`${day.icon} text-3xl text-white/80 mb-3`}></i>
                <div className="text-xs text-white/70 mb-2">{day.condition}</div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{day.high}°</span>
                  <span className="text-white/70">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-4">Air Quality Index</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/80">Current AQI</span>
              <span className="text-2xl font-bold text-green-400">42</span>
            </div>
            <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-full w-2/5"></div>
            </div>
            <p className="text-sm text-white/70">Good - Air quality is satisfactory</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-4">UV Index</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/80">Current UV</span>
              <span className="text-2xl font-bold text-orange-400">6</span>
            </div>
            <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full w-3/5"></div>
            </div>
            <p className="text-sm text-white/70">High - Seek shade during midday hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
