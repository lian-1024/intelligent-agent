export const METHODS = {
    GET:"GET",
    POST:"POST",
    PUT:"PUT"
} as const

export type MethodsType = (typeof METHODS)[keyof typeof METHODS]