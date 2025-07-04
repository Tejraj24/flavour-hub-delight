
import { Coffee, Utensils, Wine } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Flavor Hub, we believe every meal should be an experience. From the first sip of our 
            carefully crafted coffee to the last bite of our signature dishes, we're committed to 
            delivering exceptional flavors that bring people together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group hover-scale">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <Coffee className="text-amber-700" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Coffee</h3>
            <p className="text-gray-600">
              Sourced from the finest coffee farms worldwide, our beans are roasted to perfection 
              to create the perfect cup every time.
            </p>
          </div>

          <div className="text-center group hover-scale">
            <div className="bg-gradient-to-br from-red-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <Utensils className="text-red-700" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fresh Cuisine</h3>
            <p className="text-gray-600">
              Our chefs prepare each dish with locally sourced, fresh ingredients, creating 
              flavors that celebrate both tradition and innovation.
            </p>
          </div>

          <div className="text-center group hover-scale">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <Wine className="text-purple-700" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fine Beverages</h3>
            <p className="text-gray-600">
              From artisanal teas to carefully selected wines, our beverage menu complements 
              every meal with the perfect pairing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
