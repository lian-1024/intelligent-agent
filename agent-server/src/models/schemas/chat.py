from typing import List, Union
from pydantic import BaseModel


class ChatRequest(BaseModel):
    input: str
    session_id: Union[str,int]
    
class ChatRequestWithImages(ChatRequest):
    images: List[str] = None