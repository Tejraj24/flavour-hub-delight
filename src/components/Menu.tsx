
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Utensils, Wine, CakeSlice } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'food' | 'beverages' | 'desserts';
  available: boolean;
}

const Menu = () => {
  const [activeTab, setActiveTab] = useState("coffee");

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('name');
      
      if (error) throw error;
      return data as MenuItem[];
    }
  });

  const menuCategories = {
    coffee: { icon: Coffee, items: menuItems.filter(item => item.category === 'coffee') },
    food: { icon: Utensils, items: menuItems.filter(item => item.category === 'food') },
    beverages: { icon: Wine, items: menuItems.filter(item => item.category === 'beverages') },
    desserts: { icon: CakeSlice, items: menuItems.filter(item => item.category === 'desserts') }
  };

  if (isLoading) {
    return (
      <section id="menu" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Menu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading our delicious menu items...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes and beverages, 
            each prepared with passion and the finest ingredients.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-white shadow-lg">
            <TabsTrigger value="coffee" className="flex items-center gap-2 data-[state=active]:bg-amber-100">
              <Coffee size={18} />
              Coffee
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2 data-[state=active]:bg-orange-100">
              <Utensils size={18} />
              Food
            </TabsTrigger>
            <TabsTrigger value="beverages" className="flex items-center gap-2 data-[state=active]:bg-purple-100">
              <Wine size={18} />
              Beverages
            </TabsTrigger>
            <TabsTrigger value="desserts" className="flex items-center gap-2 data-[state=active]:bg-pink-100">
              <CakeSlice size={18} />
              Desserts
            </TabsTrigger>
          </TabsList>

          {Object.entries(menuCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="hover-scale bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-amber-600">${item.price.toFixed(2)}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;
