from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
#CORSMiddleware -> allow the frontend to send requests to backend
from clerk_backend_api import Clerk
import os

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))#must have .env with the key
# tell clerk that we are the owners of the application because we have the secret key ,
# so we can do the tooken operations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #allow orgins -> means allow any one to send requests to the backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
