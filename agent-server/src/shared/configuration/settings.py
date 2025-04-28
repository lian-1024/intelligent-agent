from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_REDIRECT_URI: str = ""
    DEFAULT_MODEL: str = "glm-4-flash:zhipuai"
    ZHIPUAI_API_KEY: str = "87180c6d421a4070bdcbd673ac11990f.9RQYH7fS4xmL9mWP"
    OPENAI_API_KEY: str = "sk-kR2jsDLnKto6Y4c4DXRKaQrpI23EXka0Gs6h1QpLekbS2aRm"
    TAVILY_API_KEY: str = "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"
    BOCHA_API_KEY: str = "sk-f45ecfb9d73b4839a0b8052b1794be43"

    class Config:
        env_file = ".env"


settings = Settings()
