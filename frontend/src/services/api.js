const BASE_URL = "http://127.0.0.1:8000";

export async function fetchRiskStatus() {
  const res = await fetch(`${BASE_URL}/risk/status`);
  return res.json();
}

export async function fetchRiskHistory() {
  const res = await fetch(`${BASE_URL}/risk/history`);
  return res.json();
}

export async function submitDailyInput(data) {
  const res = await fetch(`${BASE_URL}/risk/daily-input`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}
