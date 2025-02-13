<template>
  <main class="pa-4 dark:bg-#131130">
    <div class="h-100vh w-100vw dots fixed pointer-events-none" :class="{ 'dark': isDark }"></div>
    <div class="
      columns-1 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5
      gap-x-4
    " :key="rerenderKey">
      <div class="
        bg-#4c1d9525 backdrop-blur-2 saturate-120%
        dark:bg-violet-950 dark:c-gray-200 break-inside-avoid
        rd-2 pa-4 box-border mb-4 c-slate-800 text-justify lh-6 tracking-.5 text-0px
      " :class="{ 'flex items-center justify-between': folded }">
        <template v-if="!folded">
          <div class="text-sm">{{ INTRO }}</div>
        </template>
        <strong class="text-1rem" v-else>{{ TITLE }}</strong>
        <div class="
          backdrop-blur-2 saturate-120% bg-#4c1d9525 pa-1 rd-50% cursor-pointer
          hover:bg-#4c1d9545 active:bg-#4c1d9562
          dark:bg-violet-900 dark:c-gray-200 dark:hover:bg-violet-800 dark:active:bg-violet-700
        " :class="{
          'absolute bottom-2 right-2': !folded
        }" @click="folded = !folded">
          <div class="text-xl" :class="folded ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"></div>
        </div>
      </div>
      <ImageCard class="mb-4" v-for="img, index in images" :key="index" v-bind="img"
        @click="openDetail(index)" />
    </div>
    <div class="flex my-18 items-center flex-col select-none text-xs">

      <div class="text-gray-400 mb-3 mt-2.5">
        {{ images.length }}<span class="mx-.5">/</span>{{ imagesEntire.length }}
      </div>
      <div v-if="loadingImages" class="flex items-center">
        <i class="
          i-mdi-loading animate-iteration-infinite block
          animate-spin c-gray-600 dark:c-gray-200
        " />
      </div>
      <div class="
        c-gray-600 dark:c-gray-200 cursor-pointer
        rd-2 py-1 px-2 simple-btn
      " @click="loadMore" v-else-if="imagesEntire.length > loaded">
        加载更多图片
      </div>
      <div class="c-gray-600 dark:c-gray-200 py-1" v-else>
        没有更多了
      </div>
    </div>
    <footer class="flex flex-col items-center">
      <div class="text-xl c-slate-800 flex items-center">
        <div class="
          backdrop-blur-2 saturate-120%
          pa-1 rd-50% mr-2 cursor-pointer
          simple-btn
        " @click="isDark = !isDark">
          <div class="i-mdi-white-balance-sunny"></div>
        </div>
      </div>
    </footer>
    <ImageDetail v-model="imageDetailModel" v-bind="imageDetails"
      :key="imageDetails.imgMeta.src"
      @lastImage="openDetail(imageDetails.current - 1)"
      @nextImage="openDetail(imageDetails.current + 1)" :total="imagesEntire.length" />
    <div class="
      fixed h-100vh w-100vw flex items-center justify-center top-0 left-0
      bg-[rgba(47,14,59,0.62)] backdrop-blur-20 saturate-120
    " v-if="!images.length">
      <i class="
        i-mdi-loading animate-iteration-infinite c-white block
        text-3xl lg:text-4xl animate-spin
      " />
    </div>
  </main>
</template>

<script setup>
import {
  computed,
  onMounted, reactive, ref, watchEffect,nextTick
} from 'vue';
import { useDark, useEventListener, useWindowSize } from '@vueuse/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import ImageCard from './ImageCard.vue';
import ImageDetail from './ImageDetail.vue';
import imagesEntire from '../../config/images.json';

const imageCount = imagesEntire.length;//所有图片
const PAGE_SIZE = 500;
const TITLE = '「小郑摄影」';
const INTRO = `昆明约拍，作品展示。${TITLE}。（${imageCount}）张`;


const isDark = useDark();
const imageDetailModel = ref(false);
const loadingImages = ref(false);
const folded = ref(false);
const reactor = ref('');
const isReady = ref(false);
const loaded = ref(0);
const imageDetails = reactive({
  imgMeta: {
    title: '',
    desc: '',
    location: '',
    year: '',
    src: '',
    blurHash: {
      encoded: '',
      size: [],
    },
  },
  current: -1,
  total: 0,
});
const images = ref([]);
const { width, height } = useWindowSize();
const rerenderKey = computed(() => `${width.value}-${height.value}`);

const fpPromise = FingerprintJS.load();
(async () => {
  const fp = await fpPromise;
  const result = await fp.get();
  reactor.value = result.visitorId;
})();


function loadMore() {
  if (loadingImages.value || loaded.value >= imagesEntire.length) return; // 防止在图片加载时重复调用

  loadingImages.value = true;
  const delta = imagesEntire.slice(loaded.value, loaded.value + PAGE_SIZE);
  console.log(delta)
  images.value.push(...delta);
  loaded.value += delta.length;
  loadingImages.value = false;
}

function openDetail(index) {
 // 检查索引是否超出当前图片数组的范围
 if (index < 0 || index >= images.value.length) {
    return; // 防止访问越界的索引
  }

  if (index >= images.value.length && index < imagesEntire.length) {
    loadMore(); // 如果当前索引超出已加载图片数，加载更多
  }
  imageDetails.imgMeta = images.value[index];
  imageDetails.current = index;
  imageDetails.total = images.value.length;
   // 强制触发 ImageDetail 组件重新渲染
   imageDetailModel.value = false;  // 关闭详情
  nextTick(() => {                 // 确保关闭后立即重新打开
    imageDetailModel.value = true;
  });
}

function keypressListener(ev) {
  if (imageDetailModel.value) {
    if (ev.key === 'Escape') {
      imageDetailModel.value = false;
    } else if (ev.key === 'ArrowLeft' && imageDetails.current > 0) {
      openDetail(imageDetails.current - 1); // 上一张
    } else if (ev.key === 'ArrowRight' && imageDetails.current < imagesEntire.length - 1) {
      openDetail(imageDetails.current + 1); // 下一张
    }
  }
}

onMounted(() => {
  useEventListener(document, 'keydown', keypressListener);
  loadMore();
  isReady.value = true;
});

watchEffect(() => {
  if (imageDetailModel.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<style scoped>
.simple-btn {
  --at-apply: hover:bg-#4c1d9545 active:bg-#4c1d9562 bg-#4c1d9525;
  --at-apply: dark:bg-violet-900 dark:c-gray-200 dark:hover:bg-violet-800 dark:active:bg-violet-700;
}

.dots {
  /* background: url("data:image/svg+xml;utf8, <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><rect fill='rgba(25, 33, 38, 0.2)' x='7' y='7' width='2' height='2'></rect></svg>") fixed; */
}

.dots.dark {
  /* background: url("data:image/svg+xml;utf8, <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><rect fill='rgba(255, 255, 255, 0.17)' x='7' y='7' width='2' height='2'></rect></svg>") fixed; */
}
</style>
