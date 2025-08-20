// Mock data for Shield Foundation website

export const mockData = {
  // Homepage Impact Statistics
  impactStats: {
    youthTrained: 1300,
    youthPlaced: 1000,
    seniorsSupported: 6000,
    womenEmpowered: 200
  },

  // Programs Data
  programs: {
    youthSkilling: {
      title: "Youth Skilling & Livelihood Programs",
      description: "Partnership with Tech Mahindra Foundation (TMF) under the SMART Program",
      courses: [
        {
          id: 1,
          name: "CRS (Customer Relationship & Retail Sales)",
          duration: "4 months (Classroom + OJT)",
          avgSalary: "₹13,946/month",
          employers: "45+ Employers including Amazon, ICICI Bank, Pantaloons"
        },
        {
          id: 2,
          name: "ITES-BPO (Information Technology Enabled Services)",
          duration: "4 months (Classroom + OJT)",
          avgSalary: "₹12,132/month",
          employers: "40+ Employers including Teleperformance, Quess Corp"
        },
        {
          id: 3,
          name: "Nursing Assistant (General Duty Assistant)",
          duration: "6 months (Classroom + OJT)",
          avgSalary: "₹8,700/month",
          employers: "Healthcare facilities and hospitals"
        }
      ]
    },
    seniorCitizens: {
      title: "Senior Citizens Projects",
      description: "Multi-Service Support Centers for the Elderly",
      services: [
        {
          id: 1,
          category: "Medical Support",
          items: ["General OPD", "Free cataract OPD & surgery", "Memory Clinics & psychiatric treatment", "Physiotherapy Units (supported by ARCIL)"]
        },
        {
          id: 2,
          category: "Wellness & Lifestyle",
          items: ["Daily exercise & yoga for 2000 seniors", "Educational workshops & info sessions", "Games, cultural events & picnics"]
        },
        {
          id: 3,
          category: "Counselling & Legal Aid",
          items: ["Elder abuse support – handled 500+ cases", "100+ legal aid cases supported", "400+ PAN/ID services facilitated"]
        }
      ]
    }
  },

  // Success Stories
  successStories: [
    {
      id: 1,
      name: "Ulka Kebhavi",
      program: "ITES-BPO",
      achievement: "Placed as a Telecaller at Finbross Marketing Pvt Ltd with a CTC of ₹15,500/month",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    }
  ],

  // Impact Highlights
  impactHighlights: [
    { metric: "2000+", description: "seniors treated for heart conditions" },
    { metric: "1500+", description: "diabetes patients supported" },
    { metric: "3000+", description: "cataract screenings conducted" },
    { metric: "750+", description: "free cataract surgeries performed" },
    { metric: "500+", description: "seniors engaged in memory clinic & psychiatric care" }
  ],

  // Partners
  partners: [
    "Tech Mahindra Foundation", "ARCIL", "ONGC", "ACC Ltd", "UNICEF/MDACS", 
    "UnLtd India", "Rotary Clubs", "Concern India Foundation", "Volkart Foundation"
  ],

  // News/Updates (for admin panel)
  news: [
    {
      id: 1,
      title: "New Physiotherapy Unit Launched in Dharavi",
      content: "Shield Foundation in collaboration with ARCIL has launched a new physiotherapy unit at Matunga Labour Camp.",
      date: "2024-08-15",
      status: "published",
      author: "Admin"
    },
    {
      id: 2,
      title: "1000+ Youth Successfully Placed",
      content: "Shield Foundation achieves milestone of placing over 1000 youth through its SMART Program initiatives.",
      date: "2024-08-10",
      status: "published",
      author: "Admin"
    }
  ],

  // Blog Posts
  blogPosts: [
    {
      id: 1,
      title: "Transforming Lives Through Youth Skilling: A Journey of Hope",
      excerpt: "Discover how Shield Foundation's partnership with Tech Mahindra Foundation is creating pathways to employment for underprivileged youth in Mumbai.",
      content: `
        <p>At Shield Foundation, we believe that every young person deserves a chance to build a meaningful career, regardless of their background. Our partnership with Tech Mahindra Foundation under the SMART Program has been instrumental in transforming the lives of over 1,300 youth in Mumbai's underserved communities.</p>
        
        <h3>The Challenge</h3>
        <p>Many young people in communities like Dharavi face significant barriers to employment - lack of formal education, limited access to skill training, and few connections to potential employers. Without intervention, these talented individuals often remain trapped in cycles of poverty.</p>
        
        <h3>Our Solution</h3>
        <p>Through our comprehensive training programs - Customer Relationship Associate (CRA), ITES-BPO, and Nursing Assistant - we provide not just skills training, but holistic support including:</p>
        <ul>
          <li>45-90 days of intensive classroom and on-the-job training</li>
          <li>Soft skills development and communication training</li>
          <li>Interview preparation and placement support</li>
          <li>Ongoing mentorship and career guidance</li>
        </ul>
        
        <h3>Real Impact</h3>
        <p>The numbers speak for themselves - 77% placement rate with average salaries ranging from ₹8,700 to ₹13,946 per month. But behind each statistic is a story of transformation, hope, and new beginnings.</p>
      `,
      author: "Swati Ingole",
      authorRole: "Founder & Director",
      publishDate: "2024-08-18",
      category: "Youth Development",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      tags: ["Youth Skilling", "Employment", "Social Impact"],
      status: "published"
    },
    {
      id: 2,
      title: "Aging with Dignity: Our Comprehensive Senior Care Approach",
      excerpt: "Learn about Shield Foundation's multi-service support centers and how we're revolutionizing elderly care in urban communities.",
      content: `
        <p>As India's population ages, ensuring that our senior citizens live with dignity and receive comprehensive care has become more critical than ever. Shield Foundation's senior citizen services represent a holistic approach to elderly care that goes beyond basic healthcare.</p>
        
        <h3>A Multi-Dimensional Approach</h3>
        <p>Our senior care program addresses four key areas:</p>
        
        <h4>1. Healthcare Services</h4>
        <p>Regular health checkups, specialized medical consultations, and our partnership with ARCIL for physiotherapy services ensure that physical health needs are met.</p>
        
        <h4>2. Recreational Activities</h4>
        <p>Daily exercise sessions, yoga classes, indoor games, and cultural programs help maintain mental and physical wellness while fostering community connections.</p>
        
        <h4>3. Legal & Psychosocial Support</h4>
        <p>Elder abuse support, legal counseling, and psychological support address the often-overlooked emotional and legal needs of seniors.</p>
        
        <h4>4. Welfare Services</h4>
        <p>Assistance with government schemes, pension applications, and healthcare navigation ensures seniors can access the benefits they deserve.</p>
        
        <h3>The ARCIL Partnership</h3>
        <p>Our collaboration with ARCIL has been particularly impactful, with our physiotherapy unit treating 150+ patients weekly and generating ₹1.96 lakhs in monthly revenue while providing essential services to the community.</p>
      `,
      author: "Dr. Rajesh Kumar",
      authorRole: "Senior Medical Advisor",
      publishDate: "2024-08-15",
      category: "Senior Care",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      tags: ["Senior Care", "Healthcare", "Community Support"],
      status: "published"
    },
    {
      id: 3,
      title: "Building Partnerships for Sustainable Impact",
      excerpt: "Explore how strategic collaborations with organizations like Tech Mahindra Foundation and ARCIL amplify our reach and effectiveness.",
      content: `
        <p>No organization can create lasting social change in isolation. At Shield Foundation, our strategic partnerships have been instrumental in scaling our impact and ensuring the sustainability of our programs.</p>
        
        <h3>The Power of Collaboration</h3>
        <p>Our partnerships go beyond funding - they bring expertise, networks, and shared commitment to social change. Each collaboration is carefully designed to leverage the strengths of all parties involved.</p>
        
        <h3>Key Partnerships</h3>
        
        <h4>Tech Mahindra Foundation - Youth Skilling</h4>
        <p>This partnership under the SMART Program has enabled us to:</p>
        <ul>
          <li>Access cutting-edge training curricula</li>
          <li>Connect with a network of 45+ employers</li>
          <li>Ensure industry-relevant skill development</li>
          <li>Achieve a 77% placement rate</li>
        </ul>
        
        <h4>ARCIL - Healthcare Innovation</h4>
        <p>Our collaboration with ARCIL for physiotherapy services demonstrates how partnerships can create win-win situations - providing essential healthcare while generating revenue for program sustainability.</p>
        
        <h3>Looking Forward</h3>
        <p>As we plan our expansion to Mankhurd and Nagpur, partnerships will continue to be crucial. We're actively seeking collaborators who share our vision of dignified living for all community members.</p>
      `,
      author: "Priya Sharma",
      authorRole: "Training Program Manager",
      publishDate: "2024-08-12",
      category: "Partnerships",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
      tags: ["Partnerships", "Collaboration", "Sustainability"],
      status: "published"
    },
    {
      id: 4,
      title: "Expansion Plans: Taking Our Model to New Communities",
      excerpt: "Shield Foundation announces ambitious expansion plans to Mankhurd and Nagpur, bringing proven programs to serve more communities.",
      content: `
        <p>Success in Dharavi has validated our approach to community empowerment. Now, we're ready to scale our proven model to reach more communities across Maharashtra and beyond.</p>
        
        <h3>Phase 2: Mankhurd - Youth Focus</h3>
        <p>Our Mankhurd expansion will primarily focus on youth skilling programs, targeting 500+ youth annually. This location was chosen for its strategic importance and the significant youth population in need of skill development opportunities.</p>
        
        <h3>Phase 3: Nagpur - Comprehensive Care</h3>
        <p>Nagpur represents our vision for comprehensive community care, combining both youth skilling and senior citizen services. This will be our first full-service center outside Mumbai.</p>
        
        <h3>Lessons Learned</h3>
        <p>Our expansion is informed by six years of experience in Dharavi. We've learned the importance of:</p>
        <ul>
          <li>Community engagement from day one</li>
          <li>Local partnership development</li>
          <li>Culturally sensitive program adaptation</li>
          <li>Sustainable funding models</li>
        </ul>
        
        <h3>How You Can Support</h3>
        <p>These expansion plans require significant investment in infrastructure, staff training, and community outreach. We're seeking partners and supporters who believe in our mission of adding life to years.</p>
      `,
      author: "Swati Ingole",
      authorRole: "Founder & Director",
      publishDate: "2024-08-08",
      category: "Expansion",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
      tags: ["Expansion", "Community Development", "Scale"],
      status: "draft"
    }
  ],

  // Comprehensive Site Content Management
  siteContent: {
    homepage: {
      hero: {
        title: "Shield Foundation",
        subtitle: "Adding Life to Years",
        description: "Empowering youth through skill development and caring for seniors with dignity in Mumbai's underserved communities.",
        primaryButton: "Support Our Mission",
        secondaryButton: "Become a Volunteer",
        backgroundImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=800&fit=crop"
      },
      programs: {
        title: "Our Programs",
        subtitle: "Transforming lives through comprehensive support",
        youthProgram: {
          title: "Youth Skilling & Livelihoods",
          description: "In partnership with Tech Mahindra Foundation, we provide comprehensive training programs that transform young lives.",
          buttonText: "Learn More",
          icon: "GraduationCap"
        },
        seniorProgram: {
          title: "Senior Citizens Care",
          description: "Multi-service support centers providing healthcare, recreational activities, and social support for our elderly community.",
          buttonText: "Get Involved",
          icon: "Heart"
        }
      },
      successStory: {
        title: "Success Stories",
        subtitle: "Real impact, real transformation",
        featured: {
          name: "Priya Sharma",
          program: "ITES-BPO Graduate",
          story: "From unemployment to a fulfilling career - Priya's journey showcases the transformative power of skill development.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
        }
      },
      newsletter: {
        title: "Stay Connected",
        description: "Join our newsletter to receive updates on our programs, success stories, and ways to get involved.",
        buttonText: "Subscribe Now"
      }
    },
    about: {
      hero: {
        title: "About Shield Foundation",
        subtitle: "Our Story of Impact and Transformation",
        description: "For over 6 years, we've been dedicated to adding life to years through youth empowerment and senior care."
      },
      story: {
        title: "Our Story",
        content: "Founded with the vision of creating meaningful change in Mumbai's underserved communities, Shield Foundation has grown from a small initiative to a comprehensive support system. Our journey began with recognizing the dual challenge of youth unemployment and inadequate senior care in urban slums.",
        highlightBox: {
          text: "6+ Years Serving Communities",
          subtext: "Transforming lives daily"
        }
      },
      mission: {
        title: "Mission",
        content: "To empower underprivileged youth through skill development and employment opportunities while ensuring dignified care and support for senior citizens.",
        icon: "Target"
      },
      vision: {
        title: "Vision", 
        content: "A society where every young person has access to meaningful employment and every senior citizen lives with dignity, respect, and comprehensive care.",
        icon: "Eye"
      },
      values: {
        title: "Values",
        content: "Integrity, Compassion, Excellence, Community Impact, Sustainable Development, and Inclusive Growth guide everything we do.",
        icon: "Star"
      },
      team: [
        {
          name: "Swati Ingole",
          role: "Founder & Director",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
          description: "Visionary leader with over 8 years in social work"
        }
      ],
      timeline: [
        {
          year: "2018",
          title: "Foundation Established",
          description: "Shield Foundation was founded with the mission to serve Mumbai's underserved communities."
        },
        {
          year: "2019", 
          title: "First Youth Batch",
          description: "Successfully trained and placed our first batch of 35 youth in various sectors."
        },
        {
          year: "2020",
          title: "Senior Care Launch",
          description: "Launched comprehensive senior citizen care services with daily activities and medical support."
        },
        {
          year: "2021",
          title: "Tech Mahindra Partnership",
          description: "Partnered with Tech Mahindra Foundation to scale youth skilling programs."
        },
        {
          year: "2022",
          title: "ARCIL Collaboration",
          description: "Started physiotherapy services in partnership with ARCIL, serving 150+ patients weekly."
        },
        {
          year: "2024",
          title: "Expansion Planning",
          description: "Planning expansion to Mankhurd and Nagpur to serve more communities."
        }
      ]
    },
    programs: {
      hero: {
        title: "Our Programs",
        subtitle: "Comprehensive Solutions for Community Empowerment",
        description: "Comprehensive training and support services designed to empower youth and care for seniors"
      },
      youthSkilling: {
        title: "Youth Skilling & Livelihoods",
        subtitle: "In partnership with Tech Mahindra Foundation",
        description: "Our comprehensive training programs transform young lives through skill development and employment opportunities.",
        courses: [
          {
            name: "Customer Relationship Associate (CRA)",
            duration: "45 days",
            batchSize: "35-40 students", 
            description: "Comprehensive customer service and communication skills training"
          },
          {
            name: "ITES-BPO",
            duration: "45 days",
            batchSize: "35-40 students",
            description: "Information Technology Enabled Services and Business Process Outsourcing"
          },
          {
            name: "General Duty Assistant (Nursing)",
            duration: "90 days",
            batchSize: "25-30 students",
            description: "Basic nursing and healthcare assistance training"
          }
        ],
        statistics: {
          youthTrained: "1300+",
          youthPlaced: "1000+", 
          employerPartners: "45+",
          trainingBatches: "40+"
        }
      },
      seniorCare: {
        title: "Senior Citizens Services",
        subtitle: "Multi-Service Support Centers for Comprehensive Elderly Care",
        description: "Our senior care program addresses healthcare, recreational, legal, and welfare needs of elderly community members.",
        services: [
          {
            category: "Healthcare Services",
            items: ["Regular health checkups", "Medical consultations", "Free cataract surgeries", "Physiotherapy"]
          },
          {
            category: "Recreational Activities", 
            items: ["Daily exercise & yoga", "Indoor games", "Cultural programs", "Social gatherings"]
          },
          {
            category: "Legal & Psychosocial",
            items: ["Elder abuse support", "Legal counseling", "Psychological support", "Family mediation"]
          },
          {
            category: "Welfare Services",
            items: ["Government scheme enrollment", "Pension assistance", "Healthcare navigation", "Documentation support"]
          }
        ]
      },
      arcilPartnership: {
        title: "ARCIL Collaboration - Physiotherapy Unit",
        description: "Our partnership with ARCIL provides specialized physiotherapy services to the community.",
        services: [
          "Physiotherapy for mobility issues",
          "Chronic pain management", 
          "Stroke rehabilitation",
          "Arthritis treatment",
          "Balance and fall prevention"
        ],
        statistics: {
          weeklyPatients: "150/week",
          monthlyRevenue: "₹1.96L"
        }
      },
      expansion: {
        title: "Expansion Plans",
        subtitle: "Scaling our impact to serve more communities",
        phase2: {
          title: "Phase 2: Mankhurd",
          description: "Extending youth skilling programs",
          target: "500+ youth annually",
          status: "Launch planned for 2024"
        },
        phase3: {
          title: "Phase 3: Nagpur", 
          description: "Senior citizen services expansion",
          focus: "Comprehensive elderly care",
          status: "Planning phase underway"
        }
      }
    },
    impact: {
      hero: {
        title: "Our Impact",
        subtitle: "Measuring Success Through Lives Transformed",
        description: "Measuring our success through the lives we've touched and the communities we've empowered"
      },
      overallStats: {
        title: "Overall Impact",
        subtitle: "Key metrics that define our success"
      },
      youthImpact: {
        title: "Youth Skilling Impact", 
        subtitle: "Transforming lives through skill development",
        placementRate: "77%",
        salaryRanges: {
          crs: "₹13,946/month",
          ites: "₹12,132/month", 
          nursing: "₹8,700/month"
        }
      },
      seniorImpact: {
        title: "Senior Citizens Impact",
        subtitle: "Comprehensive care and support services"
      },
      geographic: {
        title: "Geographic Reach",
        subtitle: "Expanding our impact across communities",
        current: {
          location: "Mumbai (Dharavi)",
          description: "Our flagship location with comprehensive youth training and senior care services."
        },
        expansion: {
          title: "Expansion Plans", 
          description: "Mankhurd and Nagpur expansion to serve more communities with our proven model.",
          locations: "3"
        }
      }
    },
    gallery: {
      hero: {
        title: "Gallery",
        subtitle: "Capturing Moments of Impact and Transformation", 
        description: "Visual stories of our programs, events, and the lives we've touched"
      },
      categories: [
        { id: "all", name: "All Media", icon: "Grid" },
        { id: "photos", name: "Photos", icon: "Camera" },
        { id: "videos", name: "Videos", icon: "Video" },
        { id: "events", name: "Events", icon: "Calendar" },
        { id: "stories", name: "Success Stories", icon: "Heart" }
      ],
      statistics: {
        photos: "500+",
        events: "50+",
        videos: "25+", 
        stories: "100+"
      }
    },
    contact: {
      hero: {
        title: "Contact Us",
        subtitle: "Get in Touch - We're Here to Help",
        description: "Ready to make a difference? Reach out to learn more about our programs or get involved."
      },
      contactInfo: {
        email: "shieldfoundation@gmail.com",
        phone: "+91 98334 06288",
        address: "Dharavi, Mumbai, Maharashtra, India"
      },
      officeHours: {
        title: "Office Hours",
        weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
        weekends: "Saturday: 10:00 AM - 4:00 PM",
        closed: "Sunday: Closed"
      },
      quickActions: {
        title: "Quick Actions",
        subtitle: "Take immediate action to support our cause",
        donate: {
          title: "Donate Now",
          description: "Support our programs with a donation"
        },
        partner: {
          title: "Partner With Us", 
          description: "Explore partnership opportunities"
        },
        share: {
          title: "Share Our Mission",
          description: "Help us reach more people"
        }
      }
    }
  },

  // Contact Information
  contact: {
    founder: "Mrs. Swati Ingole",
    title: "Founder & Director – Shield Foundation",
    email: "shieldfoundation@gmail.com",
    phone: "+91 98334 06288",
    address: "Dharavi, Mumbai, Maharashtra"
  },

  // Admin users (for login mock)
  adminUsers: [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      role: "super_admin",
      name: "Shield Admin"
    }
  ]
};

// Mock API functions
export const mockAPI = {
  // Contact form submission
  submitContactForm: (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        resolve({ success: true, message: 'Thank you for your message. We will get back to you soon!' });
      }, 1000);
    });
  },

  // Volunteer registration
  submitVolunteerForm: (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Volunteer form submitted:', formData);
        resolve({ success: true, message: 'Thank you for registering as a volunteer!' });
      }, 1000);
    });
  },

  // Newsletter signup
  subscribeNewsletter: (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Newsletter subscription:', email);
        resolve({ success: true, message: 'Successfully subscribed to newsletter!' });
      }, 800);
    });
  },

  // Admin login
  adminLogin: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockData.adminUsers.find(u => 
          u.username === credentials.username && u.password === credentials.password
        );
        if (user) {
          resolve({ success: true, user: { ...user, password: undefined } });
        } else {
          reject({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  },

  // Admin - Add/Update news
  addNews: (newsData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNews = {
          id: Date.now(),
          ...newsData,
          date: new Date().toISOString().split('T')[0],
          author: 'Admin'
        };
        mockData.news.unshift(newNews);
        resolve({ success: true, data: newNews });
      }, 800);
    });
  },

  // Admin - Update news
  updateNews: (id, newsData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.news.findIndex(n => n.id === id);
        if (index !== -1) {
          mockData.news[index] = { ...mockData.news[index], ...newsData };
          resolve({ success: true, data: mockData.news[index] });
        } else {
          resolve({ success: false, message: 'News not found' });
        }
      }, 800);
    });
  },

  // Admin - Delete news
  deleteNews: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData.news.findIndex(n => n.id === id);
        if (index !== -1) {
          mockData.news.splice(index, 1);
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'News not found' });
        }
      }, 500);
    });
  }
};