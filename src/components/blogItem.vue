<template>
  <div class="blog-item">
    <router-link
      :to="`/blogdetail/` + item.blog_id"
      target="_blank"
      @click.native="addViews"
    >
      <div class="title">{{ item.title }}</div>
      <div class="main">
        <div class="cover">
          <img v-if="item.cover" :src="item.cover" />
          <img v-else src="@/assets/default.png" />
        </div>
        <div class="abstract">摘要：{{ item.summary }}</div>
      </div>
    </router-link>
    <div class="bottom">
      <div class="author">
        作者：
        <div class="name">{{ item.user_name }}</div>
      </div>
      <router-link
        :to="'/categorydetail/' + item.cate_id"
        class="category-name"
      >
        分类：
        <div class="name">{{ item.cate_name }}</div>
      </router-link>
      <div class="time">{{ item.create_time }}</div>
      <div
        :class="['like', 'iconfont', 'icon-dianzan', like ? 'color' : '']"
        @click="changeLike"
      >
        {{ item.like_count }}赞
      </div>

      <div class="comment iconfont icon-pinglun" v-if="item.allow_comment">
        {{ item.comment_count }}评论
      </div>
      <div class="comment iconfont icon-liulan">
        {{ item.views }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      like: false,
      choose: true, // 点赞节流参数
    };
  },
  props: ["item"],
  methods: {
    // 获取点赞状态
    async getLikeState() {
      let result = await this.$request({
        url: "/blog/likeState",
        method: "POST",
        data: {
          blogId: this.item.blog_id,
        },
      });
      if (result.status === 200) {
        this.like = result.data.like;
      }
    },

    // 改变点赞
    async changeLike() {
      if (this.choose) {
        this.choose = false;
        let result = await this.$request({
          url: "/blog/updateLike",
          method: "POST",
          data: {
            count: !this.like ? 1 : -1,
            blogId: this.item.blog_id,
          },
        });
        // console.log(result);
        if (result.status === 200) {
          this.like = !this.like;
          if (this.like) {
            this.item.like_count += 1;
          } else {
            this.item.like_count -= 1;
          }
        }
        // 1秒内只能触发一次请求
        setTimeout(this.time, 1000);
      }
    },
    time() {
      this.choose = true;
    },

    // 增加浏览量
    addViews() {
      this.$request({
        url: "/blog/addViews",
        method: "POST",
        data: { blogId: this.item.blog_id },
      });
    },
  },
  mounted() {
    this.getLikeState();
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px 30px 10px;
  border-bottom: 1px solid #eee;
  .title {
    font-size: 16px;
    color: var(--main-color);
    font-weight: bold;
    margin-bottom: 10px;
    text-decoration: underline;
  }
  .main {
    display: flex;
    align-items: flex-start;
    .cover {
      width: 52px;
      height: 52px;
      border: 1px solid #ddd;
      margin-right: 5px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      img {
        width: 50px;
      }
    }
    .abstract {
      // font-size: 12px;
      // color: #666;
      word-break: break-all;
      margin-top: 6px;
      font-size: 14px;
      line-height: 22px;
      white-space: normal;
      color: #999aaa;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .bottom {
    display: flex;
    align-items: flex-end;
    font-size: 13px;
    color: #555;
    .author,
    .category-name {
      margin-right: 8px;
      // color: var(--main-color);
      display: flex;
      .name {
        color: var(--main-color);
      }
    }
    .like,
    .comment,
    .time {
      margin-right: 8px;
    }
    .like:hover {
      color: var(--main-color);
      cursor: pointer;
    }
    .iconfont:hover {
      color: var(--main-color);
    }
    .color {
      color: var(--main-color) !important;
    }
    .iconfont {
      // display: inline-block;
      // vertical-align: middle;
      font-size: 13px;
      color: #999;
    }
  }
}
.blog-item:hover {
  background: rgba(200, 200, 200, 0.1);
}
</style>