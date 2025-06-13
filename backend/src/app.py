from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
#CORSMiddleware -> allow the frontend to send requests to backend


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #allow orgins -> means allow any one to send requests to the backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
