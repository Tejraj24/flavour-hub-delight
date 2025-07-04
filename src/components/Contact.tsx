
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Visit Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Come experience the warmth and flavors of Flavor Hub. We'd love to serve you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Location & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                  <p className="text-gray-600">123 Flavor Street<br />Downtown District<br />City, State 12345</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Hours</h4>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 7:00 AM - 9:00 PM</p>
                    <p>Saturday: 8:00 AM - 10:00 PM</p>
                    <p>Sunday: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="border-gray-300" />
                  <Input placeholder="Last Name" className="border-gray-300" />
                </div>
                <Input placeholder="Email Address" type="email" className="border-gray-300" />
                <Input placeholder="Phone Number" type="tel" className="border-gray-300" />
                <Textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="border-gray-300"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
