
from openai import OpenAI
import os

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
    'communication', "computer science fundamentals", "bachelor’s degree", "communication skills"
}


def extract_keywords(client,text):
    prompt = f"""
Extract the most relevant keywords from the following text. Focus on important skills, technologies, roles, and industries. Return them as a comma-separated list.

Text:
\"\"\"
{text}
\"\"\"
"""
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant who extracts keywords from job-related documents."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    keywords = response.choices[0].message.content.strip()
    keywords = [kw.strip() for kw in keywords.split(",")]
    keywords = [kw.lower() for kw in keywords if kw.lower() not in BLACKLIST and len(kw) > 2]

    return keywords


