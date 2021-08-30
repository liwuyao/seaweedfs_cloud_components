<template>
<div>
  <app-container :bread="bread">
      <ul class="header-handle">
        <li>
          <el-button size="small" type="primary" @click="get_quota">
            <i class="el-icon-refresh-right" :class="{'loading-animation':table_loading}"></i>
          </el-button>
           <el-button size="small" type="primary" icon="el-icon-plus" @click="open_dialog('add')">
            New
          </el-button>
        </li>
      </ul>
      <el-table
        :data="tableData"
        v-loading="table_loading"
        element-loading-text="Loading"
        style="width: 100%">
        <el-table-column
          prop="directory"
          label="Directory"
        >
        <template #default="scope">
          <span>{{trans_directory(scope.row)}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="Size"
        >
        <template #default="scope">
          <span>{{$filter.sizeToText(scope.row.size)}}</span>
        </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="">
          <template #default="scope">
            <i class="el-icon-time el-icon-delete delete-btn" @click="delete_row(scope.row)" title="Delete"></i>
            <i class="el-icon-edit modify-btn" title="Modify" @click="open_dialog('modify',scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="New Quota"
        v-model="dialogVisible"
        width="600px"
        >
        <el-form :model="quotaForm" :rules="rules" ref="quotaForm" label-width="130px" class="demo-quotaForm">
          <el-form-item label="Directory" prop="directory">
            <el-input v-model="quotaForm.directory"></el-input>
          </el-form-item>
          <el-form-item label="Size" prop="size">
            <div style="display:flex">
              <el-input-number v-model="quotaForm.size" :min="1" :max="10" style="width:340px;margin-right:10px"></el-input-number>
              <el-select v-model="size" style="width:80px">
                <el-option
                    v-for="(item,index) of size_options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    {{item.label}}
                  </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="Apply to children" prop="is_for_children">
            <el-checkbox v-model="quotaForm.is_for_children"></el-checkbox>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" :loading="confirm_loading" @click="new_quota">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        title="Modify Quota"
        v-model="dialogVisible_modify"
        width="600px"
      >
      <el-form :model="modifyForm" :rules="rules" label-width="130px" class="demo-quotaForm">
        <el-form-item label="Directory">
          <p style="font-size:16px;color:#409EFF;font-weight:700">{{current_quota.directory}}</p>
        </el-form-item>
        <el-form-item label="Size">
          <div style="display:flex">
            <el-input-number v-model="modifyForm.size" :min="1"  style="width:340px;margin-right:10px"></el-input-number>
            <el-select v-model="size" style="width:80px">
            <el-option
                v-for="(item,index) of size_options"
                :key="index"
                :label="item.label"
                :value="item.value">
                {{item.label}}
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="Apply to children">
            <el-checkbox v-model="current_quota.is_for_children" :disabled="true"></el-checkbox>
        </el-form-item>
      </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible_modify = false">Cancel</el-button>
            <el-button type="primary" :loading="confirm_loading" @click="new_quota('modify')">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
  </app-container>
</div>
</template>

<script>
const url = `/ui/${localStorage.clusterId}`
export default {
  data(){
      var validate_directory = (rule, value, callback) => {
        rule =   /^\/+(([0-9a-zA-Z_]+)|([0-9a-zA-Z_]+\/[0-9a-zA-Z_]+))+$/
        if (!rule.test(value)) {
          callback(new Error('Please enter the correct path'));
        } else {
          callback();
        }
      };
    return{
      default_url:url,
      tableData:[],
      dialogVisible:false,
      quotaForm:{
        directory:'',
        size:0,
        is_for_children:false
      },
      rules:{
        directory:[
          { validator: validate_directory, trigger: 'blur' }
        ]
      },
      confirm_loading:false,
      table_loading:false,
      dialogVisible_modify:false,
      modifyForm:{
        size:0
      },
      current_quota:'',
      isCreate:false,
      bread:[],
      size:'GB',
      size_options:[
        {
          label:'TB',
          value:'TB'
        },
        {
          label:'GB',
          value:'GB'
        },
        {
          label:'MB',
          value:'MB'
        },
      ]
    }
  },
  created() {
    this.bread = [{name:'Dashboard',index:this.default_url},{name:'Quota',index:''}]
    // if(this.$route.query.path){
    //   this.bread = [{name:'dashboard',index:this.default_url},{name:'quota',index:''}]
    // }else{
    //   this.bread = [{name:'quota',index:''}]
    // }
  },
  mounted(){
    this.$nextTick(()=>{
      this.get_quota()
    })
  },
  methods:{
    delete_row(data){
       this.$confirm('Are you sure to delete?', 'Delete Quota', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`${this.$globalConfig.dirPath}/quotas${data.directory}`).then(()=>{
            this.$message({
              type:'success',
              message:'Delete succeeded !'
            })
            this.get_quota()
          }).catch((err)=>{
            console.log(err)
            this.$message({
              type:'error',
              message:'Deletion failed !'
            })
          })
        }).catch(()=>{
          console.log('cancel')
        })
    },
    open_dialog(type,data){
      this.size = 'GB'
      switch(type){
        case 'add':
          this.quotaForm = {
          directory:'',
          size:0,
          is_for_children:false
        }
        this.dialogVisible = true
        if(this.$refs['quotaForm']){
          this.$refs['quotaForm'].resetFields()
        }
        break
        case 'modify':
          this.current_quota = data
          this.modifyForm.size = Math.floor(data.size/(1024*1024*1024))
          this.dialogVisible_modify = true
        break
      }
    },
    trans_directory(data){
      return data.is_for_children?`${data.directory}/*`:data.directory
    },
    get_quota(){
      this.table_loading = true
      this.$axios.get(`${this.$globalConfig.dirPath}/quotas`).then((res)=>{
        this.table_loading = false
        res.data.get_quota_rules_response.quota_rules = res.data.get_quota_rules_response.quota_rules?res.data.get_quota_rules_response.quota_rules:[]
        this.tableData = res.data.get_quota_rules_response.quota_rules
        if(this.$route.query.path && !this.isCreate){
          if(this.tableData.some((item)=>item.directory === this.$route.query.path)){
            this.current_quota = this.tableData.filter((item)=>item.directory === this.$route.query.path)[0]
            this.modifyForm.size = Math.floor(this.current_quota.size/(1024*1024*1024))
            this.dialogVisible_modify = true
          }else{
            this.quotaForm = {
              directory:this.$route.query.path,
              size:0,
              is_for_children:false
            }
            this.dialogVisible = true
          }
          this.isCreate = true
        }
      }).catch((err)=>{
        console.log(err)
        this.tableData = []
        this.table_loading = false
      })
    },
    new_quota(type){
      let state = false
      if(type !== 'modify'){
        this.$refs['quotaForm'].validate((valid) => {
          state = valid
        });
      }
      if(type !== 'modify' && !state) return
      this.confirm_loading = true
      let send = this.quotaForm
      let path = send.directory
      if(type === 'modify'){
        send = this.modifyForm
        path = this.current_quota.directory
      }
      switch(this.size){
        case 'GB':
          send.size = send.size*1024*1024*1024
        break
        case 'TB':
          send.size = send.size*1024*1024*1024*1024
        break
        case 'MB':
           send.size = send.size*1024*1024
        break
      }
      this.$axios.post(`${this.$globalConfig.dirPath}/quotas${path}`,send).then(()=>{
        this.get_quota()
        this.confirm_loading = false
        this.dialogVisible = false
        this.dialogVisible_modify = false
        this.$message({
          type:'success',
          message:'success'
        })
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
.delete-btn{
  color: red;
  cursor: pointer;
}
.delete-btn:hover{
  color: rgb(139, 3, 3);
}
.modify-btn{
  color: #2680eb;
  margin-left: 14px;
  cursor: pointer;
}
.modify-btn:hover{
  color: #174885;
}
.loading-animation{
  animation:rotate 1s infinite linear;
  -webkit-animation:rotate 1s infinite linear; 
}
@keyframes rotate
{
from {transform:rotate(0deg);}
to {transform:rotate(360deg)}
}

@-webkit-keyframes rotate /*Safari and Chrome*/
{
from {transform:rotate(0deg);}
to {transform:rotate(360deg)}
}
</style>