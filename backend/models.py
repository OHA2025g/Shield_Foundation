from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    inquiry_type: str = Field(..., alias="inquiryType")

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str]
    subject: str
    message: str
    inquiry_type: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

# Volunteer Models
class VolunteerCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    skills: Optional[str] = Field(None, max_length=500)
    availability: str
    interests: List[str]
    experience: Optional[str] = Field(None, max_length=1000)

class Volunteer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    skills: Optional[str]
    availability: str
    interests: List[str]
    experience: Optional[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")

# Newsletter Models
class NewsletterSubscribe(BaseModel):
    email: EmailStr

class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)

# News Models
class NewsCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    content: str = Field(..., min_length=20, max_length=5000)
    status: str = Field(default="draft")

    @validator('status')
    def validate_status(cls, v):
        if v not in ['draft', 'published']:
            raise ValueError('Status must be either draft or published')
        return v

class NewsUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    content: Optional[str] = Field(None, min_length=20, max_length=5000)
    status: Optional[str] = None

    @validator('status')
    def validate_status(cls, v):
        if v is not None and v not in ['draft', 'published']:
            raise ValueError('Status must be either draft or published')
        return v

class News(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    status: str
    author: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Admin Models
class AdminLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    name: str
    role: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

# Impact Stats Models
class ImpactStatsUpdate(BaseModel):
    youth_trained: Optional[int] = Field(None, ge=0)
    youth_placed: Optional[int] = Field(None, ge=0)
    seniors_supported: Optional[int] = Field(None, ge=0)
    women_empowered: Optional[int] = Field(None, ge=0)

class ImpactStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    youth_trained: int = Field(default=1300)
    youth_placed: int = Field(default=1000)
    seniors_supported: int = Field(default=6000)
    women_empowered: int = Field(default=200)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    updated_by: str

# Response Models
class MessageResponse(BaseModel):
    message: str
    success: bool = True

class LoginResponse(BaseModel):
    message: str
    success: bool = True
    user: AdminUser
    token: str

# Site Content Models
class SiteContentUpdate(BaseModel):
    content: dict  # Flexible structure for site content

class ContactInfoUpdate(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

# Success Stories Models
class SuccessStory(BaseModel):
    id: str
    name: str
    story: str
    image: str
    achievement: str
    location: str
    program: str
    order: int = 0
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class SuccessStoryCreate(BaseModel):
    name: str
    story: str
    image: str
    achievement: str
    location: str
    program: str
    order: int = 0
    is_active: bool = True

class SuccessStoryUpdate(BaseModel):
    name: Optional[str] = None
    story: Optional[str] = None
    image: Optional[str] = None
    achievement: Optional[str] = None
    location: Optional[str] = None
    program: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

# Leadership Team Models
class TeamMember(BaseModel):
    id: str
    name: str
    role: str
    image: str
    description: str
    order: int = 0
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    image: str
    description: str
    order: int = 0
    is_active: bool = True

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    image: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None