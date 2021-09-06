<template>
  <div style="width:200px;padding-top:30px">
    <el-menu class="el-menu-vertical-demo" :router="true" :unique-opened="true" :default-active="activeIndex" >
        <div v-for="(ite,index) of menus " :key="index">
          <el-submenu v-if="ite.children" :index="ite.index">
            <template v-slot:title class="oneTitle">
              <i :class="ite.icon" v-if="ite.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
              <span class="sugon-menu-text oneTitle">{{ite.name}}</span>
            </template>
            <div v-for="(ite1,index1) in ite.children" :key="index1" :ref="ite.index">
              <el-menu-item :index="ite1.index" v-if="ite1.class_name">
                <i :class="ite1.icon" v-if="ite1.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
                <span class="sugon-menu-text twoTitle">{{ite1.name}}</span>
              </el-menu-item>
              <div v-else>
                <el-submenu :index="ite1.index" class="aaa">
                  <i :class="ite1.icon" v-if="ite1.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
                  <template v-slot:title>
                    <span class="sugon-menu-text twoTitle">{{ite1.name}}</span>
                  </template>
                  <div :index="ite2.index" v-for="(ite2,index2) in ite1.children" :key="index2">
                    <el-menu-item :index="ite2.index" v-if="ite2.class_name">
                      <i :class="ite2.icon" v-if="ite2.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
                      <span class="sugon-menu-text twoTitle">{{ite2.name}}</span>
                    </el-menu-item>
                    <div v-else>
                      <el-submenu :index="ite2.index" class="aaa">
                        <i :class="ite2.icon" v-if="ite2.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
                        <template v-slot:title>
                           <span class="sugon-menu-text twoTitle">{{ite2.name}}</span>
                        </template>
                        <el-menu-item :index="ite3.index" v-for="(ite3,index3) in ite2.children" :key="index3">
                          <span class="sugon-menu-text threeTitle">{{ite3.name}}</span>
                        </el-menu-item>
                      </el-submenu>
                    </div>
                  </div>
                </el-submenu>
              </div>
            </div>
          </el-submenu>
          <el-menu-item :index="ite.index" v-else>
            <i :class="ite.icon" v-if="ite.icon" class="icon font_family sugon-menu-icon iconfont-new"></i>
            <span class="sugon-menu-text oneTitle">{{ite.name}}</span>
          </el-menu-item>
        </div>

      </el-menu> 
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const url = `ui/${localStorage.clusterId}`
export default defineComponent({
    data(){
        return{
          activeIndex:`/${url}`,
          menus:[
              {
                  index:`/${url}`,
                  name:'Dashboard'
              },
              {
                  index:`/${url}/quota`,
                  name:'Quota'
              },
          ]
        }
    },
    created(){
      console.log(this.menus)
    }
})
</script>

<style scoped>
.app-title{
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #2680eb;
    font-weight: 700;
    font-size: 20px;
}
.app-top-header{
  background: #2680eb;
  padding: 20px;
  color: white;
  font-size: 18px;
}
.el-menu-item.is-active{
  background: #f2f3f5;
}
</style>