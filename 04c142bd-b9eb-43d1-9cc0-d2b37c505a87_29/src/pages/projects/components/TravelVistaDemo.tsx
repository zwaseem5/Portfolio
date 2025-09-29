import { useState } from 'react';

export default function TravelVistaDemo() {
  const [selectedDestination, setSelectedDestination] = useState('europe');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const destinations = {
    europe: {
      name: 'European Adventures',
      icon: 'ri-building-line',
      packages: [
        { 
          id: 1, 
          name: 'Paris Romance', 
          price: 2499, 
          duration: '7 days', 
          description: 'Experience the city of love with luxury accommodations and guided tours of iconic landmarks',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Paris%20cityscape%20with%20Eiffel%20Tower%20romantic%20evening%20lighting%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=par001&orientation=landscape',
          highlights: ['Eiffel Tower Tour', 'Seine River Cruise', 'Louvre Museum', 'Luxury Hotel']
        },
        { 
          id: 2, 
          name: 'Italian Escape', 
          price: 2899, 
          duration: '10 days', 
          description: 'Discover the beauty of Italy from Rome to Venice with authentic cuisine and cultural experiences',
          image: 'https://readdy.ai/api/search-image?query=Stunning%20Italian%20countryside%20with%20rolling%20hills%20vineyards%20and%20historic%20architecture%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=ita001&orientation=landscape',
          highlights: ['Colosseum Visit', 'Tuscany Wine Tour', 'Gondola Ride', 'Cooking Classes']
        },
        { 
          id: 3, 
          name: 'Greek Islands', 
          price: 2199, 
          duration: '8 days', 
          description: 'Island hopping adventure through Santorini and Mykonos with stunning ocean views',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Greek%20islands%20with%20white%20buildings%20blue%20domes%20crystal%20clear%20waters%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=gre001&orientation=landscape',
          highlights: ['Santorini Sunset', 'Mykonos Beaches', 'Ancient Ruins', 'Island Hopping']
        }
      ]
    },
    asia: {
      name: 'Asian Wonders',
      icon: 'ri-ancient-gate-line',
      packages: [
        { 
          id: 4, 
          name: 'Japan Discovery', 
          price: 3299, 
          duration: '12 days', 
          description: 'From Tokyo\'s modern skyline to Kyoto\'s ancient temples, experience the best of Japan',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Japanese%20temple%20with%20cherry%20blossoms%20traditional%20architecture%20peaceful%20garden%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=jap001&orientation=landscape',
          highlights: ['Tokyo City Tour', 'Mount Fuji', 'Kyoto Temples', 'Traditional Ryokan']
        },
        { 
          id: 5, 
          name: 'Bali Paradise', 
          price: 1899, 
          duration: '9 days', 
          description: 'Tropical paradise with pristine beaches, lush rice terraces, and spiritual temples',
          image: 'https://readdy.ai/api/search-image?query=Stunning%20Bali%20rice%20terraces%20with%20lush%20green%20landscape%20tropical%20paradise%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=bal001&orientation=landscape',
          highlights: ['Beach Resorts', 'Rice Terraces', 'Temple Tours', 'Spa Treatments']
        },
        { 
          id: 6, 
          name: 'Thailand Adventure', 
          price: 2099, 
          duration: '11 days', 
          description: 'Explore bustling Bangkok, ancient temples, and pristine islands in the land of smiles',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Thai%20temple%20with%20golden%20architecture%20traditional%20Buddhist%20design%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=tha001&orientation=landscape',
          highlights: ['Bangkok Markets', 'Phi Phi Islands', 'Elephant Sanctuary', 'Thai Cooking']
        }
      ]
    },
    americas: {
      name: 'American Journeys',
      icon: 'ri-mountain-line',
      packages: [
        { 
          id: 7, 
          name: 'Costa Rica Nature', 
          price: 2399, 
          duration: '8 days', 
          description: 'Eco-adventure through rainforests, volcanoes, and pristine beaches with wildlife encounters',
          image: 'https://readdy.ai/api/search-image?query=Lush%20Costa%20Rica%20rainforest%20with%20exotic%20wildlife%20colorful%20birds%20tropical%20paradise%20luxury%20eco%20travel%20destination%20professional%20photography&width=400&height=300&seq=cos001&orientation=landscape',
          highlights: ['Rainforest Tours', 'Volcano Hiking', 'Wildlife Spotting', 'Beach Relaxation']
        },
        { 
          id: 8, 
          name: 'Peru Mystique', 
          price: 2799, 
          duration: '10 days', 
          description: 'Journey to Machu Picchu and explore the ancient Inca civilization with expert guides',
          image: 'https://readdy.ai/api/search-image?query=Majestic%20Machu%20Picchu%20ancient%20ruins%20with%20mountain%20backdrop%20mystical%20atmosphere%20luxury%20travel%20destination%20professional%20photography&width=400&height=300&seq=per001&orientation=landscape',
          highlights: ['Machu Picchu', 'Sacred Valley', 'Cusco City', 'Inca Trail']
        }
      ]
    }
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: 'Travel Vista made our European honeymoon absolutely perfect. Every detail was handled with care!',
      image: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20happy%20woman%20smiling%20customer%20testimonial%20portrait%20clean%20background&width=100&height=100&seq=test001&orientation=squarish'
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'The Japan tour exceeded all expectations. Incredible experiences and seamless organization.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20happy%20man%20smiling%20customer%20testimonial%20portrait%20clean%20background&width=100&height=100&seq=test002&orientation=squarish'
    },
    {
      name: 'Emily Rodriguez',
      location: 'Miami, FL',
      rating: 5,
      text: 'Costa Rica was a dream come true. Amazing wildlife and the guides were so knowledgeable!',
      image: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20happy%20woman%20smiling%20customer%20testimonial%20portrait%20clean%20background&width=100&height=100&seq=test003&orientation=squarish'
    }
  ];

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <i className="ri-plane-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Travel Vista
                </h1>
                <p className="text-sm text-gray-300">Discover Your Next Adventure</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowBooking(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all duration-300 font-semibold whitespace-nowrap"
            >
              <i className="ri-calendar-line mr-2"></i>
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Explore the World with Confidence
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover breathtaking destinations with our carefully curated travel packages. 
            From romantic getaways to adventure expeditions, we make your dream trips a reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-black/30 rounded-full border border-blue-500/30">
              <i className="ri-shield-check-line text-blue-400 mr-2"></i>
              Fully Insured
            </div>
            <div className="px-6 py-3 bg-black/30 rounded-full border border-blue-500/30">
              <i className="ri-customer-service-2-line text-green-400 mr-2"></i>
              24/7 Support
            </div>
            <div className="px-6 py-3 bg-black/30 rounded-full border border-blue-500/30">
              <i className="ri-star-line text-yellow-400 mr-2"></i>
              Expert Guides
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Popular Destinations</h3>
            <p className="text-gray-300 text-lg">Choose your perfect getaway from our curated selection</p>
          </div>

          {/* Destination Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-2">
              <div className="flex space-x-2">
                {Object.entries(destinations).map(([key, destination]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDestination(key)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold whitespace-nowrap ${
                      selectedDestination === key
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <i className={`${destination.icon} mr-2`}></i>
                    {destination.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Packages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations[selectedDestination].packages.map((pkg) => (
              <div key={pkg.id} className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:scale-105 transform">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-white">{pkg.name}</h4>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-blue-300 mb-2">Highlights:</h5>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-400">${pkg.price}</span>
                      <span className="text-gray-400 text-sm ml-1">per person</span>
                    </div>
                    <button
                      onClick={() => selectPackage(pkg)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all duration-300 font-semibold whitespace-nowrap"
                    >
                      <i className="ri-calendar-check-line mr-1"></i>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">What Our Travelers Say</h3>
            <p className="text-gray-300 text-lg">Real experiences from real adventurers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Why Choose Travel Vista</h3>
            <p className="text-gray-300 text-lg">Your journey matters to us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-2-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Expert Planning</h4>
              <p className="text-gray-300">Our travel experts craft personalized itineraries based on your preferences and budget</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">24/7 Support</h4>
              <p className="text-gray-300">Round-the-clock assistance wherever you are in the world, ensuring peace of mind</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Best Value</h4>
              <p className="text-gray-300">Competitive pricing with no hidden fees, plus exclusive deals with our partner hotels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-blue-500/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {selectedPackage ? `Book ${selectedPackage.name}` : 'Contact Us'}
                </h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-gray-400 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedPackage && (
                <div className="mb-6 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-white mb-2">{selectedPackage.name}</h4>
                  <p className="text-gray-300 text-sm mb-2">{selectedPackage.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-semibold">{selectedPackage.duration}</span>
                    <span className="text-2xl font-bold text-blue-400">${selectedPackage.price}</span>
                  </div>
                </div>
              )}

              <div className="text-center py-12">
                <i className="ri-phone-line text-6xl text-blue-400 mb-4"></i>
                <h4 className="text-xl font-bold text-white mb-4">Ready to Start Your Adventure?</h4>
                <p className="text-gray-300 mb-6">Call us to speak with a travel specialist and customize your perfect trip</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <i className="ri-phone-line text-blue-400"></i>
                    <span className="text-white font-semibold">(555) 987-6543</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="ri-mail-line text-blue-400"></i>
                    <span className="text-gray-300">info@travelvista.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="ri-time-line text-blue-400"></i>
                    <span className="text-gray-300">Mon-Fri 9AM-8PM, Sat-Sun 10AM-6PM</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBooking(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg font-semibold hover:from-blue-500 hover:to-teal-500 transition-all duration-300 whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/40 border-t border-blue-500/30 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <i className="ri-plane-line text-white"></i>
                </div>
                <h4 className="text-xl font-bold">Travel Vista</h4>
              </div>
              <p className="text-gray-300 mb-4">
                Creating unforgettable travel experiences with personalized service and expert guidance.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-blue-400"></i>
                  <span>(555) 987-6543</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-blue-400"></i>
                  <span>info@travelvista.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line text-blue-400"></i>
                  <span>456 Adventure Blvd, Travel City, TC 67890</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Office Hours</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Travel Vista. All rights reserved. | 
              <a href="https://readdy.ai/?origin=logo" className="text-blue-400 hover:text-blue-300 ml-1">
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}