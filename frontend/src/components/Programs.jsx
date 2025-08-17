import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Heart, Users, Award, CheckCircle, IndianRupee } from 'lucide-react';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';

const Programs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Programs</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Shield Foundation focuses on two major domains that create lasting impact in communities
          </p>
        </div>
      </section>

      {/* Youth Skilling Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GraduationCap className="h-16 w-16 text-[#416177] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {mockData.programs.youthSkilling.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mockData.programs.youthSkilling.description}
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mockData.programs.youthSkilling.courses.map((course) => (
              <Card key={course.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-[#416177]">{course.name}</CardTitle>
                  <CardDescription className="text-base">{course.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Average Salary:</span>
                      <Badge variant="secondary" className="bg-[#E3B01A] text-white hover:bg-[#d4a117]">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {course.avgSalary.replace('₹', '')}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Employer Network:</p>
                      <p className="text-sm text-gray-800">{course.employers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Statistics */}
          <div className="bg-[#416177] text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Youth Skilling Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">1300+</div>
                <div className="text-white/80">Youth Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">1000+</div>
                <div className="text-white/80">Youth Placed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">45+</div>
                <div className="text-white/80">CRS Employers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">40+</div>
                <div className="text-white/80">ITES Employers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Citizens Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-[#E3B01A] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {mockData.programs.seniorCitizens.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mockData.programs.seniorCitizens.description}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mockData.programs.seniorCitizens.services.map((service) => (
              <Card key={service.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#E3B01A]">{service.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ARCIL Collaboration */}
          <Card className="bg-white border-l-4 border-[#E3B01A]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#416177]">ARCIL Collaboration - Physiotherapy Unit</CardTitle>
              <CardDescription className="text-lg">Phase 1: Dharavi (Matunga Labour Camp)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4">Services Provided:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Ultrasound therapy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Shoulder exerciser
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Quadriceps table
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Exercise cycles
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">Impact:</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[#416177]">150/week</div>
                      <div className="text-sm text-gray-600">Current Attendance (up from 20-25)</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[#E3B01A]">₹1.96L</div>
                      <div className="text-sm text-gray-600">Consumables distributed in 1 year</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expansion Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expansion Plans</h2>
            <p className="text-xl text-gray-600">Scaling our impact to reach more communities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#416177]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#416177]">Phase 2: Mankhurd</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-[#416177] mr-3" />
                    <span>Target: 2000 senior citizens per year</span>
                  </div>
                  <div className="text-gray-600">
                    <p>Services planned:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Physiotherapy</li>
                      <li>Psychiatry</li>
                      <li>Eye care</li>
                      <li>Home-based care</li>
                      <li>OPDs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E3B01A]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#E3B01A]">Phase 3: Nagpur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-[#E3B01A] mr-3" />
                    <span>Replicating senior citizen model in Vidarbha region</span>
                  </div>
                  <div className="text-gray-600">
                    <p>Expanding our proven model to serve more communities across Maharashtra</p>
                  </div>
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

export default Programs;