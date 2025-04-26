import { cn } from "@/lib/utils"
import React, { FC, HTMLAttributes } from "react"
interface HeaderBarProps extends HTMLAttributes<HTMLElement> { }


const HeaderBar: FC<HeaderBarProps> = ({ className }) => {
    return <div className={cn("group",className)}>
        <h3 className="text-zinc-200 transition-all group-hover:text-white text-xl font-semibold tracking-tight">
            基于 RAG 的智能 AI 问答助手
        </h3>
    </div>
}
export default HeaderBar