from typing import Annotated
from fastapi import HTTPException, Header
from starlette.status import HTTP_401_UNAUTHORIZED


async def verify_token(authorization: Annotated[str | None,Header()] = None):
    print("authorization",authorization)
    if not authorization:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Authorization header missing"
        )

    return {"authorization": authorization}
