<template>
  <div class="app-wrapper">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-container class="aslide-main">
<!--        width="200px"-->
        <el-aside class="aslide app-aslide">
          <Navbar />
        </el-aside>
        <el-main class="app-main">
          <router-view />
        </el-main>
      </el-container>
  </div>
</template>

<script>
import Navbar from "@/views/navbar/Navbar";
import Header from "@/views/Header/Header";

export default {
  components: { Navbar, Header }
}
</script>

<style scoped>
.app-header {
  background-color: rgb(84, 92, 100);
}

.aslide {
  overflow: visible;
}

@media only screen and (max-width: 768px) {
  .app-wrapper {
    width: 100%;
  }

  .app-aslide {
    width: 17% !important;
  }

  .aslide-main {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .aslide-main .app-aslide {
    width: 20%;
  }

  .aslide-main .app-main {
    width: 70%;
  }

  .app-main {
    padding: 5px;
  }
}
</style>