from fastapi import APIRouter, UploadFile

router = APIRouter()

@router.post("/images")
def upload_images(file: UploadFile):
    
    print("file:",file)
    
    return {"message":"上传图片成功"}