from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routers import tickets

app = FastAPI(title="Help Desk System API")

# Allow frontend (Next.js) later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later we can restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "Help Desk API with Tickets ✅"}


app.include_router(tickets.router)
