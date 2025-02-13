<template>
    <div id="app">
      <!-- 点击按钮后禁用页面 -->
      <button @click="startLoading" :disabled="isLoading">点击开始加载</button>
  
      <!-- 加载动画 -->
      <div v-if="isLoading" class="overlay">
        <div class="spinner"></div>
      </div>
      
      <!-- 页面内容 -->
      <div class="content" v-if="!isLoading">
        <p>这是页面的内容</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: false  // 控制加载状态
      };
    },
    methods: {
      // 启动加载动画
      startLoading() {
        this.isLoading = true;
        // 模拟加载过程，1秒后恢复正常
        setTimeout(() => {
          this.isLoading = false;
        }, 2000); // 2秒后恢复正常
      }
    }
  };
  </script>
  
  <style scoped>
  /* 页面内容 */
  .content {
    padding: 20px;
    text-align: center;
  }
  
  /* 禁用按钮样式 */
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  /* 全屏遮罩层，显示加载动画 */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);  /* 半透明黑色背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  /* 加载动画样式 */
  .spinner {
    border: 4px solid #f3f3f3; /* 灰色背景 */
    border-top: 4px solid #3498db; /* 蓝色进度条 */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  /* 加载动画旋转效果 */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  