//权限指令
//弊端 只有在第一次的时候才会去控制 如果是动态去更改了就无法进行控制
import {check} from "../utils/auth"

//写成可以自己去注册的指令
function install(Vue, options = {}){
    //这个名字就是如果用户不自己去配置 那么默认的名字就是auth
    Vue.directive(options.name || "auth", {
        //指定inserted周期里面做一个权限的校验
        inserted(el, binding){
            //如果没有校验通过，就直接从dome节点中移除掉
            if(!check(binding.value)){
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    });
}
export default { install };
//在使用之前也是需要进行先在main。js里面先注册