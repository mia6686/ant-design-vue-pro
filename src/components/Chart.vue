<template>
    <!-- 图表是需要在一个有宽高的容器里面 -->
    <div ref="chartDom" style="height: 400px"></div>
</template>
<script>
import * as echarts from "echarts";
//使用这个lodash的防抖效果  会对性能有很大的提升
import debounce from "lodash/debounce";
//在这个resize-detector的第三方库里面 有增加事件和移除事件
import { addListener, removeListener } from "resize-detector";

export default {
    //返回的值是从父组件返回过来的而不是写死的
    props: {
        option: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        //值变化的时候也是一样的要变化
        //option的数值变化 其他的并不会变化 所以还是需要深度进行优化一下  目前只是浅度监听
        option(val) {
            this.chart.setOption(val);
        },
        //这样的深度监听就可以检测到option的每一个变化
        //深度监听非常的耗性能 数据很庞大的时候不推荐使用
        //一般还是使用浅度监听 手动给option附一个新值
        // option: {
        //     handler(val) {
        //         this.chart.setOption(val);
        //     },
        //     deep: true,
        // },
    },
    created() {
        //防抖效果延迟300毫秒执行
        this.resize = debounce(this.resize, 300);
    },
    //在这个生命周期去使用
    mounted() {
        //高度也是希望从父组件传递过来的
        this.renderChart();
        //基于准备好的dom 初始化实例
        //echarts.init(document.getElementById("main")); 在vue中不能这样使用
        //所以需要换一种方式去获取dom,$this.refs.chartDom===document.getElementById("main")
        //当我们在写完这的时候不去监听，实际的执行顺序展示图表是溢出的，可以使用监听去解决这个问题 //监听--可以使用第三方的库
        // this.chart = echarts.init(this.$refs.chartDom); 这边就需要移到父组件里面去
        //使用就是先添加这个dom和resize，然后更改我们的mychart
        addListener(this.$refs.chartDom, this.resize);
        //绘制图表
        // this.chart.setOption( );这边就需要移到父组件里面去
        //这边就需要移到父组件里面去
        //{
        //     title: {
        //         text: "Echart 入门示例",
        //     },
        //     tooltip: {},
        //     xAxis: {
        //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        //     },
        //     yAxis: {},
        //     series: [
        //         {
        //             name: "销量",
        //             type: "bar",
        //             data: [5, 20, 36, 10, 10, 20],
        //         },
        //     ],
        // }
    },
    //在增加完成之后还要进行消除掉
    beforeDestroy() {
        removeListener(this.$refs.chartDom, this.resize);
        //同时也要把chart实例销毁掉 防止内存泄漏 在哦进行封装第三方库的时候
        this.chart.dispose();
        this.chart = null;
    },
    //定义这个方法 刷新我们的chart 在mychart改成this.chart
    methods: {
        resize() {
            this.chart.resize();
        },
        //把图表的渲染抽象一样
        renderChart() {
            this.chart = echarts.init(this.$refs.chartDom);
            this.chart.setOption(this.option);
        },
    },
};
</script>
