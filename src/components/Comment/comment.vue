<!--评论模块-->
<template>
    <div class="container">
        <div class="comment" v-for="item in comments">
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
</template>
<script>
import {
  computed,
  onMounted, reactive, ref, watchEffect,
} from 'vue';

const comments = reactive({
    comments
});
</script>