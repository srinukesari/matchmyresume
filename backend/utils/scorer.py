from sentence_transformers import SentenceTransformer, util
import spacy
from spacy.lang.en.stop_words import STOP_WORDS

model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load("en_core_web_sm")

def score_resume_jd(resume_text: str, jd_text: str) -> float:
    # Encode texts
    embeddings_resume = model.encode(resume_text, convert_to_tensor=True)
    embeddings_jd = model.encode(jd_text, convert_to_tensor=True)

    # Cosine similarity
    cosine_score = util.pytorch_cos_sim(embeddings_resume, embeddings_jd)
    score = float(cosine_score.item()) * 100  # scale 0-100

    return round(score, 2)

# Add noisy terms that should never appear as keywords
BLACKLIST = {
    "summary", "description", "hands", "experience", "profile", "work",
    "details", "objectives", "introduction", "responsibilities", "activities",
    "strengths", "team", "career", "goals"
}

def extract_keywords(text: str) -> set:
    doc = nlp(text.lower())
    keywords = set()

    for chunk in doc.noun_chunks:
        cleaned = chunk.text.strip()

        if (
            len(cleaned) >= 3 and
            cleaned not in STOP_WORDS and
            not any(word in STOP_WORDS for word in cleaned.split()) and
            not cleaned.isnumeric() and
            cleaned not in BLACKLIST and
            not any(bad in cleaned for bad in BLACKLIST)
        ):
            keywords.add(cleaned)

    return keywords

def analyze_resume(resume_text: str, jd_text: str) -> dict:
    # Score with embedding similarity
    embeddings_resume = model.encode(resume_text, convert_to_tensor=True)
    embeddings_jd = model.encode(jd_text, convert_to_tensor=True)
    score = float(util.pytorch_cos_sim(embeddings_resume, embeddings_jd))
    score = round(score * 100, 2)

    # Keyword match analysis
    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(jd_text)

    matched = list(jd_keywords & resume_keywords)
    gaps = list(jd_keywords - resume_keywords)

    # Simple suggestions
    suggestions = [f"Consider adding experience with '{kw}'" for kw in gaps[:5]]

    return {
        "score": score,
        "matched_keywords": matched[:10],
        "missing_keywords": gaps[:10],
        "suggestions": suggestions
    }