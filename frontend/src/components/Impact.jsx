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
                <GraduationCap className="h-12 w-12 text-[#416177] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#416177] mb-2">
                  {mockData.impactStats.youthTrained.toLocaleString()}+
                </div>
                <div className="text-gray-600">Youth Trained</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-[#E3B01A] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">
                  {mockData.impactStats.youthPlaced.toLocaleString()}+
                </div>
                <div className="text-gray-600">Youth Placed</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-[#416177] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#416177] mb-2">
                  {mockData.impactStats.seniorsSupported.toLocaleString()}+
                </div>
                <div className="text-gray-600">Seniors Supported</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-[#E3B01A] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#E3B01A] mb-2">
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
            <GraduationCap className="h-16 w-16 text-[#416177] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Youth Skilling Impact</h2>
            <p className="text-xl text-gray-600">Transforming lives through skill development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Training Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#416177]">Training Statistics</CardTitle>
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
                <CardTitle className="text-2xl text-[#E3B01A]">Placement Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#E3B01A] mb-2">77%</div>
                  <div className="text-gray-600">Overall Placement Rate</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">CRS Average Salary</span>
                    <span className="text-[#416177] font-bold">₹13,946/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ITES Average Salary</span>
                    <span className="text-[#416177] font-bold">₹12,132/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Nursing Average Salary</span>
                    <span className="text-[#416177] font-bold">₹8,700/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employer Network */}
          <Card className="bg-[#416177] text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Employer Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#E3B01A] mb-2">45+</div>
                  <div className="text-white/80">CRS Employers</div>
                  <p className="text-sm text-white/70 mt-2">
                    Including Amazon, ICICI Bank, Pantaloons, Subway
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#E3B01A] mb-2">40+</div>
                  <div className="text-white/80">ITES Employers</div>
                  <p className="text-sm text-white/70 mt-2">
                    Including Teleperformance, Quess Corp, Rebel Foods
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Senior Services Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-[#E3B01A] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Senior Citizens Impact</h2>
            <p className="text-xl text-gray-600">Comprehensive care for our elderly community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockData.impactHighlights.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#E3B01A] mb-2">{item.metric}</div>
                  <div className="text-gray-600">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Services Impact */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#416177]">Medical Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Heart conditions treated</span>
                  <span className="font-bold text-[#416177]">2000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Diabetes patients supported</span>
                  <span className="font-bold text-[#416177]">1500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cataract surgeries</span>
                  <span className="font-bold text-[#416177]">750+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#E3B01A]">Support Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Elder abuse cases addressed</span>
                  <span className="font-bold text-[#E3B01A]">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Legal aid cases</span>
                  <span className="font-bold text-[#E3B01A]">100+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PAN/ID services</span>
                  <span className="font-bold text-[#E3B01A]">400+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#416177]">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily exercise & yoga</span>
                  <span className="font-bold text-[#416177]">2000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memory clinic patients</span>
                  <span className="font-bold text-[#416177]">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Women caregivers trained</span>
                  <span className="font-bold text-[#416177]">200+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Policy Impact & Recognition */}
      <section className="py-20 bg-[#E3B01A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Policy Impact & Recognition</h2>
            <p className="text-xl text-white/90">Creating systemic change beyond direct services</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8">
                <TrendingUp className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-4">BMC Senior Citizens Policy</h3>
                <p className="text-white/90">
                  Shield Foundation's advocacy work directly contributed to BMC passing a comprehensive Senior Citizens Policy, 
                  benefiting thousands of elderly across Mumbai.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-4">FESCOM Leadership</h3>
                <p className="text-white/90">
                  Our founder was elected as President of FESCOM (Senior Advocacy Network), 
                  amplifying our voice in senior citizen welfare at the city level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Expansion */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expansion Roadmap</h2>
            <p className="text-xl text-gray-600">Scaling our impact across Maharashtra and beyond</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#416177]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#416177] flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Phase 2: Mankhurd
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#416177] mb-1">2000</div>
                  <div className="text-sm text-gray-600">Senior citizens target per year</div>
                </div>
                <p className="text-gray-600">
                  Comprehensive services including physiotherapy, psychiatry, eye care, home-based care, and OPDs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E3B01A]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#E3B01A] flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Phase 3: Nagpur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#E3B01A] mb-1">Vidarbha</div>
                  <div className="text-sm text-gray-600">Region expansion target</div>
                </div>
                <p className="text-gray-600">
                  Replicating our proven senior citizen model to serve rural and urban communities in Vidarbha region.
                </p>
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