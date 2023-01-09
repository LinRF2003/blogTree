<template>
  <div class="blog" v-loading.fullscreen.lock="loading">
    <div class="left">
      <router-link to="/" :class="[$route.path == '/' ? 'active' : '']"
        >首页</router-link
      >
      <router-link to="/myblog">我的博客</router-link>
      <router-link to="/editblog">添加博客</router-link>
      <!-- <router-link class="follow" to="/">关注</router-link> -->
      <router-link
        to="/likeblog"
        :class="[$route.path == '/likeblog' ? 'active' : '']"
        >我赞</router-link
      >
      <router-link
        to="/commentblog"
        :class="[$route.path == '/commentblog' ? 'active' : '']"
        >我评</router-link
      >
    </div>
    <div class="blog-content" v-if="this.$route.path == '/'">
      <div class="pattern">
        <div :class="['size', type ? '' : 'color']" @click="getNew">最新</div>
        <div class="padding">|</div>
        <div :class="['size', type ? 'color' : '']" @click="getHot">热榜</div>
      </div>
      <div v-for="item in blogList" :key="item.blog_id">
        <BlogItem :item="item"></BlogItem>
      </div>
      <div class="block" v-if="!loading">
        <!-- <el-pagination
          v-if="!loading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
       
          :page-size="pageSize"
          layout=" prev, pager, next,jumper, ->, sizes,total"
          :total="totalCount"
        >
        </el-pagination> -->
        <Pagination
          :pageNo="pageNo"
          :pageSize="pageSize"
          :totalCount="totalCount"
          :pageTotal="pageTotal"
          @changePageNo="changePageNo"
        ></Pagination>
      </div>
    </div>

    <router-view></router-view>
    <!-- <div class="right"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
      type: 0, // 获取数据类型
    };
  },
  methods: {
    // 获取博客列表
    async getBlogList() {
      this.loading = true;
      let result = await this.$request({
        url: "/blog/blogList",
        method: "POST",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          type: this.type,
        },
      });
      if (result.status == 200) {
        scrollTo(0, 0);
        this.blogList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.loading = false;
      }
      // console.log(result.data.list);
    },
    // 获取最新博客
    getNew() {
      if (this.type == 1) {
        this.type = 0;
        this.getBlogList();
      }
    },
    //获取热门博客
    getHot() {
      if (this.type == 0) {
        this.type = 1;
        this.getBlogList();
      }
    },

    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getBlogList();
    // },
    changePageNo(val) {
      this.pageNo = val;
      this.getBlogList();
    },
    // handleCurrentChange(val) {
    //   this.pageNo = val;
    //   this.getBlogList();
    // },
  },
  mounted() {
    this.getBlogList();
  },
};
</script>

<style lang="scss" scoped>
.blog {
  .left {
    position: fixed;
    min-width: 84px;
    height: 50px;
    max-width: 84px;
    color: #444;

    a {
      text-align: right;
      display: block;
      padding: 10px;
    }
    a:hover {
      cursor: pointer;
      color: #2f96fd;
    }
    .active {
      color: #2f96fd;
    }
  }
  .blog-content {
    margin-left: 150px;
    .pattern {
      padding: 10px 15px 10px;
      display: flex;
      background: #fff;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      .size {
        cursor: pointer;
      }
      .padding {
        padding: 0 10px;
        color: #dcdfe6;
      }
      .color {
        color: #007fff;
      }
    }
  }

  .right {
    min-width: 200px;
  }
}
</style>