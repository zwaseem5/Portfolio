import { useState } from 'react';

export default function AseelCateringDemo() {
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const menuCategories = {
    appetizers: {
      name: 'Appetizers',
      icon: 'ri-restaurant-line',
      items: [
        { id: 1, name: 'Hummus with Pita', price: 12, description: 'Creamy chickpea dip with fresh pita bread', image: 'https://readdy.ai/api/search-image?query=Traditional%20Middle%20Eastern%20hummus%20with%20pita%20bread%20olive%20oil%20and%20paprika%20garnish%20authentic%20Palestinian%20Lebanese%20appetizer%20food%20photography&width=300&height=200&seq=hum001&orientation=landscape' },
        { id: 2, name: 'Baba Ganoush', price: 14, description: 'Smoky roasted eggplant dip with tahini', image: 'https://readdy.ai/api/search-image?query=Traditional%20baba%20ganoush%20Middle%20Eastern%20eggplant%20dip%20with%20olive%20oil%20and%20herbs%20authentic%20Palestinian%20Lebanese%20appetizer%20food%20photography&width=300&height=200&seq=bab001&orientation=landscape' },
        { id: 3, name: 'Fattoush Salad', price: 16, description: 'Mixed greens with crispy pita chips and sumac dressing', image: 'https://readdy.ai/api/search-image?query=Fresh%20fattoush%20salad%20with%20mixed%20greens%20pita%20chips%20sumac%20dressing%20Middle%20Eastern%20Palestinian%20Lebanese%20cuisine%20food%20photography&width=300&height=200&seq=fat001&orientation=landscape' },
        { id: 4, name: 'Kibbeh', price: 18, description: 'Fried bulgur and meat croquettes with pine nuts', image: 'https://readdy.ai/api/search-image?query=Traditional%20kibbeh%20Middle%20Eastern%20fried%20bulgur%20meat%20croquettes%20authentic%20Palestinian%20Lebanese%20appetizer%20food%20photography&width=300&height=200&seq=kib001&orientation=landscape' }
      ]
    },
    mains: {
      name: 'Main Dishes',
      icon: 'ri-bowl-line',
      items: [
        { id: 5, name: 'Mansaf', price: 28, description: 'Traditional Jordanian lamb with yogurt sauce over rice', image: 'https://readdy.ai/api/search-image?query=Traditional%20mansaf%20Jordanian%20lamb%20dish%20with%20yogurt%20sauce%20jameed%20over%20rice%20Middle%20Eastern%20Palestinian%20cuisine%20food%20photography&width=300&height=200&seq=man001&orientation=landscape' },
        { id: 6, name: 'Maqluba', price: 26, description: 'Upside-down rice dish with chicken and vegetables', image: 'https://readdy.ai/api/search-image?query=Traditional%20maqluba%20upside%20down%20rice%20dish%20with%20chicken%20vegetables%20Middle%20Eastern%20Palestinian%20Lebanese%20cuisine%20food%20photography&width=300&height=200&seq=maq001&orientation=landscape' },
        { id: 7, name: 'Shawarma Platter', price: 22, description: 'Marinated chicken or lamb with garlic sauce and vegetables', image: 'https://readdy.ai/api/search-image?query=Middle%20Eastern%20shawarma%20platter%20with%20marinated%20meat%20garlic%20sauce%20vegetables%20authentic%20Palestinian%20Lebanese%20cuisine%20food%20photography&width=300&height=200&seq=sha001&orientation=landscape' },
        { id: 8, name: 'Stuffed Grape Leaves', price: 20, description: 'Dolma filled with rice, herbs, and spices', image: 'https://readdy.ai/api/search-image?query=Stuffed%20grape%20leaves%20dolma%20with%20rice%20herbs%20Middle%20Eastern%20Palestinian%20Lebanese%20cuisine%20traditional%20food%20photography&width=300&height=200&seq=dol001&orientation=landscape' }
      ]
    },
    desserts: {
      name: 'Desserts',
      icon: 'ri-cake-3-line',
      items: [
        { id: 9, name: 'Baklava', price: 8, description: 'Layered phyllo pastry with nuts and honey', image: 'https://readdy.ai/api/search-image?query=Traditional%20baklava%20Middle%20Eastern%20phyllo%20pastry%20with%20nuts%20honey%20syrup%20authentic%20Palestinian%20Lebanese%20dessert%20food%20photography&width=300&height=200&seq=bak001&orientation=landscape' },
        { id: 10, name: 'Knafeh', price: 10, description: 'Sweet cheese pastry with crispy shredded phyllo', image: 'https://readdy.ai/api/search-image?query=Traditional%20knafeh%20Middle%20Eastern%20sweet%20cheese%20pastry%20with%20shredded%20phyllo%20orange%20syrup%20Palestinian%20dessert%20food%20photography&width=300&height=200&seq=kna001&orientation=landscape' },
        { id: 11, name: 'Maamoul', price: 6, description: 'Date-filled semolina cookies with powdered sugar', image: 'https://readdy.ai/api/search-image?query=Traditional%20maamoul%20Middle%20Eastern%20date%20filled%20semolina%20cookies%20powdered%20sugar%20Palestinian%20Lebanese%20dessert%20food%20photography&width=300&height=200&seq=maa001&orientation=landscape' },
        { id: 12, name: 'Muhallabia', price: 7, description: 'Creamy milk pudding with rose water and pistachios', image: 'https://readdy.ai/api/search-image?query=Traditional%20muhallabia%20Middle%20Eastern%20milk%20pudding%20with%20rose%20water%20pistachios%20authentic%20Palestinian%20Lebanese%20dessert%20food%20photography&width=300&height=200&seq=muh001&orientation=landscape' }
      ]
    }
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <i className="ri-restaurant-2-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Aseel Catering
                </h1>
                <p className="text-sm text-gray-300">Authentic Middle Eastern Cuisine</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCart(true)}
              className="relative px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 font-semibold whitespace-nowrap"
            >
              <i className="ri-shopping-cart-line mr-2"></i>
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Taste the Authentic Flavors of the Middle East
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the rich culinary traditions of Palestine and Lebanon with our carefully crafted dishes, 
            made from family recipes passed down through generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-black/30 rounded-full border border-orange-500/30">
              <i className="ri-award-line text-orange-400 mr-2"></i>
              Family Recipes
            </div>
            <div className="px-6 py-3 bg-black/30 rounded-full border border-orange-500/30">
              <i className="ri-leaf-line text-green-400 mr-2"></i>
              Fresh Ingredients
            </div>
            <div className="px-6 py-3 bg-black/30 rounded-full border border-orange-500/30">
              <i className="ri-truck-line text-blue-400 mr-2"></i>
              Catering Services
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Our Menu</h3>
            <p className="text-gray-300 text-lg">Discover our selection of traditional Middle Eastern dishes</p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-2">
              <div className="flex space-x-2">
                {Object.entries(menuCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold whitespace-nowrap ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <i className={`${category.icon} mr-2`}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuCategories[selectedCategory].items.map((item) => (
              <div key={item.id} className="bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-2xl overflow-hidden hover:border-orange-400/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-white">{item.name}</h4>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-400">${item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 font-semibold whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Our Services</h3>
            <p className="text-gray-300 text-lg">Perfect for any occasion</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Wedding Catering</h4>
              <p className="text-gray-300">Make your special day unforgettable with our authentic Middle Eastern feast</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-building-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Corporate Events</h4>
              <p className="text-gray-300">Impress your clients and colleagues with our professional catering services</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-home-heart-line text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Private Parties</h4>
              <p className="text-gray-300">Celebrate with family and friends with our delicious homestyle cooking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-orange-500/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Your Order</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-gray-400 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-shopping-cart-line text-6xl text-gray-400 mb-4"></i>
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{item.name}</h4>
                          <p className="text-gray-400 text-sm">${item.price} each</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <i className="ri-subtract-line text-white"></i>
                          </button>
                          <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <i className="ri-add-line text-white"></i>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-white">Total:</span>
                      <span className="text-2xl font-bold text-orange-400">${getTotalPrice()}</span>
                    </div>
                    
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-bold text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 whitespace-nowrap">
                      <i className="ri-phone-line mr-2"></i>
                      Place Order - Call (555) 123-4567
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/40 border-t border-orange-500/30 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <i className="ri-restaurant-2-line text-white"></i>
                </div>
                <h4 className="text-xl font-bold">Aseel Catering</h4>
              </div>
              <p className="text-gray-300 mb-4">
                Bringing the authentic flavors of Palestine and Lebanon to your table with love and tradition.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-orange-400"></i>
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-orange-400"></i>
                  <span>info@aseelcatering.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line text-orange-400"></i>
                  <span>123 Middle East Ave, City, State 12345</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Hours</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>12:00 PM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Aseel Catering. All rights reserved. | 
              <a href="https://readdy.ai/?origin=logo" className="text-orange-400 hover:text-orange-300 ml-1">
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}