
import { Button } from "@/components/ui/button";
import { Coffee, Utensils } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-pulse">
          <Coffee size={40} />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Utensils size={35} />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <Coffee size={30} />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-500">
          <Utensils size={45} />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            Flavor Hub
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-amber-100">
            Delightful Cafe & Restaurant
          </p>
          <p className="text-lg mb-8 text-amber-200 max-w-2xl mx-auto">
            Experience the perfect blend of aromatic coffees, delicious cuisines, and warm hospitality 
            in our cozy atmosphere where every meal tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Utensils className="mr-2" size={20} />
              View Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-300 text-white hover:bg-amber-300 hover:text-amber-900 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Coffee className="mr-2" size={20} />
              Visit Us
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
