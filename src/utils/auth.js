// 专门用作于权限校验


// 获取当前用户的权限
export function getCurrentAuthority(){
    // 一般是通过后台返回过来的
    //当前这个admin是一个假设的用户
    return ["user"];
}

// 专门用来做校验的 传进来一个需要的权限 
export function check(authority){
    // 获取到我们现在的权限  再和我们需要的权限进行校验
    const current = getCurrentAuthority();
    console.log('current: ',current)
    // 权限是属于这个用户的范围内的就返回true如果没有通过就返回false
    return current.some(item => authority.includes(item));
    // 数组的操作， some  includes
    // let key = false
    // [1,2,3,4].forEach((item) => {
    //     if (!key) {
    //         key = authority.includes(item)
    //         return 
    //     }
    // } )
}

// 判断登录 和其他的不太一致  每个公司的逻辑都不太一样
export function isLogin(){
    // 获取当前的权限
    const current = getCurrentAuthority();
    // 判断当前的权限并且当前的第一个权限不等于 guest 就确定这个用户已经登录了
    return current && current[0] !== "guest";
}


