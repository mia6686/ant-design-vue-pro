<template>
    <div style="width: 256px">
        <!-- 这里是通过sync这个方法控制父子菜单的打开 作为双向绑定 -->
        <a-menu :selectedKeys="selectedKeys" :openKeys.sync="openKeys" mode="inline" :theme="theme">
            <template v-for="item in menuData">
                <!-- 用于通过菜单绑定到路由上去 -->
                <!-- 双向绑定这个右边导航的样式 -->
                <a-menu-item v-if="!item.children" :key="item.path" @click="() => $router.push({ path: item.path, query: $route.query })">
                    <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon"></a-icon>
                    <span>{{ item.meta && item.meta.title }}</span>
                </a-menu-item>
                <sub-menu v-else :menu-info="item" :key="item.path" />
            </template>
        </a-menu>
    </div>
</template>
<script>
import SubMenu from "../layouts/SubMenu.vue";
export default {
    props: {
        theme: {
            type: String,
            default: "dark",
        },
    },
    components: {
        "sub-menu": SubMenu,
    },
    watch: {
        "$route.path": function(val) {
            this.selectedKeys = this.selectedKeysMap[val];
            this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
        },
    },
    data() {
        this.selectedKeysMap = {};
        //打开菜单
        this.openKeysMap = {};
        const menuData = this.getMenuData(this.$router.options.routes);
        return {
            collapsed: false,
            menuData,
            selectedKeys: this.selectedKeysMap[this.$route.path],
            //打开菜单 三元运算符进行判断
            openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
        };
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
        //回调函数的方法 用来判断一级二级三级菜单的显示
        getMenuData(routes = [], parentKeys = [], selectedKey) {
            const menuData = [];
            routes.forEach((item) => {
                if (item.name && !item.hideInMenu) {
                    //父级菜单
                    this.openKeysMap[item.path] = parentKeys;
                    //选中菜单                          [item.path || selectedKey];导致分布表单点击时没有选中 要选中应该是[selectedKey || item.path];
                    this.selectedKeysMap[item.path] = [selectedKey || item.path];
                    const newItem = { ...item };
                    delete newItem.children;
                    if (item.children && !item.hideChildrenInMenu) {
                        newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
                    } else {
                        this.getMenuData(item.children, selectedKey ? parentKeys : [...parentKeys, item.path], selectedKey || item.path);
                    }
                    menuData.push(newItem);
                } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
                    menuData.push(...this.getMenuData(item.children));
                }
            });
            return menuData;
        },
    },
};
</script>
