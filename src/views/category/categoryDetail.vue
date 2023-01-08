<template>
  <div>
    <div class="category-detail">
      <div class="category-image">
        <img v-if="categoryDetail.cover" :src="categoryDetail.cover" />
        <img v-else src="@/assets/default.png" />
      </div>
      <div class="category-info">
        <router-link
          :to="'/categoryDetail/' + categoryDetail.cate_id"
          class="category-title"
          >{{ categoryDetail.cate_name }}</router-link
        >
        <div class="category-desc">{{ categoryDetail.cate_desc }}</div>
        <div class="blog-count">文章数：{{ categoryDetail.blog_count }}</div>
      </div>
    </div>
    <div v-if="categoryDetail.blog_count == 0" class="null">空空如也</div>
    <div v-for="item in blogList" :key="item.blog_id">
      <BlogItem :item="item"> </BlogItem>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      categoryDetail: {},
    };
  },
  methods: {
    // 根据路由博客id获取博客详情
    async getBlogDetail() {
      let result = await this.$request({
        url: "/category/categoryBlog",
        method: "post",
        data: { categoryId: this.$route.params.categoryId },
      });

      if (result.status === 200) {
        this.blogList = result.data;
      }
    },
    async getCategoryDetail() {
      let result = await this.$request({
        url: "/category/categoryDetail",
        method: "post",
        data: { categoryId: this.$route.params.categoryId },
      });
      console.log(result);
      if (result.status === 200) {
        this.categoryDetail = result.data[0];
      }
    },
  },
  mounted() {
    this.getBlogDetail();
    this.getCategoryDetail();
  },
};
</script>

<style lang="scss" scoped>
.category-detail {
  display: flex;
  width: 100%;
  padding: 18px;
  margin-bottom: 10px;
  background: #fff;
  .category-image {
    display: flex;
    align-items: center;
    width: 100px;
    height: 100px;
    background: #ddd;
    border-radius: 2px;
    img {
      // width: 100px;
      max-width: 100%;
    }
  }

  .category-info {
    margin-top: 5px;
    flex: 1;
    margin-left: 10px;
    width: 60%;
    .category-title {
      width: 100%;
      font-size: 18px;
      font-weight: 550;
      color: #000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .category-desc {
      font-size: 14px;
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .blog-count {
      font-size: 13px;
      margin-top: 10px;
      color: #919da9;
    }
  }
}
.null {
  background: #fff;
  padding: 20px;
  text-align: center;
  color: #555666;
}
</style>