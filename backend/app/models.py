from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
import datetime

DATABASE_URL = "sqlite:///comments.db"  # Using SQLite for simplicity

Base = declarative_base()

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    comment = Column(String(255), nullable=False)
    topic = Column(String(50), nullable=False)
    author = Column(String(50), nullable=False)
    date = Column(DateTime, default=datetime.datetime.utcnow)

engine = create_engine(DATABASE_URL)
SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

def init_db():
    Base.metadata.create_all(bind=engine)
