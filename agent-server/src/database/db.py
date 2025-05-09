"""
数据库连接和会话管理模块

本模块提供数据库连接、初始化和会话管理的功能。
使用 SQLModel 作为 ORM 框架，支持 SQL 数据库操作。
"""

from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine, select

# 加载环境变量，确保能读取到 .env 文件中的配置
load_dotenv()

# 创建数据库引擎
# 从环境变量获取数据库连接 URL，如果未设置则使用空字符串
# echo=True 表示启用 SQL 语句日志输出，便于调试
engine = create_engine(os.getenv("DATA_BASE_URL", ''), echo=True)

def init_db():
    """
    初始化数据库表结构
    
    根据 SQLModel 模型定义创建所有表。
    应在应用启动时调用此函数以确保数据库结构与模型一致。
    """
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    获取数据库会话的依赖函数
    
    创建并返回一个数据库会话，使用上下文管理器确保会话在使用后自动关闭。
    
    Yields:
        Session: 数据库会话对象，可用于执行查询操作
    
    用法示例:
        @app.get("/items/")
        def get_items(db: Session = Depends(get_session)):
            return db.exec(select(Item)).all()
    """
    with Session(engine) as session:
        yield session