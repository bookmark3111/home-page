<template>
  <div class="content">
    <div class="container">
      <div class="comment" v-for="item in commentData">
        <div class="info">
          <img class="avatar" :src="item.fromAvatar" width="36" height="36" />
          <div class="right">
            <div class="name">{{ item.fromName }}</div>
            <div class="date">{{ item.date }}</div>
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="control">
          <span class="like" :class="{ active: item.isLike }" @click="likeClick(item)">
            <i class="iconfont icon-like"></i>
            <span class="like-num">{{ item.likeNum > 0 ? item.likeNum + '人赞' : '赞' }}</span>
          </span>
          <span class="comment-reply" @click="showCommentInput(item)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
        <div class="reply">
          <div class="item" v-for="reply in item.reply">
            <div class="reply-content">
              <span class="from-name">{{ reply.fromName }}</span><span>: </span>
              <span class="to-name">@{{ reply.toName }}</span>
              <span>{{ reply.content }}</span>
            </div>
            <div class="reply-bottom">
              <span>{{ reply.date }}</span>
              <span class="reply-text" @click="showCommentInput(item, reply)">
                <i class="iconfont icon-comment"></i>
                <span>回复</span>
              </span>
            </div>
          </div>
          <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item)">
            <i class="el-icon-edit"></i>
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div class="input-wrapper" v-if="showItemId === item.id">
              <el-input class="gray-bg-input" v-model="inputComment" type="textarea" :rows="3" autofocus
                placeholder="写下你的评论">
              </el-input>
              <div class="btn-control">
                <span class="cancel" @click="cancel">取消</span>
                <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="home-btn">
      <router-link class="site-box" to="/"><i class="fa fa-home" aria-hidden="true"></i> <b>返回首页</b></router-link>
    </div>
  </div>
</template>

<script setup>
import * as CommentData from '../mock/mock'
import {
  onMounted,
  ref
} from 'vue';
const commentData = [];
onMounted(() => {
  let obj = CommentData.comment.data;
  for (let i in obj) {
    commentData.push(obj[i])
  }
  console.log(commentData);
  ref(commentData)
});
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;

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

.home-btn {
  position: absolute;
  bottom: 5%;
  z-index: 1000;
}

.home-btn a {

  padding: 5px 66px;
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