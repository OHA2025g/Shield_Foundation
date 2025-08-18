import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Users, Award, Target, Eye, Star, CheckCircle } from 'lucide-react';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Mrs. Swati Ingole",
      role: "Founder & Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      description: "Visionary leader with over 15 years of experience in social development and community empowerment."
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Medical Advisor",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      description: "Leading geriatrician specializing in senior citizen healthcare and physiotherapy services."
    },
    {
      name: "Ms. Priya Sharma",
      role: "Training Program Manager",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      description: "Expert in vocational training with focus on youth skill development and employment placement."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every individual with empathy and understanding, recognizing their unique dignity and worth."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of community support and collective action to create lasting change."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in our programs and services, ensuring quality outcomes."
    },
    {
      icon: Target,
      title: "Impact",
      description: "We focus on measurable results that create meaningful improvements in people's lives."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Foundation Established",
      description: "Shield Foundation founded by Mrs. Swati Ingole with the mission to serve vulnerable communities."
    },
    {
      year: "2019",
      title: "First Training Center",
      description: "Launched our first youth training center in partnership with Tech Mahindra Foundation."
    },
    {
      year: "2020",
      title: "Senior Care Program",
      description: "Started comprehensive senior citizen services in Dharavi with medical and social support."
    },
    {
      year: "2021",
      title: "1000 Youth Milestone",
      description: "Achieved the milestone of training and placing 1000+ youth in meaningful employment."
    },
    {
      year: "2022",
      title: "ARCIL Partnership",
      description: "Collaborated with ARCIL to establish physiotherapy units for senior citizens."
    },
    {
      year: "2023",
      title: "Policy Influence",
      description: "Contributed to BMC passing a comprehensive Senior Citizens Policy for Mumbai."
    },
    {
      year: "2024",
      title: "Expansion Planning",
      description: "Initiated expansion plans for Mankhurd and Nagpur to serve more communities."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Shield Foundation</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A Mumbai-based non-profit organization dedicated to adding life to years through community empowerment
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Shield Foundation was founded by Mrs. Swati Ingole with a clear mission: <em>"To add life to years – 
                equipping and empowering communities so that every individual, especially the elderly and vulnerable, 
                can live with dignity till the end of life irrespective of socio-economic status."</em>
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a vision to serve the most vulnerable in our society has evolved into a comprehensive 
                organization with two major focus areas: youth skilling programs that create pathways to employment, 
                and senior citizen services that ensure dignified aging.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Over the years, we have built impactful partnerships and served thousands of individuals, 
                always staying true to our core belief that every person deserves to live with dignity and purpose.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop"
                alt="Shield Foundation Community Work"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">6+ Years</div>
                <div className="text-sm">Serving Communities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600">The principles that guide our work</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <Card className="h-full">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl text-blue-600">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To add life to years – equipping and empowering communities so that every individual, 
                  especially the elderly and vulnerable, can live with dignity till the end of life 
                  irrespective of socio-economic status.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="h-full">
              <CardHeader>
                <Eye className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle className="text-2xl text-yellow-600">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  A society where every individual has access to opportunities for skill development, 
                  meaningful employment, and comprehensive care that ensures dignity and well-being 
                  throughout their life journey.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="h-full">
              <CardHeader>
                <Star className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl text-blue-600">Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Compassion, Excellence, Integrity, Community Partnership, and Sustainable Impact 
                  drive everything we do, ensuring that our work creates lasting positive change 
                  in the communities we serve.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values Detail */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <IconComponent className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to our mission</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-500">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth and impact</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Center timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-blue-600 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>
                  
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      index % 2 === 0 
                        ? 'md:ml-0' 
                        : 'md:mr-0'
                    }`}>
                      <CardContent className="p-6 relative">
                        {/* Arrow pointing to timeline */}
                        <div className={`absolute top-8 hidden md:block ${
                          index % 2 === 0 
                            ? 'right-0 transform translate-x-full' 
                            : 'left-0 transform -translate-x-full'
                        }`}>
                          <div className={`w-0 h-0 ${
                            index % 2 === 0
                              ? 'border-l-[20px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent'
                              : 'border-r-[20px] border-r-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent'
                          }`}></div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Badge className="bg-blue-600 text-white text-sm px-3 py-1 mr-3">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Start and End markers */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 bg-blue-600 rounded-full hidden md:block"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-4 h-4 bg-blue-600 rounded-full hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Partners & Collaborations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">Working together to create lasting impact</p>
          </div>
          
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Trusted Collaborations</h3>
                <p className="text-white/90">
                  Shield Foundation has successfully partnered with leading organizations 
                  to amplify our impact and reach more communities.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                {mockData.partners.map((partner, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm font-medium">{partner}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Our Impact Today</h2>
            <p className="text-xl text-black/80">Lives transformed, communities empowered</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {mockData.impactStats.youthTrained.toLocaleString()}+
              </div>
              <div className="text-white/80">Youth Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {mockData.impactStats.youthPlaced.toLocaleString()}+
              </div>
              <div className="text-white/80">Youth Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {mockData.impactStats.seniorsSupported.toLocaleString()}+
              </div>
              <div className="text-white/80">Seniors Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {mockData.impactStats.womenEmpowered}+
              </div>
              <div className="text-white/80">Women Empowered</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;