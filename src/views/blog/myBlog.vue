<template>
  <div class="my-blog" v-loading.fullscreen.lock="loading">
    <div class="top">
      <div class="el-icon-arrow-left" @click="goBack">
        <span class="n">我的博客</span>
      </div>
    </div>
    <div v-for="item in blogList" :key="item.blog_id" class="content">
      <BlogItem :item="item" class="blog-content"></BlogItem>
      <div class="operate">
        <el-button type="primary" round @click="updateBlog(item.blog_id)"
          >修改</el-button
        >
        <el-button type="danger" round @click="deleteBlog(item.blog_id)"
          >删除</el-button
        >
        <el-dialog title="提示" :visible.sync="dialogShow" width="30%">
          <span>你确定删除嘛</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="define">确 定</el-button>
          </span>
        </el-dialog>
        <!-- @click="deleteBlog(item.blog_id)" -->
      </div>
    </div>
    <Pagination
      v-if="!loading"
      :pageNo="pageNo"
      :pageSize="pageSize"
      :totalCount="totalCount"
      :pageTotal="pageTotal"
      @changePageNo="changePageNo"
    ></Pagination>
    <Null v-if="blogList.length == 0 && !loading"></Null>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      dialogShow: false, //删除对话框
      blogId: "",
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
    };
  },
  methods: {
    // 获取博客列表
    async getBlogList() {
      this.loading = true;
      let result = await this.$request({
        method: "POST",
        url: "/blog/getMyBlog",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        },
      });
      if (result.status === 200) {
        this.blogList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
        this.loading = false;
      }
    },
    changePageNo(val) {
      this.pageNo = val;
      this.getBlogList();
    },
    // 修改博客按钮
    updateBlog(blogId) {
      this.$router.push({
        name: "编辑博客",
        params: {
          blogId: blogId,
        },
      });
    },

    // 删除博客
    async deleteBlog(blogId) {
      this.dialogShow = true;
      this.blogId = blogId;
    },

    // 确认删除
    async define() {
      this.dialogShow = false;

      let result = await this.$request({
        url: "/blog/deleteBlog",
        method: "POST",
        data: {
          blogId: this.blogId,
        },
      });
      if (result.status === 200) {
        this.getBlogList();
      }
    },

    // 返回上个页面
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getBlogList();
  },
};
</script>

<style lang="scss" scoped>
.my-blog {
  display: flex;
  flex-direction: column;
  // margin-left: 150px;
  .top {
    padding: 10px 0 20px;
    .el-icon-arrow-left {
      cursor: pointer;
    }
    .n {
      display: inline-block;
      font-weight: 550;
      margin-left: 5px;
    }
  }

  .content {
    display: flex;
    .blog-content {
      width: 100%;
      background: #fff;
    }
    .operate {
      display: flex;
      align-items: center;
      width: 20%;
      background: #fff;
    }
  }
}
.el-button.is-round {
  border-radius: 20px;
  padding: 12px 15px;
}
</style>