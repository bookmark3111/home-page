<template>
    <div class="header-btn">
        <span>13:14</span>
        <span><router-link class="site-box" to="/"><i class="fa fa-home" aria-hidden="true"></i>
                <b>返回首页</b></router-link></span>
        <span>摄影小郑📷</span>
    </div>
</template>
<style scoped>
.header-btn {
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    padding:10px 0;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    position: fixed;
    z-index: 999;
    border-radius: 10px;
}

.header-btn img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>