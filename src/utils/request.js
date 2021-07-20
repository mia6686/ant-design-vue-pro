//一般在请求的时候 不会直接过来使用 而是需要进行二次的封装
import axios from 'axios';
import { notification } from "ant-design-vue";

function request(options){
    return axios(options)
    .then( res => {
        return res;
    })
    .catch( error => {
        const{
            response: { status, statusText }
        } = error;
        notification.error({
            // message: status,  //当我们使用自定义提示报错信息时就不能这样写
            //在eslint中会有提示 这里不需要使用h所以就避开这一行的检查
            //eslint-disable-next-line no-unused-vars
            massage: h => (
                <div>
                    请求错误 <span style="color: red">{status}</span> : {options.url}
                </div>
            ),
            description: statusText
        });
        return Promise.reject(error);
    });
}

export default request;