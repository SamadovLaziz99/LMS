<template>
  <div id="app">
    <UserLayout v-if="whiteList.includes($route.name)" />
    <MainLayout v-else />
  </div>
</template>

<style>

</style>
<script>
import MainLayout from "@/components/MainLayout";
import UserLayout from "@/UserLayout/UserLayout";
import whiteList from "@/router/whiteList";

export default {
  components: {UserLayout, MainLayout},
  data() {
    return {
      whiteList
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>