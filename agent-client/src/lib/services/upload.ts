import {requestClient} from '@/lib/request'
import {METHODS} from '@/lib/constants'
import { API_ENDPOINTS } from '../api-endpoints'

export const uploadFile = async (formData:FormData) => {

    return await requestClient({
        method: METHODS.POST,
        url: API_ENDPOINTS.UPLOAD,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}