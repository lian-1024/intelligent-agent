import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect, useRef } from "react";



export interface SseOptions<T> {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    onMessage: (data: string) => void;
    onOpen?: (response: Response) => Promise<void>;
    onClose?: () => void;
    onError?: (err: unknown) => number | null | void;
    openWhenHidden?: boolean;
}

export function useSse<T>(url: string, options: SseOptions<T>) {
  
    const optionsRef = useRef(options)
    
    useEffect(() => {
        optionsRef.current = options
    },[options])
    const {
        method = 'GET',
        headers,
        body,
        onMessage,
        onOpen,
        onClose,
        onError,
        openWhenHidden = false,
    } = optionsRef.current;
    const fetchChatData = async (input:string,sessionId:string) => {
        
       
        if(!input && !input.trim()) return 
        if(!sessionId) return 

        

        const requestBody = {
            ...(body ? JSON.parse(body) : {}),
            session_id: sessionId || "1",
            user_input: input,
            stream:"True",
            file_urls:""
        };


        await fetchEventSource(url, {
            method,
            headers: {
                "Accept": 'text/event-stream',
                "Content-Type":"application/json",
                ...headers,
            },
            body: JSON.stringify(requestBody),
            openWhenHidden,
            async onopen(response) {
                if (onOpen) await onOpen(response)
                
                // if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
                //     console.log('SSE connection established');
                //     if (onOpen) await onOpen(response);
                // } else {
                //     throw new Error(`Invalid SSE response: ${response.status}`);
                // }
            },
            onmessage(ev) {
                
                onMessage(ev.data)
            },
            onclose() {
                console.log('SSE connection closed');
                if (onClose) onClose();
            },
            onerror(err) {
                console.error('SSE error:', err);
                if (onError) onError(err);
                // 添加更详细的错误处理
             
                throw err; // 抛出错误直接关闭连接
            },
        });
    }

    return {
        fetchChatData
    }

  
}