import React, { FC, HTMLAttributes } from "react"
import MessageItem from "./bubble"
import { cn } from "@/lib/utils"
import { Session } from '@/schemas/session'
import { Flex } from 'antd'
import Bubble from "./bubble"

interface ChatListProps extends HTMLAttributes<HTMLElement> {
    session: Session
}

const ChatList: FC<ChatListProps> = ({ className, session }) => {

    return <div className={cn(className)}>
        {/* <div className={cn("flex flex-col space-y-4 w-3xl")}> */}
        <Flex className={cn("space-y-4 w-3xl")} vertical gap="middle">
            {
                session?.messages?.map((message) => {
                    const placement =  message.type === 'assistant' ? 'start' : "end"

                    return <Bubble content={message.content} placement={placement} key={message.id} />
                })
            }
        </Flex>

        {/* </div> */}
    </div>
}

export default ChatList