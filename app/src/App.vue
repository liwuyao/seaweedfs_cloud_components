<template>
  <div>
    <div>
      <h1>组件说明</h1>
      <h2>Attributes</h2>
      <p>
        titleKey:用以指定表示标题的字段 默认 title<br/>
        sizeKey:用以指定表示 大小的字段 默认 size<br/>
        proportionKey:用以指定表示 占比的字段 默认 proportion
      </p>
      <h2>methods</h2>
      <p>choose:点击树后的回调方法，会回调当前点击的数据</p>
      <h2>Event</h2>
      <h3>tree的事件挂载在实例的instance上，通过this.$refs获取，详见下面demo</h3>
      <p>
        create：创建树的时候调用，此方法需传入一个回调函数，会返回创建完成后生产的树数组，利用js对象的传递性，后续对数据的操作都在这个数组上，改变数组就是改变视图。用tree_list做一个记录
        resetTree：用以更新tree的视图，s数据更新后必须用此方法更新视图，不如树不会发生变化，详见demo。（开发此插件的时候是在vue2.0上，vue2.0对数据监听不够深，对dom的优化也欠佳，插件内置了一个自己开发的虚拟dom,所以需要如此手动更新，类似老版本的react)
      </p>
    </div>
    <Tree ref="Tree" @choose="choose_tree" titleKey="title" sizeKey="size" proportionKey="proportion"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Tree from './components/tree.vue'

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
        let data = [//模拟菜单数据
          {
            title: "测试一级菜单",
            id: "1",
            size: "100G",
            proportion: "10%",
          },
        ];
        this.$refs.Tree.instance.create(data, function (list) {//这一步必填
          /*记录下树的数据 此数据是插件构建完成后的数据，此后的数据操作都在此数据上,改变数据后执行resetTree，参考choose_tree方法*/
          _this.tree_list = list;
        });
      });
    },
    choose_tree(data) {
      /*data选择菜单的数据*/
      setTimeout(() => {//模拟接口回调
        data.loading = false
        data.menuState = true
        /*如果成功对children 赋值 数据array,如果失败对children赋值[]*/
        data.children = [
          {
            title: "测试1-1",
            id: "1-1",
            size: "100G",
            proportion: "10%"
          },
        ];
        /*resetTree 是树更新的唯一方法，每次改变数据后，必须执行此方法*/
        this.$refs.Tree.instance.resetTree(this.tree_list);
      }, 2000);
    },
  }
})
</script>

<style>

</style>