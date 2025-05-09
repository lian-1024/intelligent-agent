# 智能 Agent 对话平台

## 技术栈
Next.js、React、TypeScript、TailwindCSS、Aceternity UI、FastAPI、Python、LangGraph、SSE、PostgreSQL、Github OAuth2

## 项目描述：
开发了一套基于 FastAPI 后端与 Next.js 前端的智能 Agent 对话平台，支持多 Agent 并发对话、SSE 实时通信、对话历史管理等功能，适用于智能助手、知识问答等场景

## 项目职责：
- 参与项目整体架构设计与核心功能开发，涵盖后端 Agent 工作流、前端聊天界面及实时通信机制
- 设计并封装 useSSE Hook，实现与后端的 SSE（Server-Sent Events）通信，支持断线重连与流式消息输出，提升用户体验
- 使用 TailwindCSS 快速开发响应式 UI，结合 Aceternity 组件库，打造美观且具动效的聊天界面
- 后端采用 FastAPI，基于 LangGraph 实现 Supervisor 架构的多 Agent 工作流，支持 Web 搜索、代码执行、RAG（检索增强生成）等多种智能能力
- 集成 Github OAuth2 授权，实现第三方账号一键登录，并将用户信息安全存储至 PostgreSQL 数据库
- 负责前后端接口联调、功能测试与性能优化，确保系统高可用与高并发下的稳定运行