from fastapi import FastAPI
from backend.core.database import Base, engine
from backend.routers import risk
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://neuro-risk-three.vercel.app/",
        "https://neuro-risk-git-main-jaswant-karun-s-as-projects.vercel.app/",
        "https://neuro-risk-2t9lwbzln-jaswant-karun-s-as-projects.vercel.app/"  # Netlify/Vercel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(risk.router)
