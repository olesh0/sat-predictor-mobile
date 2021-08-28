import axios from 'axios'

const BASE_URL = 'https://tle.ivanstanojevic.me/'

const axiosInstance = axios.create({ baseURL: BASE_URL })

export default axiosInstance
