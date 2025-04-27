import os
from dotenv import load_dotenv
load_dotenv()

class ModelConfig:
    OPENAI: str = "gpt-4o-mini:openai"
    ZHIPUAI:str = "glm-4-flash:zhipuai"
   
    
   