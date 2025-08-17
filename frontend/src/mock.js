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