<template>
  <div v-if="isDelete">

    <el-dialog
        title="Delete Student"
        :visible.sync="isDelete"
        width="30%"
        :before-close="hide">
      <h3>Are you sure you want to delete this student
          <h4 style="margin-top: 10px">{{ set_deletedUser.lastName }} {{ set_deletedUser.firstName }}?</h4>
      </h3>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hide">Cancel</el-button>
    <el-button type="danger" @click="deleteStudent">Delete</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isDelete: false
    };
  },
  computed: {
    ...mapGetters(['set_deletedUser'])
  },
  methods: {
    ...mapActions(['remove_student', 'students_list', 'deleted_user']),
    getData: async function() {
      this.load = true;
      try {
        await this.students_list();
        this.load = false;
      } catch (err) {
        throw err;
        this.load = false;
      }
    },
    hide: function() {
      this.isDelete = false;
      this.$router.replace({
        query: ''
      });
    },
    show: function() {
      this.isDelete = true;
    },
    deleteStudent: async function() {
      const _index = this.$route.query.id;
      await this.remove_student(_index).then(res => {
        return this.getData();
      });
      this.getData();
      await this.notifyDelete();
      this.hide();
    },
    thisUser: async function() {
      const _index = this.$route.query.id;
      await this.deleted_user(_index);
    },

    notifyDelete: function() {
      this.$notify({
        title: '!',
        message: 'Student is deleted!',
        type: 'warning'
      });
    }
  }
};
</script>