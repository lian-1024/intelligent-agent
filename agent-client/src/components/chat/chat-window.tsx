"use client"
import { ChangeEvent, FC, FormEvent, HTMLAttributes, useEffect, useState } from "react"
import { ChatHeaderBar, ChatInputBar, ChatList } from "@/components/chat"
import { cn } from "@/lib/utils"
import { useSessionsStore } from "@/stores/use-sessions-store"
import { toast } from 'sonner'
import { useSse } from "@/lib/hooks/use-chat-sse"
import { API_ENDPOINTS } from "@/lib/api-endpoints"
import { METHODS } from "@/lib/constants"

interface ChatWindowProps extends HTMLAttributes<HTMLDivElement> {

}
const placeholders = [
    '你是谁？',
    '你会什么呢？',
]


const BASE_URL = "http://localhost:8000/api/v1"


const ChatWindow: FC<ChatWindowProps> = ({ className }) => {
    const { addMessage } = useSessionsStore()
    const currentSessionId = useSessionsStore((state) => state.sessionId)
    // session id
    const session = useSessionsStore(state => state.getCurrentSession())
    // 输入框状态值
    const [value, setValue] = useState("")

    const [messages,setMessages] = useState<string[]>([])

    const { fetchChatData } = useSse(BASE_URL + API_ENDPOINTS.CHAT.CHAT_STREAM, {
        method:METHODS.POST,
        onMessage: (data) => {
            setMessages((prev) => [...prev,data])
        },
        onClose:() =>{
            console.log("messages:",messages);
            console.log("连接已关闭");
        }
    })


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentSessionId) return toast("当前会话不存在", {
            description: "请稍后再试",
            dismissible: true
        })

        // 如果是空字符串 直接返回
        if (!value.trim()) return;

        // 发送请求
        await fetchChatData(value,currentSessionId)
        // 添加自己的消息
        addMessage(value, 'human');

        // 设置消息为空
        setValue("");

    }


    const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setValue(e.target.value)
    }



    return <div className={cn("flex flex-col h-full w-3xl", className)}>
        <ChatHeaderBar className="border-b h-14 flex items-center w-3xl flex-shrink-0 fixed top-0 bg-background z-10" />
        <ChatList session={session} className="absolute left-0   flex w-screen justify-center pt-16 pb-22" />
        <div className="flex-1"></div>
        <ChatInputBar value={value} onChange={handleChange} placeholders={placeholders} onSubmit={handleSubmit} className="w-3xl fixed bg-background bottom-4 z-[100]" />
    </div>
}

export default ChatWindow
