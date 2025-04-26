from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings


class ServerConfig(BaseSettings):
    host: str = Field(
        default="http://localhost",
        description="server host"
    )
    port: int = Field(
        default=8080,
        description="server port"
    )

class LLMConfig(BaseSettings):
    system_prompt: str = Field(
        default="",
        description="LLM system prompt"
    )
    model: str = Field(
        default="zhipuai/glm-4-flash",
        description="LLM model name"
    )
    max_search_results: int = Field(
        default=5,
        description="Maximum search results for LLM"
    )

class AppSettings(BaseSettings):
    server_config: ServerConfig
    llm_config: LLMConfig