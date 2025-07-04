
import { Coffee, Utensils, Wine } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Coffee className="mr-2 text-amber-300" size={28} />
              <h3 className="text-2xl font-bold">Flavor Hub</h3>
            </div>
            <p className="text-amber-200 mb-4">
              Where every meal tells a story and every cup creates memories.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <div className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 transition-colors cursor-pointer">
                <Coffee size={20} />
              </div>
              <div className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 transition-colors cursor-pointer">
                <Utensils size={20} />
              </div>
              <div className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 transition-colors cursor-pointer">
                <Wine size={20} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-amber-200">Quick Links</h4>
            <ul className="space-y-2 text-amber-100">
              <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4 text-amber-200">Contact Info</h4>
            <div className="space-y-2 text-amber-100">
              <p>123 Flavor Street</p>
              <p>City, State 12345</p>
              <p>(555) 123-4567</p>
              <p>hello@flavorhub.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-200">
            © 2024 Flavor Hub. All rights reserved. | Made with ❤️ for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
