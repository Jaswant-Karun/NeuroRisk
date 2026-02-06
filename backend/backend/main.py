from fastapi import FastAPI
from backend.routers import risk
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI(title="Neuroadaptive Mental Health Risk Detection")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(risk.router)

@app.get("/health")
def health():
    return {"status": "running"}
