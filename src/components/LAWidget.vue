<template>
  <div ref="laWidgetContainer" class="la-widget-container"></div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'LAWidget',
  setup() {
    const laWidgetContainer = ref(null);

    onMounted(() => {
      // 检查是否已有相同的脚本，避免重复加载
      if (!document.getElementById('LA-DATA-WIDGET')) {
        const script = document.createElement('script');
        script.id = 'LA-DATA-WIDGET';
        script.crossOrigin = 'anonymous';
        script.charset = 'UTF-8';
        script.src = 'https://v6-widget.51.la/v6/3Ky3g44bvdGcOv7T/quote.js?theme=#FFFFFF,#1690FF,#333333,#1690FF,#FFFFFF,#1690FF,18&col=true&f=18&badge=icon_0&icon=center';
        script.onload = () => {
          console.log('51.la widget loaded successfully');
        };
        laWidgetContainer.value.appendChild(script);
      }
    });

    return {
      laWidgetContainer,
    };
  },
};
</script>

<style scoped>
.la-widget-container {
  /* 可根据需要设置样式 */
  width: 100% !important;
}
</style>
