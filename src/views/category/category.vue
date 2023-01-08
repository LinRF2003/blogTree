<template>
  <div class="category" v-loading="loading">
    <div v-for="item in categoryList" :key="item.cate_id" class="category-item">
      <div class="category-image">
        <img v-if="item.cover" :src="item.cover" />
        <img v-else src="@/assets/default.png" />
      </div>
      <div class="category-info">
        <router-link
          :to="'/categoryDetail/' + item.cate_id"
          class="category-title"
          >{{ item.cate_name }}</router-link
        >
        <div class="category-desc">{{ item.cate_desc }}</div>
        <div class="blog-count">文章数：{{ item.blog_count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      loading: false,
    };
  },
  methods: {
    // 获取分类列表
    async getCategoryList() {
      this.loading = true;
      let result = await this.$request.get("/category/categoryList");
      if (result.status === 200) {
        this.categoryList = result.data;
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 10px;
  .category-item {
    display: flex;
    width: calc(25% - 20px);
    padding: 10px;
    margin: 10px;
    border: 1px solid #ddd;
    .category-image {
      display: flex;
      align-items: center;
      width: 100px;
      height: 100px;
      background: #ddd;
      border-radius: 4px;
      img {
        // width: 100px;
        max-width: 100%;
      }
    }

    .category-info {
      flex: 1;
      margin-left: 10px;
      width: 60%;
      .category-title {
        width: 100%;
        font-size: 18px;
        color: #1890ff;
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
}
</style>