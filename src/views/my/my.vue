<template>
  <div class="my">
    <div class="left">
      <router-link
        :class="['my-info', activePath == '/myinfo' ? 'active' : '']"
        to="/my"
        >个人信息</router-link
      >
      <router-link
        :class="['my-info', activePath == '/AS' ? 'active' : '']"
        to="/my/accountsettings"
        >账号设置</router-link
      >
      <router-link
        :class="['my-info', activePath == '/recovery' ? 'active' : '']"
        to="/my/recovery"
        >回收站</router-link
      >
      <router-link class="add-blog" to="/myblog">我的博客</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { activePath: "" };
  },
  methods: {
    init() {
      this.activePath = this.$route.meta.activePath2;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      // console.log(from); //从哪来
      this.activePath = to.meta.activePath2; //到哪去
    },
  },
};
</script>

<style scoped lang="scss">
.my {
  display: flex;
  .left {
    position: fixed;
    min-width: 150px;
    height: 50px;
    max-width: 150px;
    color: #444;
    a {
      display: block;
      padding: 10px;
    }
    a:hover {
      cursor: pointer;
      color: #2f96fd;
    }
  }
  .content {
    flex: 1;
    margin-left: 150px;
  }
}
.active {
  color: #2f96fd;
}
</style>