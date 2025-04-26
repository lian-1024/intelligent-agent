// "use client"
import SideBarLeft from "@/components/layout/sidebar-left"
import SideBarRight from "@/components/layout/sidebar-right"
import ChatWindow from "@/components/chat/chat-window"
import BackgroundBeams from "@/components/aceternity/background-beams"



import {Metadata} from 'next'
export const metadata: Metadata = {
    title: "智能聊天",
    description: "与AI助手进行智能对话"
}


const Chat = () => {
    return <div className="flex justify-center h-screen relative z-50">
        <SideBarLeft   className="z-50 p-5 border fixed left-0 top-0 ml-10 mt-10 min-w-2xs rounded-lg" />
        <ChatWindow className="z-50" />
        <SideBarRight className="fixed right-6 my-6" />
        <BackgroundBeams />
    </div>
}

export default Chat