import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  Shield, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  User,
  FileText, 
  TrendingUp,
  Calendar,
  Eye,
  Save,
  X,
  BookOpen,
  Tag
} from 'lucide-react';
import { mockData } from '../mock';
import { api } from '../api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState([]);
  const [impactStats, setImpactStats] = useState({
    youthTrained: 1300,
    youthPlaced: 1000,
    seniorsSupported: 6000,
    womenEmpowered: 200
  });
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  
  // Blog management state
  const [blogPosts, setBlogPosts] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    image: '',
    status: 'draft'
  });

  // Contact Information Management state
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: 'shieldfoundation@gmail.com',
    phone: '+91 98334 06288',
    address: 'Dharavi, Mumbai, Maharashtra'
  });
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  // Page Content Management state
  const [showPageContentForm, setShowPageContentForm] = useState(false);
  const [editingPageSection, setEditingPageSection] = useState(null);
  const [editingSubSection, setEditingSubSection] = useState(null);
  const [siteContent, setSiteContent] = useState({});
  const [tempSiteContent, setTempSiteContent] = useState({});

  // Check authentication and load data
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    // Check authentication - redirect to login if not authenticated
    if (!adminToken || !adminUser) {
      navigate('/admin');
      return;
    }
    
    // Parse authenticated user data
    const user = JSON.parse(adminUser);
    setCurrentUser(user);
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Load impact statistics
      const stats = await api.getImpactStats();
      setImpactStats(stats);
      
      // Load news if on news tab
      if (activeTab === 'news') {
        const newsData = await api.admin.getAllNews();
        setNews(newsData);
      }
      
      // Always load blog posts and site content for the admin
      loadBlogPosts();
      loadSiteContent();
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  // Load news when switching to news tab
  useEffect(() => {
    if (activeTab === 'news' && currentUser) {
      loadNews();
    }
  }, [activeTab, currentUser]);

  const loadNews = async () => {
    try {
      const newsData = await api.admin.getAllNews();
      setNews(newsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load news articles.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    api.admin.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  const handleAddNews = async () => {
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await api.admin.createNews(newsForm);
      toast({
        title: "Success",
        description: "News article created successfully!",
      });
      setNewsForm({ title: '', content: '', status: 'draft' });
      setShowNewsForm(false);
      loadNews(); // Reload news list
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to create news article.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateNews = async () => {
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await api.admin.updateNews(editingNews.id, newsForm);
      toast({
        title: "Success",
        description: "News article updated successfully!",
      });
      setNewsForm({ title: '', content: '', status: 'draft' });
      setEditingNews(null);
      loadNews(); // Reload news list
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to update news article.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;
    
    try {
      await api.admin.deleteNews(id);
      toast({
        title: "Success",
        description: "News article deleted successfully!",
      });
      loadNews(); // Reload news list
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to delete news article.",
        variant: "destructive",
      });
    }
  };

  const startEdit = (newsItem) => {
    setEditingNews(newsItem);
    setNewsForm({
      title: newsItem.title,
      content: newsItem.content,
      status: newsItem.status
    });
  };

  const cancelEdit = () => {
    setEditingNews(null);
    setNewsForm({ title: '', content: '', status: 'draft' });
    setShowNewsForm(false);
  };

  const handleUpdateImpactStats = async () => {
    setLoading(true);
    try {
      await api.admin.updateImpactStats({
        youth_trained: impactStats.youthTrained,
        youth_placed: impactStats.youthPlaced,
        seniors_supported: impactStats.seniorsSupported,
        women_empowered: impactStats.womenEmpowered
      });
      toast({
        title: "Success",
        description: "Impact statistics updated successfully!",
      });
      // Reload the dashboard data to reflect changes
      loadDashboardData();
    } catch (error) {
      // Handle FastAPI validation errors properly
      let errorMessage = "Failed to update impact statistics.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
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

  // Blog Management Functions
  const loadBlogPosts = () => {
    // Using mock data for now - in production, this would be an API call
    setBlogPosts(mockData.blogPosts || []);
  };

  // Site Content Management Functions
  const loadSiteContent = async () => {
    try {
      // Try to load from backend first
      const backendContent = await api.admin.getSiteContent();
      if (backendContent.content && Object.keys(backendContent.content).length > 0) {
        setSiteContent(backendContent.content);
        setTempSiteContent(backendContent.content);
      } else {
        // Fallback to mock data if no backend content
        setSiteContent(mockData.siteContent || {});
        setTempSiteContent(mockData.siteContent || {});
      }
    } catch (error) {
      console.error('Failed to load site content from backend, using mock data:', error);
      // Fallback to mock data
      setSiteContent(mockData.siteContent || {});
      setTempSiteContent(mockData.siteContent || {});
    }
  };

  useEffect(() => {
    if (activeTab === 'blog' && currentUser) {
      loadBlogPosts();
    }
    if (activeTab === 'content' && currentUser) {
      loadSiteContent();
    }
  }, [activeTab, currentUser]);

  const handleAddBlog = () => {
    const newBlog = {
      id: Date.now(), // Simple ID generation
      ...blogForm,
      author: currentUser.username,
      authorRole: "Admin",
      publishDate: new Date().toISOString().split('T')[0],
      tags: blogForm.tags.filter(tag => tag.trim() !== '')
    };
    
    setBlogPosts([newBlog, ...blogPosts]);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      image: '',
      status: 'draft'
    });
    setShowBlogForm(false);
    
    toast({
      title: "Success",
      description: "Blog post created successfully!",
    });
  };

  const handleUpdateBlog = () => {
    const updatedPosts = blogPosts.map(post => 
      post.id === editingBlog.id 
        ? { ...post, ...blogForm, tags: blogForm.tags.filter(tag => tag.trim() !== '') }
        : post
    );
    
    setBlogPosts(updatedPosts);
    setEditingBlog(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      image: '',
      status: 'draft'
    });
    setShowBlogForm(false);
    
    toast({
      title: "Success",
      description: "Blog post updated successfully!",
    });
  };

  const handleDeleteBlog = (blogId) => {
    const updatedPosts = blogPosts.filter(post => post.id !== blogId);
    setBlogPosts(updatedPosts);
    
    toast({
      title: "Success",
      description: "Blog post deleted successfully!",
    });
  };

  const startEditBlog = (blogPost) => {
    setEditingBlog(blogPost);
    setBlogForm({
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      category: blogPost.category,
      tags: blogPost.tags || [],
      image: blogPost.image || '',
      status: blogPost.status
    });
    setShowBlogForm(true);
  };

  const cancelBlogEdit = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      image: '',
      status: 'draft'
    });
    setShowBlogForm(false);
  };

  const addTag = (tag) => {
    if (tag.trim() && !blogForm.tags.includes(tag.trim())) {
      setBlogForm({
        ...blogForm,
        tags: [...blogForm.tags, tag.trim()]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setBlogForm({
      ...blogForm,
      tags: blogForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Contact Information Management Functions
  const handleEditContact = (field) => {
    setTempContactInfo(contactInfo);
    setShowContactForm(field);
  };

  const handleCancelContactEdit = () => {
    setTempContactInfo(contactInfo);
    setShowContactForm(false);
  };

  // Page Content Management Functions
  const handleEditPageContent = (page, section, subsection = null) => {
    setEditingPageSection(page);
    setEditingSubSection(subsection ? `${section}.${subsection}` : section);
    setTempSiteContent({...siteContent});
    setShowPageContentForm(true);
  };

  const handleSavePageContent = async () => {
    setLoading(true);
    try {
      // Save to backend
      await api.admin.updateSiteContent(tempSiteContent);
      
      // Update local state
      setSiteContent(tempSiteContent);
      setShowPageContentForm(false);
      setEditingPageSection(null);
      setEditingSubSection(null);
      
      toast({
        title: "Success",
        description: "Page content updated successfully!",
      });
    } catch (error) {
      console.error('Failed to save page content:', error);
      toast({
        title: "Error",
        description: "Failed to save page content. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSaveContactInfo = async () => {
    setLoading(true);
    try {
      const contactData = {
        email: tempContactInfo.email,
        phone: tempContactInfo.phone,
        address: tempContactInfo.address
      };
      
      // Save to backend
      await api.admin.updateContactInfo(contactData);
      
      // Update local state
      setContactInfo(tempContactInfo);
      setShowContactForm(false);
      
      // Also update in site content
      const updatedSiteContent = { ...siteContent };
      if (!updatedSiteContent.contact) updatedSiteContent.contact = {};
      updatedSiteContent.contact.contactInfo = contactData;
      setSiteContent(updatedSiteContent);
      
      toast({
        title: "Success",
        description: "Contact information updated successfully!",
      });
    } catch (error) {
      console.error('Failed to save contact info:', error);
      toast({
        title: "Error", 
        description: "Failed to save contact information. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleCancelPageContentEdit = () => {
    setTempSiteContent({...siteContent});
    setShowPageContentForm(false);
    setEditingPageSection(null);
    setEditingSubSection(null);
  };

  const updateSiteContent = (path, value) => {
    const pathArray = path.split('.');
    const newContent = {...tempSiteContent};
    
    let current = newContent;
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) current[pathArray[i]] = {};
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    
    setTempSiteContent(newContent);
  };

  const getSiteContentValue = (path) => {
    const pathArray = path.split('.');
    let current = tempSiteContent;
    
    for (const key of pathArray) {
      if (!current || !current[key]) return '';
      current = current[key];
    }
    return current;
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-blue-600">Shield Foundation</h1>
                <p className="text-sm text-gray-600">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('dashboard')}
                    className="w-full justify-start"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === 'news' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('news')}
                    className="w-full justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    News & Updates
                  </Button>
                  <Button
                    variant={activeTab === 'blog' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('blog')}
                    className="w-full justify-start"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Blog Management
                  </Button>
                  <Button
                    variant={activeTab === 'content' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('content')}
                    className="w-full justify-start"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Content Management
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {impactStats.youthTrained?.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Youth Trained</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-yellow-500" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {impactStats.youthPlaced?.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Youth Placed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {impactStats.seniorsSupported?.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Seniors Supported</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-yellow-500" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {impactStats.womenEmpowered}
                          </div>
                          <div className="text-sm text-gray-600">Women Empowered</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">New physiotherapy unit launched in Dharavi</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">25 youth completed CRS training program</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Monthly impact report published</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">News & Updates</h2>
                  <Button
                    onClick={() => setShowNewsForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add News
                  </Button>
                </div>

                {/* News Form */}
                {(showNewsForm || editingNews) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingNews ? 'Edit News Article' : 'Add New Article'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Title *
                          </label>
                          <Input
                            placeholder="Enter article title"
                            value={newsForm.title}
                            onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Content *
                          </label>
                          <Textarea
                            placeholder="Enter article content"
                            value={newsForm.content}
                            onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                            required
                            rows={6}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Status
                          </label>
                          <Select
                            value={newsForm.status}
                            onValueChange={(value) => setNewsForm({...newsForm, status: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            type="button"
                            onClick={editingNews ? handleUpdateNews : handleAddNews}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? 'Saving...' : (editingNews ? 'Update' : 'Save')}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* News List */}
                <div className="space-y-4">
                  {news.map((article) => (
                    <Card key={article.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                              <Badge
                                variant={article.status === 'published' ? 'default' : 'secondary'}
                                className={article.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {article.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                            <p className="text-sm text-gray-500">
                              Published on {new Date(article.date).toLocaleDateString()} by {article.author}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(article)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteNews(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {news.length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No news articles yet. Create your first article!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                  <Button
                    onClick={() => setShowBlogForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Blog Post
                  </Button>
                </div>

                {/* Blog Form Modal */}
                {showBlogForm && (
                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</span>
                        <Button variant="ghost" size="sm" onClick={cancelBlogEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                          <Input
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                            placeholder="Enter blog post title"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Category</option>
                            <option value="Youth Development">Youth Development</option>
                            <option value="Senior Care">Senior Care</option>
                            <option value="Partnerships">Partnerships</option>
                            <option value="Expansion">Expansion</option>
                            <option value="Community Impact">Community Impact</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                        <Textarea
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                          placeholder="Brief description of the blog post"
                          rows={2}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                        <Input
                          value={blogForm.image}
                          onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {blogForm.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button onClick={() => removeTag(tag)} className="ml-1">
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          placeholder="Add tags (press Enter)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                        <Textarea
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                          placeholder="Write your blog post content here..."
                          rows={10}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={blogForm.status}
                            onChange={(e) => setBlogForm({...blogForm, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button 
                          type="button"
                          onClick={editingBlog ? handleUpdateBlog : handleAddBlog}
                          disabled={loading || !blogForm.title || !blogForm.content}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : (editingBlog ? 'Update Post' : 'Create Post')}
                        </Button>
                        <Button type="button" variant="outline" onClick={cancelBlogEdit}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Blog Posts List */}
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                              {post.category && (
                                <Badge variant="outline">{post.category}</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.publishDate}
                              </span>
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {post.author}
                              </span>
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  <span>{post.tags.slice(0, 3).join(', ')}</span>
                                  {post.tags.length > 3 && <span>+{post.tags.length - 3} more</span>}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditBlog(post)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBlog(post.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {blogPosts.length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No blog posts yet. Create your first blog post!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
                </div>
                
                {/* Impact Statistics Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Impact Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">Update the impact statistics displayed on the homepage and throughout the website.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Youth Trained
                        </label>
                        <Input
                          type="number"
                          value={impactStats.youthTrained || ''}
                          onChange={(e) => setImpactStats({...impactStats, youthTrained: parseInt(e.target.value) || 0})}
                          placeholder="e.g., 1300"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Youth Placed
                        </label>
                        <Input
                          type="number"
                          value={impactStats.youthPlaced || ''}
                          onChange={(e) => setImpactStats({...impactStats, youthPlaced: parseInt(e.target.value) || 0})}
                          placeholder="e.g., 1000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Seniors Supported
                        </label>
                        <Input
                          type="number"
                          value={impactStats.seniorsSupported || ''}
                          onChange={(e) => setImpactStats({...impactStats, seniorsSupported: parseInt(e.target.value) || 0})}
                          placeholder="e.g., 6000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Women Empowered
                        </label>
                        <Input
                          type="number"
                          value={impactStats.womenEmpowered || ''}
                          onChange={(e) => setImpactStats({...impactStats, womenEmpowered: parseInt(e.target.value) || 0})}
                          placeholder="e.g., 200"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={handleUpdateImpactStats}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {loading ? 'Updating...' : 'Update Statistics'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-600">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">Current contact information displayed across the website:</p>
                    
                    {/* Contact Info Edit Form */}
                    {showContactForm && (
                      <Card className="border-2 border-yellow-200 mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>Edit Contact Information</span>
                            <Button variant="ghost" size="sm" onClick={handleCancelContactEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <Input
                              type="email"
                              value={tempContactInfo.email}
                              onChange={(e) => setTempContactInfo({...tempContactInfo, email: e.target.value})}
                              placeholder="Enter email address"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                              type="tel"
                              value={tempContactInfo.phone}
                              onChange={(e) => setTempContactInfo({...tempContactInfo, phone: e.target.value})}
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <Textarea
                              value={tempContactInfo.address}
                              onChange={(e) => setTempContactInfo({...tempContactInfo, address: e.target.value})}
                              placeholder="Enter full address"
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={handleSaveContactInfo}
                              className="bg-yellow-400 hover:bg-yellow-500 text-black"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button variant="outline" onClick={handleCancelContactEdit}>
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-600">{contactInfo.email}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditContact('email')}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <span className="ml-2 text-gray-600">{contactInfo.phone}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditContact('phone')}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-700">Address:</span>
                          <span className="ml-2 text-gray-600">{contactInfo.address}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditContact('address')}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Page Content Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Site Content Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">Edit content for all pages and sections across the website.</p>
                    
                    {/* Content Edit Form */}
                    {showPageContentForm && (
                      <Card className="border-2 border-blue-200 mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>Edit {editingPageSection} - {editingSubSection}</span>
                            <Button variant="ghost" size="sm" onClick={handleCancelPageContentEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Dynamic form rendering based on section */}
                          {editingPageSection === 'homepage' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                  value={getSiteContentValue('homepage.hero.title')}
                                  onChange={(e) => updateSiteContent('homepage.hero.title', e.target.value)}
                                  placeholder="Shield Foundation"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                <Input
                                  value={getSiteContentValue('homepage.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('homepage.hero.subtitle', e.target.value)}
                                  placeholder="Adding Life to Years"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Textarea
                                  value={getSiteContentValue('homepage.hero.description')}
                                  onChange={(e) => updateSiteContent('homepage.hero.description', e.target.value)}
                                  placeholder="Main hero description"
                                  rows={3}
                                />
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button</label>
                                  <Input
                                    value={getSiteContentValue('homepage.hero.primaryButton')}
                                    onChange={(e) => updateSiteContent('homepage.hero.primaryButton', e.target.value)}
                                    placeholder="Support Our Mission"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button</label>
                                  <Input
                                    value={getSiteContentValue('homepage.hero.secondaryButton')}
                                    onChange={(e) => updateSiteContent('homepage.hero.secondaryButton', e.target.value)}
                                    placeholder="Become a Volunteer"
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {editingPageSection === 'homepage' && editingSubSection === 'programs' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <Input
                                  value={getSiteContentValue('homepage.programs.title')}
                                  onChange={(e) => updateSiteContent('homepage.programs.title', e.target.value)}
                                  placeholder="Our Programs"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
                                <Input
                                  value={getSiteContentValue('homepage.programs.subtitle')}
                                  onChange={(e) => updateSiteContent('homepage.programs.subtitle', e.target.value)}
                                  placeholder="Transforming lives through comprehensive support"
                                />
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-900">Youth Program</h4>
                                  <Input
                                    value={getSiteContentValue('homepage.programs.youthProgram.title')}
                                    onChange={(e) => updateSiteContent('homepage.programs.youthProgram.title', e.target.value)}
                                    placeholder="Youth Skilling & Livelihoods"
                                  />
                                  <Textarea
                                    value={getSiteContentValue('homepage.programs.youthProgram.description')}
                                    onChange={(e) => updateSiteContent('homepage.programs.youthProgram.description', e.target.value)}
                                    placeholder="Program description"
                                    rows={2}
                                  />
                                  <Input
                                    value={getSiteContentValue('homepage.programs.youthProgram.buttonText')}
                                    onChange={(e) => updateSiteContent('homepage.programs.youthProgram.buttonText', e.target.value)}
                                    placeholder="Learn More"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-900">Senior Program</h4>
                                  <Input
                                    value={getSiteContentValue('homepage.programs.seniorProgram.title')}
                                    onChange={(e) => updateSiteContent('homepage.programs.seniorProgram.title', e.target.value)}
                                    placeholder="Senior Citizens Care"
                                  />
                                  <Textarea
                                    value={getSiteContentValue('homepage.programs.seniorProgram.description')}
                                    onChange={(e) => updateSiteContent('homepage.programs.seniorProgram.description', e.target.value)}
                                    placeholder="Program description"
                                    rows={2}
                                  />
                                  <Input
                                    value={getSiteContentValue('homepage.programs.seniorProgram.buttonText')}
                                    onChange={(e) => updateSiteContent('homepage.programs.seniorProgram.buttonText', e.target.value)}
                                    placeholder="Get Involved"
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {editingPageSection === 'about' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                  value={getSiteContentValue('about.hero.title')}
                                  onChange={(e) => updateSiteContent('about.hero.title', e.target.value)}
                                  placeholder="About Shield Foundation"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                <Input
                                  value={getSiteContentValue('about.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('about.hero.subtitle', e.target.value)}
                                  placeholder="Our Story of Impact and Transformation"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Textarea
                                  value={getSiteContentValue('about.hero.description')}
                                  onChange={(e) => updateSiteContent('about.hero.description', e.target.value)}
                                  placeholder="Hero section description"
                                  rows={3}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'about' && editingSubSection === 'story' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
                                <Input
                                  value={getSiteContentValue('about.story.title')}
                                  onChange={(e) => updateSiteContent('about.story.title', e.target.value)}
                                  placeholder="Our Story"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Story Content</label>
                                <Textarea
                                  value={getSiteContentValue('about.story.content')}
                                  onChange={(e) => updateSiteContent('about.story.content', e.target.value)}
                                  placeholder="Foundation story and background"
                                  rows={5}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Box Text</label>
                                <Input
                                  value={getSiteContentValue('about.story.highlightBox.text')}
                                  onChange={(e) => updateSiteContent('about.story.highlightBox.text', e.target.value)}
                                  placeholder="6+ Years Serving Communities"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Subtext</label>
                                <Input
                                  value={getSiteContentValue('about.story.highlightBox.subtext')}
                                  onChange={(e) => updateSiteContent('about.story.highlightBox.subtext', e.target.value)}
                                  placeholder="Transforming lives daily"
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'about' && editingSubSection === 'mission' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mission Title</label>
                                <Input
                                  value={getSiteContentValue('about.mission.title')}
                                  onChange={(e) => updateSiteContent('about.mission.title', e.target.value)}
                                  placeholder="Mission"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mission Content</label>
                                <Textarea
                                  value={getSiteContentValue('about.mission.content')}
                                  onChange={(e) => updateSiteContent('about.mission.content', e.target.value)}
                                  placeholder="Mission statement and description"
                                  rows={4}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'about' && editingSubSection === 'vision' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vision Title</label>
                                <Input
                                  value={getSiteContentValue('about.vision.title')}
                                  onChange={(e) => updateSiteContent('about.vision.title', e.target.value)}
                                  placeholder="Vision"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vision Content</label>
                                <Textarea
                                  value={getSiteContentValue('about.vision.content')}
                                  onChange={(e) => updateSiteContent('about.vision.content', e.target.value)}
                                  placeholder="Vision statement and description"
                                  rows={4}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'programs' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <Input
                                  value={getSiteContentValue('programs.hero.title')}
                                  onChange={(e) => updateSiteContent('programs.hero.title', e.target.value)}
                                  placeholder="Our Programs"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                                <Input
                                  value={getSiteContentValue('programs.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('programs.hero.subtitle', e.target.value)}
                                  placeholder="Comprehensive Programs for Community Impact"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
                                <Textarea
                                  value={getSiteContentValue('programs.hero.description')}
                                  onChange={(e) => updateSiteContent('programs.hero.description', e.target.value)}
                                  placeholder="Programs page description"
                                  rows={3}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'impact' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <Input
                                  value={getSiteContentValue('impact.hero.title')}
                                  onChange={(e) => updateSiteContent('impact.hero.title', e.target.value)}
                                  placeholder="Our Impact"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                                <Input
                                  value={getSiteContentValue('impact.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('impact.hero.subtitle', e.target.value)}
                                  placeholder="Measuring Success Through Lives Transformed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
                                <Textarea
                                  value={getSiteContentValue('impact.hero.description')}
                                  onChange={(e) => updateSiteContent('impact.hero.description', e.target.value)}
                                  placeholder="Impact page description"
                                  rows={3}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'gallery' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <Input
                                  value={getSiteContentValue('gallery.hero.title')}
                                  onChange={(e) => updateSiteContent('gallery.hero.title', e.target.value)}
                                  placeholder="Gallery"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                                <Input
                                  value={getSiteContentValue('gallery.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('gallery.hero.subtitle', e.target.value)}
                                  placeholder="Capturing Moments of Impact and Transformation"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
                                <Textarea
                                  value={getSiteContentValue('gallery.hero.description')}
                                  onChange={(e) => updateSiteContent('gallery.hero.description', e.target.value)}
                                  placeholder="Gallery page description"
                                  rows={3}
                                />
                              </div>
                            </>
                          )}

                          {editingPageSection === 'contact' && editingSubSection === 'hero' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <Input
                                  value={getSiteContentValue('contact.hero.title')}
                                  onChange={(e) => updateSiteContent('contact.hero.title', e.target.value)}
                                  placeholder="Contact Us"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                                <Input
                                  value={getSiteContentValue('contact.hero.subtitle')}
                                  onChange={(e) => updateSiteContent('contact.hero.subtitle', e.target.value)}
                                  placeholder="Get in Touch with Shield Foundation"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
                                <Textarea
                                  value={getSiteContentValue('contact.hero.description')}
                                  onChange={(e) => updateSiteContent('contact.hero.description', e.target.value)}
                                  placeholder="Contact page description"
                                  rows={3}
                                />
                              </div>
                            </>
                          )}

                          {/* Add more section editors as needed */}
                          
                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={handleSavePageContent}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button variant="outline" onClick={handleCancelPageContentEdit}>
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Page and Section List */}
                    <div className="space-y-6">
                      {/* Homepage Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Homepage</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">Main title, subtitle, description, and buttons</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('homepage', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Programs Section</span>
                              <p className="text-sm text-gray-600">Program cards, titles, and descriptions</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('homepage', 'programs')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* About Page Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Page</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">About page title and introduction</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('about', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Foundation Story</span>
                              <p className="text-sm text-gray-600">Our story section and highlight box</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('about', 'story')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Mission Statement</span>
                              <p className="text-sm text-gray-600">Mission content and description</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('about', 'mission')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Vision Statement</span>
                              <p className="text-sm text-gray-600">Vision content and description</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('about', 'vision')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Programs Page Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Programs Page</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">Programs page title and introduction</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('programs', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Impact Page Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Page</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">Impact page title and introduction</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('impact', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Gallery Page Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Gallery Page</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">Gallery page title and introduction</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('gallery', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Contact Page Sections */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Page</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                              <span className="font-medium">Hero Section</span>
                              <p className="text-sm text-gray-600">Contact page title and introduction</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPageContent('contact', 'hero')}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* More sections can be added here */}
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 text-sm">
                          ✅ <strong>Content Management System Complete</strong> - All major page sections are now configurable through this admin panel. 
                          You can edit content for Homepage, About, Programs, Impact, Gallery, and Contact pages. Additional sections can be easily added as needed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Submissions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-600">Recent Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">View and manage recent form submissions from visitors.</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">12</div>
                        <div className="text-sm text-gray-600">Contact Forms</div>
                        <div className="text-xs text-gray-500 mt-1">This week</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-500 mb-2">8</div>
                        <div className="text-sm text-gray-600">Volunteer Applications</div>
                        <div className="text-xs text-gray-500 mt-1">This week</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">25</div>
                        <div className="text-sm text-gray-600">Newsletter Signups</div>
                        <div className="text-xs text-gray-500 mt-1">This week</div>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        View All Contacts
                      </Button>
                      <Button variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black">
                        View All Volunteers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;