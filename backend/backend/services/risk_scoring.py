from typing import List

def calculate_daily_score(entry) -> int:
    return (
        entry.focus_difficulty +
        entry.mental_exhaustion +
        entry.sleep_disruption +
        entry.workload +
        entry.emotional_friction
    )


def calculate_baseline(scores: List[int]) -> float:
    if not scores:
        return 0.0
    return sum(scores) / len(scores)


def calculate_trend_delta(today_score: int, baseline: float) -> float:
    delta = today_score - baseline
    return delta if delta > 0 else 0.0


def calculate_persistence(scores, baseline):
    count = 0
    for score in reversed(scores[:-1]):  # exclude today
        if score >= baseline:
            count += 1
        else:
            break
    return count + 1  # include today



def persistence_multiplier(days: int) -> float:
    if days <= 1:
        return 1.0
    elif 2 <= days <= 3:
        return 1.3
    elif 4 <= days <= 6:
        return 1.6
    else:
        return 2.0


def calculate_risk_score(delta: float, days: int) -> float:
    return round(delta * persistence_multiplier(days), 2)


def determine_risk_level(risk_score: float) -> str:
    if risk_score <= 2:
        return "Low"
    elif risk_score <= 5:
        return "Medium"
    else:
        return "High"
