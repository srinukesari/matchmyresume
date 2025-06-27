import spacy
from spacy.lang.en.stop_words import STOP_WORDS

nlp = spacy.load("en_core_web_sm")

# Add noisy terms that should never appear as keywords
BLACKLIST = {
    'interactions', 'correspondences', 'programs', 'self-control', 
    'interoperability', 'leadership', 'insight', 'resilience', 'institutions',
    'cooperation', 'certifications', 'alliances', 'details', 'query performance', 
    'profile', 'strategies', 'quality', 'management', 'governance', 'self-actualization', 
    'communications', 'participation', 'self-discovery', 'self-fulfillment', 'self-sufficiency', 
    'self-expression', 'responsibility', 'best practices', 'infrastructures', 'self-confidence', 
    'software', 'strengths', 'qualifications', 'missions', 'structures', 'designs', 'invention', 
    'roles', 'career', 'sustainability', 'aims', 'equipment', 'coordination', 'reviews', 
    'self-sustainability', 'memos', 'goals', 'conflict-resolution', 'flexibility', 'instruments', 
    'discussions', 'new things', 'personal', 'knowledge', 'aspirations', 'learning', 'awareness', 
    'exploration', 'supplies', 'materials', 'teams', 'self-reliance', 'entities', 'self-management', 
    'familiarity', 'scalability', 'skills', 'compatibility', 'self-reflection', 'involvement', 
    'schedule', 'information', 'highlights', 'attributes', 'platforms', 'ambiguity', 'relational', 
    'support', 'integration', 'methods', 'abilities', 'advice', 'assessments', 'experience', 
    'related field', 'oversight', 'capability', 'self-motivation', 'plans', 'self-realization', 
    'capacity-building', 'dialogues', 'records', 'counsel', 'operation', 'contribution', 
    'self-direction', 'motivation', 'work', 'conversations', 'comments', 'background', 'files', 
    'awards', 'technologies', 'self-governance', 'traits', 'influence', 'contact', 'ambitions', 
    'competencies', 'personal-development', 'effectiveness', 'activities', 'problem-solving', 
    'guidelines', 'inspiration', 'end', 'career-development', 'productivity', 'approaches', 
    'growth', 'empowerment', 'self-discipline', 'organizations', 'comprehension', 
    'talent-development', 'documents', 'training', 'functionality', 
    'reliability', 'collaboration', 'letters', 'resources', 'professional-development', 
    'achievements', 'relationships', 'development', 'objectives', 'expertise', 'engagement', 
    'messages', 'study', 'techniques', 'authority', 'analyses', 'self-leadership', 'summary', 
    'exchanges', 'accountability', 'overview', 'suggestions', 'execution', 'tools', 
    'self-awareness', 'interaction', 'self-regulation', 'architectures', 'hands', 'systems', 
    'consultation', 'devices', 'applications', 'efficiency', 'groups', 'implementation', 
    'tactics', 'adaptability', 'self-worth', 'frameworks', 'creativity', 'accessibility', 
    'introduction', 'engagements', 'projects', 'new', 'skill-building', 'team', 'networks', 
    'usability', 'negotiation', 'standards', 'education', 'partnerships', 'processes', 'qualities',
    'persuasion', 'self-organization', 'visions', 'feedback', 'duties', 'reports', 'procedures',
    'policies', 'innovation', 'decision-making', 'aid', 'capabilities', 'summaries', 'self-esteem', 
    'notes', 'evaluations', 'emails', 'self-respect', 'tasks', 'guidance', 'assistance', 
    'understanding', 'discovery', 'references', 'description', 'connections', 'self-improvement', 
    'help', 'responsibilities', 'recommendations', 'targets', 'research', 'performance', 
    'communication', "computer science fundamentals", "bachelor’s degree"
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