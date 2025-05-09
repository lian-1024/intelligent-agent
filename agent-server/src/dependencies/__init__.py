from fastapi import Depends
from src.dependencies.verify_token import verify_token

global_dependencies = [
    Depends(verify_token)
]