<template>
  <div v-loading="load">
    <addSubject ref="addSubject" />
    <isDeleteSubject ref="isDeleteSubject" />
    <el-button
        plain
        @click="open1">
      Success
    </el-button>
    <div class="add-subject">
      <el-button type="success" @click="addSubject" plain>Add Subject</el-button>
    </div>
    <el-table
        :data="set_subjects"
        style="width: 100%"
        v-loading="$store.getters.set_loader_subject"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
          label="Subject Name"
          prop="name">
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="small"
              placeholder="Search by Name"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="medium"
              type="primary"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              circle
          >
          </el-button>
          <el-button
              size="medium"
              type="danger"
              @click="handleDelete(scope.row)"
              icon="el-icon-delete"
              circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-empty v-if="set_subjects.length === 0" description="No Subjects!"></el-empty>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addSubject from "@/components/addSubject";
import isDeleteSubject from "@/components/isDeleteSubject";

export default {
  components: {
    addSubject, isDeleteSubject
  },
  data() {
    return {
      search: '',
      load: false,
      catchQuery: null
    }
  },
  computed: {
    ...mapGetters(['set_subjects'])
  },
  methods: {
    ...mapActions(['subject_list', 'remove_subject', 'editSubject']),
    open1() {
      this.$notify({
        title: 'Success',
        message: 'This is a success message',
        type: 'success'
      });
    },
    getData: async function() {
      this.load = true;
      try {
        await this.subject_list();
        this.load = false;
      } catch (err) {
        throw err;
        this.load = false;
      }
    },
    handleEdit: function(item) {
      this.$refs.addSubject.show();

      this.$router.replace({
        query: {id: item.id}
      });
      this.catchQuery = this.$route.query.id;

      this.editSubject({
        item: item,
        catchQuery: this.catchQuery
      });

      this.$refs.addSubject.updateSubject();
    },
    handleDelete: function(item) {
      console.log(item)
      this.$refs.isDeleteSubject.show();
      this.$router.replace({
        query: {id: item.subjectId}
      });
      this.$refs.isDeleteSubject.thisUser();
    },
    addSubject: function() {
      this.$refs.addSubject.show();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style>
.add-subject {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
}
</style>