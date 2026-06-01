'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFire, FaLeaf } from 'react-icons/fa';

// Menu Data - No images, only names and descriptions
const menuData = {
  breakfast: [
    { name: 'Idly', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Soft steamed rice cakes served with sambar and coconut chutney' },
    { name: 'Dosa', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Crispy fermented rice crepe served with sambar and chutney' },
    { name: 'Masala Dosa', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Crispy dosa filled with spiced potato masala' },
    { name: 'Rava Dosa', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Crispy semolina dosa with onions and pepper' },
    { name: 'Onion Dosa', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Dosa topped with caramelized onions' },
    { name: 'Ghee Roast Dosa', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Crispy dosa roasted with pure ghee' },
    { name: 'Pongal', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Traditional rice and lentil dish with pepper, ginger, and ghee' },
    { name: 'Poori Masala', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Deep-fried fluffy bread with potato masala' },
    { name: 'Uthappam', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Thick rice pancake with tomatoes, onions, and chillies' },
    { name: 'Vada', category: 'Veg', type: 'veg', meal: 'Breakfast', description: 'Crispy lentil donuts served with sambar and chutney' },
    { name: 'Egg Dosa', category: 'Non-Veg', type: 'nonveg', meal: 'Breakfast', description: 'Dosa topped with egg and spices' },
    { name: 'Egg Burji', category: 'Non-Veg', type: 'nonveg', meal: 'Breakfast', description: 'Scrambled eggs with onions, tomatoes, and spices' },
    { name: 'Omelette', category: 'Non-Veg', type: 'nonveg', meal: 'Breakfast', description: 'Plain or masala omelette served with bread' },
  ],
  lunchDinner: [
    { name: 'Steamed Rice', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Plain steamed white rice' },
    { name: 'Ghee Rice', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Aromatic rice cooked with ghee and whole spices' },
    { name: 'Jeera Rice', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Fragrant rice with cumin seeds' },
    { name: 'Fried Rice', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Indo-Chinese fried rice with vegetables' },
    { name: 'Egg Fried Rice', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Fried rice with egg and vegetables' },
    { name: 'Chicken Fried Rice', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Fried rice with shredded chicken' },
    { name: 'Parotta', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Layered flaky flatbread made from maida' },
    { name: 'Malabar Parotta', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Soft layered parotta from Malabar region' },
    { name: 'Kerala Parotta', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Authentic Kerala-style layered parotta' },
    { name: 'Roti', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Whole wheat flatbread' },
    { name: 'Butter Naan', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Tandoor-baked naan with butter' },
    { name: 'Garlic Naan', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Naan topped with fresh garlic and coriander' },
    { name: 'Chappathi', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Soft whole wheat flatbread' },
    { name: 'Dal Fry', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Tempered yellow lentil curry' },
    { name: 'Dal Makhani', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Creamy black lentil curry' },
    { name: 'Paneer Butter Masala', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Cottage cheese in rich tomato gravy' },
    { name: 'Kadai Paneer', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Paneer cooked in spicy kadai masala' },
    { name: 'Palak Paneer', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Spinach and cottage cheese curry' },
    { name: 'Veg Kurma', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Mixed vegetables in coconut gravy' },
    { name: 'Chicken Curry', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Traditional spicy chicken curry' },
    { name: 'Mutton Curry', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Slow-cooked mutton in aromatic gravy' },
    { name: 'Fish Curry', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Tangy South Indian fish curry' },
    { name: 'Prawn Masala', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Spicy prawn curry with coconut' },
    { name: 'Egg Curry', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Boiled eggs in spicy onion-tomato gravy' },
  ],
  biryani: [
    { name: 'Chicken Biryani', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Classic chicken dum biryani with mint' },
    { name: 'Mutton Biryani', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Aromatic mutton dum biryani with saffron' },
    { name: 'Egg Biryani', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Flavorful biryani with boiled eggs' },
    { name: 'Prawn Biryani', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Exquisite prawn biryani with seafood spices' },
    { name: 'Veg Biryani', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Mixed vegetable biryani with basmati rice' },
    { name: 'Mushroom Biryani', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Aromatic mushroom biryani with spices' },
    { name: 'Paneer Biryani', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Delicious paneer biryani with saffron rice' },
  ],
  tiffinItems: [
    { name: 'Idiyappam', category: 'Veg', type: 'veg', meal: 'Breakfast/Dinner', description: 'String hoppers made from rice flour' },
    { name: 'Appam', category: 'Veg', type: 'veg', meal: 'Breakfast/Dinner', description: 'Lacy fermented rice pancake' },
    { name: 'Kothu Parotta', category: 'Veg', type: 'veg', meal: 'Lunch/Dinner', description: 'Shredded parotta with vegetables and masala' },
    { name: 'Egg Kothu Parotta', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Kothu parotta with egg and spices' },
    { name: 'Chicken Kothu Parotta', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch/Dinner', description: 'Kothu parotta with shredded chicken' },
  ],
  southIndianMeals: [
    { name: 'South Indian Meals (Veg)', category: 'Veg', type: 'veg', meal: 'Lunch', description: 'Traditional banana leaf meal with sambar, rasam, poriyal, appalam, pickles, and payasam' },
    { name: 'South Indian Meals (Non-Veg)', category: 'Non-Veg', type: 'nonveg', meal: 'Lunch', description: 'Banana leaf meal with chicken/mutton curry, egg, sambar, rasam, and veg sides' },
  ],
  desserts: [
    { name: 'Gulab Jamun', category: 'Veg', type: 'veg', meal: 'Dessert', description: 'Soft milk dumplings in sugar syrup' },
    { name: 'Elaneer Payasam', category: 'Veg', type: 'veg', meal: 'Dessert', description: 'Tender coconut kheer with nuts' },
    { name: 'Jalebi', category: 'Veg', type: 'veg', meal: 'Dessert', description: 'Crispy spirals soaked in saffron syrup' },
    { name: 'Ice Cream', category: 'Veg', type: 'veg', meal: 'Dessert', description: 'Assorted ice cream flavors' },
    { name: 'Carrot Halwa', category: 'Veg', type: 'veg', meal: 'Dessert', description: 'Rich carrot pudding with nuts' },
  ],
};

const categories = ['All', 'Breakfast', 'Lunch/Dinner', 'Biryani', 'Tiffin Items', 'South Indian Meals', 'Desserts'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  // Flatten all dishes
  const allDishes = [
    ...menuData.breakfast.map(d => ({ ...d, category: 'Breakfast' })),
    ...menuData.lunchDinner.map(d => ({ ...d, category: 'Lunch/Dinner' })),
    ...menuData.biryani.map(d => ({ ...d, category: 'Biryani' })),
    ...menuData.tiffinItems.map(d => ({ ...d, category: 'Tiffin Items' })),
    ...menuData.southIndianMeals.map(d => ({ ...d, category: 'South Indian Meals' })),
    ...menuData.desserts.map(d => ({ ...d, category: 'Desserts' })),
  ];

  // Filter dishes
  const filteredDishes = allDishes.filter(dish => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">Our Menu</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our exquisite selection of authentic South Indian delicacies - Both Veg & Non-Veg
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-sm"><FaFire className="text-red-500" /> Non-Veg</span>
            <span className="flex items-center gap-2 text-sm"><FaLeaf className="text-green-500" /> Pure Veg</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-gold/30 rounded-full pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-gold/20 text-gold hover:bg-gold/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid - Dish Names Only (No Images) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedDish(dish)}
              >
                {/* Colored Bar based on Veg/Non-Veg */}
                <div className={`h-2 w-full ${dish.category === 'Non-Veg' ? 'bg-red-600' : 'bg-green-600'}`}></div>
                
                {/* Dish Name Only - NO IMAGE */}
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    {dish.category === 'Non-Veg' ? (
                      <FaFire className="text-red-500 text-2xl" />
                    ) : (
                      <FaLeaf className="text-green-500 text-2xl" />
                    )}
                  </div>
                  <h3 className="text-xl font-serif golden-text group-hover:text-gold-light transition-colors">
                    {dish.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-3 group-hover:w-24 transition-all duration-300"></div>
                  <p className="text-gray-500 text-xs mt-3">{dish.meal}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-serif golden-text mb-2">No Dishes Found</h3>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        )}
      </div>

      {/* Dish Details Modal - NO IMAGE */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-md w-full overflow-hidden"
            >
              <div className={`h-2 w-full ${selectedDish.category === 'Non-Veg' ? 'bg-red-600' : 'bg-green-600'}`}></div>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {selectedDish.category === 'Non-Veg' ? (
                    <FaFire className="text-red-500 text-3xl" />
                  ) : (
                    <FaLeaf className="text-green-500 text-3xl" />
                  )}
                </div>
                <h2 className="text-2xl font-serif golden-text mb-2">{selectedDish.name}</h2>
                <p className="text-gold-light text-sm mb-3">{selectedDish.meal}</p>
                <div className="w-12 h-0.5 bg-gold mx-auto mb-4"></div>
                <p className="text-gray-300">{selectedDish.description}</p>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="mt-6 px-6 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}