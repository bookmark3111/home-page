<template>
  <div class="
    cursor-pointer relative overflow-hidden rd-2 transition-170
    hover:scale-103
  " ref="containerRef">
    <Suspense>
      <template #default>
        <ImageAsync :src="imgSrc" class="
            w-100% block  dark:bg-[rgba(0,0,0,.2)] bg-[rgba(0,0,0,.1)]
            backdrop-blur-4 saturate-120"  />
      </template>
      <template #fallback>
        <canvas class="w-100% rd-2 block" ref="skeletonRef" width="32" height="32"></canvas>
      </template>
    </Suspense>
    <div class="
      absolute top-0 left-0 w-100% h-100% box-border flex items-end justify-start
      pa-4 opacity-0 hover:opacity-100 transition-170 mask
    ">
      <div class="c-white overflow-hidden">
        <div class="text-xl fw-bold">{{ title }}</div>
        <div class="text-sm flex mt-2" v-if="location || year">
          <div v-if="location" class="flex items-center mr-2">
            <i class="i-mdi-map-marker mr-1"></i>
            {{ location }}
          </div>
          <div v-if="year" class="flex items-center">
            <i class="i-mdi-clock mr-1"></i>
            {{ year }}
          </div>
        </div>
        <div class="text-sm text-truncate mt-2" v-if="desc" :title="desc">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ImageAsync from './ImageAsync.vue';

const props = defineProps({
  src: String,
  title: {
    type: String,
    default: '无题',
  },
  location: String,
  year: String,
  desc: String,
});
const skeletonRef = ref(null);
const containerRef = ref();

const imgSrc = computed(
  () => `${props.src}`,
);

onMounted(() => {

});
</script>

<style scoped>
.mask {
  background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}
</style>
