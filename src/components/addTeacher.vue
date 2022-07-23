<template>
  <el-container>
    <el-dialog
        title="Add Teacher"
        :visible.sync="teacherVisible"
        width="30%"
        :before-close="hide"
    >
      <div class="register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="First name" prop="firstName">
            <el-input v-model="ruleForm.firstName"></el-input>
          </el-form-item>

          <el-form-item label="Last name" prop="lastName">
            <el-input v-model="ruleForm.lastName"></el-input>
          </el-form-item>

          <el-form-item label="Username" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" plain @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hide">Cancel</el-button>
    <el-button type="success" @click="addTeacher">Confirm</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapActions } from "vuex";
import axios_init from "@/utils/axios_init";


export default {
  data() {
    return {
      teacherVisible: false,
      ruleForm: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        promisedTimeSlots: {
          beginDay: 'Monday',
          beginHour: 0,
          beginMinute: 0,
          finishDay: 'Sunday',
          finishHour: 23,
          finishMinute: 23,
        },
        busyTimeSlots: [],
        subjects: [
          {
            subjectId: 1,
            name: "Matematika",
            learningCentreId: 1,
            mandatory: true
          }
        ],
        subjectIds: [1]
      },
      rules: {
        firstName: [
          { required: true, message: 'Please input Activity First name', trigger: 'blur' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Please input Activity Last name', trigger: 'blur' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please input Activity Username', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input Activity password', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    ...mapActions(['teachers_list', 'add_teacher']),
    clear: function() {
      this.ruleForm.firstName = this.ruleForm.lastName = this.ruleForm.username = this.ruleForm.password = '';
    },

    hide: function() {
      this.teacherVisible = false;
      this.$router.replace({
        query: ''
      });
    },

    showTeacher: function() {
      this.teacherVisible = true;
    },

    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },

    getData: async function() {
      await this.teachers_list();
    },

    addTeacher: function() {
      this.$router.replace({
        params: ''
      });
      this.add_teacher(this.ruleForm).then(res => {
        return this.getData();
      });
      console.log(this.ruleForm);
      this.hide();
      this.clear();
    },

    updateTeacher: async function() {
      const _id = this.$route.query.id;
      console.log(_id);
      const _res = await axios_init.get(`/v1/admin/learning-centre/teacher/${_id}`);
      this.ruleForm.firstName = _res.body.firstName;
      this.ruleForm.lastName = _res.body.lastName;
      this.ruleForm.username = _res.body.username;
      console.log(this.ruleForm);
    }
  }
};
</script>

<style scoped>

</style>