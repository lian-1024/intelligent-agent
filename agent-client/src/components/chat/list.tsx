import React, { FC, HTMLAttributes } from "react"
import MessageItem from "./message"
import { cn } from "@/lib/utils"
import { Session } from '@/schemas/session'

interface ChatListProps extends HTMLAttributes<HTMLElement> {
    session: Session
}

const ChatList: FC<ChatListProps> = ({ className, session }) => {

    return <div className={cn(className)}>
        <div className={cn("flex flex-col space-y-4 w-3xl")}>
            {
                session?.messages?.map((message) => {
                    return <MessageItem {...message} key={message.id}  />
                })
            }
        </div>
    </div>
}

export default ChatList