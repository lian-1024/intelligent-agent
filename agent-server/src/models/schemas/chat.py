from typing import List, Union
from pydantic import BaseModel
from pydantic import Field



class ChatRequest(BaseModel):
    user_input: str = Field(default="你好", description="用户输入字段")
    file_urls: str = Field(default=None, description="文件url列表")
    stream: bool = Field(default=None, description="是否需要进行流式返回")
    session_id: str = Field(default=None, description="会话 ID")

