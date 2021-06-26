<template>
  <div style="width:200px">
    <div class="app-title">
        seaweedfs-cloud
    </div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
    <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <template #title>首页</template>
      </el-menu-item>
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
        return{
            menus:[
                {
                    index:'/',
                    title:'首页'
                }
            ]
        }
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
</style>