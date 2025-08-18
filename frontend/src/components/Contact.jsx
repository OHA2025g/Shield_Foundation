import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Heart, Users, HandHeart, UserPlus } from 'lucide-react';
import { api } from '../api';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    interests: [],
    experience: ''
  });

  const [activeForm, setActiveForm] = useState('contact');
  const [loading, setLoading] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'youth-program', label: 'Youth Training Programs' },
    { value: 'senior-services', label: 'Senior Citizen Services' },
    { value: 'partnership', label: 'Partnership/CSR' },
    { value: 'donation', label: 'Donation Inquiry' },
    { value: 'media', label: 'Media/Press' }
  ];

  const volunteerInterests = [
    { id: 'youth-training', label: 'Youth Training Support' },
    { id: 'senior-care', label: 'Senior Citizen Care' },
    { id: 'events', label: 'Events & Activities' },
    { id: 'administration', label: 'Administrative Support' },
    { id: 'healthcare', label: 'Healthcare Services' },
    { id: 'legal-aid', label: 'Legal Aid' }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Debug: Log form data
    console.log('Contact form data:', contactForm);
    
    // Check if required fields are filled
    if (!contactForm.inquiryType) {
      toast({
        title: "Error",
        description: "Please select an inquiry type.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.submitContactForm(contactForm);
      toast({
        title: "Success",
        description: response.message,
      });
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Handle FastAPI validation errors properly
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            // Handle Pydantic validation errors
            const validationErrors = error.response.data.detail.map(err => {
              const field = err.loc?.join(' ') || 'field';
              return `${field}: ${err.msg}`;
            }).join(', ');
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof error.response.data.detail === 'string') {
            errorMessage = error.response.data.detail;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!volunteerForm.availability) {
      toast({
        title: "Error",
        description: "Please select your availability.",
        variant: "destructive",
      });
      return;
    }
    
    if (volunteerForm.interests.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one area of interest.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.submitVolunteerForm(volunteerForm);
      toast({
        title: "Success",
        description: response.message,
      });
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        interests: [],
        experience: ''
      });
    } catch (error) {
      console.error('Volunteer form error:', error);
      
      // Handle FastAPI validation errors properly
      let errorMessage = "Failed to submit volunteer application. Please try again.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            // Handle Pydantic validation errors
            const validationErrors = error.response.data.detail.map(err => {
              const field = err.loc?.join(' ') || 'field';
              return `${field}: ${err.msg}`;
            }).join(', ');
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof error.response.data.detail === 'string') {
            errorMessage = error.response.data.detail;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleInterestChange = (interestId, checked) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us to learn more about our programs, volunteer opportunities, or partnership possibilities
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us a message anytime</p>
                <a 
                  href="mailto:shieldfoundation@gmail.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  shieldfoundation@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our team</p>
                <a 
                  href="tel:+919833406288"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  +91 98334 06288
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-[#416177] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Come see our work firsthand</p>
                <p className="text-gray-800 font-medium">Dharavi, Mumbai, Maharashtra</p>
              </CardContent>
            </Card>
          </div>

          {/* Office Hours */}
          <Card className="bg-gray-50 mb-16">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-[#416177] mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Office Hours</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Training Centers</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Senior Citizen Centers</h4>
                  <p className="text-gray-600">Monday - Saturday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sunday: Emergency services only</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Forms */}
      <section id="contact-form-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <Button
                variant={activeForm === 'contact' ? 'default' : 'ghost'}
                onClick={() => setActiveForm('contact')}
                className={`mr-2 ${activeForm === 'contact' ? 'bg-[#416177] text-white' : ''}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                General Contact
              </Button>
              <Button
                variant={activeForm === 'volunteer' ? 'default' : 'ghost'}
                onClick={() => setActiveForm('volunteer')}
                className={activeForm === 'volunteer' ? 'bg-[#E3B01A] text-white' : ''}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Volunteer Application
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeForm === 'contact' ? (
              /* Contact Form */
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#416177] flex items-center">
                    <Mail className="h-6 w-6 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Your full name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Inquiry Type *
                        </label>
                        <Select
                          value={contactForm.inquiryType}
                          onValueChange={(value) => setContactForm({...contactForm, inquiryType: value})}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Subject *
                      </label>
                      <Input
                        placeholder="Brief subject of your message"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                        rows={6}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-[#416177] hover:bg-[#335259] text-white py-3"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              /* Volunteer Form */
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#E3B01A] flex items-center">
                    <HandHeart className="h-6 w-6 mr-2" />
                    Volunteer Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Your full name"
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Availability *
                        </label>
                        <Select
                          value={volunteerForm.availability}
                          onValueChange={(value) => setVolunteerForm({...volunteerForm, availability: value})}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="flexible">Flexible Schedule</SelectItem>
                            <SelectItem value="specific">Specific Days/Times</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Skills & Expertise
                      </label>
                      <Input
                        placeholder="e.g., Teaching, Healthcare, Administration, IT, etc."
                        value={volunteerForm.skills}
                        onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Areas of Interest (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {volunteerInterests.map((interest) => (
                          <div key={interest.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest.id}
                              checked={volunteerForm.interests.includes(interest.id)}
                              onCheckedChange={(checked) => handleInterestChange(interest.id, checked)}
                            />
                            <label
                              htmlFor={interest.id}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {interest.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Previous Volunteer Experience
                      </label>
                      <Textarea
                        placeholder="Tell us about any previous volunteer work or relevant experience..."
                        value={volunteerForm.experience}
                        onChange={(e) => setVolunteerForm({...volunteerForm, experience: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-[#E3B01A] hover:bg-[#d4a117] text-white py-3"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">Other ways to get involved</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-[#E3B01A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Make a Donation</h3>
                <p className="text-gray-600 mb-6">Support our programs with a financial contribution</p>
                <Button 
                  className="bg-[#E3B01A] hover:bg-[#d4a117] text-white"
                  onClick={() => {
                    // For now, scroll to contact form and show donation message
                    const contactFormSection = document.getElementById('contact-form-section');
                    if (contactFormSection) {
                      contactFormSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Show toast message about donation
                    toast({
                      title: "Thank you for your interest!",
                      description: "Please use the contact form below to inquire about donations, or call us directly at +91 98334 06288.",
                    });
                  }}
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-[#416177] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Partnership</h3>
                <p className="text-gray-600 mb-6">Explore CSR opportunities with Shield Foundation</p>
                <Button 
                  variant="outline" 
                  className="border-[#416177] text-[#416177] hover:bg-[#416177] hover:text-white"
                  onClick={() => {
                    // Scroll to contact form for partnership inquiries
                    const contactFormSection = document.getElementById('contact-form-section');
                    if (contactFormSection) {
                      contactFormSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    toast({
                      title: "Corporate Partnership",
                      description: "Please use the contact form below to inquire about CSR opportunities and partnerships.",
                    });
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <HandHeart className="h-12 w-12 text-[#E3B01A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Spread the Word</h3>
                <p className="text-gray-600 mb-6">Share our mission with your network</p>
                <Button 
                  variant="outline" 
                  className="border-[#E3B01A] text-[#E3B01A] hover:bg-[#E3B01A] hover:text-white"
                  onClick={() => {
                    // Simple share functionality using Web Share API or fallback
                    if (navigator.share) {
                      navigator.share({
                        title: 'Shield Foundation',
                        text: 'Support Shield Foundation - Adding Life to Years through youth skilling and senior citizen care.',
                        url: window.location.origin,
                      }).catch(console.error);
                    } else {
                      // Fallback: copy URL to clipboard
                      navigator.clipboard.writeText(window.location.origin).then(() => {
                        toast({
                          title: "URL Copied!",
                          description: "Shield Foundation website URL has been copied to your clipboard. Share it with others!",
                        });
                      }).catch(() => {
                        toast({
                          title: "Share Shield Foundation",
                          description: "Visit us at " + window.location.origin + " and help spread our mission!",
                        });
                      });
                    }
                  }}
                >
                  Share
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

export default Contact;