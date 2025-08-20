import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Users, Award, CheckCircle, Building, Calendar } from 'lucide-react';
import { mockData } from '../mock';
import { getPublicSiteContent } from '../api';
import Header from './Header';
import Footer from './Footer';

const Programs = () => {
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
            {siteContent.programs?.hero?.title || "Our Programs"}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {siteContent.programs?.hero?.subtitle || "Comprehensive Programs for Community Impact"}
          </p>
          {siteContent.programs?.hero?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              {siteContent.programs?.hero?.description}
            </p>
          )}
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Youth Skilling Program */}
            <Card className="h-full border border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-8">
                <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <CardTitle className="text-3xl font-bold text-blue-600 mb-4">
                  Youth Skilling & Livelihoods
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Partnership with Tech Mahindra Foundation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  In partnership with Tech Mahindra Foundation, we provide comprehensive training programs 
                  that bridge the gap between education and employment for underserved youth in Mumbai's communities.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Program Highlights:</h4>
                  <div className="grid gap-3">
                    {[
                      "Multi-skilling training in various trades",
                      "Industry-aligned curriculum development", 
                      "Job placement assistance and career guidance",
                      "Entrepreneurship development support",
                      "Life skills and soft skills training"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1,470+</div>
                      <div className="text-sm text-gray-600">Youth Trained</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1,090+</div>
                      <div className="text-sm text-gray-600">Successfully Placed</div>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link to="/contact">Apply for Training Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Senior Citizens Care */}
            <Card className="h-full border border-yellow-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-8">
                <Heart className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <CardTitle className="text-3xl font-bold text-yellow-600 mb-4">
                  Senior Citizens Care
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Multi-Service Support Centers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Multi-service support centers providing healthcare, recreational activities, 
                  and social support for our elderly community members, ensuring they live with dignity and purpose.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Services Offered:</h4>
                  <div className="grid gap-3">
                    {[
                      "Regular health check-ups and medical support",
                      "Recreational and social activities", 
                      "Nutritional support and meal programs",
                      "Counseling and emotional support services",
                      "Community engagement and volunteer opportunities"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">7,000+</div>
                      <div className="text-sm text-gray-600">Seniors Supported</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">150+</div>
                      <div className="text-sm text-gray-600">Weekly Beneficiaries</div>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600">
                  <Link to="/contact">Learn About Our Services</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Programs?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures sustainable impact and meaningful transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Community-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We work directly within communities, understanding local needs and building lasting relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Over 6 years of measurable impact with thousands of beneficiaries across our programs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Strategic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Collaborating with established organizations like Tech Mahindra Foundation and ARCIL.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get Involved Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to develop new skills or support our community programs, 
            we have opportunities for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/contact">
                <Users className="h-5 w-5 mr-2" />
                Join Our Programs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact">
                <Heart className="h-5 w-5 mr-2" />
                Become a Volunteer
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;