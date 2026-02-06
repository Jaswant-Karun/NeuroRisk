from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from backend.core.database import SessionLocal, engine
from backend.models.daily_input import DailyInput
from backend.core.database import Base
from backend.services import risk_scoring

Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/risk", tags=["Risk"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/daily-input")
def add_daily_input(data: dict, db: Session = Depends(get_db)):
    entry = DailyInput(
        date=date.fromisoformat(data["date"]),
        focus_difficulty=data["focus_difficulty"],
        mental_exhaustion=data["mental_exhaustion"],
        sleep_disruption=data["sleep_disruption"],
        workload=data["workload"],
        emotional_friction=data["emotional_friction"],
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    daily_score = risk_scoring.calculate_daily_score(entry)

    return {
        "message": "Daily input saved",
        "daily_score": daily_score
    }


@router.get("/status")
def get_risk_status(db: Session = Depends(get_db)):
    entries = db.query(DailyInput).order_by(DailyInput.date).all()
    latest_entry = entries[-1]

    if not entries:
        return {"message": "No data available"}

    scores = [risk_scoring.calculate_daily_score(e) for e in entries]

    baseline = risk_scoring.calculate_baseline(scores[:-1])
    today_score = scores[-1]

    delta = risk_scoring.calculate_trend_delta(today_score, baseline)
    persistence_days = risk_scoring.calculate_persistence(scores, baseline)
    risk_score = risk_scoring.calculate_risk_score(delta, persistence_days)
    risk_level = risk_scoring.determine_risk_level(risk_score)

    return {
        "baseline": round(baseline, 2),
        "today_score": today_score,
        "trend_delta": round(delta, 2),
        "persistence_days": persistence_days,
        "risk_score": risk_score,
        "risk_level": risk_level,
            "signals": {
        "focus_difficulty": latest_entry.focus_difficulty,
        "mental_exhaustion": latest_entry.mental_exhaustion,
        "sleep_disruption": latest_entry.sleep_disruption,
        "workload": latest_entry.workload,
        "emotional_friction": latest_entry.emotional_friction
    }
    }

@router.get("/history")
def get_risk_history(db: Session = Depends(get_db)):
    entries = db.query(DailyInput).order_by(DailyInput.date).all()

    scores = []
    daily_scores = []

    for e in entries:
        s = risk_scoring.calculate_daily_score(e)
        daily_scores.append({
            "date": e.date.isoformat(),
            "dailyScore": s
        })
        scores.append(s)

    baseline = risk_scoring.calculate_baseline(scores)

    return [
        {
            "date": d["date"],
            "dailyScore": d["dailyScore"],
            "baseline": round(baseline, 2)
        }
        for d in daily_scores
    ]

