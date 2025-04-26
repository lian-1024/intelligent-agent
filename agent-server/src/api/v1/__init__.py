from fastapi import APIRouter
from src.api.v1.chat import router as chat_router

api_v1_router = APIRouter()

api_v1_router.include_router(prefix="/chat",router=chat_router)
