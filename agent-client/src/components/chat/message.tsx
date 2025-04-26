"use client"
import { FC, HTMLAttributes, ReactNode, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
// import Image from "next/image"
import { FollowerPointerCard } from '@/components/aceternity'


const TitleComponent = ({
    title,
}: {
    title: string;
}) => (
    <div className="flex items-center space-x-2">
        {/* <Image
            src={avatar}
            height="20"
            width="20"
            alt="thumbnail"
            className="rounded-full border-2 border-white"
        /> */}
        <p>{title}</p>
    </div>
);

// 基础消息属性接口
interface MessageBaseProps extends HTMLAttributes<HTMLElement> {
    content: string;
    avatar: {
        src: string,
        fallback: string
    },
    bubbleClassName?: string;
    reversed?: boolean;
}

// 消息气泡组件
const MessageBubble: FC<{
    className?: string;
    children: ReactNode;
}> = ({ className, children }) => (
    <div className={cn("leading-6 mt-3 p-3 rounded-lg", className)}>
        {children}
    </div>
);

// 基础消息组件
export const MessageBase: FC<MessageBaseProps> = ({
    className,
    content,
    avatar,
    bubbleClassName,
    reversed = false,
    ...props
}) => {
    return (

        <div
            className={cn(
                "flex items-start gap-2",
                reversed && "flex-row-reverse",
                className
            )}
            {...props}
        >
            <Avatar className="size-12 bg-zinc-950">
                <AvatarImage src={avatar.src} alt={avatar.fallback} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
            <FollowerPointerCard
                title={
                    <TitleComponent
                        title={content}
                    />
                }
            >
                <MessageBubble className={bubbleClassName}>
                    {content}
                </MessageBubble>
            </FollowerPointerCard>
        </div>
    );
};

// 特定类型消息接口
interface MessageItemProps extends Omit<MessageBaseProps, "reversed" | "avatar" | "bubbleClassName"> {
    type: "human" | "assistant";
}

// 人类消息组件
export const MessageHuman: FC<Omit<MessageBaseProps, "reversed">> = (props) => {
    const mergeProps: MessageBaseProps = {
        ...props,
        avatar: {
            src: "",
            fallback: "LIAN"
        }
    }

    return <MessageBase
        reversed={true}
        bubbleClassName="bg-zinc-900"
        {...mergeProps}
    />
}

// 助手消息组件
export const MessageAssistant: FC<Omit<MessageBaseProps, "reversed">> = (props) => {

    return <MessageBase
        bubbleClassName="bg-zinc-800"
        {...props}
    />
}

// 工厂组件 - 根据类型选择合适的消息组件
export const MessageItem: FC<Omit<MessageItemProps,"avatar">> = ({ type, ...props }) => {

    /** 合并 props */
    const mergeProps = useMemo<MessageBaseProps>(() => {
        const human = {
            ...props,
            avatar: {
                src: "",
                fallback: "ME"
            }
        }

        const assistant = {
            ...props,
            avatar: {
                src: "",
                fallback: "AI"
            }
        }

        return type === 'human' ? human : assistant

    }, [type, props])



    return type === "human" ? (
        <MessageHuman {...mergeProps} />
    ) : (
        <MessageAssistant {...mergeProps} />
    );
};

export default MessageItem;