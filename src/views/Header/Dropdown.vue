<template>
  <div class="app-dropdown">
    <el-dropdown>
         <span class="el-dropdown-link">
           <span>Laziz Samadov</span>
           <i class="el-icon-arrow-down el-icon--right"></i>
         </span>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdown-1">
          <div class="user-information">
            <div class="avatar">
              <img src="../../photos/avatar.jpg" alt="avatar">
            </div>
            <div class="information">
              <h3>Laziz Samadov</h3>
              <h4 style="margin-top: 15px">super_admin</h4>
              <h4 style="margin-top: 15px">admin</h4>
            </div>
          </div>
          <hr>
        </div>
        <div class="dropdown-2">
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            Account Settings
          </el-dropdown-item>
          <div @click="logout">
            <el-dropdown-item>
              <i class="el-icon-zoom-out"></i>
              Log out
            </el-dropdown-item>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }
}

</script>

<style>
.app-dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}

.el-icon-arrow-down {
  font-size: 1.4rem;
}

.el-dropdown-link span {
  font-size: 2rem;
}

.user-information {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.avatar img {
  width: 100px;
}

.information, .avatar {
  margin: 10px;
}

@media only screen and (max-width: 768px) {
  .el-dropdown-link span {
    font-size: 20px;
  }

  .el-dropdown-link i {
    font-size: 18px;
  }
}

</style>