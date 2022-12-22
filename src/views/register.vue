<template>
  <div>
    <!-- 注册页 -->
    <!-- <button @click="a">aaaaaaa</button> -->
    <!-- <img :src="url" alt="" /> -->
    <!-- <img src="@/assets/login-bg.jpg" alt="" />
     -->
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3030/api/imgUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="img"
      :headers="headers"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- <div>{{ imageUrl }}</div> -->
    <button @click="add">上传图片</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      formData: {
        imageUrl: "",
      },
      headers: { enctype: "multipart/form-data" },
    };
  },
  methods: {
    async add() {
      let result = await this.$request({
        url: "/imgUpload",
        method: "post",
        data: { imageUrl: this.imageUrl },
      });
      console.log(result);
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      //res这个参数自己打印出来一看便知，在此不做解释
      console.log(res);
      //将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
      this.imageUrl = "http://localhost:3030/" + res.data.path;
      //将图片地址绑定到我们的form表单数据中 后期存入数据库中
      this.formData.imageUrl = res.data.path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 / 1024 < 3;
      if (!isJPG && !isPNG) {
        this.$message.error`在这里插入代码片`(
          "上传头像图片只能是 JPG 格式或 png 格式!"
        );
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG | isJPG && isLt3M;
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>