# main.py
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from mood_detection import detect_mood
from recommender import get_recommendations
from social import sync_group_mood
from utils import get_user_context

app = FastAPI(title="MoodSync API", description="Mood-aware content recommendation system for Fire TV", version="1.0.0")

# ----- Data Models -----
class MoodInput(BaseModel):
    user_id: str
    text_input: Optional[str] = None
    voice_data: Optional[bytes] = None  # Placeholder
    manual_mood: Optional[str] = None

class RecommendationRequest(BaseModel):
    user_id: str
    mood: Optional[str] = None
    context: Optional[dict] = None
    group_ids: Optional[List[str]] = None

class RecommendationResponse(BaseModel):
    mood: str
    suggestions: List[dict]


# ----- Endpoints -----
@app.post("/detect-mood", summary="Detect user mood")
async def detect_user_mood(mood_input: MoodInput):
    mood = detect_mood(
        user_id=mood_input.user_id,
        text_input=mood_input.text_input,
        voice_data=mood_input.voice_data,
        manual_override=mood_input.manual_mood
    )
    return {"mood": mood}

@app.post("/recommend", response_model=RecommendationResponse, summary="Get mood-aligned recommendations")
async def recommend_content(req: RecommendationRequest):
    # Step 1: If no mood provided, infer from context
    mood = req.mood or detect_mood(user_id=req.user_id)
    context = get_user_context(req.user_id)

    # Step 2: If group_ids exist, find consensus mood
    if req.group_ids:
        mood = sync_group_mood([req.user_id] + req.group_ids)

    # Step 3: Get recommendations
    recommendations = get_recommendations(user_id=req.user_id, mood=mood, context=context)
    return RecommendationResponse(mood=mood, suggestions=recommendations)


@app.get("/", include_in_schema=False)
def home():
    return {"message": "Welcome to MoodSync API"}

# ----- Entry Point -----
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)