<template>
  <header class="app-top-header">
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:240px">
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
      <div class="head-portrait"> 
          <el-avatar :size="30" :src="circleUrl"></el-avatar>
          <span class="name-text">name</span>
      </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data(){
    return{
      input:'',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  }
})
</script>

<style scoped>
.app-top-header{
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  color: white;
  font-size: 18px;
  background-color: red; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #2680eb , #9dc7f8);
  justify-content: space-between;
  box-sizing: border-box;
}
.head-portrait{
  line-height: 50px;
  height: 50px;
  display: flex;
  align-items: center;
}
.name-text{
  margin-left: 10px;
}
</style>