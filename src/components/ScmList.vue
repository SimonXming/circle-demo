<template>
<div>
  <el-row :gutter="0" style="margin-top: 50px">
     <el-col :span="20" :offset="2">
      <el-table
        :data="appList"
        @expand="expandRow"
        border
        style="width: 100%">

        <el-table-column
          width="100"
          type="expand">
          <template scope="props">
            <el-table
              :data="props.row.repos"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="🆔"
                width="50">
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
              <el-table-column
                prop="last_build"
                label="构建计数"
                width="100">
              </el-table-column>
              <el-table-column
                prop="private"
                label="私有仓库"
                width="100">
                <template scope="scope">
                  <div v-if="scope.row.private">👌</div>
                  <div v-else>👋</div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                  size="small"><router-link :to="{ name: 'ScmRepoDetail', params: { id: props.row.id, repoID: scope.row.id }}">详情</router-link></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          label="🆔"
          width="100">
          <template scope="scope">
            <!-- <el-icon name="time"></el-icon> -->
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="地址"
          width="240">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.host }}</span>
            <!-- <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.name }}</el-tag>
              </div>
            </el-popover> -->
          </template>
        </el-table-column>

        <el-table-column
          prop="private_token"
          label="private_token"
          width="240">
        </el-table-column>

        <el-table-column
          prop="scm_type"
          label="类型"
          width="80">
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"><router-link :to="{ name: 'ScmRepoRemote', params: { id: scope.row.id }}">Remote</router-link></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
  </el-row>
</div>

</template>

<script>
  var url = 'http://localhost:8000/scm'
  export default {
    data () {
      return {
        appList: null
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
        this.$http.get(url).then((response) => {
          if (response.body) {
            this.appList = response.body
          }
        }, (response) => {
          this.error = response
        })
      },
      loadRepoData (row) {
        var scmReposUrl = 'http://localhost:8000/scm/' + row.id + '/repo'
        this.$http.get(scmReposUrl).then((response) => {
          if (response.body) {
            this.$set(row, 'repos', response.body)
          }
        }, (response) => {
          this.$set(row, 'repos', [])
        })
      },
      expandRow (row, expanded) {
        this.loadRepoData(row)
      }
    }
  }
</script>