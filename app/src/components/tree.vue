<template>
  <div class="seaweedfs-tree-box">
    <div id="seaweedfs"></div>
  </div>
</template>

<script>
/*lwy-tree说明

*/

import { defineComponent } from "vue";
import LwyTree from "./lwy-tree.js";
export default defineComponent({
  props:{
    titleKey:{
      type:String,
      default:'title'
    },
    sizeKey:{
      type:String,
      default:'size'
    },
    proportionKey:{
      type:String,
      default:'proportion'
    }
  },
  data() {
    return {
      instance: "",
      tree_list: [],
      create:'',
      resetTree:''
    };
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      this.instance = new LwyTree({
        list: [],
        idKey: "id",
        container: "seaweedfs",
        width: 1000,
        choose: function (res) {//树选择回调，res当前菜单数据，e当前dom
          if(!res.menuState){
            _this.$emit('choose',res)
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
                  innerText: `${item[_this.titleKey]}`,
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
                      innerText: `大小：${item[_this.sizeKey]}`,
                    },
                  },
                  {
                    type: "span",
                    attr: {
                      innerText: `占比：${item[_this.proportionKey]}`,
                    },
                  },
                ],
              },
            ],
          };
          return msg_dom;
        },
      })
    });
  },
  methods: {
  },
});
</script>

<style>
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
  margin-top: 13px;
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
}
.seaweedfs-msg-describe span{
  margin-left: 10px;
}
</style>