#simple function allow us to authenticate using clerk (steps)
# 1. we have front end
# 2. clerk will authenticate us in the frontend
# 3. issue jwt token (json web token)
# 4. this token is sent to the backend
# 5. we need to check if this token is valid so
# 6. from the backend connect to clerk using the secret key we have in .env
# 7. then ask clerk if the token is valid (this way is networkless because we have the value of jwk_key and secret_key)

from fastapi import HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv

load_dotenv()
# this looking for the presence of the .env file and load it for us

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))#must have .env with the key
# tell clerk that we are the owners of the application because we have the secret key ,
# so we can do the tooken operations


def authenticate_and_get_user_details(request):
    try:
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5174"],
                jwt_key=os.getenv("JWT_KEY")
            )
        )#look in the request , find the token we sent and use the secret key to check if the token is valid

        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")

        user_id = request_state.payload.get("sub")   # figure out which user is sending what request to the backend server

        return {"user_id": user_id}  # This sends back a response with the user's ID.
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    #in an easier way -> Get the user ID from the request data, return it, and if there's a problem, return an error.

