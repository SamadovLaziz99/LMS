<template>
  <div v-loading="load">
    <addTeacher ref="addTeacher" />
    <isDeleteTeacher ref="isDeleteTeacher" />
    <div class="add-student">
      <el-button type="success" @click="addTeacher" plain>Add Teacher</el-button>
    </div>
    <el-table
        :data="$store.getters.set_teachers.filter(data => !search || data.firstName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        v-loading="$store.getters.set_loadert"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
          label="First Name"
          prop="firstName">
      </el-table-column>
      <el-table-column
          label="Last Name"
          prop="lastName">
      </el-table-column>
      <el-table-column
          label="Username"
          prop="username">
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="small"
              placeholder="Search by First Name"/>
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
    <el-empty v-if="set_teachers.length === 0" description="No Students!"></el-empty>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios_init from "@/utils/axios_init";
import addTeacher from "@/components/addTeacher";
import isDeleteTeacher from "@/components/isDeleteTeacher";

export default {
  components: {
    addTeacher, isDeleteTeacher
  },
  data() {
    return {
      search: '',
      load: false,
      catchQuery: null,
    }
  },
  computed: {
    ...mapGetters(['set_teachers'])
  },
  methods: {
    ...mapActions(['teachers_list', 'remove_teacher', 'editTeacher']),
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
    handleEdit: function(item) {
      this.$refs.addTeacher.showTeacher();

      this.$router.replace({
        query: {id: item.id}
      });
      this.catchQuery = this.$route.query.id;

      this.editTeacher({
        item: item,
        catchQuery: this.catchQuery
      });

      this.$refs.addTeacher.updateTeacher();
    },
    handleDelete: function(item) {
      this.$refs.isDeleteTeacher.showTeacher();
      this.$router.replace({
        query: {id: item.id}
      });
      this.$refs.isDeleteTeacher.thisTeacher();
    },
    addTeacher: function() {
      this.$refs.addTeacher.showTeacher();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style>
.add-student {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
}
</style>