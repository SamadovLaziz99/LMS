<template>
  <div v-if="isDelete">

    <el-dialog
        title="Delete Student"
        :visible.sync="isDelete"
        width="30%"
        :before-close="hide">
      <h3>Are you sure you want to delete this student
          <h4 style="margin-top: 10px">Delete ?</h4>
      </h3>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hide">Cancel</el-button>
    <el-button type="danger" @click="deleteSubject">Delete</el-button>
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
      isDelete: false
    };
  },
  computed: {
    ...mapGetters(['set_deletedSubject'])
  },
  methods: {
    ...mapActions(['remove_subject', 'subject_list', 'deleted_subject']),
    async getData() {
      this.load = true;
      try {
        await this.subject_list();
        this.load = false;
      } catch (err) {
        throw err;
        this.load = false;
      }
    },
    hide() {
      this.isDelete = false;
      this.$router.replace({
        query: ''
      });
    },
    show() {
      this.isDelete = true;
    },
    deleteSubject() {
      const delete_id = this.$route.query.id;
      this.remove_subject(delete_id).then(res => {
        return this.getData();
      });
      this.getData();
      this.hide();
    },
    async thisUser() {
      const _index = this.$route.query.id;
      await this.deleted_user(_index);
    }
  }
};
</script>