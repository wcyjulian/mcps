from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/showtut1", response_class=HTMLResponse)
def showtut1():
    """REST API endpoint that returns HTML text 'Hi there'"""
    return "Hi there"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
