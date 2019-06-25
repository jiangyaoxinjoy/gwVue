import HttpRequest from '@/libs/axios'
import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:8087/" : 'http://localhost:8080/'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)
export default axios

// const axiosUrl = env === 'development'
//     ? 'http://localhost:8080/'
//     : 'http://192.168.0.1:8080'
