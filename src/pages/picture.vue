<template>
   <HeaderBtn/>
  <div class="content">
    <FineWeatherGalleryView />
    <!-- <div class="home-btn">
      <router-link class="site-box" to="/"><i class="fa fa-home" aria-hidden="true"></i>    <b>返回首页</b></router-link>
    </div> -->
  </div>
</template>

<script setup>
import FineWeatherGalleryView from '../components/picture/FineWeatherGalleryView.vue';
import HeaderBtn from '../components/HeaderBtn.vue';
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 30px;

  .user-profile-container {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .user-profile-image {
    display: flex;
    border-radius: 50%;
    box-shadow: 0 2px 8px var(--shadow-color);
    padding: 5px;
    border: 3px solid var(--border-color);
    position: relative;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }

    .status-ball {
      position: absolute;
      background: #00c800;
      width: 2em;
      height: 2em;
      border-radius: 20px;
      border: 3px solid #eee;
      bottom: 5px;
      right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      z-index: 1;
      cursor: pointer;
      overflow: hidden;

      &::before {
        content: "在线中";
        color: #00c800;
        opacity: 0;
        transition: opacity 0.3s ease-in-out, color 0.1s ease-in-out;
      }

      &:hover {
        width: 4.5em;
        height: 2em;
      }

      &:hover::before {
        opacity: 1;
        color: #eee;
      }
    }
  }
}
.home-btn{
 position: absolute;
 bottom: 5%;
 z-index: 1000;
}
.home-btn a{
  
  padding:5px 66px;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  .content {
    gap: 15px;
  }

  .content .user-profile-container {
    flex-direction: column;
    gap: 0;
  }

  h1 {
    font-size: 1.5em;
  }
}
</style>