from fastapi.responses import RedirectResponse
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from src.shared.constants.github import GITHUB_AUTH_URL, GITHUB_TOKEN_URL, GITHUB_USER_URL
from src.shared.configuration import settings

import httpx


router = APIRouter()


@router.get("/github/login")
async def github_login():
    """
    重定向到Github授权页面
    """

    github_auth_url = (
        f"{GITHUB_AUTH_URL}?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}&scope=user:email"
    )

    return RedirectResponse(github_auth_url)


@router.get("/github/callback")
async def auth_callback(code: str):
    """
    Github授权回调
    """
    async with httpx.AsyncClient() as client:
        # 获取access_token
        response = await client.post(
            GITHUB_TOKEN_URL,
            params={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": settings.GITHUB_REDIRECT_URI,
            },
            headers={"Accept": "application/json"},
        )

        # 如果状态码不为 200 则抛出异常
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to get access token")

        # 获取access_token
        token_data = response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="No access token received")

        # 获取用户用户信息
        user_response = await client.get(
            GITHUB_USER_URL,
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
        )

        user_data = user_response.json()

        print("user_data: ", user_data)

        return JSONResponse(
            {
                "message": "登录成功",
                "user": {
                    "github_id": user_data["id"],  # GitHub用户ID
                    "name": user_data["name"],  # 用户姓名
                    "email": user_data["email"],  # 用户邮箱
                    "avatar": user_data["avatar_url"],  # 用户头像URL
                },
            }
        )
