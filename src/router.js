import Vue from "vue";
import Router from "vue-router";
import findLast from 'lodash/findLast';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Forbidden from "./views/403.vue";
import NotFound from "./views/404.vue";
//把这个权限的文件导入进来
import {check, isLogin} from './utils/auth';
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
          
        },
        {
          path: "/user/login",
          name: "login",
          component: () => import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () => import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    //配置403的路由
    {
      path: "/403",
      name: "403",
      hideChildrenMenu: true,
      component: Forbidden
    },
    {
      path: "*",
      name: "404",
      hideChildrenMenu: true,
      component: NotFound
    },
    {
      path: "/",
      //添加元信息 在路由守卫中进行判断 用户和admin都可以进行访问
      meta: { authority: ["user", "admin"] },
      component: () => import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        //dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis",// 重定向 
          meta: {title: '分析页'}, 
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {icon: "dashboard", title: "仪表盘"},
          component: { render: h => h("router-view") }, //
          children: [
            {
              path: "/dashboard/analysis",
              name: "Analysis",
              meta: {title: '分析页'},  
              component: () => import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis"),
            }
          ]
        },
        //form
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          meta: {icon: "form", title: "表单", authority: ["admin"]},//只允许admin访问
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: {title: '基础表单'},
              component: () => import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm"),
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: {title: '分布表单'},
              component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"),
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"),
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"),
                },
              ]
            },
          ]
        }
      ]
    }
  ]
});


router.beforeEach((to, form, next) => {
  if(to.path !== form.path){
    NProgress.start();
  }
  //to就是即将去的路由，matched就是路由提供给我们的一个接口 ，我们可以再当前的字段里面获取到当前路由匹配到的所有信息，
  //我们要找到距离我们最近的authority
  const record = findLast(to.matched, record => record.meta.authority);
  console.log(record)
  //设置条件判断 如果找到了我们就拿这个存储的这个权限去校验
  //如果是record并且不是check里面的record里面元信息的authority
  if(record && !check(record.meta.authority)){
    console.log('11111111111111111111111')
    // 如果没有权限就跳转到登录页面或者403，就需要进行第二次判断他是否已经登录
    // 如果没有登录的话那就跳转到我们的登录页面
        //加一个条件判断 防止一直出现下一步的操作 ， 意思就是如果没有登录并且不是登录页面，那下一步就必须跳转到登录页面进行登录
    if(!isLogin() && to.path !== '/user/login'){
      console.log('222222222222222222')
      next({
        path: '/user/login'
      })
    }else if(to.path !== '/403'){  //如果已经登录了并且不是403页面 那就跳转到403页面去 需要配置403的路由
      next({
        path: '/403'
      })
    }
    //这里需要暂停掉NProgress 因为不会进入到afterEach里面了
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
