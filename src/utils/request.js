import axios from 'axios';

const contentType = 'application/x-www-form-urlencoded'
const requests = axios.create({
    //基础路径
    baseURL: "/api",

    timeout: 5000,
    // 设置请求头 发送给服务器的内容格式
    headers: {
        "Content-Type": contentType,
    },
})

export default requests;