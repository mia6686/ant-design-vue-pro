<template>
    <div>
        <!-- 在父组件更新的时候 子组件也要更新 在子组件就需要进行监听 watch -->
        <Chart :option="chartOption" style="height: 400px" />
    </div>
</template>
<script>
import random from "lodash/random";
import Chart from "../../components/Chart.vue";
//使用mock模拟数据的时候需要先引入axios
import axios from "axios";

export default {
    data() {
        return {
            chartOption: {
                //当模拟数据的时候这个数据就不能放在这里写死
                // title: {
                //     text: "Echart 入门示例",
                // },
                // tooltip: {},
                // xAxis: {
                //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                // },
                // yAxis: {},
                // series: [
                //     {
                //         name: "销量",
                //         type: "bar",
                //         data: [5, 20, 36, 10, 10, 20],
                //     },
                // ],
            },
        };
    },
    mounted() {
        //模拟数据的时候也不能这样去写
        // this.interval = setInterval(() => {
        //     //100以内的随机数更改这里面的值
        //     this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100));
        //     // 手动给option附一个新值 这样的话也是可以达到深度监听
        //     this.chartOption = { ...this.chartOption };
        // }, 3000);
        //应该是这样写
        //调用这个接收的数据
        //接口请求已经写好了
        //这个时候就需要去建立一个mock文件
        this.getChartData();
        //
        this.interval = setInterval(() => {
            this.getChartData();
        }, 3000);
    },
    //在方法里面执行数据的模拟
    methods: {
        //接收数据名
        getChartData() {
            axios.get("/api/sashboard/chart", { params: { ID: 12345 } }).then((response) => {
                this.chartOption = {
                    title: {
                        text: "Echart 入门示例",
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "销量",
                            type: "bar",
                            // data: [5, 20, 36, 10, 10, 20], 换成接收到的数据
                            data: response.data,
                        },
                    ],
                };
            });
        },
    },
    //使用之后需要进行销毁
    beforeDestroy() {
        clearInterval(this.interval);
    },
    components: {
        Chart,
    },
};
</script>
