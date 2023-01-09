<template>
  <div v-loading.fullscreen.lock="loading">
    <div v-for="item in blogList" :key="item.blog_id" class="content">
      <BlogItem :item="item" class="blog-content"></BlogItem>
      <div class="operate">
        <el-button type="primary" round @click="reduction(item.blog_id)"
          >还原</el-button
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
        <el-dialog title="提示" :visible.sync="dialogShow" width="30%">
          <span>你确定还原嘛</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="definerReduction"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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
    <Null v-if="!blogList"></Null>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      blogId: "",
      dialogShow: false, // 对话框显示隐藏
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageTotal: 0,
      loading: false,
    };
  },
  methods: {
    // 获取该用户已删除的博客
    async getDeleteBlog() {
      this.loading = true;
      let result = await this.$request({
        url: "/blog/getDeleteblog",
        method: "POST",
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

    // 还原博客
    reduction(blogId) {
      this.dialogShow = true;
      this.blogId = blogId;
    },
    // 确认还原
    definerReduction() {
      this.$request({
        url: "/blog/reductionBlog",
        method: "POST",
        data: {
          blogId: this.blogId,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            this.$message.success("还原成功");
            this.getDeleteBlog();
            this.dialogShow = false;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },

    // 删除博客
    deleteBlog(blogId) {
      this.dialogShow = true;
      this.blogId = blogId;
    },
    // 确认删除
    async define() {
      let result = await this.$request({
        url: "/blog/shredFileBlog",
        method: "POST",
        data: {
          blogId: this.blogId,
        },
      });
      if (result.status === 200) {
        this.$message.success("删除成功");
        this.getDeleteBlog();
        this.dialogShow = false;
      }
    },
    // 获取需要请求的页码数
    changePageNo(val) {
      this.pageNo = val;
      this.getDeleteBlog();
    },
  },
  mounted() {
    this.getDeleteBlog();
  },
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  .blog-content {
    width: 100%;
    // background: #fff;
  }
  .operate {
    display: flex;
    align-items: center;
    width: 20%;
    background: #fff;
  }
}
.el-button.is-round {
  border-radius: 20px;
  padding: 12px 15px;
}
</style>