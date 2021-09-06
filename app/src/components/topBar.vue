<template>
  <header class="app-top-header">
      <img src="@/assets/cloud-icon.png" alt="" style="width:250px">
      <div class="head-portrait"> 
          <span class="name-text">Admin</span>
      </div>
  </header>
</template>

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