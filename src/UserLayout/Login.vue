<template>
  <div id="login">
    <form
        @keyup.enter.prevent="login"
        v-loading="load"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="form-login"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>Sign in</h2>
          <span>@Lms#Pass$1234%^</span>
        </div>
        <div class="item">
          <el-input placeholder="Username" v-model="username" clearable/>
          <el-alert
              v-if="nameValid"
              class="error"
              title="Enter your name"
              type="error"
          >
          </el-alert>
        </div>
        <div class="item">
          <el-input placeholder="Password" v-model="password" show-password/>
          <el-alert
              v-if="passwordValid"
              class="error"
              title="Enter your password"
              type="error">
          </el-alert>
        </div>
        <el-button typeof="submit" type="primary" @click="login">Submit</el-button>
      </el-card>
    </form>
  </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      nameValid: false,
      passwordValid: false,
      load: false
    }
  },
  computed: {
    isValid() {
      return this.username.trim() !== '' && this.password.trim() !== '';
    }
  },
  methods: {
    ...mapActions(['auth']),
    clear() {
      this.username = '';
      this.password = '';
    },
    login: async function() {
      this.load = true;
      try {
        if (this.isValid) {
          console.log(this.username);
          console.log(this.password);
          this.nameValid = false;
          this.passwordValid = false;
          await this.auth({
            username: this.username,
            password: this.password
          })
          this.clear();
          setTimeout(() => {
            window.location.reload();
          }, 222);
        } else {
          if (this.username.trim() !== '' && this.password.trim() === '') {
            this.nameValid = false;
            this.passwordValid = true;
          }
          if (this.username.trim() === '' && this.password.trim() !== '') {
            this.nameValid = true;
            this.passwordValid = false;
          }
          if (this.username.trim() === '' && this.password.trim() === '') {
            this.nameValid = true;
            this.passwordValid = true;
          }
        }
        this.load = false;
      } catch (err) {
        console.log("auth error: ", err);
        this.load = false;
        throw err;
      }

    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 18px;
}

.error {
  margin-top: 10px;
}

#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px; /*480 px*/
}

@media only screen and (max-width: 768px) {
  .box-card {
    width: 90%; /*480 px*/
    margin: 0 auto;
  }

  .form-login {
    width: 100%;
  }
}


</style>