import {requestClient} from '@/lib/request'
import {METHODS} from '@/lib/constants'
import {API_ENDPOINTS} from '@/lib/api-endpoints'
import {ChatCompletionsResponse} from '@/types/chat-response'


export const getChatCompletionAPI =async (input:string,sessionId:string) =>{
    const data = {
        session_id:sessionId,
        input
    }
    return await  requestClient<ChatCompletionsResponse>({
        method:METHODS.POST,
        url:API_ENDPOINTS.CHAT.CHAT_COMPLETIONS,
        data,
    })
}

