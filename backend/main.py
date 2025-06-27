from utils.extract import extract_text
from utils.scorer import extract_keywords
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import Dict, List
import os
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from openai import OpenAI
import uvicorn

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScoreRequest(BaseModel):
    resumes: Dict[str, str]
    job_description: str

@app.post("/upload-resumes/")
async def upload_resumes(files: List[UploadFile] = File(...)):
    extracted = {}
    for file in files:
        extracted[file.filename] = extract_text(file)
    return {"resumes": extracted}

def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    response = client.embeddings.create(
        model=model,
        input=text
    )
    return response.data[0].embedding

@app.post("/score")
def score_resumes(payload: ScoreRequest):
    
    jd_embedding = np.array(get_embedding(payload.job_description)).reshape(1, -1)
    scores = {}
    best_filename = None
    best_score = -1

    for filename, resume_text in payload.resumes.items():
        res_embedding = np.array(get_embedding(resume_text)).reshape(1, -1)
        score = float(cosine_similarity(jd_embedding, res_embedding)[0][0])
        scores[filename] = round(score*100, 2)
        if score > best_score:
            best_score = round(score*100, 2)
            best_filename = filename

    # Analytics for top resume
    top_resume_text = payload.resumes[best_filename]
    jd_keywords = set(extract_keywords(payload.job_description))
    res_keywords = set(extract_keywords(top_resume_text))

    missing = list(jd_keywords - res_keywords)

    return {
        "top_resume": best_filename,
        "top_score": best_score,
        "missing_keywords": missing,
        "results": scores
    }

if __name__ == "__main__":
    

    port = int(os.environ.get("PORT", 10000))  # fallback if not set
    uvicorn.run("main:app", host="0.0.0.0", port=port)