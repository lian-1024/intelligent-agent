
# 导入必要的模块
from pkgutil import resolve_name
from fastapi import APIRouter
from langchain_core.messages import HumanMessage
from src.graphs.supervisor.graph import graph
from src.models import ChatBody
from fastapi.responses import StreamingResponse
from datetime import datetime




# 创建API路由实例
router = APIRouter()

@router.post("/completions")
def chat_completions(
 chat_body:ChatBody,
):
    """
    处理同步聊天请求

    参数:
    chat_body: ChatBody - 包含用户输入和会话ID的请求体

    返回:
    模型生成的响应
    """
    return   graph.invoke({
        "messages": [
            HumanMessage(chat_body.input)
        ],
        
    },
    config={
          "configurable":{
            "thread_id": chat_body.session_id
          }
        }
    )["messages"][-1]


@router.post("/stream")
async def chat_stream_completions(chat_body:ChatBody):
    """
    处理异步流式聊天请求

    参数:
    chat_body: ChatBody - 包含用户输入和会话ID的请求体

    返回:
    StreamingResponse - 流式响应对象
    """
    async def event_stream_executor():
        """
        执行流式事件生成器

        返回:
        Generator - 生成SSE格式的数据流
        """

        response =  graph.astream({
            "messages": [HumanMessage(chat_body.input)]
            }, 
            config={"configurable": {"thread_id": chat_body.session_id}},
            stream_mode="messages", #  流模式 只返回 ai 返回的数据 
            # subgraphs=True # 子图添加线程级优化
        )

        print("response:",response)

        async for chunk in response:
            print("response_content:",chunk)

            # 构建数据对象
            message_dict = {
                "content": chunk[0].content,
                "timestamp": datetime.now().isoformat()
            }
            # 返回的数据必须以 data开头 两个换行符结尾
            yield f"data: {chunk[0].content}\n\n"


    return StreamingResponse(
        content=event_stream_executor(),
        media_type="text/event-stream"
    )

