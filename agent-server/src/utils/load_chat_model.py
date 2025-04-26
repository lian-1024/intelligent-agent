from abc import ABC, abstractmethod
from typing import Optional, override

from langchain_core.language_models import BaseChatModel
from langchain_community.chat_models import ChatZhipuAI
from langchain_openai import ChatOpenAI, OpenAI
from dotenv import load_dotenv
import os


class ModelProviderStrategy(ABC):
    """
    模型提供商策略类
    """
    @abstractmethod
    def load_model(self,model:str):
        pass

class ZhipuAIStrategy(ModelProviderStrategy):
    """
    智谱AI策略实现
    """
    @override
    def load_model(self, model: str):
        return ChatZhipuAI(
            model=model,
            api_key=os.getenv("ZHIPUAI_API_KEY")
        )

class OpenAIStrategy(ModelProviderStrategy):
    """
    OpenAI 策略实现
    """
    @override
    def load_model(self, model: str):
        return ChatOpenAI(
            model=model,
            api_key=os.getenv("OPENAI_API_KEY"),
            base_url="https://api.openai-proxy.org/v1"
        )


def load_chat_model(model_and_provider:str,separator:Optional[str]) -> BaseChatModel:
    """
    模型加载
    """
    separator = separator or ":"

    # 分割获取 模型名称一个 提供商  GPT-4o/openai
    model, provider =  model_and_provider.split(separator,maxsplit=1)

    
    strategies = {
        "zhipuai":ZhipuAIStrategy()
    }

    if provider not in strategies:
        raise ValueError(f"Unsupported provider：{provider}")

    return strategies[provider].load_model(model)
    