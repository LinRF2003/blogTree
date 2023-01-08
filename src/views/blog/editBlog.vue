<template>
  <div class="add-blog">
    <div class="top">
      <router-link
        class="el-icon-arrow-left back"
        to="/myblog"
        v-if="blogInfo.blogId"
        ><span class="word">修改博客</span>
      </router-link>
      <router-link class="el-icon-arrow-left back" to="/" v-else>
        <span class="word">添加博客</span></router-link
      >
      <el-button
        class="change"
        type="primary"
        v-if="!blogInfo.content"
        @click="changeEditorType"
        >切换编辑器</el-button
      >
    </div>
    <input
      type="text"
      placeholder="请输入文章标题"
      class="title"
      v-model="blogInfo.title"
    />
    <TextEditor
      v-if="blogInfo.editorType == 0"
      @change="changeContent"
      :content="blogInfo.content"
      :height="height"
    ></TextEditor>
    <EditorMarkdown
      v-else
      :height="height2"
      @change="changeContent"
      @changeM="changeM"
      :content="blogInfo.content"
      :markdown="blogInfo.markdownContent"
    ></EditorMarkdown>

    <div class="button">
      <el-button type="primary" @click="define">确定</el-button>
      <el-button type="warn" @click="backBlog">取消</el-button>
    </div>

    <!-- 标题内容写完后确认的信息弹窗 -->
    <el-dialog title="博客设置" :visible.sync="show">
      <el-form
        ref="blogInfo"
        :model="blogInfo"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="博客分类" prop="categoryId">
          <el-select
            v-model="blogInfo.categoryId"
            placeholder="请选择分类"
            :style="{ width: '100%' }"
          >
            <!-- <el-option :value="0" label="全部分类"></el-option> -->
            <el-option
              :value="item.cate_id"
              :label="item.cate_name"
              v-for="item in categoryList"
              :key="item.cate_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="博客封面">
          <!-- 封面上传 -->
          <upload
            class="upload"
            @getImageUrl="getImageUrl"
            :imageUrl="blogInfo.cover"
          ></upload>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <div class="allow-comment">
            <el-radio-group v-model="blogInfo.type">
              <el-radio :label="0">原创</el-radio>
              <el-radio :label="1">转载</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="原文地址" v-if="blogInfo.type" prop="reprintUrl">
          <el-input v-model="blogInfo.reprintUrl"></el-input
        ></el-form-item>
        <el-form-item label="评论">
          <div class="allow-comment">
            <el-radio-group v-model="blogInfo.allowComment">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="博客摘要" prop="summary">
          <el-input
            v-model="blogInfo.summary"
            type="textarea"
            placeholder="请输入摘要"
            :autosize="{ minRows: 4, maxRows: 4 }"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="editBlog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      height: "calc(100vh - 310px)",
      height2: "calc(100vh - 290px)",

      // 博客详细信息
      blogInfo: {
        blogId: this.$route.params.blogId || null,
        title: "",
        content: "",
        allowComment: 1, // 博客评论
        summary: "", // 博客摘要
        categoryId: "", // 分类名
        cover: "", // 封面
        editorType: 0,
        type: null,
        markdownContent: "", // markdown内容
        reprintUrl: null, // 转载地址
      },
      categoryList: [],
      // 表单验证
      rules: {
        categoryId: [{ required: true, message: "请选择博客分类" }],
        type: [{ required: true, message: "请选择类型" }],
        reprintUrl: [{ required: true, message: "请输入原文地址" }],
      },
    };
  },
  methods: {
    // 内容的双向绑定
    changeContent(event) {
      this.blogInfo.content = event;
    },
    // markdown内容的绑定
    changeM(event) {
      this.blogInfo.markdownContent = event;
    },

    // 确认进入信息弹窗页
    define() {
      if (this.blogInfo.title === "")
        return this.$message.warning("标题不能为空");
      if (!this.blogInfo.content) return this.$message.warning("内容不能为空");
      this.show = true;
    },

    // backBlog 取消返回首页
    backBlog() {
      this.$router.push("/myblog");
    },

    // 获取博客分类的方法
    async getCategoryList() {
      let result = await this.$request.get("/category/categoryList");
      if (result.status === 200) {
        this.categoryList = result.data;
      }

      // 判断是不是修改博客
      if (this.blogInfo.blogId) {
        // 获取博客详情
        let result = await this.$request({
          url: "/blog/blogDetail",
          method: "post",
          data: { blogId: this.$route.params.blogId },
        });

        if (result.status === 200) {
          // this.blogInfo = result.data[0];
          console.log(result.data[0]);
          this.blogInfo.title = result.data[0].title;
          this.blogInfo.content = result.data[0].content;
          this.blogInfo.markdownContent = result.data[0].markdownContent;
          this.blogInfo.editorType = result.data[0].editorType;
          this.blogInfo.cover = result.data[0].cover;
          this.blogInfo.categoryId = result.data[0].cate_id;
        }
      }
    },

    // 添加或修改博客
    editBlog() {
      this.$refs["blogInfo"].validate(async (valid) => {
        if (!valid) {
          return;
        }

        // 调接口添加或修改博客
        let result = await this.$request({
          url: "/blog/saveBlog",
          method: "POST",
          // data: {
          //   blogId: this.blogInfo.blogId,
          //   title: this.blogInfo.title,
          //   content: this.blogInfo.content,
          //   categoryId: this.blogInfo.categoryId,
          //   cover: this.blogInfo.cover,
          //   allowComment: this.blogInfo.allowComment,
          //   summary: this.blogInfo.summary,
          //   editorType: 0,
          //   type: 0,
          // },
          data: this.blogInfo,
        });
        if (result.status === 200) {
          if (this.blogInfo.blogId) {
            this.$message.success("修改博客成功");
          } else {
            this.$message.success("发布博客成功");
            this.$router.push("/");
          }
        }
      });
    },

    // 获取封面图片链接
    getImageUrl(e) {
      this.blogInfo.cover = e;
    },

    // 改变编辑器类型
    changeEditorType() {
      this.blogInfo.editorType = this.blogInfo.editorType ? 0 : 1;
    },
  },
  mounted() {
    // 页面加载时获取分类列表
    this.getCategoryList();
  },
};
</script>

<style lang="scss" scoped>
.add-blog {
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    height: 40px;
    .back {
      display: inline-block;

      width: 80%;
      .word {
        font-weight: 550;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }

  .text-editor {
    flex: 1;
  }
  .button {
    position: static;
    z-index: 10;
    margin: 50px auto 0;
  }
  .title {
    width: 100%;
    border: 0;
    outline: none;
    background: #f4f4f4;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
    font-size: 25px;
    color: #333;
  }
  .detail-info {
    width: 100vh;
    height: 100vh;
    position: absolute;
    background: #000;
  }

  // .upload {
  //   width: 152px;
  //   height: 152px;
  // }
}
// input提示文字颜色
input::-webkit-input-placeholder {
  font-weight: 450;
  color: #757575;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-weight: 450;
  color: #757575;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-weight: 450;
  color: #757575;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-weight: 450;
  color: #757575;
}
</style>