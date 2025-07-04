
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Utensils, Wine, CakeSlice } from "lucide-react";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("coffee");

  const menuData = {
    coffee: {
      icon: Coffee,
      items: [
        { name: "Espresso", price: "$3.50", description: "Rich, bold shot of premium coffee" },
        { name: "Cappuccino", price: "$4.25", description: "Espresso with steamed milk and foam" },
        { name: "Latte", price: "$4.75", description: "Smooth espresso with steamed milk" },
        { name: "Americano", price: "$3.75", description: "Espresso with hot water" },
        { name: "Mocha", price: "$5.25", description: "Espresso with chocolate and steamed milk" },
        { name: "Cold Brew", price: "$4.00", description: "Smooth, cold-steeped coffee concentrate" },
      ]
    },
    food: {
      icon: Utensils,
      items: [
        { name: "Grilled Salmon", price: "$18.50", description: "Fresh Atlantic salmon with herbs and lemon" },
        { name: "Chicken Parmesan", price: "$16.75", description: "Breaded chicken with marinara and mozzarella" },
        { name: "Beef Burger", price: "$14.25", description: "Juicy beef patty with lettuce, tomato, and fries" },
        { name: "Vegetarian Pasta", price: "$13.50", description: "Fresh vegetables with penne in garlic olive oil" },
        { name: "Caesar Salad", price: "$11.75", description: "Crisp romaine with parmesan and croutons" },
        { name: "Fish Tacos", price: "$15.25", description: "Fresh fish with cabbage slaw and lime" },
      ]
    },
    beverages: {
      icon: Wine,
      items: [
        { name: "House Wine", price: "$8.50", description: "Red or white wine selection" },
        { name: "Craft Beer", price: "$6.75", description: "Local brewery selection" },
        { name: "Fresh Juice", price: "$4.50", description: "Orange, apple, or cranberry juice" },
        { name: "Green Tea", price: "$3.25", description: "Organic green tea blend" },
        { name: "Smoothie", price: "$6.25", description: "Mixed berry or tropical fruit blend" },
        { name: "Sparkling Water", price: "$2.75", description: "Premium sparkling water with lime" },
      ]
    },
    desserts: {
      icon: CakeSlice,
      items: [
        { name: "Chocolate Cake", price: "$7.50", description: "Rich chocolate layer cake with ganache" },
        { name: "Cheesecake", price: "$6.75", description: "New York style with berry compote" },
        { name: "Tiramisu", price: "$7.25", description: "Classic Italian coffee-flavored dessert" },
        { name: "Apple Pie", price: "$6.50", description: "Homemade pie with vanilla ice cream" },
        { name: "Crème Brûlée", price: "$8.00", description: "Vanilla custard with caramelized sugar" },
        { name: "Ice Cream", price: "$4.75", description: "Vanilla, chocolate, or strawberry" },
      ]
    }
  };

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

          {Object.entries(menuData).map(([key, category]) => (
            <TabsContent key={key} value={key} className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <Card key={index} className="hover-scale bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-amber-600">{item.price}</span>
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
