import axios from "axios";
// 创建axios实例 封装axios
export const request = axios.create({
    baseURL: "http://localhost:3000",   // 本地开发环境
    timeout: 5000
})