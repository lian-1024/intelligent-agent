from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.api import api_router
from src.shared.configuration import ServerConfig

import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时的操作
    print("Starting up...")
    yield
    # 关闭时的操作
    print("Shutting down...")

app = FastAPI(
    title=ServerConfig.name,
    version=ServerConfig.version,
    description=ServerConfig.description,
    lifespan=lifespan,
    docs_url="/docs"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(api_router,prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=ServerConfig.host,
        port=ServerConfig.port,
    )



