import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Users, Award, CheckCircle, Building, Calendar } from 'lucide-react';
import { mockData } from '../mock';
import { api } from '../api';
import Header from './Header';
import Footer from './Footer';

const Programs = () => {
  // Site content state
  const [siteContent, setSiteContent] = useState({});

  // Load site content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from backend first
        const backendContent = await api.admin.getSiteContent();
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
  const youthCourses = [
    {
      name: "Customer Relationship Associate (CRA)",
      duration: "45 days",
      batch_size: "35-40 students",
      description: "Comprehensive customer service and communication skills training"
    },
    {
      name: "ITES-BPO",
      duration: "45 days",
      batch_size: "35-40 students",
      description: "Information Technology Enabled Services and Business Process Outsourcing"
    },
    {
      name: "General Duty Assistant (Nursing)",
      duration: "90 days",
      batch_size: "25-30 students",
      description: "Basic nursing and healthcare assistance training"
    }
  ];

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

      {/* Youth Skilling Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Youth Skilling & Livelihoods</h2>
            <p className="text-xl text-gray-600">In partnership with Tech Mahindra Foundation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {youthCourses.map((course, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{course.name}</CardTitle>
                  <CardDescription>
                    <div className="space-y-2 text-sm">
                      <Badge variant="secondary" className="bg-yellow-400 text-black hover:bg-yellow-500">
                        {course.duration}
                      </Badge>
                      <div className="text-gray-600">{course.batch_size}</div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-8 text-center">Program Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">1300+</div>
                <div className="text-sm">Youth Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
                <div className="text-sm">Youth Placed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">45+</div>
                <div className="text-sm">Employer Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">40+</div>
                <div className="text-sm">Training Batches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Citizens Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Senior Citizens Services</h2>
            <p className="text-xl text-gray-600">Multi-Service Support Centers for Comprehensive Elderly Care</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { category: "Healthcare Services", services: ["Regular health checkups", "Medical consultations", "Free cataract surgeries", "Physiotherapy"] },
              { category: "Recreational Activities", services: ["Daily exercise & yoga", "Indoor games", "Cultural programs", "Social gatherings"] },
              { category: "Legal & Psychosocial", services: ["Elder abuse support", "Legal counseling", "Psychological support", "Family mediation"] },
              { category: "Welfare Services", services: ["Government scheme enrollment", "Pension assistance", "Healthcare navigation", "Documentation support"] }
            ].map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-600">{service.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ARCIL Partnership */}
          <Card className="bg-white border-l-4 border-yellow-400">
            <CardContent className="p-8">
              <CardTitle className="text-2xl text-blue-600">ARCIL Collaboration - Physiotherapy Unit</CardTitle>
              <div className="mt-6 grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Services Provided</h4>
                  <ul className="space-y-2">
                    {[
                      "Physiotherapy for mobility issues",
                      "Chronic pain management",
                      "Stroke rehabilitation",
                      "Arthritis treatment",
                      "Balance and fall prevention"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-600">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Impact Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">150/week</div>
                      <div className="text-sm text-gray-600">Patients Treated</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">₹1.96L</div>
                      <div className="text-sm text-gray-600">Monthly Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expansion Plans</h2>
            <p className="text-xl text-gray-600">Scaling our impact to serve more communities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Phase 2: Mankhurd</CardTitle>
                <CardDescription className="text-lg">Extending youth skilling programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">Target: 500+ youth annually</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">New training center setup</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">Launch planned for 2024</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  <Link to="/contact">
                    Support This Initiative
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">Phase 3: Nagpur</CardTitle>
                <CardDescription className="text-lg">Senior citizen services expansion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-gray-600">Comprehensive elderly care</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-gray-600">Healthcare & social services</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-gray-600">Planning phase underway</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Link to="/contact">
                    Get Involved
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;