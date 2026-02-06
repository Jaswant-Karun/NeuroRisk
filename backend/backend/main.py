from fastapi import FastAPI
from backend.core.database import Base, engine
from backend.routers import risk

app = FastAPI()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(risk.router)
