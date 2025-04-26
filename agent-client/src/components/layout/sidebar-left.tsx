"use client"
import { FC, HTMLAttributes } from "react"
import { Button, PrimaryButton } from "../ui/button"
import { Box, MoreHorizontal, SquarePen } from "lucide-react"
import { FollowerPointerCard } from "../aceternity"
import { cn } from '@/lib/utils'
import { Modal, ModalBody, ModalContent, ModalTrigger, useModal } from "../aceternity/animated-modal"
import { BackgroundGradient } from '@/components/aceternity/background-gradient'
import { useSessionsStore } from '@/stores/use-sessions-store'
interface SideBarLeftProps extends HTMLAttributes<HTMLElement> {

}


const FeatureList = [
    {
        id: "1",
        title: "RAG",
        summary: "基于检索增强生成（Retrieval-Augmented Generation）的智能问答系统，能够从您的知识库中检索相关信息，提供准确的答案和见解。"
    },
    {
        id: "2",
        title: "Agent",
        summary: "智能代理系统，可以根据您的指令自主完成复杂任务，支持多轮对话和任务分解，提供更智能的交互体验。"
    }
]

const SideBarLeft: FC<SideBarLeftProps> = ({ className }) => {
    const sessions = useSessionsStore((state) => state.sessions)

    const { createSession, setSessionId } = useSessionsStore()

    const handleCreateSession = () => {
        createSession("新对话", "rag")
    }

    const handleChangeSession = (sessionId: string | number) => {
        setSessionId(sessionId)
    }

    return <div className={cn("flex flex-col gap-4 ", className)}>
        <OpenToolboxButton />
        <button onClick={handleCreateSession} className="w-full inline-flex h-12 animate-shimmer items-center justify-center  rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <SquarePen className="size-4" />
            <span className="ml-2">
                创建新对话
            </span>
        </button>


        <div className="flex flex-col space-y-2 overflow-auto max-h-[50vh]">
            {sessions.map((session) => (
                <FollowerPointerCard
                    key={session.id}
                    title={
                        <TitleComponent
                            title={session.name}
                        />
                    }
                >
                    <div
                        onClick={() => handleChangeSession(session.id)}
                        className="rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4"
                    >
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{session.name}</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{session.createdAt}</p>
                            <Button variant="link" size={"icon"}>
                                <MoreHorizontal />
                            </Button>
                        </div>
                    </div>
                </FollowerPointerCard>
            ))}
        </div>
    </div>
}



// Define the inner component that uses the modal context
const ToolboxModalContent = () => {
    const { setOpen } = useModal(); // Now this is called within ModalProvider's context
    const handleSelectTool = (toolId: string | number) => {
        console.log("toolId", toolId);
        setOpen(false); // Select tool and close modal
    }

    return (
        <ModalBody>
            <ModalContent className="flex flex-col gap-4">
                {
                    FeatureList.map((feature => <FeatureCard id={feature.id} onClick={handleSelectTool} key={feature.id} title={feature.title} summary={feature.summary} />))
                }
            </ModalContent>
            {/* <ModalFooter>
                <Button onClick={() => setOpen(false)}> 
                    确定
                </Button>
            </ModalFooter> */}
        </ModalBody>
    );
}

const OpenToolboxButton = () => {
    // The Modal component itself provides the context
    return (
        <Modal>
            <ModalTrigger className="w-full inline-flex justify-center h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Box className="size-4" />
                <span className="ml-2">功能箱</span>
            </ModalTrigger>
            {/* Render the content component inside Modal */}
            <ToolboxModalContent />
        </Modal>
    );
}


interface FeatureCarProps {
    id: string | number
    className?: HTMLAttributes<HTMLButtonElement>['className']
    title: string
    summary: string,
    onClick: (id: string | number) => void
}

const FeatureCard: FC<FeatureCarProps> = ({ id, className, title, summary, onClick }) => {
    return <BackgroundGradient className={className}>
        <div className="bg-zinc-800 rounded-3xl p-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {title}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                {summary}
            </p>
            <div className="mt-5 flex justify-end">
                <PrimaryButton onClick={() => onClick(id)}>使用</PrimaryButton>
            </div>
        </div>
    </BackgroundGradient>
}

interface TitleComponentProps {
    title: string
}

const TitleComponent: FC<TitleComponentProps> = ({ title }) => {
    return <div className="flex items-center space-x-2">
        <p>{title}</p>
    </div>
}


export default SideBarLeft