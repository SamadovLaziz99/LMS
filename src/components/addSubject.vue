<template>
  <el-container>
    <el-dialog
        title="Add Subject"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="hide"
    >
      <div class="register">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" plain @click="clear">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hide">Cancel</el-button>
    <el-button type="success" @click="addSubject">Confirm</el-button>
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
      dialogVisible: false,
      ruleForm: {
        name: '',
        mandatory: true,
        learningCentreId: 1
      },
    };
  },
  methods: {
    ...mapActions(['subject_list', 'add_Subject']),
    clear: function() {
      this.ruleForm.name = '';
    },
    hide: function() {
      this.dialogVisible = false;
      this.$router.replace({
        query: ''
      });
    },
    show: function() {
      this.dialogVisible = true;
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    getData: async function() {
      await this.subject_list();
    },
    addSubject: function() {
      this.$router.replace({
        params: ''
      });
      this.add_Subject(this.ruleForm).then(res => {
        return this.getData();
      });
      this.hide();
      this.clear();
    },
    updateSubject: async function() {
      const _id = this.$route.query.id;
      console.log(_id);
      const _res = await axios_init.get(`/v1/admin/learning-centre/subject/${_id}`);
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