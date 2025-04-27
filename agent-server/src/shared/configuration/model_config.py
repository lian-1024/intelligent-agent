from dataclasses import dataclass
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

class ModelConfig(BaseModel):
    model: str = Field(
        default="glm-4-flash:zhipuai",
        title="模型名称以及平台"
    )  
    
    max_token: int = Field(
        default=6000,
        title="最大token数量"
    )
    
    temperature: int = Field(
        default=0,
        title="模型温度值"
    )

