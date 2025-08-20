import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Play, Users, Award, Heart, Calendar } from 'lucide-react';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Site content state
  const [siteContent, setSiteContent] = useState({});

  // Load site content on component mount
  useEffect(() => {
    setSiteContent(mockData.siteContent || {});
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: Users },
    { id: 'youth-training', name: 'Youth Training', icon: Award },
    { id: 'senior-care', name: 'Senior Care', icon: Heart },
    { id: 'events', name: 'Events', icon: Calendar },
  ];

  // Mock gallery data with placeholder images
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'youth-training',
      title: 'CRS Training Session',
      description: 'Students learning customer relationship skills in our modern training facility',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      date: '2024-07-15'
    },
    {
      id: 2,
      type: 'image',
      category: 'youth-training',
      title: 'ITES-BPO Practical Training',
      description: 'Hands-on computer training for ITES program students',
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&h=300&fit=crop',
      date: '2024-07-10'
    },
    {
      id: 3,
      type: 'image',
      category: 'youth-training',
      title: 'Graduation Ceremony',
      description: 'Proud graduates receiving their certificates after completing training',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop',
      date: '2024-06-20'
    },
    {
      id: 4,
      type: 'image',
      category: 'senior-care',
      title: 'Daily Exercise Session',
      description: 'Senior citizens participating in their daily yoga and exercise routine',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      date: '2024-07-25'
    },
    {
      id: 5,
      type: 'image',
      category: 'senior-care',
      title: 'Physiotherapy Unit',
      description: 'ARCIL-supported physiotherapy unit providing specialized care',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      date: '2024-07-18'
    },
    {
      id: 6,
      type: 'image',
      category: 'senior-care',
      title: 'Medical Checkup Camp',
      description: 'Free health checkup camp for senior citizens in Dharavi',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=300&fit=crop',
      date: '2024-07-12'
    },
    {
      id: 7,
      type: 'image',
      category: 'events',
      title: 'Cultural Celebration',
      description: 'Senior citizens celebrating festival together at our community center',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=300&fit=crop',
      date: '2024-06-30'
    },
    {
      id: 8,
      type: 'image',
      category: 'events',
      title: 'Placement Drive',
      description: 'Job placement drive connecting our graduates with top employers',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop',
      date: '2024-06-25'
    },
    {
      id: 9,
      type: 'video',
      category: 'youth-training',
      title: 'Success Story - Ulka Kebhavi',
      description: 'Watch Ulka share her journey from ITES training to successful employment',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop',
      date: '2024-07-05'
    },
    {
      id: 10,
      type: 'image',
      category: 'events',
      title: 'Community Outreach',
      description: 'Volunteers distributing essential supplies to senior citizens',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=300&fit=crop',
      date: '2024-06-15'
    },
    {
      id: 11,
      type: 'image',
      category: 'senior-care',
      title: 'Legal Aid Session',
      description: 'Providing legal guidance and support to elderly community members',
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=500&h=300&fit=crop',
      date: '2024-06-10'
    },
    {
      id: 12,
      type: 'image',
      category: 'events',
      title: 'Partnership Signing',
      description: 'MOU signing ceremony with Tech Mahindra Foundation for SMART Program',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop',
      date: '2024-05-28'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Gallery</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Capturing moments of transformation, empowerment, and community impact
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={item.type === 'video' ? item.thumbnail : item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Video overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                      <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                        <Play className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  )}
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary"
                      className="bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                      {categories.find(cat => cat.id === item.category)?.name}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Load More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Moments Captured</h2>
            <p className="text-xl text-white/90">Every photo tells a story of transformation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-white/80">Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-white/80">Videos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-white/80">Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-white/80">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video Testimonials</h2>
            <p className="text-xl text-gray-600">Hear directly from our beneficiaries</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Featured Video Testimonials */}
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop"
                  alt="Ulka Kebhavi Testimonial"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ulka Kebhavi's Success Story</h3>
                <p className="text-gray-600">
                  From ITES-BPO training to a successful career at Finbross Marketing Pvt Ltd
                </p>
                <Badge className="mt-3 bg-yellow-400 text-black hover:bg-yellow-500">
                  Youth Success
                </Badge>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
                  alt="Senior Citizen Testimonial"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Senior Care Impact</h3>
                <p className="text-gray-600">
                  How physiotherapy and community support transformed lives in Dharavi
                </p>
                <Badge className="mt-3 bg-blue-600 text-white hover:bg-blue-700">
                  Senior Care
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;