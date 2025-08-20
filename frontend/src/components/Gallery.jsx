import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Play, Users, Award, Heart, Calendar } from 'lucide-react';
import { mockData } from '../mock';
import { getPublicSiteContent } from '../api';
import Header from './Header';
import Footer from './Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Site content state
  const [siteContent, setSiteContent] = useState({});

  // Load site content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from public API first
        const backendContent = await getPublicSiteContent();
        if (backendContent.content && Object.keys(backendContent.content).length > 0) {
          setSiteContent(backendContent.content);
        } else {
          setSiteContent(mockData.siteContent || {});
        }
      } catch (error) {
        console.log('Using mock data for site content');
        setSiteContent(mockData.siteContent || {});
      }
    };
    
    loadData();
  }, []);

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop',
      alt: 'Youth Training Session',
      category: 'youth',
      title: 'Skills Development Workshop',
      description: 'Young participants learning new technical skills in our training center.',
      date: '2024-08-15'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop',
      alt: 'Senior Citizens Activity',
      category: 'seniors',
      title: 'Community Health Camp',
      description: 'Regular health check-ups and social activities for our senior community members.',
      date: '2024-07-28'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&h=300&fit=crop',
      alt: 'Community Event',
      category: 'events',
      title: 'Annual Community Celebration',
      description: 'Bringing together all our program participants for a day of celebration and recognition.',
      date: '2024-06-20'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
      alt: 'Training Program',
      category: 'youth',
      title: 'Job Placement Success',
      description: 'Celebrating successful job placements of our youth training program graduates.',
      date: '2024-08-01'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      alt: 'Volunteers in Action',
      category: 'community',
      title: 'Volunteer Appreciation Day',
      description: 'Recognizing the dedicated volunteers who make our programs possible.',
      date: '2024-07-10'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop',
      alt: 'Healthcare Support',
      category: 'seniors',
      title: 'Mobile Health Clinic',
      description: 'Bringing healthcare services directly to senior citizens in their communities.',
      date: '2024-08-05'
    },
    {
      id: 7,
      type: 'video',
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      alt: 'Program Overview',
      category: 'events',
      title: 'Shield Foundation Impact Video',
      description: 'A comprehensive overview of our programs and their impact on communities.',
      date: '2024-07-01'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=300&fit=crop',
      alt: 'Community Workshop',
      category: 'community',
      title: 'Women Empowerment Workshop',
      description: 'Empowering women through skill development and entrepreneurship training.',
      date: '2024-06-15'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=300&fit=crop',
      alt: 'Youth Success Story',
      category: 'youth',
      title: 'Success Story: Tech Career',
      description: 'Former program participant now working in the technology sector.',
      date: '2024-08-10'
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop',
      alt: 'Community Outreach',
      category: 'community',
      title: 'Community Outreach Program',
      description: 'Extending our reach to underserved communities across Mumbai.',
      date: '2024-07-20'
    },
    {
      id: 11,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop',
      alt: 'Senior Care Program',
      category: 'seniors',
      title: 'Dignified Aging Initiative',
      description: 'Ensuring our elderly community members receive the care and respect they deserve.',
      date: '2024-06-30'
    },
    {
      id: 12,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&h=300&fit=crop',
      alt: 'Awards Ceremony',
      category: 'events',
      title: 'Annual Awards Ceremony',
      description: 'Recognizing outstanding achievements in our programs and community impact.',
      date: '2024-05-25'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', count: galleryItems.length },
    { id: 'youth', name: 'Youth Programs', count: galleryItems.filter(item => item.category === 'youth').length },
    { id: 'seniors', name: 'Senior Care', count: galleryItems.filter(item => item.category === 'seniors').length },
    { id: 'community', name: 'Community', count: galleryItems.filter(item => item.category === 'community').length },
    { id: 'events', name: 'Events', count: galleryItems.filter(item => item.category === 'events').length }
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.gallery?.hero?.title || "Gallery"}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {siteContent.gallery?.hero?.subtitle || "Capturing Moments of Impact and Transformation"}
          </p>
          {siteContent.gallery?.hero?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              {siteContent.gallery?.hero?.description}
            </p>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative group">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">
                      {item.category === 'youth' && <Users className="h-3 w-3 mr-1" />}
                      {item.category === 'seniors' && <Heart className="h-3 w-3 mr-1" />}
                      {item.category === 'events' && <Award className="h-3 w-3 mr-1" />}
                      {item.category === 'community' && <Users className="h-3 w-3 mr-1" />}
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <Badge variant="outline">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What People Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Voices from our community sharing their experiences with Shield Foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {testimonial.program}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Share Your Story</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have you been impacted by our programs? We'd love to hear from you and feature your story.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Heart className="h-5 w-5 mr-2" />
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;