<template>
  <div style="padding:0 5px">
    <app-container :bread="[{name:'dashboard',path:'/'}]">
      <div v-loading="loading" class="tree-box">
        <Tree ref="Tree" @choose="choose_tree" titleKey="title" sizeKey="size" proportionKey="proportion"/>
      </div>
    </app-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Tree from './tree.vue'
import globalConfig from '../../global.config.js'
import AppContainer from './app-container.vue'
export default defineComponent({
  components:{
    Tree,
    AppContainer
  },
  data(){
    return{
      tree_list:[],
      loading:false,
      first_size:0
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.start_getting_tree_list()
    })
  },
  methods:{
    transform_data(data){
      let _this = this
      let arr = []
      try{
        for(let i in data.sizes){
          let obj = {
            title:i,
            path:globalConfig.dirPath+(data.directory === '/'?'':data.directory) + '/' + i,
            size:data.sizes[i]+'bt',
            proportion:Percentage(data.sizes[i]) + '%'
          }
          arr.push(obj)
        }
      }catch(err){
        console.error(err)
      }
      function Percentage(num) { 
          if (num == 0){
              return 0;
          }
          return (Math.round(num / _this.first_size * 10000) / 100.00);// 小数点后两位百分比
      }
      return arr
    },
    start_getting_tree_list() {//菜单初始化数据
      let _this = this;
      this.loading = true
      /*
        {
          title:''，//标题
          id:'', //标题
          children:[],//子集
          menuState:'',//展开状态
          isActive:'',//是否当前选中
          loading:'',//加载中
        }
      */
      let start_path = globalConfig.dirPath
      this.$axios.get(`${start_path}`).then((res)=>{
        this.loading = false
        this.first_size = res.data.size_response.size
        let size_arr = this.transform_data(res.data.size_response)
        let start_obj = {
          title:'/',
          path:start_path,
          size:res.data.size_response.size + 'bt',
          proportion:'100%',
          children:size_arr
        }
        if(size_arr.length){
          start_obj.menuState = true
        }
        this.$refs.Tree.instance.create([start_obj], function (list) {//这一步必填
          /*记录下树的数据 此数据是插件构建完成后的数据，此后的数据操作都在此数据上,改变数据后执行resetTree，参考choose_tree方法*/
          _this.tree_list = list;
        });
      }).catch((err)=>{
        console.log(err)
        this.loading = false
      })
    },
    choose_tree(data) {
      /*data选择菜单的数据*/
      data.loading = true
      this.$refs.Tree.instance.resetTree(this.tree_list);
      this.$axios.get(`${data.path}`).then((res)=>{
        let size_arr = []
        try{
          size_arr = this.transform_data(res.data.size_response)
        }catch(err){
          console.error(err)
        }
        data.children = size_arr
        if(!size_arr.length){
          data.menuState = false
        }else{
          data.menuState = true
        }
        data.loading = false
        /*resetTree 是树更新的唯一方法，每次改变数据后，必须执行此方法*/
        this.$refs.Tree.instance.resetTree(this.tree_list);
      }).catch((err)=>{
        console.error(err)
        data.loading = false
        data.menuState = false
        data.children = []
        this.$refs.Tree.instance.resetTree(this.tree_list);
      })
    },
  }
})
</script>

<style>
.tree-box{
  width: 100%;
  min-height: 300px;
}
</style>