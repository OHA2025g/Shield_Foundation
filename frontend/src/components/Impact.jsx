import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Heart, Users, GraduationCap, Award, TrendingUp, MapPin } from 'lucide-react';
import { mockData } from '../mock';
import { getPublicSiteContent } from '../api';
import Header from './Header';
import Footer from './Footer';

const Impact = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.impact?.hero?.title || "Our Impact"}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {siteContent.impact?.hero?.subtitle || "Measuring Success Through Lives Transformed"}
          </p>
          {siteContent.impact?.hero?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              {siteContent.impact?.hero?.description}
            </p>
          )}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">By the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to measurable results drives everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-blue-600 mb-2">1,470+</div>
                <div className="text-gray-600">Youth Trained</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-yellow-600 mb-2">1,090+</div>
                <div className="text-gray-600">Youth Placed</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-blue-600 mb-2">7,000+</div>
                <div className="text-gray-600">Seniors Supported</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-yellow-600 mb-2">300+</div>
                <div className="text-gray-600">Women Empowered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Impact Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key achievements that demonstrate our commitment to community transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.impactHighlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {highlight.icon === 'Users' && <Users className="h-8 w-8 text-blue-600" />}
                    {highlight.icon === 'Heart' && <Heart className="h-8 w-8 text-yellow-500" />}
                    {highlight.icon === 'TrendingUp' && <TrendingUp className="h-8 w-8 text-blue-600" />}
                    <CardTitle className="text-xl text-gray-900">{highlight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{highlight.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-semibold">{highlight.metric}</span>
                    <span className="text-gray-500">{highlight.period}</span>
                  </div>
                  <Progress value={highlight.progress} className="mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from the lives we've touched and transformed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mockData.successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {story.program}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-gray-600 mb-4">{story.story}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">{story.achievement}</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Impact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Reach</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Serving communities across Mumbai and surrounding areas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Central Mumbai</h3>
                <p className="text-gray-600 mb-4">
                  Primary operations center serving Dharavi, Mahim, and surrounding communities
                </p>
                <div className="text-2xl font-bold text-blue-600">5,000+</div>
                <div className="text-sm text-gray-500">Beneficiaries</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <MapPin className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Western Suburbs</h3>
                <p className="text-gray-600 mb-4">
                  Extended outreach programs in Andheri, Borivali, and adjacent areas
                </p>
                <div className="text-2xl font-bold text-yellow-600">2,500+</div>
                <div className="text-sm text-gray-500">Beneficiaries</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Eastern Districts</h3>
                <p className="text-gray-600 mb-4">
                  Community partnerships extending our impact to underserved eastern regions
                </p>
                <div className="text-2xl font-bold text-blue-600">1,000+</div>
                <div className="text-sm text-gray-500">Beneficiaries</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Community Impact</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">8,500+</div>
                  <div className="text-gray-600">Total Beneficiaries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">15+</div>
                  <div className="text-gray-600">Communities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">6+</div>
                  <div className="text-gray-600">Years of Service</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">100%</div>
                  <div className="text-gray-600">Community-Focused</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;