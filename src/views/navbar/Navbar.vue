<template>
  <div class="nav" style="height: 100%">
    <el-menu
        style="height: 100%"
        default-active="1"
        class="el-menu-vertical-demo navbar_items"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="$router.push('/')">
        <i class="el-icon-s-home"></i>
        <span class="navbar_item">Home</span>
      </el-menu-item>

      <el-menu-item index="2" @click="$router.push('/students')">
        <i class="el-icon-user"></i>
        <span class="navbar_item">Students</span>
      </el-menu-item>

      <el-menu-item index="3" @click="$router.push('/teachers')">
        <i class="el-icon-office-building"></i>
        <span class="navbar_item">Teachers</span>
      </el-menu-item>

      <el-menu-item index="4" @click="$router.push('/subjects')">
        <i class="el-icon-notebook-1"></i>
        <span class="navbar_item">Subjects</span>
      </el-menu-item>

      <el-menu-item index="5" @click="$router.push('/rooms')">
        <i class="el-icon-office-building"></i>
        <span class="navbar_item">Rooms</span>
      </el-menu-item>

      <el-menu-item index="6" @click="$router.push('/settings')">
        <i class="el-icon-setting"></i>
        <span class="navbar_item">Settings</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@media only screen and (max-width: 768px) {
  .navbar_item {
    display: none;
    margin: 0 auto;
  }

  .navbar_items {
    width: 100%;
  }
}
</style>