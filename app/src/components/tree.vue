<template>
  <div class="seaweedfs-tree-box" ref="treeBox">
    <div id="seaweedfs"></div>
  </div>
</template>

<script>
// Attributes
// titleKey:用以指定表示标题的字段 默认 title
// sizeKey:用以指定表示 大小的字段 默认 size
// proportionKey:用以指定表示 占比的字段 默认 proportion
// methods
// choose:点击树后的回调方法，会回调当前点击的数据
// Event
// tree的事件挂载在实例的instance上，通过this.$refs获取，详见下面demo
// create：创建树的时候调用，此方法需传入一个回调函数，会返回创建完成后生产的树数组，利用js对象的传递性，后续对数据的操作都在这个数组上，改变数组就是改变视图。用tree_list做一个记录
// resetTree：用以更新tree的视图，数据更新后必须用此方法更新视图，不用树不会发生变化，详见demo。（开发此插件的时候是在vue2.0上，vue2.0对数据监听不够深，对dom的优化也欠佳，插件内置了一个自己开发的虚拟dom,所以需要如此手动更新，类似老版本的react)
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
      document.getElementById('seaweedfs').innerHTML = ''
      let _this = this
      let treeBoxWidth = this.$refs.treeBox.offsetWidth
      this.instance = new LwyTree({
        list: [],
        idKey: "id",
        container: "seaweedfs",
        width: treeBoxWidth - 50,
        choose: function (res) {
          //树选择回调，res当前菜单数据，e当前dom
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
                    type:'button',
                    attr:{
                      innerText:'quota',
                      className:'quota-button'
                    },
                    event:[
                      {
                        type:'click',
                        fn:function(e){
                          e.stopPropagation()
                          let index = item.path.split(`${localStorage.clusterId}/sizes/`)[1]
                          let url = `/ui/${localStorage.clusterId}/quota?path=` + index
                          _this.$router.push(url)
                        }
                      }
                    ]
                  },
                  {
                    type: "span",
                    attr: {
                      innerText: `${item[_this.sizeKey]}`,
                    },
                  },
                  {
                    type: "span",
                    attr: {
                      innerText: `${item[_this.proportionKey]}`,
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
#seaweedfs{
  width:100%
}
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
  width: 18px;
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
  display: inline-block;
  width: 140px;
  text-align: right;
}
</style>