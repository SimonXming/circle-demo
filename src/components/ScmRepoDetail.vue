<template>
  <el-row :gutter="0" style="margin-top: 50px">
     <el-col :span="16" :offset="4">
      <el-form :label-position="'top'" label-width="80px">
      <el-form-item label="pipeline">
        <el-input :rows=12 type="textarea" v-model="config.data"></el-input>
      </el-form-item>
    </el-form>
    </el-col>
     <el-col :span="20" :offset="2">
      <el-table
        :data="buildList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="🆔"
          width="70">
        </el-table-column>
       <el-table-column
          prop="number"
          label="编号"
          width="70">
        </el-table-column>
        <el-table-column
          prop="event"
          label="事件"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150">
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="200">
          <template scope="scope">
            {{ scope.row.started_at | dateFromTT }}
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          width="200">
          <template scope="scope">
            {{ scope.row.finished_at | dateFromTT }}
          </template>
        </el-table-column>
        <el-table-column
          prop="branch"
          label="branch"
          width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">
              <router-link :to="{ 
                name: 'BuildDetail', 
                params: { 
                  id: $route.params.id, 
                  repoID: $route.params.repoID,
                  num: scope.row.number
                }}">
                详情</router-link></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-col>

  </el-row>
</template>



<script>
  export default {
    data () {
      return {
        buildList: null,
        config: {
          data: ''
        }
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
        var configDetailUrl = 'http://localhost:8000/scm/' + this.$route.params.id + '/repo/' + this.$route.params.repoID + '/config'
        var buildListUrl = 'http://localhost:8000/scm/' + this.$route.params.id + '/repo/' + this.$route.params.repoID + '/build'
        this.$http.get(buildListUrl).then((response) => {
          if (response.body) {
            this.buildList = response.body
          }
        }, (response) => {
          this.error = response
        })
        this.$http.get(configDetailUrl).then((response) => {
          if (response.body) {
            this.config = response.body
          }
        }, (response) => {
          this.error = response
        })
      }
    }
  }
</script>