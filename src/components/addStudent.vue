<template>
  <el-container>
    <el-dialog
        title="Add Student"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="hide"
    >
      <div class="register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="First name" prop="firstName">
            <el-input v-model.trim="ruleForm.firstName"></el-input>
          </el-form-item>

          <el-form-item label="Last name" prop="lastName">
            <el-input v-model.trim="ruleForm.lastName"></el-input>
          </el-form-item>

          <el-form-item label="Username" prop="username">
            <el-input v-model.trim="ruleForm.username" ref="usernameInput" :class="{'error_input': username_input}"></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input v-model.trim="ruleForm.password" show-password></el-input>
          </el-form-item>

<!--          Subjects -->

<!--          <el-form-item>-->
            <div class="sub">
              <h3>Subjects</h3>
              <i class="el-icon-s-management" @click="add_sub"></i>
            </div>
            <div class="for" v-for="(subject, index) in ruleForm.subjectsWithLevel" style="margin-top: 20px">
              <div class="subject_input">
                <i class="el-icon-close" @click="remove_sub(index, subject.subjectId)"></i>
                <el-select
                    v-model="subject.subjectId"
                    placeholder="Subjects"
                    @change="selectEvent(subject.subjectId)"
                >
                  <el-option
                      v-for="item in $store.getters.set_subjects"
                      :key="item.subjectId"
                      :label="item.name"
                      :disabled="item.disabled"
                      :value="item.subjectId">
                  </el-option>
                </el-select>
              </div>
              <el-select class="mt-3" v-model="subject.levelId" placeholder="Level">
                <el-option
                    v-for="item in $store.getters.set_level"
                    :key="item.id"
                    :label="item.levelName"
                    :value="item.id">
                </el-option>
              </el-select>
              <el-input
                  type="textarea"
                  placeholder="Comment"
                  v-model="subject.comment"
                  maxlength="30"
                  show-word-limit
                  style="margin-top: 10px"
              >
              </el-input>

              <hr style="margin-top: 10px">
            </div>
<!--          </el-form-item>-->

<!--          Free times -->

<!--          <el-form-item>-->
            <div class="free">
              <h3>Free Times</h3>
              <i class="el-icon-caret-bottom" @click="add_free"></i>
            </div>
            <div class="for" v-for="(promise, index) in ruleForm.promisedTimeSlots" style="margin-top: 20px">
              <div class="subject_input">
                <i class="el-icon-close" @click="remove_free(index)"></i>
                <el-select
                    style="margin-bottom: 10px"
                    v-model="promise.beginDay"
                    placeholder="Begin Day"
                >
                  <el-option
                      v-for="item in weeks"
                      :key="item"
                      :value="item">
                  </el-option>
                </el-select>
              </div>
              <div>
                <el-time-select
                    style="margin-bottom: 10px"
                    placeholder="Start time"
                    v-model="beginTime"
                    :picker-options="{
                    start: '6:00',
                    step: '00:15',
                    end: '23:45'
                }">
                </el-time-select>
                <el-time-select
                    placeholder="End time"
                    v-model="finishTime"
                    :picker-options="{
                    start: '6:00',
                    step: '00:15',
                    end: '23:45',
                    minTime: beginTime
                }">
                </el-time-select>
              </div>
              <el-select class="mt-3" v-model="promise.finishDay" placeholder="Finish Day">
                <el-option
                    v-for="item in weeks"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
              </el-select>

              <hr style="margin-top: 10px">
            </div>
<!--          </el-form-item>-->

          <el-form-item>
            <el-button type="danger" class="reset" plain @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hide">Cancel</el-button>
    <el-button type="success" @click="addStudent('ruleForm')">Confirm</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios_init from "@/utils/axios_init";


export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        learningCentreId: 1,
        subjectsWithLevel: [
          {
            comment: "",
            levelId: null,
            subjectId: null
          }
        ],
        promisedTimeSlots: [
          {
            beginDay: "Monday",
            beginHour: 0,
            beginMinute: 0,
            finishDay: "Monday",
            finishHour: 0,
            finishMinute: 0
          }
        ]
      },
      hours: {
        beginTime: "",
        finishTime: "",
        id: 1
      },
      beginTime: "",
      finishTime: "",
      weeks: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      rules: {
        firstName: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Please input Activity last name', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please input Activity username', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input Activity password', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ]
      },
      gotUsername: false,
      username_input: true
    };
  },
  computed: {
    ...mapGetters(['students']),
    isValid: function() {
      return this.ruleForm.firstName !== "" && this.ruleForm.lastName !== "" && this.ruleForm.username !== "" && this.ruleForm.password !== "";
    }
  },
  methods: {
    ...mapActions(['students_list', 'add_Student', 'subject_list', 'levels_list']),
    clear: function() {
      this.ruleForm.firstName = this.ruleForm.lastName = this.ruleForm.username = this.ruleForm.password = "";
      this.ruleForm.subjectsWithLevel = [{
        comment: "",
        levelId: null,
        subjectId: null
      }]
    },

    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },

    selectEvent: function(id) {
      this.$store.getters.set_subjects.filter(el => el.subjectId === id);
      this.$store.commit('SUBJECT_DISABLED', id);
    },

    hide: function() {
      this.dialogVisible = false;
      this.$router.replace({
        query: ''
      })
    },

    show: function() {
      this.dialogVisible = true;
    },

    getData: async function () {
      await this.students_list();
    },

    addStudent: async function() {
      if(this.isValid) {
        this.students.find(el => el.username === this.ruleForm.username ? this.gotUsername = true : this.gotUsername = false);
        if(this.gotUsername) {
          this.username_input = true;
          this.$refs.usernameInput.focus();
          this.$notify.error({
            title: 'Error',
            message: 'This username already taken'
          });
        } else {
          if(this.beginTime && this.finishTime) {

            this.ruleForm.promisedTimeSlots[0].beginHour = Number(this.beginTime.slice(0, 2));
            this.ruleForm.promisedTimeSlots[0].beginMinute = Number(this.beginTime.slice(3, 5));
            this.ruleForm.promisedTimeSlots[0].finishHour = Number(this.finishTime.slice(0, 2));
            this.ruleForm.promisedTimeSlots[0].finishMinute = Number(this.finishTime.slice(3, 5));

            console.log(this.ruleForm);

            this.$router.replace({
              params: ''
            });
            this.add_Student(this.ruleForm).then(res => {
              return this.getData();
            });
            await this.notifyAddStudent();
          } else {
            this.$router.replace({
              params: ''
            });
            this.add_Student(this.ruleForm).then(res => {
              return this.getData();
            });
            await this.notifyAddStudent();
          }
          this.username_input = false;
          this.$store.commit('SUBJECTS_DISABLED', false);
          this.hide();
          this.clear();
          this.gotUsername = false;
          this.remove_sub(0);
        }
      } else {
        this.$notify.error({
          title: 'Error',
          message: 'Please fill in all inputs!'
        });
        this.username_input = false;
      }
    },

    updatePost: async function() {
      const _id = this.$route.query.id;
      const _res = await axios_init.get(`/v1/admin/learning-centre/student/${_id}`);
      this.ruleForm = _res.body;
      console.log(this.ruleForm);
    },

    getSubject: async function() {
      await this.subject_list();
    },

    getLevels: async function() {
      await this.levels_list();
    },

    add_sub: function(){
      this.ruleForm.subjectsWithLevel.push({
        comment: "",
        levelId: null,
        subjectId: null
      });
    },

    add_free: function(){
      this.ruleForm.promisedTimeSlots.push({
        beginDay: "",
        beginHour: 0,
        beginMinute: 0,
        finishDay: "",
        finishHour: 0,
        finishMinute: 0
      });
    },

    remove_sub: function (index, subjectId){
      this.ruleForm.subjectsWithLevel.splice(index, 1);
      const subject = this.$store.getters.set_subjects.filter(el => el.subjectId === subjectId)[0];
      if (subject) subject.disabled = false;
    },

    remove_free: function (index){
      this.ruleForm.promisedTimeSlots.splice(index, 1);
    },

    notifyAddStudent: function() {
      this.$notify({
        title: 'Success',
        message: 'The student was added to the list',
        type: 'success'
      });
    }
  },
  mounted() {
    this.getSubject();
    this.getLevels();
    this.clear();
    this.remove_free(0);
    this.remove_sub(0);
  }
};
</script>

<style scoped>
.mt-3 {
  margin-top: 10px;
}

.sub, .free {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.free {
  margin-top: 20px;
}

.sub i {
  font-size: 1.5rem;
  cursor: pointer;
}
.free i {
  font-size: 1.5rem;
  cursor: pointer;
}

.subject_input i {
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

.error_input {
  border-color: #F56C6C !important;
}

.el_item div {
  margin-left: 0 !important;
}

.reset {
  margin-top: 10px;
}
</style>