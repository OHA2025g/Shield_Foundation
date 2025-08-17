import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { api } from '../api';

const Footer = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.subscribeNewsletter(newsletterEmail);
      toast({
        title: "Success",
        description: response.message,
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-[#E3B01A] mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Shield Foundation</h1>
                <p className="text-sm text-gray-400">Adding Life to Years</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Shield Foundation is a Mumbai-based non-profit organization dedicated to empowering 
              communities through youth skilling programs and comprehensive senior citizen care.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-[#E3B01A] mr-2" />
                <span className="text-gray-300">shieldfoundation@gmail.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-[#E3B01A] mr-2" />
                <span className="text-gray-300">+91 98334 06288</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-[#E3B01A] mr-2" />
                <span className="text-gray-300">Dharavi, Mumbai, Maharashtra</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-[#E3B01A] transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-[#E3B01A] transition-colors">Programs</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-[#E3B01A] transition-colors">Impact</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-[#E3B01A] transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#E3B01A] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for updates on our programs and impact.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#E3B01A] hover:bg-[#d4a117] text-white"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Shield Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3B01A] text-sm transition-colors">
                Terms of Service
              </a>
              <Link to="/admin" className="text-gray-400 hover:text-[#E3B01A] text-sm transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;