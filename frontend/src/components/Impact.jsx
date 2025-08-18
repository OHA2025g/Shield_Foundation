import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Heart, Users, GraduationCap, Award, TrendingUp, MapPin } from 'lucide-react';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';

const Impact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Impact</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Measuring our success through the lives we've touched and the communities we've empowered
          </p>
        </div>
      </section>

      {/* Overall Impact Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Overall Impact</h2>
            <p className="text-xl text-gray-600">Key metrics that define our success</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {mockData.impactStats.youthTrained.toLocaleString()}+
                </div>
                <div className="text-gray-600">Youth Trained</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {mockData.impactStats.youthPlaced.toLocaleString()}+
                </div>
                <div className="text-gray-600">Youth Placed</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {mockData.impactStats.seniorsSupported.toLocaleString()}+
                </div>
                <div className="text-gray-600">Seniors Supported</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {mockData.impactStats.womenEmpowered}+
                </div>
                <div className="text-gray-600">Women Empowered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Youth Impact Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Youth Skilling Impact</h2>
            <p className="text-xl text-gray-600">Transforming lives through skill development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Training Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Training Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">CRS Program</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <Progress value={65} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">ITES-BPO Program</span>
                    <span className="text-sm text-gray-600">25%</span>
                  </div>
                  <Progress value={25} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Nursing Assistant</span>
                    <span className="text-sm text-gray-600">10%</span>
                  </div>
                  <Progress value={10} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Placement Success */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">Placement Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">77%</div>
                  <div className="text-gray-600">Overall Placement Rate</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">CRS Average Salary</span>
                    <span className="text-blue-600 font-bold">₹13,946/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ITES Average Salary</span>
                    <span className="text-blue-600 font-bold">₹12,132/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Nursing Average Salary</span>
                    <span className="text-blue-600 font-bold">₹8,700/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employer Network */}
          <Card className="bg-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Employer Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">45+</div>
                  <div className="text-white/90">Partner Employers</div>
                  <p className="text-sm text-white/80 mt-2">
                    Leading companies across various sectors
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">40+</div>
                  <div className="text-white/90">Training Batches</div>
                  <p className="text-sm text-white/80 mt-2">
                    Consistently delivered quality training
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Senior Citizens Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Senior Citizens Impact</h2>
            <p className="text-xl text-gray-600">Comprehensive care and support services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mockData.seniorImpact.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{item.metric}</div>
                  <div className="text-gray-600 font-medium mb-2">{item.category}</div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Medical Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Exercise Participants</span>
                  <span className="font-bold text-blue-600">2000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medical Consultations</span>
                  <span className="font-bold text-blue-600">1500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cataract Surgeries</span>
                  <span className="font-bold text-blue-600">750+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-yellow-600">Support Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Elder Abuse Cases</span>
                  <span className="font-bold text-yellow-600">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Legal Counseling</span>
                  <span className="font-bold text-yellow-600">100+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pension Assistance</span>
                  <span className="font-bold text-yellow-600">400+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Regular Visitors</span>
                  <span className="font-bold text-blue-600">2000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cultural Programs</span>
                  <span className="font-bold text-blue-600">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Family Mediations</span>
                  <span className="font-bold text-blue-600">200+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Highlight */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Success Stories</h2>
            <p className="text-xl text-black/80">Real stories of transformation and empowerment</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {mockData.successStories.map((story, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                      <p className="text-sm text-blue-600 font-medium mb-3">{story.program}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{story.story}</p>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-700">
                          <TrendingUp className="h-4 w-4 inline mr-1" />
                          {story.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Geographic Reach</h2>
            <p className="text-xl text-gray-600">Expanding our impact across communities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Mumbai (Dharavi)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2000</div>
                    <div className="text-sm text-gray-600">Active Senior Citizens</div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Our flagship location with comprehensive youth training and senior care services.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Expansion Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">3</div>
                    <div className="text-sm text-gray-600">New Locations Planned</div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Mankhurd and Nagpur expansion to serve more communities with our proven model.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;