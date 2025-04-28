
from pydantic import BaseModel, Field


class Configuration(BaseModel):
    NAME: str = Field(
        default="AgentX",
        title="服务名称",
    )
    HOST: str = Field(
        default="http://localhost",
        title="服务器地址"
    )
    PORT: int = Field(
        default=8000,
        title="服务器端口"
    )
    VERSION:str = Field(
        default="0.0.1",
        title="版本号"
    )
    DESCRIPTION: str = Field(
        default="AgentX 服务器端",
        title="描述"
    )
    
 
    
    
    
configuration = Configuration()