<template>
  <div class="login">
    <div class="content">
      <div class="title">登录</div>
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="formData.password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="formData.rememberMe" :true-label="1"
            >记住我</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      // 表单数据
      formData: {
        phone: "",
        password: "",
        rememberMe: "",
      },

      // 表单验证规程
      rules: {
        phone: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            min: 6,
            max: 20,
            message: "密码在6-20位之间",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // this.$refs.updateFrom.
      this.$refs["formData"].validate(async (valid) => {
        if (!valid) {
          return;
        }

        const contentType = "application/x-www-form-urlencoded";

        let result = await this.$requests({
          url: "/login",
          method: "post",
          data: {
            phone: this.formData.phone,
            password: this.formData.password,
          },
        });

        if (result.data.status === 0) {
          this.$message.success(result.data.message);
          router.push("/");
        } else {
          this.$message.warning(result.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped >
.login {
  width: 100%;
  height: 100vh;
  background: url("../assets/login-bg.jpg");
  background-size: cover;
  .content {
    position: absolute;
    right: 200px;
    top: 150px;
    width: 350px;
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px #ddd;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>