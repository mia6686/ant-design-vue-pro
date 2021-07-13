<!-- 函数式组件没有this 没有根元素 破坏样式 所以不使用template <template></template> -->
<!-- 组件形式控制权限 -->
<!-- 函数式组件提高渲染性能  -->

<script>
// 会有一些限制 需要check函数校验
import { check } from "../utils/auth";

export default {
    //函数式组件
    functional: true,
    //在值里面声明这个authority的类型是一个数组，必须传递的一个属性
    props: {
        authority: {
            type: Array,
            required: true,
        },
    },
    //render函数提供两个参数
    render(h, context) {
        //从const里面取出值和具名插槽
        const { props, scopedSlots } = context;
        //直接用check，传递进来的authority， 校验通过 返回插槽就是子组件 如果没有通过返回null  需要进行声明
        return check(props.authority) ? scopedSlots.default : null;
    },
};

//每个页面都需要进行权限的判断就不是很方便 所以最好是把这个权限组件作为全局组件来使用 会在main。js里面去注册
</script>
