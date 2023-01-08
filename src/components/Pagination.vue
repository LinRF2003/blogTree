<template>
  <el-pagination
    v-if="pageTotal != 1"
    style="text-align: center; margin-top: 20px"
    @current-change="changePageNo"
    :current-page="pageNo"
    :page-size="pageSize"
    layout=" prev, pager, next,jumper, ->, total"
    :total="totalCount"
  >
    <!-- @size-change="handleSizeChange" -->
  </el-pagination>
</template>

<script>
export default {
  props: ["totalCount", "pageNo", "pageSize", "pageTotal"],
  methods: {
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getBlogList();
    // },
    async changePageNo(val) {
      //   this.pageNo = val;
      this.$emit("changePageNo", val);
    },
  },
};
</script>

<style scoped>
</style>