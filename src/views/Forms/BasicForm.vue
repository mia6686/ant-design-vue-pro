<template>
    <!-- 需要在这里把form传递过去 -->
    <a-form :layout="formLayout.layout" :model="form" v-bind="formItemLayout" :form="form">
        <a-form-item label="Form Layout">
            <a-radio-group v-model="formLayout.layout">
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
        </a-form-item>
        <!-- validateStatus="error" help="必须大于5个字符" 这个代码的意思是自动去校验我们自己定义的规则 在文档可查询 我们希望在用户输入的时候提示 所以需要在data里面去定义 -->
        <!-- 当我们是自动校验的时候 就不需要在a-form-item这里面写这个代码了:validateStatus="fieldAStatus" :help="fieldAHelp" -->
        <a-form-item label="Field A">
            <!-- 也不能直接绑定fieldA这个值 -->
            <!-- 要用到v-decorator这个指令，接收是一个数组 ，他有两个参数 第一个是需要监听的名称， 第二个是 传递的初始值， 配置的规则 （必填写的required，最小字段6，提示message）， -->
            <a-input v-decorator="['fieldA', { initialValue: fieldA, rules: [{ required: true, min: 6, message: '必须大于5个字符' }] }]" placeholder="input placeholder" />
        </a-form-item>
        <a-form-item label="Field B">
            <a-input v-decorator="['fieldB', { initialValue: fieldB, rules: [{ required: true, pattern: /^[0-9]\d*$/, message: '请输入0-9的数字' }] }]" placeholder="input placeholder" />
        </a-form-item>
        <div>
            <input type="text" v-model="bangding" class="miainput" />
            <div v-if="isErr">{{ msg }}</div>
            <div @click="dianji">aaa</div>
        </div>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
            <a-button type="primary" @click="handleSubmit">
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
export default {
    data() {
        //现在通过动态去更改AB监听的数据
        //首先创建一个form实例  this.$form字main里面通过vue.use传递使用 ，这里面传递一个this是在createForm调用的时候用到,可以直接更新我们数据
        this.form = this.$form.createForm(this);
        return {
            //动态改变输入框提示
            fieldA: "hello", //自动校验的时候给A一个hello初始值
            fieldB: "",
            //自动校验的时候这两个数据也不要了
            // fieldAStatus: "",
            // fieldAHelp: "",
            formLayout: {
                layout: "horizontal",
            },
            bangding: "",
            isErr: true,
            msg: "",
        };
    },
    //通过的接口返回过来的数据之后，如何动态的去改变我们的form表单的值，form提供的API去改变
    mounted() {
        setTimeout(() => {
            this.form.setFieldsValue({ fieldA: "hello world" });
        }, 3000);
        // setTimeout(() => {
        //     this.form.setFieldsValue({ fieldB: "ha xixixi" });
        // }, 3000);
    },
    //需要对这个fieldA进行监听状态的改变并且判断赋值
    //在自动校验的时候也不需要监听
    // watch: {
    //     fieldA(val) {
    //         if (val.length <= 5) {
    //             this.fieldAStatus = "error";
    //             this.fieldAHelp = "必须大于5个字符";
    //         } else {
    //             (this.fieldAStatus = ""), (this.fieldAHelp = "");
    //         }
    //     },
    // },
    computed: {
        formItemLayout() {
            const { layout } = this.formLayout;
            return layout === "horizontal"
                ? {
                      labelCol: { span: 4 },
                      wrapperCol: { span: 14 },
                  }
                : {};
        },
        buttonItemLayout() {
            const { layout } = this.formLayout;
            return layout === "horizontal"
                ? {
                      wrapperCol: { span: 14, offset: 4 },
                  }
                : {};
        },
    },
    methods: {
        handleSubmit() {
            //在自动校验的时候还需要添加一个this和第一个if条件
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    //我们需要同步给我们的原始数据 校验通过了 给后台发送请求 ，后台也通过校验了，就可以同步给其他组件使用了
                    // this.fieldA = values.fieldA;  //表单越来越大的情况下的话 我们可以更加简便的写法如下
                    Object.assign(this, values); //可以直接赋值  这样就可以直接同步到AB了
                }
            });
            if (this.fieldA.length <= 5) {
                this.fieldAStatus = "error";
                this.fieldAHelp = "必须大于5个字符";
            }
        },
        dianji() {
            var miainputtwo = document.getElementsByClassName("miainput");
            console.log(miainputtwo);
            console.log(this.bangding);
            this.msg = "";
            if (!this.bangding.match(/^[0-9]*$/) && this.bangding.length < 3) {
                this.msg = "请输入0-9的数字且不能小于3个字符";
                return;
            }
            if (!this.bangding.match(/^[0-9]*$/)) {
                this.msg = "请输入0-9的数字";
                return;
            }
            if (this.bangding.length < 3) {
                this.msg = "不能小于3个字符";
                return;
            }
        },
    },
};
</script>
