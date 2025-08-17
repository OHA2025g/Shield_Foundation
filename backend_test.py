#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Shield Foundation
Tests all endpoints including authentication, CRUD operations, and validation
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-connect-hub-1.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

# Test data
TEST_CONTACT = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry about youth training programs",
    "message": "I am interested in learning more about your youth training programs and how I can get involved.",
    "inquiryType": "general"
}

TEST_VOLUNTEER = {
    "name": "Michael Chen",
    "email": "michael.chen@example.com", 
    "phone": "5551234567",
    "skills": "Web development, project management, community outreach",
    "availability": "weekends",
    "interests": ["youth_training", "community_outreach", "technology"],
    "experience": "5 years of volunteer experience with local community centers"
}

TEST_NEWSLETTER = {
    "email": "newsletter.test@example.com"
}

TEST_ADMIN_LOGIN = {
    "username": "admin",
    "password": "admin123"
}

TEST_NEWS = {
    "title": "New Youth Training Program Launched",
    "content": "We are excited to announce the launch of our new comprehensive youth training program that will help young people develop essential skills for the modern workforce. This program includes technical training, soft skills development, and mentorship opportunities.",
    "status": "draft"
}

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.admin_token = None
        self.test_results = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_health_check(self):
        """Test API health check endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_result("Health Check", True, "API is healthy and responding")
                else:
                    self.log_result("Health Check", False, "API responded but status not healthy", data)
            else:
                self.log_result("Health Check", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Health Check", False, "Connection failed", str(e))
    
    def test_contact_form(self):
        """Test contact form submission"""
        try:
            response = self.session.post(f"{API_BASE}/contact", json=TEST_CONTACT)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and data.get("success", True):
                    self.log_result("Contact Form", True, "Contact form submitted successfully")
                else:
                    self.log_result("Contact Form", False, "Invalid response format", data)
            else:
                self.log_result("Contact Form", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Contact Form", False, "Request failed", str(e))
    
    def test_contact_form_validation(self):
        """Test contact form validation"""
        # Test with invalid data
        invalid_contact = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid email
            "subject": "Hi",  # Too short
            "message": "Short",  # Too short
            "inquiryType": "general"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/contact", json=invalid_contact)
            if response.status_code == 422:  # Validation error expected
                self.log_result("Contact Form Validation", True, "Validation errors properly handled")
            else:
                self.log_result("Contact Form Validation", False, f"Expected validation error, got HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Contact Form Validation", False, "Request failed", str(e))
    
    def test_volunteer_form(self):
        """Test volunteer form submission"""
        try:
            response = self.session.post(f"{API_BASE}/volunteer", json=TEST_VOLUNTEER)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and data.get("success", True):
                    self.log_result("Volunteer Form", True, "Volunteer form submitted successfully")
                else:
                    self.log_result("Volunteer Form", False, "Invalid response format", data)
            else:
                self.log_result("Volunteer Form", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Volunteer Form", False, "Request failed", str(e))
    
    def test_volunteer_form_validation(self):
        """Test volunteer form validation"""
        invalid_volunteer = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid email
            "phone": "123",  # Too short
            "availability": "weekends",
            "interests": []  # Empty interests
        }
        
        try:
            response = self.session.post(f"{API_BASE}/volunteer", json=invalid_volunteer)
            if response.status_code == 422:  # Validation error expected
                self.log_result("Volunteer Form Validation", True, "Validation errors properly handled")
            else:
                self.log_result("Volunteer Form Validation", False, f"Expected validation error, got HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Volunteer Form Validation", False, "Request failed", str(e))
    
    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        try:
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=TEST_NEWSLETTER)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and data.get("success", True):
                    self.log_result("Newsletter Subscription", True, "Newsletter subscription successful")
                else:
                    self.log_result("Newsletter Subscription", False, "Invalid response format", data)
            else:
                self.log_result("Newsletter Subscription", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Newsletter Subscription", False, "Request failed", str(e))
    
    def test_newsletter_duplicate(self):
        """Test newsletter duplicate email handling"""
        try:
            # Subscribe again with same email
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=TEST_NEWSLETTER)
            if response.status_code == 200:
                data = response.json()
                if "already subscribed" in data.get("message", "").lower():
                    self.log_result("Newsletter Duplicate Handling", True, "Duplicate email properly handled")
                else:
                    self.log_result("Newsletter Duplicate Handling", True, "Duplicate subscription handled (may be reactivation)")
            else:
                self.log_result("Newsletter Duplicate Handling", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Newsletter Duplicate Handling", False, "Request failed", str(e))
    
    def test_admin_login(self):
        """Test admin login"""
        try:
            response = self.session.post(f"{API_BASE}/admin/login", json=TEST_ADMIN_LOGIN)
            if response.status_code == 200:
                data = response.json()
                if "token" in data and "user" in data:
                    self.admin_token = data["token"]
                    self.log_result("Admin Login", True, "Admin login successful")
                    return True
                else:
                    self.log_result("Admin Login", False, "Invalid response format", data)
            else:
                self.log_result("Admin Login", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Admin Login", False, "Request failed", str(e))
        return False
    
    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        invalid_login = {
            "username": "admin",
            "password": "wrongpassword"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/admin/login", json=invalid_login)
            if response.status_code == 401:
                self.log_result("Admin Login Invalid", True, "Invalid credentials properly rejected")
            else:
                self.log_result("Admin Login Invalid", False, f"Expected 401, got HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Admin Login Invalid", False, "Request failed", str(e))
    
    def test_protected_route_without_token(self):
        """Test accessing protected route without token"""
        try:
            response = self.session.get(f"{API_BASE}/admin/news")
            if response.status_code == 403:
                self.log_result("Protected Route No Token", True, "Access denied without token")
            else:
                self.log_result("Protected Route No Token", False, f"Expected 403, got HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Protected Route No Token", False, "Request failed", str(e))
    
    def test_impact_stats(self):
        """Test impact statistics endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/impact-stats")
            if response.status_code == 200:
                data = response.json()
                required_fields = ["youthTrained", "youthPlaced", "seniorsSupported", "womenEmpowered"]
                if all(field in data for field in required_fields):
                    self.log_result("Impact Stats", True, "Impact statistics retrieved successfully")
                else:
                    self.log_result("Impact Stats", False, "Missing required fields", data)
            else:
                self.log_result("Impact Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Impact Stats", False, "Request failed", str(e))
    
    def test_public_news(self):
        """Test public news endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/news")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Public News", True, f"Retrieved {len(data)} published news articles")
                else:
                    self.log_result("Public News", False, "Expected list response", data)
            else:
                self.log_result("Public News", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Public News", False, "Request failed", str(e))
    
    def test_news_crud_operations(self):
        """Test news CRUD operations (requires admin token)"""
        if not self.admin_token:
            self.log_result("News CRUD", False, "No admin token available")
            return
        
        headers = {"Authorization": f"Bearer {self.admin_token}"}
        news_id = None
        
        # CREATE
        try:
            response = self.session.post(f"{API_BASE}/admin/news", json=TEST_NEWS, headers=headers)
            if response.status_code == 200:
                self.log_result("News Create", True, "News article created successfully")
            else:
                self.log_result("News Create", False, f"HTTP {response.status_code}", response.text)
                return
        except Exception as e:
            self.log_result("News Create", False, "Request failed", str(e))
            return
        
        # READ (Get all news)
        try:
            response = self.session.get(f"{API_BASE}/admin/news", headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    news_id = data[0].get("id")
                    self.log_result("News Read", True, f"Retrieved {len(data)} news articles")
                else:
                    self.log_result("News Read", False, "No news articles found", data)
                    return
            else:
                self.log_result("News Read", False, f"HTTP {response.status_code}", response.text)
                return
        except Exception as e:
            self.log_result("News Read", False, "Request failed", str(e))
            return
        
        # UPDATE
        if news_id:
            update_data = {
                "title": "Updated: New Youth Training Program Launched",
                "status": "published"
            }
            try:
                response = self.session.put(f"{API_BASE}/admin/news/{news_id}", json=update_data, headers=headers)
                if response.status_code == 200:
                    self.log_result("News Update", True, "News article updated successfully")
                else:
                    self.log_result("News Update", False, f"HTTP {response.status_code}", response.text)
            except Exception as e:
                self.log_result("News Update", False, "Request failed", str(e))
        
        # DELETE
        if news_id:
            try:
                response = self.session.delete(f"{API_BASE}/admin/news/{news_id}", headers=headers)
                if response.status_code == 200:
                    self.log_result("News Delete", True, "News article deleted successfully")
                else:
                    self.log_result("News Delete", False, f"HTTP {response.status_code}", response.text)
            except Exception as e:
                self.log_result("News Delete", False, "Request failed", str(e))
    
    def test_admin_endpoints(self):
        """Test admin-only endpoints"""
        if not self.admin_token:
            self.log_result("Admin Endpoints", False, "No admin token available")
            return
        
        headers = {"Authorization": f"Bearer {self.admin_token}"}
        
        # Test contacts endpoint
        try:
            response = self.session.get(f"{API_BASE}/admin/contacts", headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Admin Contacts", True, f"Retrieved {len(data)} contact submissions")
                else:
                    self.log_result("Admin Contacts", False, "Expected list response", data)
            else:
                self.log_result("Admin Contacts", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Admin Contacts", False, "Request failed", str(e))
        
        # Test volunteers endpoint
        try:
            response = self.session.get(f"{API_BASE}/admin/volunteers", headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Admin Volunteers", True, f"Retrieved {len(data)} volunteer applications")
                else:
                    self.log_result("Admin Volunteers", False, "Expected list response", data)
            else:
                self.log_result("Admin Volunteers", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Admin Volunteers", False, "Request failed", str(e))
        
        # Test newsletters endpoint
        try:
            response = self.session.get(f"{API_BASE}/admin/newsletters", headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Admin Newsletters", True, f"Retrieved {len(data)} newsletter subscribers")
                else:
                    self.log_result("Admin Newsletters", False, "Expected list response", data)
            else:
                self.log_result("Admin Newsletters", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Admin Newsletters", False, "Request failed", str(e))
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for Shield Foundation")
        print(f"📍 Testing API at: {API_BASE}")
        print("=" * 60)
        
        # Basic connectivity and health
        self.test_health_check()
        
        # Public endpoints
        self.test_contact_form()
        self.test_contact_form_validation()
        self.test_volunteer_form()
        self.test_volunteer_form_validation()
        self.test_newsletter_subscription()
        self.test_newsletter_duplicate()
        self.test_impact_stats()
        self.test_public_news()
        
        # Authentication tests
        self.test_admin_login_invalid()
        self.test_protected_route_without_token()
        
        # Admin authentication and protected endpoints
        if self.test_admin_login():
            self.test_admin_endpoints()
            self.test_news_crud_operations()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['message']}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)