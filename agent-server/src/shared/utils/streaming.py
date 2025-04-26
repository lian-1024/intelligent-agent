"""
streaming.py

该模块用于实现异步事件流的工具函数，便于将异步生成器的内容以流式方式输出，常用于API接口的流式响应场景。
"""
from typing import Any, AsyncGenerator, Callable

async def event_stream(generator_func: Callable[..., AsyncGenerator], *args, **kwargs):
    """
    异步事件流生成器，将传入的异步生成器函数以流式方式输出。

    参数：
        generator_func (Callable[..., AsyncGenerator]):
            一个异步生成器函数，返回一个异步生成器对象。
        *args:
            传递给generator_func的位置参数。
        **kwargs:
            传递给generator_func的关键字参数。
    返回：
        AsyncGenerator:
            逐步产出generator_func生成的内容。
    用法示例：
        async for chunk in event_stream(some_async_generator, arg1, arg2, key=value):
            ...
    """
    # 调用传入的异步生成器函数，获取异步生成器对象
    async for chunk in generator_func(*args, **kwargs):
        # 逐步产出每个chunk，实现流式输出
        yield chunk