<template>
  <div style="padding:0 5px">
    <app-container :bread="[{name:'Dashboard',path:'/'}]">
      <div v-loading="loading" class="tree-box" element-loading-text="Loading">
          <nav class="tree-head">
            <div class="left-content">directory</div>
            <div class="right-content">
                <div>size</div>
                <div>Proportion</div>
                <div>cached size</div>
                <div>quota</div>
                <div style="padding:0">handle</div>
            </div>
          </nav>
        <Tree ref="Tree" @choose="choose_tree" titleKey="title" sizeKey="size" proportionKey="proportion"/>
      </div>
    </app-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Tree from './tree.vue'
export default defineComponent({
  components:{
    Tree
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
        for(let i in data.size_infos){
          data.size_infos[i].cached_size = data.size_infos[i].cached_size?data.size_infos[i].cached_size:0
          data.size_infos[i].quota = data.size_infos[i].quota?data.size_infos[i].quota:0
          data.size_infos[i].size =data.size_infos[i].size?data.size_infos[i].size:0
          let obj = {
            title:i,
            path:this.$globalConfig.dirPath+'/sizes'+(data.directory === '/'?'':data.directory) + '/' + i,
            size:this.$filter.sizeToText(data.size_infos[i].size),
            proportion:Percentage(data.size_infos[i].size) + '%',
            cached_size:this.$filter.sizeToText(data.size_infos[i].cached_size),
            quota:this.$filter.sizeToText(data.size_infos[i].quota)
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
      // let start_path = 'http://localhost:25683/cluster/WJ1IJCDQ2S8L314Y0LO4QA0EL92KT37V'
      let start_path = this.$globalConfig.dirPath+'/sizes'
      this.$axios.get(`${start_path}`).then((res)=>{
        this.loading = false
        this.first_size = res.data.size_response.size_info.size
        let size_arr = this.transform_data(res.data.size_response)
        let start_obj = {
          title:'/',
          path:start_path,
          size:this.$filter.sizeToText(res.data.size_response.size_info.size),
          cached_size:this.$filter.sizeToText(res.data.size_response.size_info.cached_size),
          quota:'--',
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
.tree-head{
  display: flex;
  padding: 16px 0;
  border-bottom:1px solid gainsboro;
  justify-content: space-between;
}
.left-content{
  flex: 1;
  font-weight: 700;
  color: #909399;
}
.right-content{
  display: flex;
}
.right-content div{
  width: 140px;
  text-align: center;
  box-sizing: border-box;
  padding-right: 18px;
  font-weight: 700;
  color: #909399;
}
.tree-box{
  width: 100%;
  min-height: 300px;
}
</style>