from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from fastapi.responses import JSONResponse

# 创建一个APIRouter实例，用于定义路由
router = APIRouter()

# 定义上传文件的保存目录
UPLOAD_DIR = "statics"
# 允许上传的图片文件扩展名集合
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}

@router.post("/")
def upload(file: UploadFile = File(...)):
    """
    图片上传接口
    参数：
        file: 上传的图片文件，类型为UploadFile
    返回：
        JSONResponse，包含上传结果、文件名和访问URL
    """
    # 获取文件后缀名并转为小写
    file_ext = os.path.splitext(file.filename)[1].lower()
    # 校验文件类型是否为允许的图片类型
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="仅支持图片类型文件上传")

    # 检查上传目录是否存在，不存在则创建
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    # 处理文件重名：若已存在同名文件，则在文件名后加序号
    base, ext = os.path.splitext(file.filename)
    save_filename = file.filename
    save_path = os.path.join(UPLOAD_DIR, save_filename)
    count = 1
    while os.path.exists(save_path):
        save_filename = f"{base}_{count}{ext}"
        save_path = os.path.join(UPLOAD_DIR, save_filename)
        count += 1

    # 保存上传的文件内容到指定路径
    with open(save_path, "wb") as f:
        f.write(file.file.read())

    # 构造文件的访问URL
    file_url = f"/{UPLOAD_DIR}/{save_filename}"
    # 返回上传结果、文件名和访问URL
    return JSONResponse({
        "message": "上传成功",
        "filename": save_filename,
        "url": file_url
    })
