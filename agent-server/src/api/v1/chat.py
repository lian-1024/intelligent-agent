from typing import List, Dict, Any, AsyncGenerator
from fastapi import APIRouter, Form, UploadFile
from langchain_core.messages import HumanMessage
from fastapi.responses import StreamingResponse
from datetime import datetime
from src.graphs.supervisor.graph import graph


router = APIRouter()


async def build_human_message(user_input: str, file_urls: str = None) -> HumanMessage:
    """
    构建 LangGraph 所需的 HumanMessage，包含用户文本和图片。

    参数:
    - user_input: 用户输入的文本或问题。
    - image_files: 可选的图片文件列表。

    返回:
    - HumanMessage，包含文本和 base64 编码的图片。

    异常:
    - ValueError: 如果上传了非图片文件。
    """
    human_message_content = [{"type": "text", "text": user_input}]

    # file_urls = ["https://picsum.photos/200/300","https://picsum.photos/200/300"]

    file_urls = file_urls.split(",")
    print("file_urls:", file_urls)

    if file_urls:
        for file_url in file_urls:
            if not file_url or not isinstance(file_url, str) or not file_url.strip():
                raise ValueError("图片URL不能为空")
            
            print("file_url",file_url)
            
            # 验证URL格式
            if not file_url.startswith(('http://', 'https://')):
                raise ValueError(f"无效的图片URL格式: {file_url}")
                
            print("file_url:",file_url)
            # 追加到 消息数组当中
            human_message_content.append(
                {
                    "type": "image_url",
                    "image_url": {"url": file_url},
                }
            )

    return HumanMessage(content=human_message_content)


async def stream_langgraph_response(
    human_message: HumanMessage, session_id: str = None
) -> AsyncGenerator[str, None]:
    """
    以 Server-Sent Events (SSE) 格式流式传输 LangGraph 响应。

    参数:
    - human_message: 要处理的 HumanMessage。
    - session_id: 可选的会话 ID，用于流式上下文。

    产出:
    - SSE 格式的字符串（例如 "data: content\n\n"）。
    """
    config = {"configurable": {"thread_id": session_id}} if session_id else {}

    try:
        async for chunk in graph.astream(
            {"messages": [human_message]}, config=config, stream_mode="messages"
        ):
            yield f"data: {chunk[0].content}\n\n"
    except Exception as e:
        yield f"data: {{\"error\": \"{str(e)}\"}}\n\n"


async def invoke_langgraph_sync(
    human_message: HumanMessage, session_id: str = None
) -> Dict[str, Any]:
    """
    同步调用 LangGraph 并返回响应。

    参数:
    - human_message: 要处理的 HumanMessage。
    - session_id: 可选的会话 ID。

    返回:
    - 包含响应内容和时间戳的字典。
    """
    config = {"configurable": {"thread_id": session_id}} if session_id else {}
    response = graph.invoke({"messages": [human_message]}, config=config)
    return {
        "content": response["messages"][-1].content,
        "timestamp": datetime.now().isoformat(),
    }


@router.post("/completions")
async def handle_chat_request(
    user_input: str = Form(default="你好", description="用户输入字段"),
    file_urls: str = Form(default=None, description="文件url列表"),
    stream: bool = Form(default=True, description="是否需要进行流式返回"),
    session_id: str = Form(default=None, description="会话 ID"),
):
    """
    处理聊天请求，支持文本、图片和流式响应。

    参数:
    - user_input: 用户输入的文本或问题。
    - image_files: 可选的图片文件列表。
    - stream: 如果为 true，返回流式响应；否则返回同步响应。
    - session_id: 可选的会话 ID。

    返回:
    - stream=True 时返回 StreamingResponse，stream=False 时返回 JSON 响应。
    """

    try:
        human_message = await build_human_message(user_input, file_urls)

        if stream:
            print("stream:进行流式获取")
            return StreamingResponse(
                content=stream_langgraph_response(human_message, session_id),
                media_type="text/event-stream",
            )
        else:
            return await invoke_langgraph_sync(human_message, session_id)

    except ValueError as e:
        return {"error": str(e)}
    except Exception as e:
        print()
        return {"error": "服务器内部错误", "details": str(e)}


@router.get("/messages")
async def chat_messages():
    return {"messages": "你好"}
