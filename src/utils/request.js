import axios from 'axios';

const contentType = 'application/x-www-form-urlencoded'
const token = window.localStorage.getItem("token") || ''
const requests = axios.create({
  //基础路径
  baseURL: "http://127.0.0.1:3030/api",

  timeout: 5000,
  // 设置请求头 发送给服务器的内容格式
  headers: {
    "Content-Type": contentType,
    "Authorization": token,
  },
})

export default requests;


/* 

// 添加请求拦截器
// 拦截器的第一部分，第二部分在router index.js里面
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (window.localStorage.getItem("token")) {
    config.headers.common['Access-Token'] = window.localStorage.getItem("token");
  }
  return config
})

————————————————
版权声明：本文为CSDN博主「阿林阿林」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_41793354/article/details/122616365

*/