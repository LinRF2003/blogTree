<template>
  <div class="container">
    <div class="nav" v-if="$route.name != '博客详情'">
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
          <div></div>
          <!-- <i class="el-icon-arrow-down"></i> -->
          <el-dropdown class="username">
            <span class="el-dropdown-link">
              {{ userinfo.user_name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/my"
                ><el-dropdown-item>个人信息</el-dropdown-item></router-link
              >

              <span @click="logout"
                ><el-dropdown-item>退出</el-dropdown-item></span
              >
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/my" class="img">
            <img v-if="userinfo.avatar" :src="userinfo.avatar" />
            <img src="@/assets/default.png" v-else />
          </router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div>©2023 www.blogtree.com All rights reserved.</div>
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
        // {
        //   name: "问答",
        //   path: "/question",
        // },
        // {
        //   name: "动态",
        //   path: "/dynamic",
        // },
        {
          name: "个人中心",
          path: "/my",
        },
      ],
      // 导航选中路径
      activePath: "",
      // 用户信息
    };
  },
  methods: {
    // 获取用户信息(页面加载其他配置)
    getUserInfo() {
      // 获取当前页面
      this.$store.dispatch("getUserInfo");
     
      this.activePath = this.$route.meta.activePath;

      if (this.$store.state.term) {
        this.$store.commit("logout", false);
        // 刷新页面止一次
        if (location.href.indexOf("#reloaded") == -1) {
          location.href = location.href + "#reloaded";
          location.reload();
        }
      }
    },

    // 退出登录
    logout() {
      this.$message.success("退出成功");
     
      this.$router.push("/login");
    },
  },
  computed: {
    userinfo() {
      return this.$store.state.userInfo;
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
    width: 100vw;
    background: #fff;
    height: 68px;
    text-align: center;
    box-shadow: 0 2px 6px 0 #ddd;
    .nav-container {
      margin: 0px auto;
      width: 88%;
      height: 68px;
      display: flex;

      justify-content: space-between;
      .item {
        display: flex;
        align-items: center;
        .logo {
          margin-right: 80px;
          a {
            font-size: 25px;
            color: var(--main-color);
            font-weight: bold;
          }
        }
        .navitem {
          padding: 0 15px;
        }
        .navitem:hover,
        .active {
          color: #c94646;
        }
      }
      .user {
        display: flex;
        align-items: center;
        .username {
          color: var(--main-color);
        }
        .img {
          height: 52px;
          width: 52px;
          margin-left: 8px;
          border-radius: 60px;
          border: var(--main-color) 1px solid;
          display: flex;
          align-items: center;
          overflow: hidden;
          img {
            width: 50px;
          }
        }
      }
    }
  }

  // 内容
  .content {
    margin: 0 auto;
    padding-top: 78px;
    width: 88%;
    min-height: calc(100vh - 60px);
  }

  // 底部
  .footer {
    height: 60px;
    // margin: 30px 0 20px;
    padding-top: 20px;
    text-align: center;
    font-size: 13px;
    color: #939393;
    line-height: 25px;
  }
}
</style>