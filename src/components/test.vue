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
      let r = await requests.post("test");
      console.log(r);
    },
  },
};
</script>

<style scoped>
</style>