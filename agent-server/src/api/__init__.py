from fastapi import APIRouter
from src.api.v1 import api_v1_router

api_router = APIRouter()

api_router.include_router(prefix="/v1",router=api_v1_router)