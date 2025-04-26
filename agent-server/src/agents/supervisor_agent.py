
# 导入所需的第三方库和本地工具函数
import aiosqlite
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langgraph_supervisor import create_supervisor
from src.utils import get_time, bocha_websearch_tool
from src.utils.prompts import SUPERVISOR_SYSTEM_PROMPT,CODER_PROMPT,RESEARCHER_PROMPT,RAG_EXPERT_PROMPT
import os
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver


class SupervisorAgent:
    """
    SupervisorAgent 负责管理和协调多个专家代理（如信息搜索专家、AI应用程序员、RAG专家），
    并通过 LangGraph 的工作流机制实现多智能体协作。
    """
    def __init__(self):
        # 初始化大模型，指定模型类型、API Key 及代理地址
        self.model = ChatOpenAI(
                model="gpt-4o-mini",
                api_key=os.getenv("OPENAI_API_KEY"),
                base_url="https://api.openai-proxy.org/v1"
            )
        
        # 初始化数据库连接和检查点保存器，用于持久化工作流状态
        conn = aiosqlite.connect("data/langchain.db",check_same_thread=False)
        self.checkpointer = AsyncSqliteSaver(conn=conn)
        # 定义系统提示词，约束助手角色、团队成员及任务分配规则
        self.system_prompt = SUPERVISOR_SYSTEM_PROMPT
        # 初始化各专家代理和工作流
        self._initialize_agents()
        self._initialize_workflow()


    # def _get_db_path(self):
    #     # 该方法用于动态获取数据库路径（当前未启用）
    #     current_file = Path(__file__).resolve()
    #     project_root = current_file.parent.parent.parent
    #     db_path = project_root / "data" / "langchain.db"
    #     return db_path

    def _initialize_agents(self):
        """
        初始化各类专家代理，包括信息搜索专家、AI应用程序员、RAG专家。
        每个代理有独立的职责和提示词。
        """
        # 信息搜索专家，负责事实查询、数据查找等任务
        self.research = create_react_agent(
            model=self.model,
            tools=[bocha_websearch_tool, get_time],
            name="researcher",
            debug=True,
            prompt=RESEARCHER_PROMPT
        )

        # AI应用程序员，负责编程、调试、算法等技术问题
        self.coder = create_react_agent(
            model=self.model,
            tools=[],
            name="coder",
            debug=True,
            prompt=CODER_PROMPT,
        )

        # RAG专家，负责结合知识库与大模型能力，处理复杂信息整合类问题
        self.rag_expert = create_react_agent(
            model=self.model,
            tools=[],
            name="rag_expert",
            prompt=RAG_EXPERT_PROMPT
        )

    def _initialize_workflow(self):
        """
        初始化多智能体工作流，将各专家代理纳入统一的工作流体系，
        并指定系统提示词和检查点机制。
        """
        self.workflow = create_supervisor(
            agents=[self.research,self.coder,self.rag_expert],
            model=self.model,
            prompt=self.system_prompt,
        )
        # 编译工作流，生成可调用的 agent 实例
        self.agent = self.workflow.compile(checkpointer=self.checkpointer)

    def get_agent(self):
        """
        获取已编译好的多智能体 agent，可用于对话或任务处理。
        """
        return self.agent


# 实例化 supervisor_agent，供外部模块直接调用
supervisor_agent = SupervisorAgent().get_agent()
