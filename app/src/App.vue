<template>
  <div class="app-container">
    <div class="menu">
      <LeftMenu/>
    </div>
    <div class="content">
      <TopBar/>
      <router-view></router-view>
    </div>
    <el-dialog
      title="Login"
      v-model="state"
      width="30%"
      append-to-body
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      >
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.prevent>
          <el-form-item label="password" prop="password">
            <el-input v-model="ruleForm.password" type="password" @keyup.prevent.enter="login()"></el-input>
          </el-form-item>
       </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="login" :loading="loading">confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import TopBar from './components/topBar.vue'
import LeftMenu from './components/leftMenu.vue'
import {login_dialog_state} from './communication'
import { ElMessage } from 'element-plus'
import Qs from 'qs'
export default defineComponent({
  name: 'App',
  components:{
    TopBar,
    LeftMenu
  },
  watch:{
    state:function(_new){
      if(this.$refs.ruleForm && _new){
         this.$refs['ruleForm'].resetFields();
      }
    }
  },
  data(){
    return{
      ruleForm:{
        password:''
      },
      rules:{
        password:[
          { required: true, message: 'password is incorrect', trigger: 'blur' },
        ]
      },
      loading:false,
    }
  },
  setup: () => {
    const count = ref(0)
    const state = login_dialog_state
    return { count , state}
  },
  created() {
  },
  methods:{
    login(){
      this.$refs['ruleForm'].validate((valid) => {
        if(valid){
          this.loading = true
          let send = {
            password:encodeURI(this.ruleForm.password)
          }
          this.$axios({method:'post',url:`${this.$globalConfig.dirPath}/login`,headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:Qs.stringify(send)}).then((res)=>{
            ElMessage.success({
              message: 'Login successful',
              type: 'success'
            });
            localStorage.token = 'Bearer ' + res.data.message
            localStorage.last_path = this.$route.path
            this.state = false
            this.$router.push('/reload')
          }).catch((err)=>{
            ElMessage.error(err.response.data.message);
          }).finally(()=>{
            this.loading = false
          })
        }
      })
    }
  }
})
</script>

<style scoped>
.app-container{
  width: 100%;
  height: 100%;
  display: flex;
}
.menu{
  height: 100%;
  width: 200px;
  box-shadow: 6px 0px 5px -5px #999,-6px 0px 5px -5px #999;
}
.content{
  box-sizing: border-box;
  width: calc(100% - 200px);
}
</style>
