<template>
    <a-form-model :layout="form.layout" :model="form" v-bind="formItemLayout">
        <a-form-model-item label="Form Layout">
            <a-radio-group v-model="form.layout">
                <a-radio-button value="horizontal">
                    Horizontal
                </a-radio-button>
                <a-radio-button value="vertical">
                    Vertical
                </a-radio-button>
                <a-radio-button value="inline">
                    Inline
                </a-radio-button>
            </a-radio-group>
        </a-form-model-item>
        <!-- validateStatus="error" help="必须大于5个字符" 这个代码的意思是自动去校验我们自己定义的规则 在文档可查询 我们希望在用户输入的时候提示 所以需要在data里面去定义 -->
        <a-form-model-item label="Field A" :validateStatus="fieldAStatus" :help="fieldAHelp">
            <a-input v-model="fieldA" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="Field B">
            <a-input v-model="fieldB" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
            <a-button type="primary" @click="handleSubmit">
                Submit
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
export default {
    data() {
        return {
            form: {
                layout: "horizontal",
                //动态改变输入框提示
                fieldA: "",
                fieldB: "",
                fieldAStatus: "",
                fieldAHelp: "必须大于5个字符",
            },
        };
    },
    //需要对这个fieldA进行监听状态的改变并且判断赋值
    watch: {
        fieldA(val) {
            if (val.length <= 5) {
                this.fieldAStatus = "error";
                this.fieldAHelp = "必须大于5个字符";
            } else {
                (this.fieldAStatus = ""), (this.fieldAHelp = "");
            }
        },
    },
    computed: {
        formItemLayout() {
            const { layout } = this.form;
            return layout === "horizontal"
                ? {
                      labelCol: { span: 4 },
                      wrapperCol: { span: 14 },
                  }
                : {};
        },
        buttonItemLayout() {
            const { layout } = this.form;
            return layout === "horizontal"
                ? {
                      wrapperCol: { span: 14, offset: 4 },
                  }
                : {};
        },
    },
    methods: {
        handleSubmit() {
            if (this.fieldA.length <= 5) {
                this.fieldAStatus = "error";
                this.fieldAHelp = "必须大于5个字符";
            } else {
                console.log({
                    fieldA: this.fieldA,
                    fieldB: this.fieldB,
                });
            }
        },
    },
};
</script>
