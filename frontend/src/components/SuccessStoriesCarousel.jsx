import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MapPin, Award } from 'lucide-react';
import { getSuccessStories } from '../api';

const SuccessStoriesCarousel = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load success stories on component mount
  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await getSuccessStories();
        setStories(data.stories || []);
      } catch (error) {
        console.error('Failed to load success stories:', error);
        // Fallback to empty array if API fails
        setStories([]);
      }
      setLoading(false);
    };

    loadStories();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (stories.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === stories.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [stories.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? stories.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === stories.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return null; // Don't render if no stories
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from the lives we've touched and transformed through our programs
          </p>
        </div>

        <div className="relative">
          {/* Main carousel */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div key={story.id || index} className="w-full flex-shrink-0 px-2">
                  <Card className="border-0 shadow-lg h-[200px] max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-0 h-full">
                      {/* Image - smaller proportion */}
                      <div className="relative md:col-span-2">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {story.program}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content - larger proportion */}
                      <CardContent className="md:col-span-3 p-4 flex flex-col justify-center h-full">
                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{story.name}</h3>
                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {story.location}
                          </div>
                        </div>
                        
                        <blockquote className="text-sm text-gray-600 italic mb-2 leading-relaxed line-clamp-3">
                          "{story.story}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-blue-600 font-medium text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            <span className="line-clamp-1">{story.achievement}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {stories.length > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md z-10 h-8 w-8 p-0"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md z-10 h-8 w-8 p-0"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Dots indicator */}
          {stories.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;