from fastapi import FastAPI, UploadFile, File
from typing import List
from utils.extract import extract_text
from utils.scorer import score_resume_jd, analyze_resume
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

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

class AnalysisRequest(BaseModel):
    resumes: Dict[str, str]
    job_description: str

@app.post("/upload-resumes/")
async def upload_resumes(files: List[UploadFile] = File(...)):
    extracted = {}
    for file in files:
        extracted[file.filename] = extract_text(file)
    return {"resumes": extracted}

@app.post("/upload-jd/")
async def upload_job_description_text(jd_text: str):
    return {"job_description": jd_text}

@app.post("/score-resumes/")
async def score_resumes(data: ScoreRequest):
    results = {}
    for filename, resume_text in data.resumes.items():
        score = score_resume_jd(resume_text, data.job_description)
        results[filename] = score
    sorted_results = dict(sorted(results.items(), key=lambda item: item[1], reverse=True))
    return sorted_results


@app.post("/analyze-resumes/")
async def analyze_resumes(data: AnalysisRequest):
    analysis_results = {}
    for filename, resume_text in data.resumes.items():
        analysis = analyze_resume(resume_text, data.job_description)
        analysis_results[filename] = analysis

    # Find top scoring resume
    top_resume, top_data = max(analysis_results.items(), key=lambda x: x[1]["score"])

    all_resumes = {
        name: analysis["score"]
        for name, analysis in analysis_results.items()
    }

    return {
        "top_resume": top_resume,
        "top_score": top_data["score"],
        "matched_keywords": top_data["matched_keywords"],
        "missing_keywords": top_data["missing_keywords"],
        "suggestions": top_data["suggestions"],
        "results": all_resumes
    }

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 10000))  # fallback if not set
    uvicorn.run("main:app", host="0.0.0.0", port=port)