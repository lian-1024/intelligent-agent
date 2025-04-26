import { z } from "zod";

export const MessageSchema = z.object({
    id:z.string(),
    content: z.string(),
    type: z.enum(["human","assistant"]),
    timestamp: z.date().or(z.string())
})

export const MessagesSchema = z.array(MessageSchema)


export const SessionSchema = z.object({
    id: z.string(),
    name: z.string(),
    messages: z.array(MessageSchema),
    type: z.enum(['rag','character']),
    createdAt: z.string()
})


export const SessionsSchema = z.array(SessionSchema)


export type Message = z.infer<typeof MessageSchema>
export type Messages = z.infer<typeof MessagesSchema>

export type SessionType = 'rag' | "character"
export type Session = z.infer<typeof SessionSchema>
export type Sessions = z.infer<typeof SessionsSchema>