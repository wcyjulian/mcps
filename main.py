from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/showtut1", response_class=HTMLResponse)
def showtut1():
    """REST API endpoint that returns HTML text 'Hi there'"""
    "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"
    return "Hi there"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
