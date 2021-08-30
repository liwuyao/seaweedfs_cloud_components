<template>
  <header class="app-top-header">
      <img src="@/assets/cloud-icon.png" alt="" style="width:250px">
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
  padding: 0 18px;
  color: black;
  font-size: 18px;
  background: white;
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
  color: #333;
}
</style>