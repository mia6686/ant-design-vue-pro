const { Model } = require("echarts");

//接收这个方法 然后进行模拟数据
function chart(method){
    //给一个空值
    let res = null;
    //循环出来
    switch(method){
        //默认是GET请求方式
        case "GET":
            //假设的数据
            res = [100, 44, 53, 23, 67, 12];
            //退出
            break;
        //默认值 空
        default:
            res = null;
    }
    return res;
}
//使用的格式  在写完之后需要去vue.config.js里面去进行配置
module.exports = chart;