from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
import httpx
from src.shared.configuration import GithubConfig


config  = GithubConfig()
router = APIRouter()



@router.get("/github")
async def github_login():
    """
    重定向到GitHub授权页面
    
    功能:
    - 构造GitHub OAuth授权URL
    - 将用户重定向到GitHub授权页面
    
    参数:
    - 无
    
    返回值:
    - RedirectResponse: 重定向响应，跳转到GitHub授权页面
    
    异常:
    - 如果GITHUB_CLIENT_ID未配置，会导致授权URL构造失败
    """
    return RedirectResponse(
        f"{config.github_auth_url}?client_id={config.github_client_id}&redirect_uri={config.github_redirect_uri}"
    )
    

@router.get("/github/callback")
async def github_callback(code: str):
    """
    GitHub授权回调接口
    
    功能:
    - 处理GitHub OAuth回调
    - 使用授权码(code)获取access_token
    - 使用access_token获取用户信息
    - 返回用户信息或创建本地用户
    
    参数:
    - code: str - GitHub返回的授权码
    
    返回值:
    - JSONResponse: 包含用户信息的JSON响应
    
    异常:
    - HTTPException(400): 获取token失败
    - HTTPException(400): 无效的token
    - HTTPException(400): 获取用户信息失败
    """
    # 1. 使用code获取access_token
    # 向GitHub token端点发送POST请求，交换access_token
    async with httpx.AsyncClient() as client:
        
        token_response = await client.post(
            config.github_token_url,
            headers={"Accept": "application/json"},  # 要求返回JSON格式
            params={
                "client_id": config.github_client_id,       # 客户端ID
                "client_secret": config.github_client_secret, # 客户端密钥
                "code": code,                       # 授权码
                "redirect_uri": config.github_redirect_uri  # 回调地址
            }
        )
        
        # 检查token请求是否成功
        if token_response.status_code != 200:
            raise HTTPException(status_code=400, detail="获取GitHub token失败")
            
        token_data = token_response.json()
        access_token = token_data.get("access_token")  # 从响应中提取access_token
        
        # 检查是否成功获取access_token
        if not access_token:
            raise HTTPException(status_code=400, detail="无效的GitHub token")
        
        # 2. 使用access_token获取用户信息
        # 向GitHub用户API发送GET请求，携带access_token
        user_response = await client.get(
            config.github_user_url,
            headers={"Authorization": f"Bearer {access_token}"}  # Bearer token认证
        )
        
        # 检查用户信息请求是否成功
        if user_response.status_code != 200:
            raise HTTPException(status_code=400, detail="获取GitHub用户信息失败")
        
        user_data = user_response.json()  # 解析用户信息JSON
        
        # 3. 返回用户信息或创建本地用户
        # 构造包含用户基本信息的响应
        return JSONResponse({
            "message": "登录成功",
            "user": {
                "github_id": user_data["id"],      # GitHub用户ID
                "name": user_data["name"],         # 用户姓名
                "email": user_data["email"],       # 用户邮箱
                "avatar": user_data["avatar_url"]  # 用户头像URL
            }
        })
        
        
        
async def github_callback(code:str):
    
    
    return {"message":"code"}