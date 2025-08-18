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