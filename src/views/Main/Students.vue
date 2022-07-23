<template>
  <div v-loading="load">
    <addStudent ref="addStudent" />
    <isDeleteStudent ref="isDeleteStudent" />
    <el-button
        plain
        @click="open1">
      Success
    </el-button>
    <div class="add-student">
      <el-button type="success" @click="addStudent" plain>Add Student</el-button>
    </div>
    <el-table
        :data="students.filter(data => !search || data.firstName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        v-loading="$store.getters.set_loader"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :row-class-name="tableRowClassName"
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
          label="Subjects"
          prop="subjects[0].name">
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
    <div style="text-align: center; margin: 1rem">
      <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next"
          :total="set_total"
          @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-empty v-if="!students && !students.length" description="No Students!"></el-empty>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addStudent from "@/components/addStudent";
import isDeleteStudent from "@/components/isDeleteStudent";

export default {
  components: {
    addStudent, isDeleteStudent
  },
  data() {
    return {
      search: '',
      load: false,
      catchQuery: null
    }
  },
  computed: {
    ...mapGetters(['students', 'set_total'])
  },
  methods: {
    ...mapActions(['students_list', 'remove_student', 'editStudent']),
    tableRowClassName: function({row, rowIndex}) {
      if(row.subjects.length > 1) {
        return 'warning-row';
      }
      else if(row.subjects.length > 0) {
        return 'success-row';
      }
      return '';
    },
    open1: function() {
      this.$notify({
        title: 'Success',
        message: 'This is a success message',
        type: 'success'
      });
    },
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
    currentChange: async function(e) {
      this.load = true;
      try {
        await this.students_list(e-1);
        this.load = false;
      } catch (err) {
        throw err;
        this.load = false;
      }
    },
    handleEdit: function(item) {
      this.$refs.addStudent.show();

      this.$router.replace({
        query: {id: item.id}
      });
      this.catchQuery = this.$route.query.id;

      this.editStudent({
        item: item,
        catchQuery: this.catchQuery
      });

      this.$refs.addStudent.updatePost();
    },
    handleDelete: function(item) {
      this.$refs.isDeleteStudent.show();
      this.$router.replace({
        query: {id: item.id}
      });
      this.$refs.isDeleteStudent.thisUser();
    },
    addStudent: function() {
      this.$refs.addStudent.show();
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>