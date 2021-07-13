<template>
    <div>
        <!-- 在父组件更新的时候 子组件也要更新 在子组件就需要进行监听 watch -->
        <Chart :option="chartOption" style="height: 400px" />
    </div>
</template>
<script>
import random from "lodash/random";
import Chart from "../../components/Chart.vue";

export default {
    data() {
        return {
            chartOption: {
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
                        data: [5, 20, 36, 10, 10, 20],
                    },
                ],
            },
        };
    },
    mounted() {
        this.interval = setInterval(() => {
            //100以内的随机数更改这里面的值
            this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100));
            // 手动给option附一个新值 这样的话就没问题了
            this.chartOption = { ...this.chartOption };
        }, 3000);
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
