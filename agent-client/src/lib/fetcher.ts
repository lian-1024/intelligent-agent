type Options = Parameters<typeof fetch>[1]


const BASE_URL = "http://localhost:8000"

export const fetcher = async(url:string,options:Options= {}) => {
   
    const res = await fetch(BASE_URL + url,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            Authorization:"",
            ...options.headers
        },
        body: options.body,
    })

    if(!res.ok) throw new Error(`HTTP error! status:${res.status}`)

    return res.json()
}


