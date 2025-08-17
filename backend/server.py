from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
import logging
from pathlib import Path
import asyncio

# Import custom modules
from models import *
from auth import *
from database import db, init_database

ROOT_DIR = Path(__file__).parent

# Create the main app
app = FastAPI(title="Shield Foundation API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    await init_database()

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Shield Foundation API is running", "status": "healthy"}

# PUBLIC ENDPOINTS

@api_router.post("/contact", response_model=MessageResponse)
async def submit_contact_form(contact_data: ContactCreate):
    """Submit a contact form"""
    try:
        contact = Contact(**contact_data.dict())
        await db.contacts.insert_one(contact.dict())
        logger.info(f"New contact form submitted: {contact.email}")
        return MessageResponse(message="Thank you for your message. We will get back to you soon!")
    except Exception as e:
        logger.error(f"Contact form submission failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.post("/volunteer", response_model=MessageResponse)
async def submit_volunteer_form(volunteer_data: VolunteerCreate):
    """Submit a volunteer application"""
    try:
        volunteer = Volunteer(**volunteer_data.dict())
        await db.volunteers.insert_one(volunteer.dict())
        logger.info(f"New volunteer application: {volunteer.email}")
        return MessageResponse(message="Thank you for registering as a volunteer!")
    except Exception as e:
        logger.error(f"Volunteer application failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit volunteer application")

@api_router.post("/newsletter/subscribe", response_model=MessageResponse)
async def subscribe_newsletter(newsletter_data: NewsletterSubscribe):
    """Subscribe to newsletter"""
    try:
        # Check if email already exists
        existing = await db.newsletters.find_one({"email": newsletter_data.email})
        if existing:
            if existing.get("is_active"):
                return MessageResponse(message="You are already subscribed to our newsletter!")
            else:
                # Reactivate subscription
                await db.newsletters.update_one(
                    {"email": newsletter_data.email},
                    {"$set": {"is_active": True, "subscribed_at": datetime.utcnow()}}
                )
                return MessageResponse(message="Welcome back! Your newsletter subscription has been reactivated.")
        
        newsletter = Newsletter(**newsletter_data.dict())
        await db.newsletters.insert_one(newsletter.dict())
        logger.info(f"New newsletter subscription: {newsletter.email}")
        return MessageResponse(message="Successfully subscribed to newsletter!")
    except Exception as e:
        logger.error(f"Newsletter subscription failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")

@api_router.get("/news")
async def get_published_news():
    """Get all published news articles"""
    try:
        news_cursor = db.news.find({"status": "published"}).sort("created_at", -1)
        news_list = []
        async for news_item in news_cursor:
            news_list.append({
                "id": news_item.get("id", str(news_item["_id"])),
                "title": news_item["title"],
                "content": news_item["content"],
                "author": news_item["author"],
                "date": news_item["created_at"].isoformat() if news_item.get("created_at") else None,
                "status": news_item["status"]
            })
        return news_list
    except Exception as e:
        logger.error(f"Failed to fetch news: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")

@api_router.get("/impact-stats")
async def get_impact_stats():
    """Get current impact statistics"""
    try:
        stats = await db.impact_stats.find_one({}, sort=[("updated_at", -1)])
        if not stats:
            # Return default stats if none exist
            return {
                "youthTrained": 1300,
                "youthPlaced": 1000, 
                "seniorsSupported": 6000,
                "womenEmpowered": 200
            }
        return {
            "youthTrained": stats.get("youth_trained", 1300),
            "youthPlaced": stats.get("youth_placed", 1000),
            "seniorsSupported": stats.get("seniors_supported", 6000),
            "womenEmpowered": stats.get("women_empowered", 200)
        }
    except Exception as e:
        logger.error(f"Failed to fetch impact stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch impact statistics")

# ADMIN ENDPOINTS

@api_router.post("/admin/login", response_model=LoginResponse)
async def admin_login(login_data: AdminLogin):
    """Admin login"""
    try:
        admin_user = await db.admin_users.find_one({"username": login_data.username})
        if not admin_user or not verify_password(login_data.password, admin_user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Update last login
        await db.admin_users.update_one(
            {"username": login_data.username},
            {"$set": {"last_login": datetime.utcnow()}}
        )
        
        # Create access token
        token = create_access_token({
            "sub": admin_user["username"],
            "role": admin_user["role"]
        })
        
        user_data = AdminUser(
            id=str(admin_user.get("_id")),
            username=admin_user["username"],
            name=admin_user["name"],
            role=admin_user["role"],
            created_at=admin_user.get("created_at", datetime.utcnow()),
            last_login=datetime.utcnow()
        )
        
        return LoginResponse(
            message="Login successful",
            user=user_data,
            token=token
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin login failed: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

@api_router.get("/admin/contacts")
async def get_contacts(current_user: dict = Depends(admin_required)):
    """Get all contact form submissions"""
    try:
        contacts_cursor = db.contacts.find({}).sort("created_at", -1)
        contacts_list = []
        async for contact in contacts_cursor:
            contacts_list.append({
                "id": contact.get("id", str(contact["_id"])),
                "name": contact["name"],
                "email": contact["email"],
                "phone": contact.get("phone"),
                "subject": contact["subject"],
                "message": contact["message"],
                "inquiry_type": contact.get("inquiry_type"),
                "created_at": contact["created_at"].isoformat(),
                "status": contact.get("status", "new")
            })
        return contacts_list
    except Exception as e:
        logger.error(f"Failed to fetch contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

@api_router.get("/admin/volunteers")
async def get_volunteers(current_user: dict = Depends(admin_required)):
    """Get all volunteer applications"""
    try:
        volunteers_cursor = db.volunteers.find({}).sort("created_at", -1)
        volunteers_list = []
        async for volunteer in volunteers_cursor:
            volunteers_list.append({
                "id": volunteer.get("id", str(volunteer["_id"])),
                "name": volunteer["name"],
                "email": volunteer["email"],
                "phone": volunteer["phone"],
                "skills": volunteer.get("skills"),
                "availability": volunteer["availability"],
                "interests": volunteer["interests"],
                "experience": volunteer.get("experience"),
                "created_at": volunteer["created_at"].isoformat(),
                "status": volunteer.get("status", "pending")
            })
        return volunteers_list
    except Exception as e:
        logger.error(f"Failed to fetch volunteers: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch volunteers")

@api_router.get("/admin/newsletters")
async def get_newsletter_subscribers(current_user: dict = Depends(admin_required)):
    """Get all newsletter subscribers"""
    try:
        newsletters_cursor = db.newsletters.find({"is_active": True}).sort("subscribed_at", -1)
        newsletters_list = []
        async for newsletter in newsletters_cursor:
            newsletters_list.append({
                "id": newsletter.get("id", str(newsletter["_id"])),
                "email": newsletter["email"],
                "subscribed_at": newsletter["subscribed_at"].isoformat(),
                "is_active": newsletter["is_active"]
            })
        return newsletters_list
    except Exception as e:
        logger.error(f"Failed to fetch newsletter subscribers: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch newsletter subscribers")

@api_router.post("/admin/news", response_model=MessageResponse)
async def create_news(news_data: NewsCreate, current_user: dict = Depends(admin_required)):
    """Create a new news article"""
    try:
        news = News(**news_data.dict(), author=current_user["username"])
        await db.news.insert_one(news.dict())
        logger.info(f"News article created: {news.title}")
        return MessageResponse(message="News article created successfully!")
    except Exception as e:
        logger.error(f"Failed to create news: {e}")
        raise HTTPException(status_code=500, detail="Failed to create news article")

@api_router.put("/admin/news/{news_id}", response_model=MessageResponse)
async def update_news(news_id: str, news_data: NewsUpdate, current_user: dict = Depends(admin_required)):
    """Update a news article"""
    try:
        update_data = {k: v for k, v in news_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.news.update_one(
            {"id": news_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
            
        logger.info(f"News article updated: {news_id}")
        return MessageResponse(message="News article updated successfully!")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to update news: {e}")
        raise HTTPException(status_code=500, detail="Failed to update news article")

@api_router.delete("/admin/news/{news_id}", response_model=MessageResponse)
async def delete_news(news_id: str, current_user: dict = Depends(admin_required)):
    """Delete a news article"""
    try:
        result = await db.news.delete_one({"id": news_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
            
        logger.info(f"News article deleted: {news_id}")
        return MessageResponse(message="News article deleted successfully!")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete news: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete news article")

@api_router.get("/admin/news")
async def get_all_news(current_user: dict = Depends(admin_required)):
    """Get all news articles (including drafts)"""
    try:
        news_cursor = db.news.find({}).sort("created_at", -1)
        news_list = []
        async for news_item in news_cursor:
            news_list.append({
                "id": news_item.get("id", str(news_item["_id"])),
                "title": news_item["title"],
                "content": news_item["content"],
                "status": news_item["status"],
                "author": news_item["author"],
                "date": news_item["created_at"].isoformat(),
                "updated_at": news_item.get("updated_at", news_item["created_at"]).isoformat()
            })
        return news_list
    except Exception as e:
        logger.error(f"Failed to fetch all news: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")

@api_router.put("/admin/impact-stats", response_model=MessageResponse)
async def update_impact_stats(stats_data: ImpactStatsUpdate, current_user: dict = Depends(admin_required)):
    """Update impact statistics"""
    try:
        update_data = {k: v for k, v in stats_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        update_data["updated_by"] = current_user["username"]
        
        # Upsert - update if exists, create if doesn't
        await db.impact_stats.update_one(
            {},
            {"$set": update_data},
            upsert=True
        )
        
        logger.info(f"Impact stats updated by {current_user['username']}")
        return MessageResponse(message="Impact statistics updated successfully!")
    except Exception as e:
        logger.error(f"Failed to update impact stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to update impact statistics")

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    pass