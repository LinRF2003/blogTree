<template>
  <div>
    <button @click="app">111</button>
  </div>
</template>

<script>
import requests from "@/utils/request";
// import axios from "axios";
export default {
  methods: {
    async app() {
      let r = await requests.get("test");
      console.log(r);
      let q = await requests.post("login");
      console.log(q);
    },
  },
};
</script>

<style scoped>
</style>