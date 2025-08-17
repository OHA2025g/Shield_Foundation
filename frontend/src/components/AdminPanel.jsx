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
  FileText, 
  TrendingUp,
  Calendar,
  Eye,
  Save,
  X
} from 'lucide-react';
import { mockData, mockAPI } from '../mock';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState(mockData.news);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    status: 'draft'
  });

  // Check authentication
  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      navigate('/admin');
      return;
    }
    setCurrentUser(JSON.parse(adminUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  const handleAddNews = async () => {
    try {
      const response = await mockAPI.addNews(newsForm);
      if (response.success) {
        setNews([response.data, ...news]);
        setNewsForm({ title: '', content: '', status: 'draft' });
        setShowNewsForm(false);
        toast({
          title: "Success",
          description: "News article added successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add news article.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateNews = async () => {
    try {
      const response = await mockAPI.updateNews(editingNews.id, newsForm);
      if (response.success) {
        setNews(news.map(n => n.id === editingNews.id ? response.data : n));
        setNewsForm({ title: '', content: '', status: 'draft' });
        setEditingNews(null);
        toast({
          title: "Success",
          description: "News article updated successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news article.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;
    
    try {
      const response = await mockAPI.deleteNews(id);
      if (response.success) {
        setNews(news.filter(n => n.id !== id));
        toast({
          title: "Success",
          description: "News article deleted successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news article.",
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
              <Shield className="h-8 w-8 text-[#416177] mr-3" />
              <div>
                <h1 className="text-xl font-bold text-[#416177]">Shield Foundation</h1>
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
                        <Users className="h-8 w-8 text-[#416177]" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {mockData.impactStats.youthTrained.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Youth Trained</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-[#E3B01A]" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {mockData.impactStats.youthPlaced.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Youth Placed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-[#416177]" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {mockData.impactStats.seniorsSupported.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Seniors Supported</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-[#E3B01A]" />
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {mockData.impactStats.womenEmpowered}
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
                        <Calendar className="h-5 w-5 text-[#416177] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">New physiotherapy unit launched in Dharavi</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-[#E3B01A] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">25 youth completed CRS training program</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-[#416177] mt-0.5" />
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
                    className="bg-[#416177] hover:bg-[#335259] text-white"
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
                            className="bg-[#416177] hover:bg-[#335259] text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {editingNews ? 'Update' : 'Save'}
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
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Content management features will be available in the full version. 
                      This includes editing homepage sections, program descriptions, and other static content.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Homepage Hero Section</span>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">About Us Page</span>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Programs Information</span>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
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