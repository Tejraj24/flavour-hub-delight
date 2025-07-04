
-- Create enum for menu categories
CREATE TYPE public.menu_category AS ENUM ('coffee', 'food', 'beverages', 'desserts');

-- Create enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category menu_category NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customer profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  party_size INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for menu_items (public read access)
CREATE POLICY "Anyone can view menu items" ON public.menu_items
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage menu items" ON public.menu_items
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for order_items
CREATE POLICY "Users can view order items for their orders" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR auth.uid() IS NULL)
    )
  );

CREATE POLICY "Users can create order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR auth.uid() IS NULL)
    )
  );

-- Create RLS policies for reservations
CREATE POLICY "Users can view own reservations" ON public.reservations
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create reservations" ON public.reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update own reservations" ON public.reservations
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample menu items
INSERT INTO public.menu_items (name, description, price, category) VALUES
  ('Espresso', 'Rich, bold shot of premium coffee', 3.50, 'coffee'),
  ('Cappuccino', 'Espresso with steamed milk and foam', 4.25, 'coffee'),
  ('Latte', 'Smooth espresso with steamed milk', 4.75, 'coffee'),
  ('Americano', 'Espresso with hot water', 3.75, 'coffee'),
  ('Mocha', 'Espresso with chocolate and steamed milk', 5.25, 'coffee'),
  ('Cold Brew', 'Smooth, cold-steeped coffee concentrate', 4.00, 'coffee'),
  ('Grilled Salmon', 'Fresh Atlantic salmon with herbs and lemon', 18.50, 'food'),
  ('Chicken Parmesan', 'Breaded chicken with marinara and mozzarella', 16.75, 'food'),
  ('Beef Burger', 'Juicy beef patty with lettuce, tomato, and fries', 14.25, 'food'),
  ('Vegetarian Pasta', 'Fresh vegetables with penne in garlic olive oil', 13.50, 'food'),
  ('Caesar Salad', 'Crisp romaine with parmesan and croutons', 11.75, 'food'),
  ('Fish Tacos', 'Fresh fish with cabbage slaw and lime', 15.25, 'food'),
  ('House Wine', 'Red or white wine selection', 8.50, 'beverages'),
  ('Craft Beer', 'Local brewery selection', 6.75, 'beverages'),
  ('Fresh Juice', 'Orange, apple, or cranberry juice', 4.50, 'beverages'),
  ('Green Tea', 'Organic green tea blend', 3.25, 'beverages'),
  ('Smoothie', 'Mixed berry or tropical fruit blend', 6.25, 'beverages'),
  ('Sparkling Water', 'Premium sparkling water with lime', 2.75, 'beverages'),
  ('Chocolate Cake', 'Rich chocolate layer cake with ganache', 7.50, 'desserts'),
  ('Cheesecake', 'New York style with berry compote', 6.75, 'desserts'),
  ('Tiramisu', 'Classic Italian coffee-flavored dessert', 7.25, 'desserts'),
  ('Apple Pie', 'Homemade pie with vanilla ice cream', 6.50, 'desserts'),
  ('Crème Brûlée', 'Vanilla custard with caramelized sugar', 8.00, 'desserts'),
  ('Ice Cream', 'Vanilla, chocolate, or strawberry', 4.75, 'desserts');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
