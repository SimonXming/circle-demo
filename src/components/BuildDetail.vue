<template>
  <el-row :gutter="0" style="margin-top: 50px">
    <el-col :span="12" :offset="6">
      <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="proc in procList" v-bind:key="proc.id" :title="proc.name" :name="proc.pid">
        <div style="text-align: left;">
          <code v-for="line in proc.log" :key="line.pos">
            {{ line.out.trim() }}
            <br>
          </code>
        </div>
      </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>


<script>
  export default {
    data () {
      return {
        activeNames: [],
        procList: null
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
        var params = this.$route.params
        var buildDetailUrl = 'http://localhost:8000/scm/' + params.id + '/repo/' + params.repoID + '/build/' + params.num + '/proc'
        this.$http.get(buildDetailUrl).then((response) => {
          if (response.body) {
            this.procList = response.body
          }
        }, (response) => {
          this.error = response
        })
      },
      loadLog (proc) {
        var params = this.$route.params
        var logUrl = 'http://localhost:8000/scm/' + params.id + '/repo/' + params.repoID + '/build/' + params.num + '/log/' + proc.ppid + '/' + proc.name
        this.$http.get(logUrl).then((response) => {
          if (response.body) {
            this.$set(proc, 'log', response.body)
          }
        }, (response) => {
          this.$set(proc, 'log', '')
        })
      },
      handleChange (activeNames) {
        var vm = this

        var procsWithoutLog = []
        for (var i in activeNames) {
          var procsWithoutLogtmp = this.procList.filter(function (item, index, array) {
            return (item.pid === parseInt(activeNames[i])) && (!item.log)
          })
          procsWithoutLog = procsWithoutLog.concat(procsWithoutLogtmp)
        }
        procsWithoutLog.forEach(function (item, index, array) {
          vm.loadLog(item)
        })
      }
    }
  }
</script>