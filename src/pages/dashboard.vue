<template>
    <HeaderBtn />
    <div class="dashboard-content">
        <WidgetComponent />
    </div>
</template>

<script setup>
import WidgetComponent from '../components/LAWidget.vue'
import HeaderBtn from '../components/HeaderBtn.vue';
</script>

<style scoped>
.dashboard-content {
    height: 96vh;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 50px;
}
.la-widget.la-data-widget__container p svg {
    display: none !important;
}
</style>
