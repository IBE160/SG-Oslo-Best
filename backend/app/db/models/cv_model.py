from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.models.base import Base # Importerer Base-klassen

# --- 1. Brukerprofil Modellen ---
class Profile(Base):
    __tablename__ = 'profiles'
    
    id = Column(UUID(as_uuid=True), primary_key=True) 
    email = Column(String, index=True)
    tier = Column(String, default="FREE")

    resumes = relationship("CVEntry", back_populates="owner") 

# --- 2. CV Analyse Modellen ---
class CVEntry(Base):
    __tablename__ = 'cv_entries'

    id = Column(UUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'), nullable=False)
    
    raw_text = Column(Text, nullable=False) 
    
    analysis_json = Column(JSONB) 
    
    created_at = Column(DateTime(timezone=True), default=func.now())
    
    owner = relationship("Profile", back_populates="resumes") 

    def __repr__(self一遍/cv_model.py)
        return f"<CVEntry ID={self.id}, User={self.user_id}>"