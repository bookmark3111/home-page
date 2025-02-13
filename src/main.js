import { createApp } from 'vue';
import App from './App.vue';
import './style.less';
import 'virtual:uno.css';
import { MotionPlugin } from '@vueuse/motion';
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Danmaku from 'danmaku-vue'

const app = createApp(App);

app.use(MotionPlugin);
app.use(router);
app.use(ElementPlus)
app.use(Danmaku);

app.mount('#app');