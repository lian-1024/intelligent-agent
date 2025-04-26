import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { Message, Session, SessionType } from "@/schemas/session";

interface SessionState {
    /** 当前会话数组 */
    sessions: Session[],
    /** 创建一个新会话 */
    createSession: (name: string, type: SessionType) => string,
    /** 删除一个会话 */
    removeSession: (sessionId: string | number) => void,
    /** 当前会话 id */
    sessionId: string | null ,
    /** 设置当前会话 id */
    setSessionId: (sessionId: string) => void,
    /** 添加消息 */
    addMessage: (message: string, type: Message['type']) => void,
    /** 获取当前会话 id */
    getCurrentSession: () => Session
}

const initialMessage: Message = {
    id: "12",
    content: "你好，我是一个智能问答助手",
    timestamp: '0',
    type: 'assistant'
}

export const useSessionsStore = create<SessionState>()(persist((set, get) => ({
    sessions: [],
    sessionId: null,
    /** 创建 session */
    createSession(name, type) {

        const id = nanoid()

        // 创建新的 空对话
        const newSession: Session = {
            id,
            name,
            type,
            messages: [initialMessage],
            createdAt: new Date().toLocaleString()
        }
        set((state) => ({
            sessions: [newSession, ...state.sessions],
            sessionId: id
        }))



        return id
    },
    /** 删除 session */
    removeSession(sessionId) {
        set((state) => ({
            sessions: state.sessions.filter(session => session.id !== sessionId)
        }))
    },
    /** 设置当前 sessionId */
    setSessionId(sessionId: string) {
        set(() => ({
            sessionId
        }))
    },

    addMessage(message: string, type: Message['type']) {
        const newMessage: Message = {
            id: nanoid(),
            content: message,
            timestamp: Date.now().toString(),
            type
        }

        console.log("session：", newMessage);

        set((state) => ({
            sessions: state.sessions.map((item) => {
                if (item.id === state.sessionId) {
                    return {
                        ...item,
                        message: item.messages.push(newMessage)
                    }
                }

                return item
            })
        }))
    },

    getCurrentSession() {
        const session = get().sessions.filter(session => this.sessionId === session.id)[0]
        return session || this.sessions[0]
    }

}), {
    name: 'sessions-store' // 当前对话键
}))