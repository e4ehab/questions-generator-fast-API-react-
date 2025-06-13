from src.app import app

if __name__ == "__main__":
    import uvicorn     
    #if we run this file directly then import uvicorn (web server allow us to serve our fastapi application)
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # run this on the local host
