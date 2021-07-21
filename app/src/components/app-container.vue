<template>
  <div class="app-container-box">
    <div class="bread-box">
      <i class="line"></i>
      <el-breadcrumb-item v-for="(item,index) of bread" :key="index">
        <a href="/" v-if="item.index">{{item.name}}</a>
        <span v-else>{{item.name}}</span>
      </el-breadcrumb-item>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    bread:{
      type:Array,
      default:()=>[]
    }
  }
}
</script>

<style scoped>
.bread-box{
  height: 20px;
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.line{
  width: 3px;
  height: 100%;
  background: #2680eb;
  margin-right:10px;
  display: block;
}
.app-container-box{
  width: calc(100% - 10px);
  padding: 10px 20px 0;
  background:white;
  box-sizing: border-box;
  overflow: hidden;
  margin-left: 10px;
}
</style>