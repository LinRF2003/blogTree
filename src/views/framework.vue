<template>
  <div class="container">
    <div class="nav">
      <div class="nav-container">
        <div class="item">
          <div class="logo">
            <router-link to="/">博客树</router-link>
          </div>
          <router-link
            v-for="(item, index) in navList"
            :key="index"
            :to="item.path"
            :class="['navitem', item.path == activePath ? 'active' : '']"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="user">
          欢迎进入，
          <div class="username">{{ userinfo.user_name }}</div>
          <i class="el-icon-arrow-down"></i>
          <div class="img">
            <img
              :src="'http://127.0.0.1:3030/images/' + userinfo.avatar"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航数据
      navList: [
        {
          name: "博客",
          path: "/",
        },
        {
          name: "分类专栏",
          path: "/category",
        },
        {
          name: "问答",
          path: "/question",
        },
        {
          name: "动态",
          path: "/dynamic",
        },
      ],
      // 导航选中路径
      activePath: "",
      // 用户信息
      userinfo: {},
    };
  },
  methods: {
    // 获取用户信息(页面加载其他配置)
    getUserInfo() {
      this.userinfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
      // 获取当前页面
      this.activePath = this.$route.meta.activePath;
    },
  },
  watch: {
    $route(to, from) {
      // console.log(from); //从哪来
      this.activePath = to.meta.activePath; //到哪去
    },
  },
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.container {
  // 导航
  .nav {
    position: fixed;
    top: 0;
    z-index: 901;
    width: 100%;
    background: #fff;
    height: 80px;
    text-align: center;
    box-shadow: 0 2px 6px 0 #ddd;
    .nav-container {
      margin: 0px auto;
      width: 88%;
      height: 80px;
      display: flex;

      justify-content: space-between;
      .item {
        display: flex;
        align-items: center;
        .logo {
          a {
            font-size: 25px;
            color: #55b555;
            font-weight: bold;
            padding: 0 20px 0 0;
          }
        }
        .navitem {
          padding: 0 15px;
        }
        .active {
          color: #c94646;
        }
      }
      .user {
        display: flex;
        align-items: center;
        .username {
          color: #55b555;
        }
        .img {
          height: 52px;
          width: 52px;
          margin-left: 8px;
          border-radius: 60px;
          border: #55b555 1px solid;
          img {
            height: 50px;
            width: 50px;
            border-radius: 60px;
          }
        }
      }
    }
  }

  // 内容
  .content {
    margin: 0 auto;
    width: 88%;
    margin-top: 90px;
    background: #fff;
  }
}
</style>