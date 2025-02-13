import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../components/Index.vue"),
  },
  {
    path: "/message",
    name: "message",
    meta: {
      title: "留言",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/commentView.vue"),
  },
  {
    path: "/danmuban",
    name: "danmuban",
    meta: {
      title: "弹幕",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/danmuban.vue"),
  },
  {
    path: "/picture",
    name: "picture",
    meta: {
      title: "相册",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/picture.vue"),
  },
  {
    path: "/timeline",
    name: "timeline",
    meta: {
      title: "时间轴",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/timeline.vue"),
  },
  {
    path: "/category",
    name: "category",
    meta: {
      title: "分类",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/category.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "访问统计",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/dashboard.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: {
      title: "行程安排",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/calendar.vue")
  },
  {
    path: "/demo",
    name: "demo",
    meta: {
      title: "行程安排",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/demo.vue"),
  },
  {
    path: "/demo_line",
    name: "demo_line",
    meta: {
      title: "行程安排",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("../pages/demo_line.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

