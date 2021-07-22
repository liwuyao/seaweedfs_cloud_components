<template>
  <app-container :bread="[{name:'quota',path:'/'}]">
      <ul class="header-handle">
        <li>
          <el-button size="small" type="primary">
            <i class="el-icon-refresh-right"></i>
          </el-button>
           <el-button size="small" type="primary" icon="el-icon-plus" @click="open_dialog('add')">
            New
          </el-button>
        </li>
      </ul>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="directory"
          label="directory"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="size"
          width="180">
        </el-table-column>
        <el-table-column
          prop="handle"
          label="size">
        </el-table-column>
      </el-table>
      <el-dialog
        title="new quota"
        v-model="dialogVisible"
        width="600px"
        >
        <el-form :model="quotaForm" :rules="rules" ref="quotaForm" label-width="130px" class="demo-quotaForm">
          <el-form-item label="directory" prop="directory">
            <el-input v-model="quotaForm.directory"></el-input>
          </el-form-item>
          <el-form-item label="size" prop="size">
            <el-input-number v-model="quotaForm.size" :min="1" :max="10" style="width:400px;margin-right:10px"></el-input-number>GB
          </el-form-item>
          <el-form-item label="apply to children" prop="is_for_children">
            <el-checkbox v-model="quotaForm.is_for_children"></el-checkbox>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">cancel</el-button>
            <el-button type="primary" :loading="confirm_loading" @click="new_quota">confirm</el-button>
          </span>
        </template>
      </el-dialog>
  </app-container>
</template>

<script>
export default {
  data(){
    return{
      tableData:[],
      dialogVisible:false,
      quotaForm:{
        directory:'',
        size:0,
        is_for_children:false
      },
      rules:{},
      confirm_loading:false
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.get_quota()
    })
  },
  methods:{
    open_dialog(type){
      switch(type){
        case 'add':
          this.quotaForm = {
          directory:'',
          size:0,
          is_for_children:false
        }
        break
      }
      this.dialogVisible = true
    },
    get_quota(){
      this.$axios.get(`${this.$globalConfig.dirPath}/quotas`).then((res)=>{
        console.log(res)
      })
    },
    new_quota(){
      this.confirm_loading = true
      this.$axios.post(`${this.$globalConfig.dirPath}/quotas${this.$route.query.path}`,this.quotaForm).then(()=>{
        this.get_quota()
        this.confirm_loading = false
        this.dialogVisible = false
      }).catch((err)=>{
        console.log(err)
        this.confirm_loading = false
      })
    }
  }
}
</script>

<style scoped>
.quota-container{
  width: 100%;
  padding: 10px 10px 10px;
}
.header-handle{
  padding-top: 20px;
}
</style>