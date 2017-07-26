<template>
  <div>
  <el-row :gutter="0" style="margin-top: 50px">
     <el-col :span="18" :offset="3">
      <el-table
        :data="repoList"
        border
        style="width: 100%">
        <el-table-column
          prop="remote_id"
          label="🆔"
          width="80">
        </el-table-column>
       <el-table-column
          prop="owner"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="full_name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="default_branch"
          label="分支"
          width="100">
        </el-table-column>
        <el-table-column
          prop="clone_url"
          label="clone_url"
          width="400">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="activateRepo(scope.$index, scope.row)">激活</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
  </el-row>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        repoList: null
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      init () {
        this.loadData()
      },
      loadData () {
        var remoteRepoUrl = 'http://localhost:8000/scm/' + this.$route.params.id + '/remote'
        this.$http.get(remoteRepoUrl).then((response) => {
          if (response.body) {
            this.repoList = response.body
          }
        }, (response) => {
          this.error = response
        })
      },
      activateRepo (index, row) {
        var remoteRepoUrl = 'http://localhost:8000/scm/' + this.$route.params.id + '/repo'
        this.$http.post(remoteRepoUrl, {
          owner: row.owner,
          name: row.name
        }).then((response) => {
          if (response.ok) {
            alert('Success activate.')
          }
        }, (response) => {
          alert('Failed activate.')
        })
      }
    }
  }
</script>