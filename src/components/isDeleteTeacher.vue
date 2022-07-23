<template>
  <div v-if="isDeleteTeacher">

    <el-dialog
        title="Delete Teacher"
        :visible.sync="isDelete"
        width="30%"
        :before-close="hideTeacher">
      <h3>Are you sure you want to delete this student
          <h4 style="margin-top: 10px">{{ set_deletedTeacher.lastName }} {{ set_deletedTeacher.firstName }}?</h4>
      </h3>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hideTeacher">Cancel</el-button>
    <el-button type="danger" @click="deleteTeacher">Delete</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios_init from "@/utils/axios_init";

export default {
  data() {
    return {
      isDeleteTeacher: false
    };
  },
  computed: {
    ...mapGetters(['set_deletedTeacher'])
  },
  methods: {
    ...mapActions(['remove_teacher', 'teachers_list', 'deleted_user_t']),
    getData: async function() {
      this.load = true;
      try {
        await this.teachers_list();
        this.load = false;
      } catch (err) {
        throw err;
        this.load = false;
      }
    },

    hideTeacher: function() {
      this.isDeleteTeacher = false;
      this.$router.replace({
        query: ''
      });
    },

    showTeacher: function() {
      this.isDeleteTeacher = true;
    },

    deleteTeacher: function() {
      const _index = this.$route.query.id;
      this.remove_teacher(_index).then(res => {
        return this.getData();
      });
      this.getData();
      this.hide();
    },

    thisTeacher: async function() {
      const _index = this.$route.query.id;
      await this.deleted_user_t(_index);
    }
  }
};
</script>