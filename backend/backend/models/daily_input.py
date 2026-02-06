from sqlalchemy import Column, Integer, Date
from backend.core.database import Base

class DailyInput(Base):
    __tablename__ = "daily_inputs"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)

    focus_difficulty = Column(Integer, nullable=False)
    mental_exhaustion = Column(Integer, nullable=False)
    sleep_disruption = Column(Integer, nullable=False)
    workload = Column(Integer, nullable=False)
    emotional_friction = Column(Integer, nullable=False)
