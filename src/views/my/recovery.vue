<template>
  <div>
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
        <!-- @click="deleteBlog(item.blog_id)" -->
      </div>
    </div>
    <Null v-if="blogList.length == 0"></Null>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
    };
  },
  methods: {
    // 获取该用户已删除的博客
    async getDeleteBlog() {
      let result = await this.$request({
        url: "/blog/getDeleteblog",
        method: "POST",
      });

      if (result.status === 200) {
        this.blogList = result.data;
      }
    },

    // 还原博客
    reduction(blogId){
      this.$request()
    }
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