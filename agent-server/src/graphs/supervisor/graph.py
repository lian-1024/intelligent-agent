from langgraph.prebuilt import create_react_agent
from langgraph_supervisor import create_supervisor
from src.shared.configuration.model_config import ModelConfig
from src.shared.utils.load_chat_model import load_chat_model
from src.graphs.supervisor.prompt import RESEARCHER_PROMPT,CODER_PROMPT,RAG_EXPERT_PROMPT
from src.shared.utils.tools import bocha_websearch_tool,get_time
from src.graphs.supervisor.prompt import SUPERVISOR_SYSTEM_PROMPT
import aiosqlite
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver


model = load_chat_model(ModelConfig.OPENAI)
conn = aiosqlite.connect("data/langchain.db",check_same_thread=False)
checkpointer = AsyncSqliteSaver(conn=conn)

researcher = create_react_agent(
            model=model,
            tools=[bocha_websearch_tool, get_time],
            name="researcher",
            debug=True,
            prompt=RESEARCHER_PROMPT
        )

"""
阻塞html解析 
立即下子啊并执行脚本
按照在文档中的执行顺序

异步下载脚本，不阻塞html解析
等到html解析完成后，DOM;
"""


coder = create_react_agent(
            model=model,
            tools=[],
            name="coder",
            debug=True,
            prompt=CODER_PROMPT,
)

rag_expert = create_react_agent(
            model=model,
            tools=[],
            name="rag_expert",
            prompt=RAG_EXPERT_PROMPT
        )


graph_builder = create_supervisor(
    model=model,
    agents=[
        researcher,
        coder,
        rag_expert
    ],
    prompt=SUPERVISOR_SYSTEM_PROMPT
)


graph = graph_builder.compile()