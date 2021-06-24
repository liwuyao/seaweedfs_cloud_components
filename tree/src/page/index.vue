<template>
  <div class="seaweedfs-tree-box">
    <div id="seaweedfs"></div>
  </div>
</template>

<script>
/*lwy-tree说明

*/

import { defineComponent } from "vue";
import LwyTree from "../plugin/lwy-tree.js";
export default defineComponent({
  data() {
    return {
      Tree: "",
      tree_list: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      const Tree = this.Tree = new LwyTree({
        list: [],
        idKey: "id",
        container: "seaweedfs",
        width: 1000,
        choose: function (res, e) {//树选择回调，res当前菜单数据，e当前dom
          if(!res.menuState){
            _this.choose_tree(res)
          }
        },
        html: function (item) {//自定义展示内容，tree插件使用自写的一个虚拟dom函数执行渲染，接收一个树形的对象
          const msg_dom = {
            type: "div",//指明dom的类型
            attr: {//设置dom的树形
              class: "seaweedfs-msg",
              style:{
                width:`calc(100% - 14px)`
              }
            },
            children: [//dom的孩子节点
              {
                type: "span",
                attr: {
                  class: "seaweedfs-msg-title",
                  innerText: `${item.title}`,
                },
              },
              {
                type: "div",
                attr: {
                  class: "seaweedfs-msg-describe",
                },
                children: [
                  {
                    type: "span",
                    attr: {
                      innerText: `大小：${item.size}`,
                    },
                  },
                  {
                    type: "span",
                    attr: {
                      innerText: `占比：${item.proportion}`,
                    },
                  },
                ],
              },
            ],
          };
          return msg_dom;
        },
      })
      this.start_getting_tree_list();
    });
  },
  methods: {
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
        this.Tree.create(data, function (list) {
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
        this.Tree.resetTree(this.tree_list);
      }, 2000);
    },
  },
});
</script>

<style lang="scss">
.seaweedfs-tree-box{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top:20px;
}
.tree-caret {
  display: inline-block;
  font-size: 18px;
  transition: all 0.2s;
  height: 16px;
  margin-top: 10px;
  cursor: pointer;
}
.tree-rotate {
  transform: rotate(180deg);
}
.tree-msg-dom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.tree-msg-dom span {
  flex: 1;
  overflow: hidden;
  white-space: nowrap; /* 规定文本是否折行 */
  text-overflow: ellipsis;
  margin-left: 4px;
}
.cloud-application-menu {
  transition: all 0.1s;
}
.tree-buttom {
  margin: 0 5px;
}
.loading-animation{
  animation:roate 0.5s linear infinite;
}
@keyframes roate {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg)}
}
.seaweedfs-msg {
  display: flex;
  width: calc(100% - 18px);
  padding-left: 8px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  justify-content: space-between;
  .seaweedfs-msg-describe {
    span {
      margin-left: 10px;
    }
  }
}
</style>