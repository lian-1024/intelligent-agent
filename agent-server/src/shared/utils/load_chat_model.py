from abc import ABC, abstractmethod
from curses import pair_content
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


def load_chat_model(model_and_provider:str,separator:Optional[str] = ":") -> BaseChatModel:
    """
    模型加载
    """

    # 分割获取 模型名称和提供商 格式: GPT-4o:openai
    if not model_and_provider or not isinstance(model_and_provider, str):
        raise ValueError("模型和提供商参数必须是非空字符串")
        
    try:
        model, provider = model_and_provider.split(separator, maxsplit=1)
        if not model or not provider:
            raise ValueError("模型名称和提供商不能为空")
    except ValueError:
        raise ValueError(f"模型格式无效，应为'模型名称{separator}提供商'格式")

    strategies = {
        "zhipuai":ZhipuAIStrategy(),
        "openai":OpenAIStrategy()
    }

    if provider not in strategies:
        raise ValueError(f"不支持的提供商: {provider}，当前支持的提供商有: {', '.join(strategies.keys())}")

    return strategies[provider].load_model(model)
    