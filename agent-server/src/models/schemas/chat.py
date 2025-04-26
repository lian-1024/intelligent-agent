from typing import Union
from pydantic import BaseModel


class ChatBody(BaseModel):
    input: str
    session_id: Union[str,int]