<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <!-- 内容区域 -->
    <div class="left">
      <div class="blog-title">{{ blogInfo.title }}</div>
      <div class="detail-blog-info">
        <div class="blog-createTime">{{ blogInfo.create_time }}</div>
        <!-- 作者：<router-link to="/" class="user-name">{{
          blogInfo.user_name
        }}</router-link> -->
        作者：
        <div class="user-name">{{ blogInfo.user_name }}</div>
        分类：<router-link
          :to="'/categorydetail/' + blogInfo.cate_id"
          class="cate-name"
          >{{ blogInfo.cate_name }}</router-link
        >
        类型：
        <div class="type">{{ blogInfo.type == 0 ? "原创" : "转载" }}</div>
        <div v-if="blogInfo.type == 1" class="reprint">
          转载地址：
          <a :href="blogInfo.reprintUrl" target="_blank">{{
            blogInfo.reprintUrl
          }}</a>
        </div>
      </div>
      <div id="content" class="content" v-html="blogInfo.content"></div>
    </div>
    <!-- 目录结构 -->
    <div class="right">
      <div class="top-title">目录结构</div>
      <div class="title">
        <div v-if="!catelog.length" class="catalog">空空如也</div>
        <a
          class="item"
          v-for="item in catelog"
          :key="item.id"
          :href="'#' + item.id"
          :style="{ marginLeft: `${15 * item.leval}px` }"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment" v-if="blogInfo.allow_comment" id="comment">
      <div>评论</div>

      <div class="item" v-for="item in commentList" :key="item.comment_id">
        <div class="avatar">
          <img :src="item.avatar" v-if="item.avatar" />
          <img src="@/assets/logo.png" v-else />
        </div>
        <div class="info">
          <div class="name">
            <div class="auto" v-if="item.user_name == blogInfo.user_name">
              作者本人
            </div>
            {{ item.user_name }}
          </div>
          <div class="comment-content" v-html="item.content"></div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
      <div class="add-comment" @click="showComment">
        <el-button type="danger" class="button">添加评论</el-button>
      </div>
      <!-- <TextEditor height="300px"></TextEditor> -->
      <div v-if="showEditor" class="editor">
        <div
          contenteditable="true"
          class="desc"
          placeholder="请输入内容"
          @input="handleInput"
        ></div>
        <!-- <div v-html="content"></div> -->
        <el-button type="primary" @click="addComment">发布</el-button>
        <el-button @click="changeShow">取消</el-button>
      </div>
    </div>
    <!-- 左边固定点赞评论 -->
    <div class="float">
      <div :class="['like', like ? 'liket' : '']" @click="changeLike">
        <i class="iconfont icon-dianzan"></i>
        <div class="count">{{ blogInfo.like_count }}</div>
      </div>
      <a href="#comment" class="pinglun"
        ><i class="iconfont icon-pinglun"></i>
        <div class="count">{{ blogInfo.comment_count }}</div></a
      >
    </div>
  </div>
</template>

<script>
//代码高亮样式
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
export default {
  name: "blogdetail",
  data() {
    return {
      blogInfo: {},
      catelog: [], // 目录结构
      commentList: [], // 评论列表
      // operationText: "展开",
      // limitBtnShow: false,
      showEditor: false,
      content: "",
      loading: false,
      like: "",
      choose: true, //控制点赞操作
    };
  },
  methods: {
    // 根据路由博客id获取博客详情
    async getBlogDetail() {
      this.loading = true;
      let result = await this.$request({
        url: "/blog/blogDetail",
        method: "post",
        data: { blogId: this.$route.params.blogId },
      });

      if (result.status === 200) {
        this.blogInfo = result.data[0];
        this.loading = false;
      }

      this.$nextTick(() => {
        let content = document.querySelector("#content");

        let nodes = content.childNodes;

        const catalog = [];
        let tags = ["H1", "H2", "H3", "H4", "H5", "H6"];
        let index = 0;
        nodes.forEach((item) => {
          // console.log(1);
          let tagName = item.tagName;
          if (!tags.includes(tagName)) {
            return;
          }
          index++;
          let id = "log" + index;
          item.setAttribute("id", id);
          catalog.push({
            id: id,
            title: item.innerText,
            leval: Number.parseInt(tagName.substring(1)),
          });
        });
        this.catelog = catalog;

        let blocks = document.querySelectorAll("pre");
        blocks.forEach((block) => {
          hljs.highlightBlock(block);
        });
      });
    },

    // 获取评论列表
    async getCommentList() {
      let result = await this.$request({
        url: "/blog/getBlogComment",
        method: "POST",
        data: {
          blogId: this.$route.params.blogId,
        },
      });

      if (result.status === 200) {
        this.commentList = result.data;
      }
    },

    // 添加评论框显示
    showComment() {
      this.showEditor = true;
    },
    // 评论框变化
    handleInput($event) {
      console.log($event.target);
      this.content = $event.target.innerHTML;
    },
    // 评论框取消
    changeShow() {
      this.showEditor = false;
    },

    // 添加评论
    async addComment() {
      let result = await this.$request({
        url: "/blog/addComment",
        method: "POST",
        data: {
          content: this.content,
          blogId: this.blogInfo.blog_id,
        },
      });
      // 重新获取评论

      if (result.status === 200) {
        this.getCommentList();

        this.blogInfo.comment_count += 1;

        this.showEditor = false;
        this.$message.success("添加评论成功");
      }
    },
    // 评论是否有展开
    // toggleLimit() {
    //   const box = document.getElementsByClassName("content");
    //   const line = box.style["-webkit-line-clamp"];
    //   box.style["-webkit-line-clamp"] = line === "3" ? 100 : 3;
    //   this.operationText = line === "3" ? "关闭" : "展开";
    // },

    // init
    // init() {
    //   console.log(document.getElementsByClassName("comment-content"));
    //   this.limitBtnShow =
    //     document.getElementsByClassName("comment-content").clientHeight >= 60;
    //   console.log(document.getElementsByClassName("detail"));
    //   document.getElementsByClassName("detail")[0].innerHTML("展开");
    // },
    // 获取点赞状态
    async getLikeState() {
      let result = await this.$request({
        url: "/blog/likeState",
        method: "POST",
        data: {
          blogId: this.$route.params.blogId,
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
            blogId: this.$route.params.blogId,
          },
        });
        // console.log(result);
        if (result.status === 200) {
          this.like = !this.like;
          if (this.like) {
            this.blogInfo.like_count += 1;
          } else {
            this.blogInfo.like_count -= 1;
          }
        }
        // 1秒内只能触发一次请求
        setTimeout(this.time, 1000);
      }
    },
    time() {
      this.choose = true;
    },
  },
  mounted() {
    this.getBlogDetail();
    this.getCommentList();
    this.getLikeState();
    // this.init();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-top: 18px;
  width: 88%;
  padding-bottom: 30px;
  .left {
    padding: 10px 20px;
    width: 75%;
    background: #fff;
    .content {
      line-height: 26px;
    }
    .blog-title {
      font-weight: bold;
      font-size: 28px;
    }
    .detail-blog-info {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      padding: 15px 10px;
      background: #f4f4f4;
      color: #666;
      .user-name,
      .blog-createTime,
      .cate-name,
      .type {
        margin-right: 20px;
      }
      .user-name,
      .cate-name,
      .type,
      a {
        color: #1890ff;
      }
      .reprint {
        display: flex;
      }
    }
  }
  .right {
    background: #fff;
    width: 300px;
    position: fixed;
    top: 18px;
    left: 73%;
    padding: 10px;
    .top-title {
      padding-left: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      line-height: 40px;
    }
    .title {
      max-height: 500px;
      overflow: auto;
      .catalog {
        text-align: center;
        margin-top: 5px;
        color: #999;
      }
    }
    .item {
      font-size: 14px;
      display: block;
      color: #333;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 0;
    }
  }
  .comment {
    margin-top: 20px;
    background: #fff;
    padding: 10px 20px;
    width: 75%;
    .add-comment {
      // display: inline-block;
      // align-items: center;
      display: flex;
      align-items: center;
      margin: 30px 0 20px;
      .button {
        // width: 180px;
        background: #ff0000;
        margin: 0 auto;
      }
    }
    .editor {
      .desc {
        border: 2px solid #333;
        border-radius: 4px;
        padding: 10px;
        min-height: 200px;
        margin: 10px 0;

        // height: 100px;
      }
    }

    div[contenteditable]:empty:not(:focus):before {
      content: attr(placeholder);
      color: #aaa;
    }
    .item {
      display: flex;
      padding-top: 10px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
      .avatar {
        width: 82px;
        height: 82px;
        border-radius: 82px;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        overflow: hidden;
        img {
          width: 80px;
          // border-radius: 80px;
        }
      }
      .info {
        margin-left: 10px;
        .name {
          display: flex;
          color: #666;
          margin-bottom: 10px;
          font-size: 14px;
          .auto {
            margin-right: 4px;
            color: #1890ff;
          }
        }
        .time {
          margin-top: 10px;
          font-size: 12px;
        }
        .comment-content {
          color: #4d4d4d;
          line-height: 20px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 3;
          // -webkit-box-orient: vertical;
        }
      }
    }
  }
  .float {
    top: 200px;
    left: 10px;
    position: fixed;
    .like {
      cursor: pointer;
      margin-bottom: 20px;
    }
    .like,
    .pinglun {
      display: block;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 60px;
      text-align: center;
      .count {
        color: #000;
        width: 20px;
        position: relative;
        left: 40px;
        top: -60px;
        background: #ddd;
        border-radius: 10px;
      }
      .iconfont {
        font-size: 30px;
        line-height: 60px;
        color: #666;
      }
    }
    .liket {
      background: #50a14f;
    }
  }
}
</style>
<style lang="scss">
.container {
  .left {
    .content {
      img {
        width: 100%;
      }
    }
  }
}
.hljs {
  padding: 1em;
}
img {
  width: 500px;
}
</style>