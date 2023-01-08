<template>
  <div class="blog-content" v-loading.fullscreen.lock="loading">
    <div v-for="item in blogList" :key="item.blog_id">
      <BlogItem :item="item"></BlogItem>
    </div>
    <Pagination
      v-if="!loading"
      :pageNo="pageNo"
      :pageSize="pageSize"
      :totalCount="totalCount"
      :pageTotal="pageTotal"
      @changePageNo="changePageNo"
    ></Pagination>
    <Null v-if="totalCount == 0"></Null>
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
    };
  },

  methods: {
    async getMyLikeBlog() {
      this.loading = true;
      let result = await this.$request({
        url: "/blog/myLikeBlog",
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
    changePageNo(val) {
      this.pageNo = val;
      this.getMyLikeBlog();
    },
  },
  mounted() {
    this.getMyLikeBlog();
  },
};
</script>

<style scoped>
</style>