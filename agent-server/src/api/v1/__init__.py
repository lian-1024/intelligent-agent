from fastapi import APIRouter
from src.api.v1.chat import router as chat_router
from src.api.v1.upload import router as upload_router

api_v1_router = APIRouter()

api_v1_router.include_router(prefix="/chat",router=chat_router)
api_v1_router.include_router(prefix="/upload",router=upload_router)