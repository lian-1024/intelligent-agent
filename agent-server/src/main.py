from fastapi import Depends, FastAPI,Header,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api import api_router
from src.shared.configuration import configuration

import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时的操作
    print("Starting up...")
    yield
    # 关闭时的操作
    print("Shutting down...")


app = FastAPI(
    title=configuration.NAME,
    version=configuration.VERSION,
    description=configuration.DESCRIPTION,
    lifespan=lifespan,
    docs_url="/docs",
    # dependencies=global_dependencies
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
        host=configuration.HOST,
        port=configuration.PORT,
    )



