FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml ./
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r pyproject.toml

COPY . .

EXPOSE 8000

CMD ['uvicorn','main:app','--host','0.0.0.0','--port','8000']