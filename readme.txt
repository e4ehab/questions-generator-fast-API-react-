for authentication -> clerk
    1. sign into clerk on our front end
    2. clerk is going to authorize the user and is going to issue us an authentication token
    3. that token we can then use to send to the backend, and our backend can go and ask clerk
        * if the back end says valid, then the user has the premission to acccess our backend service

//------------------------------------------------------------------------------------------------------------//
for python dependencies we use -> (uv) insted of .venv or conda
    -> cd backend -> uv init 
    it will automatically create those files (.gitignore , .python-version, main.py, pyproject.toml, readme.md)

# start adding debendencies -> uv add fastapi uvicorn sqlalchemy python-dotenv clerk-backend-api openai