<template>
    <div class="header-btn">
        <span>13:14</span>
        <span><router-link class="site-box" to="/"><i class="fa fa-home" aria-hidden="true"></i>
                <b>返回首页</b></router-link></span>
        <span>摄影小郑📷</span>
    </div>
    <div class="content">
        <div class="status">
            <!-- <img src="http://bookmarksoft.cn:53785/oss//2024/04/01/YemqayL27b.jpg" alt="Status background"> -->
            <div class="profile">
                <img class="timestamp-img-item" style="max-width: 60px !important;"
                    src="http://bookmarksoft.cn:53785/oss/2024/04/01/YemqO4rbVo.jpg" alt="Profile picture">
                <div @click="showOrhideImg">
                    <div>书签✏️</div>
                    <div>初见乍惊欢 久处亦怦然 <i class="fa fa-image" style="color: red;">({{images_count}}条)</i> </div>
                </div>
            </div>
        </div>
        <div class="camera-gif" @click="showOrhideImg"><img style="width: 80px;float: right; display: inline-flex;"
                src="../assets/1eadd9fd999b4a5798af7e1ca6edf21c.gif" /></div>
        <div class="moment" v-for="(image, index) in images">
            <div class="content">
                <div>
                    <el-row>
                        <el-col :span="20">{{ image.title }} <i class="fa fa-camera" style="color: purple;"></i> {{ image.desc }} </el-col>
                        <el-col style="text-align: right;" :span="4">第{{index+1}}条</el-col>
                    </el-row>
                </div>
                <img v-if="showimg" :key="index" :src="image.src" :alt="image.alt" class="timestamp-img-item"
                    @click="openModal(image.src, image.alt, image.major)" />
                <!-- <img src="../assets/timeline/2024.11.27.jpg"/> -->
                <div class="timestamp">
                    <el-row>
                        <el-col :span="12">{{ image.city }} · {{ image.place }}</el-col>
                        <el-col :span="12" style="text-align: right;">出镜：{{ image.major }}</el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="home-btn">
            <el-row>
                <el-col :span="12"> <router-link class="site-box" to="/"><i class="fa fa-home" aria-hidden="true"></i> <b>返回首页</b></router-link></el-col>
                <el-col :span="12" style="text-align: right;">当前页总共 <span style="color: red;"><strong>{{images_count}} 条</strong></span></el-col>
            </el-row>
           
        </div>
    </div>
    <!-- 模态框 -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop> <!-- 阻止点击事件冒泡到模态框背景 -->
            <span class="close" aria-label="Close" @click="closeModal">&times;</span>
            <img :src="modalImageSrc" class="modal-content" alt="Modal Image" />
            <div class="caption">{{ modalCaption }} --{{modalCaption_major}}</div>
        </div>
    </div>
    <div v-show="showArrow" class="arrow-container">
            <div class="arrow bounce"><img style="max-width: 50px;" @click="scrollToTop" src="../assets/向上箭头.png" />
            </div>
        </div>
</template>
<script setup>
import { ref } from 'vue';
import timelineData from '../config/timeline.json';

// 数据
const isModalVisible = ref(false);
const modalImageSrc = ref('');
const modalCaption = ref('');
const modalCaption_major = ref('');
const showimg = ref(true);
const images_count = timelineData.length;
const images = timelineData;

// 方法：打开模态框
const openModal = (src, alt, major) => {
    modalImageSrc.value = src;
    modalCaption.value = alt;
    modalCaption_major.value = major;
    isModalVisible.value = true;
};

// 方法：关闭模态框
const closeModal = () => {
    isModalVisible.value = false;
};

const showOrhideImg = () => {
    if (showimg.value) { showimg.value = false; }
    else { showimg.value = true; }
}

//浮动的按钮
const showArrow = ref(true);
const scrollToTop = () => {
     setTimeout(() => {
        document.documentElement.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
          // 等待 0.5 秒后执行该方法
      }, 300);
   
}
</script>
<style scoped>
body {
    height: auto;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;

}

.header-btn {
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    position: fixed;
    z-index: 999;
    border-radius: 10px;
}

/* .header-btn img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
} */

.content {
    position: relative;
}

.status {
    margin-top: 25px;
    padding: 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}

.status img {
    width: 100%;
    border-radius: 10px;
}

.profile {
    display: flex;
    align-items: center;
    padding: 10px;
}

.profile img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
}

.camera-gif {
    position: fixed;
    z-index: 999;
    right: 10px;
    top: 44%;
}

.content {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
}

.content img {
    width: 100%;
    border-radius: 5px;
}

.moment {
    margin-bottom: 20px;
}

.timestamp {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

/* 模态框中图片的样式 */
.modal-content {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 80vh;
    /* 限制图片最大高度为视口高度的80% */
    object-fit: contain;
    /* 保持图片比例 */
    position: relative;
}

/* 关闭按钮的样式和位置 */
.close {
    position: absolute;
    float: left;
    top: 20px;
    /* 调整位置 */
    right: 30px;
    /* 调整位置 */
    color: red;
    font-size: 30px;
    /* 可根据需要调整大小 */
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    /* 确保关闭按钮在所有内容之上 */
}

/* 模态框样式优化 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* 确保模态框在最上层 */
}

.modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    /* 相对于模态框内部定位关闭按钮 */
}

.close {
    /* position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #333; */
}

.caption {
    text-align: center;
}

/* 使按钮浮动在右侧中间 */
/* 向下箭头的容器 */
.arrow-container {
    position: fixed;
    right: 20px;
    bottom: 0px;
    transform: translateY(-50%);
}

/* 浮动按钮开始 */
/* 向下箭头的样式及动画 */
.arrow {
    font-size: 40px;
    color: #007bff;
    animation: bounce 1s infinite;

    /* 让文字竖排 */
    /* writing-mode: vertical-rl; */
    /* 竖排文字，右向左 */
    text-align: center;
    /* 文字居中 */
}

/* 弹跳动画 */
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

/* 浮动按钮结束 */
</style>