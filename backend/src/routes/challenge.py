#one route to generate the challange , one for challange history, one to get the current qouta#
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..ai_generator import generate_challenge_with_ai
from ..database.db import (
    get_challenge_quota,
    create_challenge,
    create_challenge_quota,
    reset_quota_if_needed,
    get_user_challenges
)
from ..utils import authenticate_and_get_user_details
from ..database.models import get_db
import json
from datetime import datetime

router = APIRouter()


class ChallengeRequest(BaseModel):
    difficulty: str

    class Config:
        json_schema_extra = {"example": {"difficulty": "easy"}}
# the schema -> some thing that the FastAPi can use to validate that the data being sent to the endpoint is correct
# so when the user want to create the challenge we went to know the difficulty of it and must be string

#in short term ->   1. Validates incoming JSON data to make sure it includes a difficulty string.
#                   2. Helps automatically generate docs with an example value.
#------------------------------------------------------------------------------------------------------------#
# generate challenge API
@router.post("/generate-challenge")
async def generate_challenge(request: ChallengeRequest, request_obj: Request, db: Session = Depends(get_db)):
    try:
        user_details = authenticate_and_get_user_details(request_obj)#authenticte the user and get the user who has the request
        user_id = user_details.get("user_id")

        quota = get_challenge_quota(db, user_id) # check the qouta remaing to generate challenge
        if not quota:
            quota = create_challenge_quota(db, user_id)

        quota = reset_quota_if_needed(db, quota)# reset the qouta if it been more than 24 hours

        if quota.quota_remaining <= 0:
            raise HTTPException(status_code=429, detail="Quota exhausted")
        
        # othewise genrate the challenge
        challenge_data = generate_challenge_with_ai(request.difficulty)

        new_challenge = create_challenge(
            db=db,
            difficulty=request.difficulty,
            created_by=user_id,
            title=challenge_data["title"],
            options=json.dumps(challenge_data["options"]),
            correct_answer_id=challenge_data["correct_answer_id"],
            explanation=challenge_data["explanation"]
        )

        quota.quota_remaining -= 1
        db.commit()

        return {
            "id": new_challenge.id,
            "difficulty": request.difficulty,
            "title": new_challenge.title,
            "options": json.loads(new_challenge.options),
            "correct_answer_id": new_challenge.correct_answer_id,
            "explanation": new_challenge.explanation,
            "timestamp": new_challenge.date_created.isoformat()
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

#------------------------------------------------------------------------------------------------------------#
# get challenge history
@router.get("/my-history")
async def my_history(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    challenges = get_user_challenges(db, user_id) #pass db and user id
    return {"challenges": challenges}

#------------------------------------------------------------------------------------------------------------#
# get current qouta
@router.get("/quota")
async def get_quota(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    quota = get_challenge_quota(db, user_id)
    if not quota:
        return {
            "user_id": user_id,
            "quota_remaining": 0,
            "last_reset_date": datetime.now()
        }

    quota = reset_quota_if_needed(db, quota)
    return quota