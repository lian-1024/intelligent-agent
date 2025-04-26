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
            session_id: sessionId,
            input: input,
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
                if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
                    console.log('SSE connection established');
                    if (onOpen) await onOpen(response);
                } else {
                    throw new Error(`Invalid SSE response: ${response.status}`);
                }
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
                return onError ? onError(err) : 1000; // 默认 1 秒重试
            },
        });
    }

    return {
        fetchChatData
    }

  
}