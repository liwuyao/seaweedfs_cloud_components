<template>
  <div>
    <Tree ref="Tree" @choose="choose_tree" titleKey="title" sizeKey="size" proportionKey="proportion"/>
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
      tree_list:[]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.start_getting_tree_list()
    })
  },
  methods:{
    transform_data(data){
      let arr = []
      try{
        for(let i in data.sizes){
          let obj = {
            title:i,
            path:data.directory + '/' + i,
            size:this.$filter.gbToSize(data.sizes[i]),
            proportion:Percentage(data.sizes[i],data.size) + '%'
          }
          arr.push(obj)
        }
      }catch(err){
        console.error(err)
      }
      function Percentage(num, total) { 
          if (num == 0 || total == 0){
              return 0;
          }
          return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
      }
      return arr
    },
    start_getting_tree_list() {//菜单初始化数据
      let _this = this;
      setTimeout(() => {
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
        let start_path = `https://cloud.seaweedfs.com/cluster/XEQWRNERCYIS027CTPJHO76N0I4IGM01`
        this.$axios.get(`${start_path}/`).then((res)=>{
          let size_arr = this.transform_data(res.data.size_response)
          let start_obj = {
            title:'/',
            path:start_path,
            size:this.$filter.gbToSize(res.data.size_response.size),
            proportion:'100%',
            children:size_arr
          }
          this.$refs.Tree.instance.create([start_obj], function (list) {//这一步必填
            /*记录下树的数据 此数据是插件构建完成后的数据，此后的数据操作都在此数据上,改变数据后执行resetTree，参考choose_tree方法*/
            _this.tree_list = list;
          });
        })
      });
    },
    choose_tree(data) {
      /*data选择菜单的数据*/
      data.loading = false
      data.menuState = true
      this.$axios.get(`${data.path}/index.json`).then((res)=>{
        let size_arr = []
        try{
          size_arr = this.transform_data(res.data.size_response)
        }catch(err){
          console.error(err)
        }
        data.children = size_arr
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

</style>