import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// PUBLIC API FUNCTIONS
export const api = {
  // Contact form submission
  submitContactForm: async (formData) => {
    const response = await apiClient.post('/contact', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      inquiryType: formData.inquiryType || 'general'
    });
    return response.data;
  },

  // Volunteer registration
  submitVolunteerForm: async (formData) => {
    const response = await apiClient.post('/volunteer', formData);
    return response.data;
  },

  // Newsletter signup
  subscribeNewsletter: async (email) => {
    const response = await apiClient.post('/newsletter/subscribe', { email });
    return response.data;
  },

  // Get published news
  getPublishedNews: async () => {
    const response = await apiClient.get('/news');
    return response.data;
  },

  // Get impact statistics
  getImpactStats: async () => {
    const response = await apiClient.get('/impact-stats');
    return response.data;
  },

  // ADMIN API FUNCTIONS
  admin: {
    // Admin login
    login: async (credentials) => {
      const response = await apiClient.post('/admin/login', credentials);
      if (response.data.success && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      }
      return response.data;
    },

    // Admin logout
    logout: () => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    },

    // Get contacts
    getContacts: async () => {
      const response = await apiClient.get('/admin/contacts');
      return response.data;
    },

    // Get volunteers
    getVolunteers: async () => {
      const response = await apiClient.get('/admin/volunteers');
      return response.data;
    },

    // Get newsletter subscribers
    getNewsletterSubscribers: async () => {
      const response = await apiClient.get('/admin/newsletters');
      return response.data;
    },

    // Get all news (including drafts)
    getAllNews: async () => {
      const response = await apiClient.get('/admin/news');
      return response.data;
    },

    // Create news
    createNews: async (newsData) => {
      const response = await apiClient.post('/admin/news', newsData);
      return response.data;
    },

    // Update news
    updateNews: async (id, newsData) => {
      const response = await apiClient.put(`/admin/news/${id}`, newsData);
      return response.data;
    },

    // Delete news
    deleteNews: async (id) => {
      const response = await apiClient.delete(`/admin/news/${id}`);
      return response.data;
    },

    // Update impact statistics
    updateImpactStats: async (statsData) => {
      const response = await apiClient.put('/admin/impact-stats', statsData);
      return response.data;
    },

    // Get site content
    getSiteContent: async () => {
      const response = await apiClient.get('/admin/site-content');
      return response.data;
    },

    // Update site content
    updateSiteContent: async (contentData) => {
      const response = await apiClient.put('/admin/site-content', { content: contentData });
      return response.data;
    },

    // Update contact information
    updateContactInfo: async (contactData) => {
      const response = await apiClient.put('/admin/contact-info', contactData);
      return response.data;
    }
  }
};